package com.tiantanhehe.yidongchafang;

import java.lang.reflect.Field;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.acra.ACRA;
import org.acra.ACRAConfiguration;
import org.acra.annotation.ReportsCrashes;
import org.json.JSONObject;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.freerdp.afreerdp.services.LibFreeRDP;
import com.tiantanhehe.tiantanrdp.NetworkStateReceiver;
import com.tiantanhehe.tiantanrdp.ScreenReceiver;
import com.tiantanhehe.tiantanrdp.SessionState;
import com.tiantanhehe.tiantanrdp.utils.BookmarkBase;
import com.tiantanhehe.yidongchafang.common.ControlTemplate;
import com.tiantanhehe.yidongchafang.common.RdpEvent;
import com.tiantanhehe.yidongchafang.conf.AppConf;
import com.tiantanhehe.yidongchafang.conf.FeatureConf;
import com.tiantanhehe.yidongchafang.services.DataManager;
import com.tiantanhehe.yidongchafang.utils.SharedPreferencesUtils;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.telephony.TelephonyManager;
import android.util.Log;

/*************************************************************
 * Created : 2016/4/1. Info :全局Application文件，用于保存全局应用信息以及运行配置信息
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author hooke <huke@tiantanhehe.com>
 * @Version
 * @Updated History:
 **************************************************************/

@ReportsCrashes(formKey = "", // This is required for backward compatibility but
// not used
formUri = "http://server_ip/:/server_port/tiantan_emr/Mobile/ClientCommunication/crashReport")
public class GlobalInfoApplication extends Application implements
		LibFreeRDP.EventListener {
	public AppConf appConf;
	public FeatureConf featureConf;

	public DataManager data_manager;

	/**
	 * @Description: Volley队列单例
	 * @author:小冰
	 * @date: 2016年9月9日 上午11:55:25
	 */
	private static RequestQueue mQueue;
	
	private static GlobalInfoApplication appInstance;

	public static GlobalInfoApplication getInstance() {
		return appInstance;
	}

	/**
	 * @Title:GlobalInfoApplication
	 * @Description: 构造方法
	 */
	public GlobalInfoApplication() {
		super();
		appConf = new AppConf();
		featureConf = new FeatureConf();

		sessionMap = Collections
				.synchronizedMap(new HashMap<Integer, SessionState>());

		GlobalInfoApplication.load();
		LibFreeRDP.setEventListener(this);
	}

	@Override
	public void onCreate() {
		super.onCreate();
		appInstance = this;
		initParams();
		initACRA();

		ConnectedTo3G = NetworkStateReceiver.isConnectedTo3G(this);

		// init screen receiver here (this can't be declared in AndroidManifest
		// - refer to:
		// http://thinkandroid.wordpress.com/2010/01/24/handling-screen-off-and-screen-on-intents/
		IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
		filter.addAction(Intent.ACTION_SCREEN_OFF);
		registerReceiver(new ScreenReceiver(), filter);
		
		mQueue = Volley.newRequestQueue(getApplicationContext());
	}

	/**
	 * @Description: Volley队列单例
	 * @author:小冰
	 * @date: 2016年9月9日 上午11:55:25
	 */
	public static RequestQueue getHttpQueue() {
		return mQueue;
	}
	
	
	/**
	 * @Title: initParams
	 * @Description: 初始化参数信息
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年6月22日 上午11:55:25
	 */
	public void initParams() {
		// 从Shared 里面获取已更改的IP值
		String param_ip = SharedPreferencesUtils.getParam(this, "ip", "")
				.toString();
		String param_port = SharedPreferencesUtils.getParam(this, "port", "")
				.toString();
		// 判断Shared 所存储的值是否为空，为空则使用原来的IP，不空则将原来的IP替换掉
		if (!param_ip.equals("") && !param_port.equals("")) {
			this.resetServerIP(param_ip, param_port);
		}
	}

	/**
	 * @Title: initACRA
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月13日 上午9:25:50
	 */
	private void initACRA() {
		ACRA.init(this);

		// String form_uri_config =
		// "http://203.195.184.174/tiantan_emr_bk/Mobile/ClientCommunication/crashReport/";
		//
		// try {
		// final ACRAConfiguration acr_config = new
		// ConfigurationBuilder(this).setFormUri(form_uri_config).build();
		// ACRA.init(this, acr_config);
		// } catch (ACRAConfigurationException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		// acr_config.setFormUri(form_uri_config);
		//
		// ACRA.setConfig(acr_config);

		ACRAConfiguration acr_config = ACRA.getConfig();
		String form_uri_config = "http://"
				+ appConf.server_ip
				+ ":"
				+ appConf.server_port
				+ "/tiantan_emr/Mobile/ClientCommunication/crashReport/shebei_id/"
				+ getDeviceID();
		acr_config.setFormUri(form_uri_config);
		ACRA.setConfig(acr_config);

		// CrashReport.initCrashReport(getApplicationContext(), "900029446",
		// false);

	}

	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);
		// initACRA();
	}

	public void clearConfig() {
		appConf = new AppConf();
		featureConf = new FeatureConf();
		initParams();
	}

	/**
	 * @Title: setConfValue
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月6日 下午4:23:16
	 * @param response_info
	 *            值json封装
	 * @param params
	 *            要设置值的参数列表
	 */
	public void setConfValue(JSONObject response_info, String[] params) {
		setConfValue(response_info, appConf.getClass(), params);
		setConfValue(response_info, featureConf.getClass(), params);

	}

	/**
	 * @Title: setConfValue
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月6日 下午4:23:16
	 * @param response_info
	 *            值json封装
	 * @param confCls
	 *            目的配置文件
	 * @param params
	 *            要设置值的参数列表
	 */
	public void setConfValue(JSONObject response_info, Class confCls,
			String[] params) {
		// Field[] Fields = confCls.getFields();
		if (confCls == null) {
			return;
		}

		for (String param : params) {
			Field field = null;
			try {
				field = confCls.getDeclaredField(param);
				if (field == null) {

				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				try {
					field = confCls.getDeclaredField("current_" + param);
				} catch (Exception e1) {
					e1.printStackTrace();

					try {
						field = confCls.getDeclaredField("current_patient_"
								+ param);
					} catch (Exception e2) {
						e2.printStackTrace();
					}

				}
			} finally {
				try {
					if (field != null && response_info.get(param) != null) {
						Object clsObj = null;
						if (confCls == AppConf.class) {
							clsObj = (AppConf) appConf;
						} else if (confCls == FeatureConf.class) {
							clsObj = (FeatureConf) featureConf;
						}
						if (field.getType() == String.class) {
							field.set(clsObj, response_info.get(param)
									.toString());
						} else if (field.getType() == Integer.TYPE) {
							field.set(clsObj, Integer.parseInt(response_info
									.get(param).toString()));
						}
					}
				} catch (Exception e2) {
					e2.printStackTrace();
				}
			}
		}
	}

	public void setConfValue(ControlTemplate controlTemplate) {
		setConfValue(controlTemplate, appConf.getClass());
		setConfValue(controlTemplate, featureConf.getClass());
	}

	public void setConfValue(ControlTemplate controlTemplate, Class confCls) {
		if (controlTemplate == null && confCls == null) {
			return;
		}

		Field field = null;

		try {
			field = confCls.getDeclaredField(controlTemplate.getControlName());

			if (field == null) {
				return;
			}
			Object clsObj = null;
			if (confCls == AppConf.class) {
				clsObj = (AppConf) appConf;
			} else if (confCls == FeatureConf.class) {
				clsObj = (FeatureConf) featureConf;
			}

			if (controlTemplate.getControlType().equals("boolean")) {
				field.set(clsObj, !(boolean) controlTemplate.getControlValue()
						.equals("0"));

			} else if (controlTemplate.getControlType().equals("String")) {
				field.set(clsObj, (String) controlTemplate.getControlValue()
						.toString());
			} else if (controlTemplate.getControlType().equals("long")) {
				field.set(clsObj, Long.parseLong(controlTemplate
						.getControlValue().toString()));
			} else if (controlTemplate.getControlType().equals("StringArray")) {

				field.set(clsObj, (Object) controlTemplate.getControlValue()
						.toString().split("\\|"));
			} else if (controlTemplate.getControlType().equals("int")) {
				field.set(clsObj,
						Integer.parseInt(controlTemplate.getControlValue()));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * @Title: resetControlTemplate
	 * @Description: 根据后台传递的参数重置开关值
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月6日 下午4:22:05
	 * @param cList
	 */
	public void resetControlTemplate(List<ControlTemplate> cList) {

		for (ControlTemplate controlTemplate : cList) {

			setConfValue(controlTemplate);
		}
	}

	public void resetServerIP(String ip, String port) {
		if (ip == null || port == null) {
			return;
		}
		this.appConf.server_ip = ip;
		this.appConf.server_port = port;
		this.appConf.server_url = "http://" + this.appConf.server_ip + ":"
				+ this.appConf.server_port + "/tiantan_emr/";
		this.appConf.remote_app_url = "http://" + this.appConf.server_ip + ":"
				+ this.appConf.server_port + "/tiantan_emr_mobile_v4/";
		this.appConf.xiaobianque_url = "http://" + this.appConf.server_ip
				+ "/xiaobianque/wapXiaobianque/index.html";
	}

	/**
	 * @Title: qingkongApplication
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月6日 下午5:28:04
	 */
	public void qingkongApplication() {
		appConf.current_user_number = "";
		appConf.current_user_name = "";
		appConf.current_user_department = "";
		appConf.current_user_department_position = "";
		appConf.current_patient_id = "";
		appConf.current_patient_zhuyuan_id = "";
		appConf.current_patient_zhuyuan_bingqu = "";
		appConf.current_patient_bingchuang_hao = "";
		appConf.current_patient_xingming = "";
		appConf.current_patient_xingbie = "";
		appConf.current_patient_nianling = "";
		appConf.current_patient_huli_jibie = "";
		appConf.current_patient_zhenduan = "";
	}

	/**
	 * 获取本机串号
	 * 
	 * @return
	 */
	public String getDeviceID() {
		TelephonyManager tm = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
		String deviceId = tm.getDeviceId();
		return deviceId;
	}

	// 获取本机IP地址
	public String getLocalIpAddress() {
		try {
			for (Enumeration<NetworkInterface> en = NetworkInterface
					.getNetworkInterfaces(); en.hasMoreElements();) {
				NetworkInterface intf = en.nextElement();
				for (Enumeration<InetAddress> enumIpAddr = intf
						.getInetAddresses(); enumIpAddr.hasMoreElements();) {
					InetAddress inetAddress = enumIpAddr.nextElement();
					if (!inetAddress.isLoopbackAddress()
							&& !inetAddress.isLinkLocalAddress()) {
						return inetAddress.getHostAddress().toString();
					}
				}
			}
		} catch (SocketException ex) {
			Log.e("WifiPreference IpAddress", ex.toString());
		}

		return "";
	}

	/**
	 * 获取当前软件的版本号
	 * 
	 * @return
	 */
	public String getPackageVersion() {
		String version = "";
		PackageManager manager = this.getPackageManager();
		PackageInfo info = null;
		try {
			info = manager.getPackageInfo(this.getPackageName(), 0);
		} catch (NameNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		version = "V" + info.versionName;
		return version;

	}

	/**
	 * @Title: jsEnable
	 * @Description: 判断某个功能模块webview是否开启javascript
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年6月20日 下午4:37:45
	 * @param mokuai
	 * @return
	 */
	public boolean jsEnable(String mokuai) {
		boolean flag = false;
		for (String string : appConf.js_enable) {
			if (string.equals(mokuai)) {
				flag = true;
				break;
			}
		}
		return flag;

	}

	/**
	 * @Title: getRdpInitEvent
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年6月23日 上午9:28:59
	 * @param rdpEvents
	 * @return
	 */
	public List<RdpEvent> getRdpInitEvent(String[] rdpEvents) {
		List<RdpEvent> rdpEventList = new ArrayList<RdpEvent>();
		for (String rdpEventString : rdpEvents) {
			String[] params = rdpEventString.split("#");
			if (params == null || params.length != 3) {
				break;
			}
			RdpEvent rdpEvent = new RdpEvent();
			rdpEvent.setEventType(params[0]);
			rdpEvent.setxPos(Integer.parseInt(params[1]));
			rdpEvent.setyPos(Integer.parseInt(params[2]));
			rdpEventList.add(rdpEvent);

		}

		return rdpEventList;
	}

	public List<Map<String, Object>> getRdpInitMacroCommand(String[] rdpEvents,String type) {
		List<Map<String, Object>> rdpMacroCommandList = new ArrayList<Map<String, Object>>();
		for (String rdpEventString : rdpEvents) {
			// 替换user为用户名
			if (rdpEventString.contains("user")) {
				if(type.equals("his"))
				{
					rdpEventString = rdpEventString.replace("user",appConf.current_his_user_name);
				}
				else if(type.equals("emr"))
				{
					rdpEventString = rdpEventString.replace("user",appConf.current_emr_user_name);
				}
				else if(type.equals("pacs"))
				{
					rdpEventString = rdpEventString.replace("user",appConf.current_pacs_user_name);
				}
				else
				{
					rdpEventString = rdpEventString.replace("user",appConf.current_user_number);
				}
				
			}

			if (rdpEventString.contains("password")) {
				if(type.equals("his"))
				{
					rdpEventString = rdpEventString.replace("password",appConf.current_his_user_password);
				}
				else if(type.equals("emr"))
				{
					rdpEventString = rdpEventString.replace("password",appConf.current_emr_user_password);
				}
				else if(type.equals("pacs"))
				{
					rdpEventString = rdpEventString.replace("password",appConf.current_pacs_user_password);
				}
				else
				{
					rdpEventString = rdpEventString.replace("password",appConf.current_user_password);
				}
			}

			String[] params = rdpEventString.split("#");
			if (params == null || params.length < 3) {
				break;
			}
			// RdpEvent rdpEvent = new RdpEvent();
			// rdpEvent.setEventType(params[0]);
			// rdpEvent.setxPos(Integer.parseInt(params[1]));
			// rdpEvent.setyPos(Integer.parseInt(params[2]));
			// rdpEventList.add(rdpEvent);
			HashMap<String, Object> macroCommand = new HashMap<String, Object>();
			for (String param : params) {
				try {
					macroCommand.put(param.split("@")[0], param.split("@")[1]);

				} catch (Exception e) {
					e.printStackTrace();
					break;
				}

			}
			rdpMacroCommandList.add(macroCommand);

		}

		return rdpMacroCommandList;
	}

	//应用集成用到的变量以及方法
	private static Map<Integer, SessionState> sessionMap;

	public static boolean ConnectedTo3G = false;

	public static boolean pref_ui_askonexit = true;
	public static boolean pref_ui_hidestatusbar = false;
	public static boolean pref_ui_invertscrolling = false;
	public static boolean pref_ui_swapmousebuttons = false;
	public static boolean pref_ui_hidezoomcontrols = true;
	public static boolean pref_ui_autoscrolltouchpointer = true;
	public static int pref_power_disconnecttimeout = 5;
	public static boolean pref_security_acceptallcertificates = true;

	// event notification defines
	public static final String EVENT_TYPE = "EVENT_TYPE";
	public static final String EVENT_PARAM = "EVENT_PARAM";
	public static final String EVENT_STATUS = "EVENT_STATUS";
	public static final String EVENT_ERROR = "EVENT_ERROR";

	public static final String ACTION_EVENT_FREERDP = "com.freerdp.freerdp.event.freerdp";

	public static final int FREERDP_EVENT_CONNECTION_SUCCESS = 1;
	public static final int FREERDP_EVENT_CONNECTION_FAILURE = 2;
	public static final int FREERDP_EVENT_DISCONNECTED = 3;

	// timer for disconnecting sessions after the screen was turned off
	private static Timer disconnectTimer = null;

	// TimerTask for disconnecting sessions after screen was turned off
	private static class DisconnectTask extends TimerTask {
		@Override
		public void run() {
			Collection<SessionState> sessions = GlobalInfoApplication
					.getSessions();
			for (SessionState session : sessions) {
				LibFreeRDP.disconnect(session.getInstance());
			}
		}
	}

	static private void load() {
		final String libname = "freerdp-android";
		final String LD_PATH = System.getProperty("java.library.path");

		try {
			System.loadLibrary(libname);
		} catch (UnsatisfiedLinkError e) {
			Log.e("LibFreeRDP", e.toString());
		}
	}

	// Disconnect handling for Screen on/off events
	static public void startDisconnectTimer() {
		int timeoutMinutes = pref_power_disconnecttimeout;
		if (timeoutMinutes > 0) {
			disconnectTimer = new Timer();
			disconnectTimer.schedule(new DisconnectTask(),
					timeoutMinutes * 60 * 1000);
		}
	}

	static public void cancelDisconnectTimer() {
		// cancel any pending timer events
		if (disconnectTimer != null) {
			disconnectTimer.cancel();
			disconnectTimer.purge();
			disconnectTimer = null;
		}
	}

	// RDP session handling
	static public SessionState createSession(BookmarkBase bookmark) {
		SessionState session = new SessionState(LibFreeRDP.newInstance(),
				bookmark);
		sessionMap.put(Integer.valueOf(session.getInstance()), session);
		return session;
	}

	static public SessionState getSession(int instance) {
		return sessionMap.get(instance);
	}

	static public Collection<SessionState> getSessions() {
		// return a copy of the session items
		return new ArrayList<SessionState>(sessionMap.values());
	}

	static public void freeSession(int instance) {
		if (GlobalInfoApplication.sessionMap.containsKey(instance)) {
			GlobalInfoApplication.sessionMap.remove(instance);
			LibFreeRDP.freeInstance(instance);
		}
	}

	// helper to send FreeRDP notifications
	private void sendRDPNotification(int type, int param) {
		// send broadcast
		Intent intent = new Intent(ACTION_EVENT_FREERDP);
		intent.putExtra(EVENT_TYPE, type);
		intent.putExtra(EVENT_PARAM, param);
		Context context = GlobalInfoApplication.getInstance()
				.getApplicationContext();

		context.sendBroadcast(intent);
	}

	// //////////////////////////////////////////////////////////////////////
	// Implementation of LibFreeRDP.EventListener
	public void OnConnectionSuccess(int instance) {
		Log.v("LibFreeRDP", "OnConnectionSuccess");
		sendRDPNotification(FREERDP_EVENT_CONNECTION_SUCCESS, instance);
	}

	public void OnConnectionFailure(int instance) {
		Log.v("LibFreeRDP", "OnConnectionFailure");

		// free session
		GlobalInfoApplication.freeSession(instance);
		sendRDPNotification(FREERDP_EVENT_CONNECTION_FAILURE, instance);
	}

	public void OnDisconnecting(int instance) {
		Log.v("LibFreeRDP", "OnDisconnecting");

		// send disconnect notification
		sendRDPNotification(FREERDP_EVENT_DISCONNECTED, instance);
	}

	public void OnDisconnected(int instance) {
		Log.v("LibFreeRDP", "OnDisconnected");

		// free session
		GlobalInfoApplication.freeSession(instance);
	}
}
