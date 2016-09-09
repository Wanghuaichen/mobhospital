package com.tiantanhehe.yidongchafang.views.activities;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.capipad.system.CapipadInterfaceManager;
import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.ControlTemplate;
import com.tiantanhehe.yidongchafang.common.SessionHelper;
import com.tiantanhehe.yidongchafang.common.appupdate.AppUpdate;
import com.tiantanhehe.yidongchafang.drivers.scandriver.KeyMapperCode;
import com.tiantanhehe.yidongchafang.services.DataFinishListener;
import com.tiantanhehe.yidongchafang.services.DataTongbuService;
import com.tiantanhehe.yidongchafang.services.MonitorService;
import com.tiantanhehe.yidongchafang.services.ServerCommunicationTask;
import com.tiantanhehe.yidongchafang.utils.SharedPreferencesUtils;
import com.tiantanhehe.yidongchafang.views.activities.tools.ChangIPActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnLongClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

/**************************************************
 * Created: 2015-03 Info:登录页面
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class LoginActivity extends YiDongYiHuActivity {
	private EditText user_number;
	private EditText login_password;
	private TextView system_login_info;
	// private TextView system_login_info;
	private Button login_button;
	private long exitTime = 0;
	HashMap<String, String> mHashMap;
	String versionname; // 版本号
	AppUpdate appUpdate;
	// 版本不一致,需要更新
	protected static final int UPDATA_VERSION = 1;
	// 版本相同
	protected static final int NOUPDATE = 0;
	String consistentVersion = "";// 版本一致
	/**
	 * 护士科室选择
	 */
	private PopupWindow departmentPopupWindow = null;
	/**
	 * 护士科室View
	 */
	private View departmentView = null;
	private JSONObject responseinfo = null;
	Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			// TODO Auto-generated method stub
			super.handleMessage(msg);
			switch (msg.what) {
			case UPDATA_VERSION:
				// 版本不一致
				consistentVersion = "否";

				break;
			case NOUPDATE:
				// 版本一致
				consistentVersion = "是";

				break;

			}
		}
	};

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// orientationInit();
		dataInit(); // 数据初始化

		viewInit(); // 界面相关初始化

		if (current_application.appConf.isUpdate == 1) {
			checkUpdate();// 检查是否有需要更新的程序
		}

		// doTest(); // 开发阶段进行相关测试
	}

	/**
	 * @Title: doTest
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月8日 上午9:19:33
	 */
	private void doTest() {
		user_number.setText("y01");
		login_password.setText("123");
		// checkUserLogin();
	}

	/**
	 * @Title: checkUpdate
	 * @Description: 检查app更新
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月5日 下午8:05:07
	 */
	private void checkUpdate() {
		appUpdate = new AppUpdate(LoginActivity.this);
		appUpdate.checkUpdataApp();
		// 获取当前版本号
		try {
			versionname = appUpdate.getVersionName();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		new Thread(new AppUpdateThread()).start();

	}

	private void viewInit() {

		setContentView(R.layout.activity_login);
		super.tiaoZhuangActivity = LoginActivity.class;
		
		user_number = (EditText) this.findViewById(R.id.username_edit);
		login_password = (EditText) this.findViewById(R.id.userpassword_edit);
		login_button = (Button) this.findViewById(R.id.login_button);

		login_button.setOnClickListener(new Button.OnClickListener() {
			@Override
			public void onClick(View v) {
				if (user_number.getText().toString().equals("")) {
					Toast.makeText(LoginActivity.this, getString(R.string.shuru_yonghuming), Toast.LENGTH_SHORT).show();
					return;
				} else if (login_password.getText().toString().equals("")) {
					Toast.makeText(LoginActivity.this, getString(R.string.shuru_mima), Toast.LENGTH_SHORT).show();
					return;
				}
				checkUserLogin();

			}
		});
		// 设置长按监听，实现跳转修改IP页面
		system_login_info = (TextView) this.findViewById(R.id.system_login_info);
		system_login_info.setText(getString(R.string.xitong_banbenhao) + current_application.appConf.version);
		system_login_info.setOnLongClickListener(new OnLongClickListener() {

			@Override
			public boolean onLongClick(View v) {
				Intent intent = new Intent(LoginActivity.this, ChangIPActivity.class);
				startActivity(intent);
				return false;
			}
		});
		// RelativeLayout loginLayout = (RelativeLayout) this
		// .findViewById(R.id.layout);
		// loginLayout.setOnClickListener(new OnClickListener() {
		//
		// @Override
		// public void onClick(View v) {
		// appUpdate.checkUpdataApp();
		//
		// }
		// });
		String userName = null;
		String password = null;
		Intent intent = getIntent();
		try {
			userName = intent.getStringExtra("user_number");  
			password = intent.getStringExtra("user_password");
			if(!userName.equals(null))
			{
				user_number.setText(userName);
				login_password.setText(password);
				login_button.performClick();
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		
	}

	private void dataInit() {

		clearInfo();

		// 获取设备信息
		current_application.appConf.version = GlobalInfoApplication.getInstance().getPackageVersion();
		current_application.appConf.device_id = GlobalInfoApplication.getInstance().getDeviceID();

	}

	/**
	 * @Title: getIp_port
	 * @Description: TODO
	 * @author: Hu Ri Chang <tianran@tiantanhehe.com>
	 * @date: 2016-3-6 下午6:53:34
	 */
	private void getIpAndPort() {
		// 从Shared 里面获取已更改的IP和port值
		Object param_ip = SharedPreferencesUtils.getParam(this, "ip", "");
		Object param_port = SharedPreferencesUtils.getParam(this, "port", "").toString();
		// 判断Shared 所存储的值是否为空，为空则使用原来的IP和port，不空则将原来的IP与port替换掉
		if (!(param_ip.equals("") && param_port.equals(""))) {
			current_application.appConf.server_ip = param_ip.toString();
			current_application.appConf.server_port = param_port.toString();
			current_application.appConf.server_url = "http://" + current_application.appConf.server_ip + ":"
					+ current_application.appConf.server_port + "/tiantan_emr/";
			current_application.appConf.remote_app_url = "http://" + current_application.appConf.server_ip + ":"
					+ current_application.appConf.server_port + "/tiantan_emr_mobile_v4/";
		}
	}

	@SuppressWarnings("unchecked")
	private void checkUserLogin() {

		ServerCommunicationTask asyncTask = new ServerCommunicationTask(LoginActivity.this, current_application);

		ArrayList<NameValuePair> request_info = new ArrayList<NameValuePair>();
		// 为了兼容老版本的移动护理
		// request_info.add(new BasicNameValuePair("request_url",
		// AppConf.server_url +
		// "Mobile/YidongChafangClientCommunication/checkLoginChafang/"));
		request_info.add(new BasicNameValuePair("request_url",
				current_application.appConf.server_url + "Mobile/YidongChafangClientCommunication/checkLogin/"));
		request_info.add(new BasicNameValuePair("user_number", user_number.getText().toString()));
		request_info.add(new BasicNameValuePair("login_password", login_password.getText().toString()));
		request_info.add(new BasicNameValuePair("shebei_id", getDeviceID()));
		request_info.add(new BasicNameValuePair("consistentVersion", consistentVersion));
		if (current_application.appConf.http_data_compression_flag) {
			request_info.add(new BasicNameValuePair("compression_http_data", "on"));
		}
		asyncTask.setFinishListener(new DataFinishListener() {
			@Override
			public void dataFinishSuccessfully(JSONObject response_info) {

				try {
					if (response_info.get("response_state").toString().equals("true")) {

						if ((response_info.get("user_suoshu_department").toString().split("\\,")).length > 1) {
							responseinfo = response_info;
							swichDepartment(response_info.get("user_suoshu_department").toString());
						} else {
							current_application.appConf.current_user_password = login_password.getText().toString();
							sucessLogin(response_info);
						}
						current_application.appConf.showinfo = response_info.getString("showinfo").toString()
								.split("\\|");
						current_application.appConf.denglubiaozhi = true;
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		});
		asyncTask.execute(request_info);
	}

	@Override
	public void sucessScanBarbode(String barcode) {
		// 通过判断==0确保类型识别码是在第一位，确认为护士胸牌
		// if (barcode.indexOf(this.current_application.user_bar_code_title) ==
		// 0) {
		// String user_number_str = barcode.substring(2);
		// this.user_number.setText(user_number_str);
		// this.login_password.setText("tiantan_bar_code_password");
		// checkUserLogin();
		// } else {
		// playMedia(PLAYER_ERROR);
		// Toast tip_message = Toast.makeText(getApplicationContext(),
		// getString(R.string.saomiao_erweima_kuaijiedenglu),
		// Toast.LENGTH_LONG);
		// tip_message.setGravity(Gravity.CENTER, 0, 0);
		// tip_message.show();
		// }
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		// 停止网络质量监测服务，暂时隐藏
		// stopService(start_network_monitor_service_intent);
	}

	// @Override
	// public boolean onKeyDown(int keyCode, KeyEvent event) {
	// if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
	// if (event.getAction() == KeyEvent.ACTION_DOWN

	// && event.getRepeatCount() == 0) {
	// this.exitApp();
	// }
	// return true;
	// }
	// return super.onKeyDown(keyCode, event);
	// }

	@Override
	public boolean dispatchKeyEvent(KeyEvent event) {
		if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
			if (event.getAction() == KeyEvent.ACTION_DOWN && event.getRepeatCount() == 0) {
				this.exitApp();
			}
		} else if (event.getKeyCode() == KeyEvent.KEYCODE_MENU) {
			if (event.getAction() == KeyEvent.ACTION_DOWN && event.getRepeatCount() == 0) {
				return true;
			}
		} else {
			return super.dispatchKeyEvent(event);
		}
		return true;
	}

	@Override
	public boolean onKeyUp(int keyCode, KeyEvent event) {
		boolean return_flag = false;
		int mapCode = scanner.getKeyCode(event);
		switch (mapCode) {
		case KeyMapperCode.DEVICE_KEY_F2: {
			if (user_number.isFocused()) {
				login_password.requestFocus();
			} else {
				user_number.requestFocus();
			}
			return_flag = true;
			break;
		}
		case KeyMapperCode.DEVICE_KEY_SAVE: {
			login_button.performClick();
			return_flag = true;
			break;
		}
		case KeyMapperCode.DEVICE_KEY_MENU: {
			return_flag = true;
			break;
		}

		}
		if (return_flag) {
			return true;
		} else {
			return super.onKeyUp(keyCode, event);
		}

	}

	private void exitApp() {
		if ((System.currentTimeMillis() - exitTime) > 2000) {
			Toast.makeText(this, getString(R.string.tuichu_chengxu), Toast.LENGTH_SHORT).show();
			exitTime = System.currentTimeMillis();
		} else {
			for (int i = 0; i < activityNumber.activityList().size(); i++) {
				if (null != activityNumber.activityList().get(i)) {
					activityNumber.activityList().get(i).finish();
				}
			}

			// 退出程序停止相关服务
			Intent serviceIntent = new Intent(this, DataTongbuService.class);
			try {
				stopService(serviceIntent);
			} catch (Exception e) {
				e.printStackTrace();
			}

			serviceIntent = new Intent(this, MonitorService.class);
			try {
				stopService(serviceIntent);
			} catch (Exception e) {
				e.printStackTrace();
			}

			CapipadInterfaceManager cm = new CapipadInterfaceManager(context);
			cm.setHomekeyandStatusbarState(true);

			finish();

			Intent intent = new Intent(Intent.ACTION_MAIN);
			intent.addCategory(Intent.CATEGORY_HOME);
			// intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
			startActivity(intent);
			Handler handler = new Handler();
			handler.postDelayed(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					System.exit(0);
				}
			}, 20);
			System.exit(0);
		}
	}

	// 获取本机串号
	public String getDeviceID() {
		TelephonyManager tm = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
		String deviceId = tm.getDeviceId();
		return deviceId;
	}

	/**
	 * 登陆成功
	 * 
	 * @Title: sucessLogin
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-13 上午11:08:32
	 * @param response_info
	 * @throws JSONException
	 */
	private void sucessLogin(JSONObject response_info) throws JSONException {

		SharedPreferences sharedPreferences = getSharedPreferences("bingqu", MODE_PRIVATE);
		String bingqu = sharedPreferences.getString("bingqu", "");

		// 设置用户基本信息
		String[] basicParams = { "user_number", "user_name", "user_department", "user_department_position",
				"user_group", "user_department_id", "user_logintimes", "hospital_name" };

		current_application.setConfValue(response_info, basicParams);

		String[] suoshuParams = { "user_suoshu_department", "user_suoshu_number", "user_suoshu_number",
				"user_suoshu_department_position", "user_suoshu_group" };

		// 设置用户所属信息
		current_application.setConfValue(response_info, suoshuParams);
		
		current_application.appConf.current_his_user_name = response_info.get("his_user_number").toString();
		current_application.appConf.current_his_user_password = response_info.get("his_login_password").toString();
		current_application.appConf.current_emr_user_name = response_info.get("emr_user_number").toString();
		current_application.appConf.current_emr_user_password = response_info.get("emr_login_password").toString();
		current_application.appConf.current_pacs_user_name = response_info.get("pacs_user_number").toString();
		current_application.appConf.current_pacs_user_password = response_info.get("pacs_login_password").toString();
		
		if (!response_info.get("user_department").toString().equals(bingqu)) {
			Editor edit = sharedPreferences.edit();
			edit.putString("bingqu", response_info.get("user_department").toString());
			edit.commit();
			current_application.data_manager.qingkongChuangjian();
			current_application.data_manager.syncDataWithServerLogin(LoginActivity.this);
		} else {
			current_application.data_manager.qingkongChuangjian();
			current_application.data_manager.syncDataWithServerLogin(LoginActivity.this);
		}
		// 更改当前的权限设定
		current_application.resetControlTemplate(new ControlTemplate()
				.getControlTemplateList(response_info.get("control_template_result_json").toString()));

		// 设置相关标识
		HttpClient httpClient = new DefaultHttpClient();
		SessionHelper.getInstance(context).getCookie(httpClient,
				current_application.appConf.server_url + "System/showLoginPad");
		SessionHelper.getInstance(context).setSession(httpClient,
				current_application.appConf.server_url + "System/checkLogin");

		// 设置desktop相关标识
		httpClient = new DefaultHttpClient();
		SessionHelper.getInstance(context).getCookie(httpClient,
				current_application.appConf.server_url + "System/showLogin", "desktop");
		SessionHelper.getInstance(context).setSession(httpClient,
				current_application.appConf.server_url + "System/checkLogin", "desktop");

	}

	/**
	 * 选择科室
	 * 
	 * @Title: swichDepartment
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-13 上午10:36:37
	 * @param pDepartments
	 */
	private void swichDepartment(String user_suoshu_department) {

		if (departmentPopupWindow == null) {
			createDepartmentView(user_suoshu_department.split("\\,"));
			createDepartmentPopwindow();
		}
		showDepartmentPopwindow();
	}

	/**
	 * 选择科室后登陆
	 * 
	 * @Title: afterSwichDepartment
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-13 上午10:59:56
	 * @param department
	 */
	private void afterSwichDepartment(String department) {

		try {

			String[] checkKeshi = department.split("\\|");

			SharedPreferences sharedPreferences = getSharedPreferences("bingqu", MODE_PRIVATE);
			String bingqu = sharedPreferences.getString("bingqu", "");

			current_application.appConf.current_user_department = checkKeshi[0];
			if (checkKeshi.length > 1) {
				current_application.appConf.current_user_department_id = checkKeshi[1];
			} else {
				current_application.appConf.current_user_department_id = "";
			}

			// 设置全部所属信息
			String[] Attar_user_suoshu_department = responseinfo.get("user_suoshu_department").toString().split("\\,");
			String[] Attar_user_suoshu_number = responseinfo.get("user_suoshu_number").toString().split("\\,");
			String[] Attar_user_suoshu_name = responseinfo.get("user_suoshu_name").toString().split("\\,");
			String[] Attar_user_suoshu_department_position = responseinfo.get("user_suoshu_department_position")
					.toString().split("\\,");
			String[] Attar_user_suoshu_group = responseinfo.get("user_suoshu_group").toString().split("\\,");

			String tempSuoshuKeshi = "";
			String tempSuoshunumber = "";
			String tempSuoshuname = "";
			String tempSuoshudepartment_position = "";
			String tempSuoshugroup = "";

			for (int i = 0; i < Attar_user_suoshu_department.length; i++) {
				String[] tempKeshi = Attar_user_suoshu_department[i].split("\\|");
				if (!tempKeshi[0].equals(checkKeshi[0])) {

					if (Attar_user_suoshu_department != null && Attar_user_suoshu_department.length > i) {
						tempSuoshuKeshi += Attar_user_suoshu_department[i] + ",";
					} else {
						tempSuoshuKeshi += "" + ",";
					}

					if (Attar_user_suoshu_number != null && Attar_user_suoshu_number.length > i) {
						tempSuoshunumber += Attar_user_suoshu_number[i] + ",";
					} else {
						tempSuoshunumber += "" + ",";
					}

					if (Attar_user_suoshu_name != null && Attar_user_suoshu_name.length > i) {
						tempSuoshuname += Attar_user_suoshu_name[i] + ",";
					} else {
						tempSuoshuname += "" + ",";
					}

					if (Attar_user_suoshu_department_position != null
							&& Attar_user_suoshu_department_position.length > i) {
						tempSuoshudepartment_position += Attar_user_suoshu_department_position[i] + ",";
					} else {
						tempSuoshudepartment_position += "" + ",";
					}

					if (Attar_user_suoshu_group != null && Attar_user_suoshu_group.length > i) {
						tempSuoshugroup += Attar_user_suoshu_group[i] + ",";
					} else {
						tempSuoshugroup += "" + ",";
					}

				} else {

					if (Attar_user_suoshu_number != null && Attar_user_suoshu_number.length > i) {
						current_application.appConf.current_user_number = Attar_user_suoshu_number[i];
					} else {
						current_application.appConf.current_user_number = "";
					}

					if (Attar_user_suoshu_name != null && Attar_user_suoshu_name.length > i) {
						current_application.appConf.current_user_name = Attar_user_suoshu_name[i];
					} else {
						current_application.appConf.current_user_name = "";
					}

					if (Attar_user_suoshu_department_position != null
							&& Attar_user_suoshu_department_position.length > i) {
						current_application.appConf.current_user_department_position = Attar_user_suoshu_department_position[i];
					} else {
						current_application.appConf.current_user_department_position = "";
					}

					if (Attar_user_suoshu_group != null && Attar_user_suoshu_group.length > i) {
						current_application.appConf.current_user_group = Attar_user_suoshu_group[i];
					} else {
						current_application.appConf.current_user_group = "";
					}
				}
			}

			current_application.appConf.current_user_suoshu_department = department + "," + tempSuoshuKeshi;
			current_application.appConf.current_user_suoshu_number = current_application.appConf.current_user_number
					+ ","
					+ tempSuoshunumber;
			current_application.appConf.current_user_suoshu_name = current_application.appConf.current_user_name + ","
					+ tempSuoshuname;
			current_application.appConf.current_user_suoshu_department_position = current_application.appConf.current_user_department_position
					+ "," + tempSuoshudepartment_position;
			current_application.appConf.current_user_suoshu_group = current_application.appConf.current_user_group + ","
					+ tempSuoshugroup;

			current_application.appConf.current_user_logintimes = Integer
					.parseInt(responseinfo.get("user_logintimes").toString());
			current_application.appConf.hospital_name = responseinfo.get("hospital_name").toString();
			if (!checkKeshi[0].toString().equals(bingqu)) {
				Editor edit = sharedPreferences.edit();
				edit.putString("bingqu", checkKeshi[0]);
				edit.commit();
				current_application.data_manager.qingkongChuangjian();
				current_application.data_manager.syncDataWithServerLogin(LoginActivity.this);
			} else {
				// 先优先上传一次上次可能由于崩溃造成的数据未上传完整：
				// if (current_application.appConf.yizhuVersion.equals("v415"))
				// {
				// current_application.data_manager.yizhuDataUploadv415(current_application.server_url
				// +
				// "Mobile/YidongChafangClientCommunication/yizhuDataUploadv415/");
				// } else {
				// current_application.data_manager.yizhuDataUpload(current_application.server_url
				// +
				// "Mobile/YidongChafangClientCommunication/yizhuDataUpload/");
				// current_application.data_manager.yizhuHistoryDataUpload(current_application.server_url
				// +
				// "Mobile/YidongChafangClientCommunication/yizhuHistoryDataUpload/");
				// }
				//
				// current_application.data_manager.biaobenDataUpload(
				// current_application.server_url +
				// "Mobile/YidongChafangClientCommunication/biaobenDataUpload/");
				// current_application.data_manager.tizhengDataUpload(
				// current_application.server_url +
				// "Mobile/YidongChafangClientCommunication/tizhengDataUpload/");
				// current_application.data_manager.xunchaDataUpload(
				// current_application.server_url +
				// "Mobile/YidongChafangClientCommunication/xunchaDataUpload/");
				// current_application.data_manager.hulitongjiDataUpload(current_application.server_url
				// +
				// "Mobile/YidongChafangClientCommunication/hulitongjiDataUpload/");
				//
				// current_application.data_manager.qingkongChuangjian();
				// current_application.data_manager.syncDataWithServerLogin(LoginActivity.this);
			}
			// 更改当前的权限设定
			current_application.resetControlTemplate(new ControlTemplate()
					.getControlTemplateList(responseinfo.get("control_template_result_json").toString()));

		} catch (Exception e) {
			// TODO: handle exception
		}

	}

	/**
	 * 显示窗口
	 * 
	 * @Title: showDepartmentPopwindow
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-13 上午10:36:52
	 */
	private void showDepartmentPopwindow() {

		if (departmentPopupWindow.isShowing()) {
			departmentPopupWindow.dismiss();
		} else {
			departmentPopupWindow.showAtLocation(getWindow().getDecorView(), Gravity.CENTER, 0, 0);
		}
	}

	/**
	 * 创建科室view
	 * 
	 * @Title: createDepartmentView
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-13 上午10:37:09
	 * @param pDepartments
	 */
	private void createDepartmentView(String[] pDepartments) {

		departmentView = LayoutInflater.from(this).inflate(R.layout.pop_department, null);
		GridView gridView = (GridView) departmentView.findViewById(R.id.list_view);

		DepartmentAdapter departmentAdapter = new DepartmentAdapter(this, pDepartments);
		gridView.setAdapter(departmentAdapter);
	}

	/**
	 * 创建科室Window
	 * 
	 * @Title: createDepartmentPopwindow
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-13 上午10:38:01
	 */
	private void createDepartmentPopwindow() {

		departmentPopupWindow = new PopupWindow(departmentView, android.view.ViewGroup.LayoutParams.MATCH_PARENT,
				android.view.ViewGroup.LayoutParams.MATCH_PARENT);
		departmentPopupWindow
				.setBackgroundDrawable(new ColorDrawable(getResources().getColor(android.R.color.transparent)));
		departmentPopupWindow.setOutsideTouchable(false);
		departmentPopupWindow.setFocusable(true);
	}

	/**
	 * 科室适配器
	 * 
	 * @ClassName: DepartmentAdapter
	 * @Description: TODO
	 * @author Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date 2016-1-13 上午10:07:01
	 * 
	 */
	class DepartmentAdapter extends BaseAdapter {

		private Context mContext;
		private String[] mDepartments;

		public DepartmentAdapter(Context pContext, String[] pDepartments) {
			mContext = pContext;
			mDepartments = pDepartments;
		}

		@Override
		public int getCount() {
			// TODO Auto-generated method stub
			return mDepartments.length;
		}

		@Override
		public Object getItem(int arg0) {
			// TODO Auto-generated method stub
			return mDepartments[arg0];
		}

		@Override
		public long getItemId(int arg0) {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public View getView(final int position, View arg1, ViewGroup arg2) {

			View view = LayoutInflater.from(mContext).inflate(R.layout.adapter_department, null);

			TextView textView = (TextView) view.findViewById(R.id.tv_department);

			String[] tempKeshi = mDepartments[position].split("\\|");

			try {
			textView.setText(tempKeshi[0]);
			} catch (Exception e) {
				e.printStackTrace();
			}

			textView.setOnClickListener(new OnClickListener() {
				public void onClick(View arg0) {
					afterSwichDepartment(mDepartments[position]);
				}
			});

			return view;
		}
	}

	// 解析XML文件
	public HashMap<String, String> parseXml(InputStream inStream) throws Exception {
		HashMap<String, String> hashMap = new HashMap<String, String>();

		// 实例化一个文档构建器工厂
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		// 通过文档构建器工厂获取一个文档构建器
		DocumentBuilder builder = factory.newDocumentBuilder();
		// 通过文档通过文档构建器构建一个文档实例
		Document document = builder.parse(inStream);
		// 获取XML文件根节点
		Element root = document.getDocumentElement();
		// 获得所有子节点
		NodeList childNodes = root.getChildNodes();
		for (int j = 0; j < childNodes.getLength(); j++) {
			// 遍历子节点
			Node childNode = (Node) childNodes.item(j);
			if (childNode.getNodeType() == Node.ELEMENT_NODE) {
				Element childElement = (Element) childNode;
				// 版本号
				if ("version".equals(childElement.getNodeName())) {
					hashMap.put("version", childElement.getFirstChild().getNodeValue());
				}
				// 软件名称
				else if (("description".equals(childElement.getNodeName()))) {
					hashMap.put("description", childElement.getFirstChild().getNodeValue());
				}
				// 下载地址
				else if (("url".equals(childElement.getNodeName()))) {
					hashMap.put("url", childElement.getFirstChild().getNodeValue());
				}
			}
		}
		return hashMap;
	}

	public class AppUpdateThread implements Runnable {
		@Override
		public void run() {
			try {
				String path = context.getResources().getString(R.string.serverurl); // 从资源文件获取服务器
																					// 地址
				URL url = new URL(current_application.appConf.remote_app_url + path); // 包装成url的对象
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setConnectTimeout(5000);
				InputStream is = conn.getInputStream();
				mHashMap = parseXml(is);
				if (mHashMap.get("version").equals(versionname)) {
					Message msg = new Message();
					msg.what = NOUPDATE;
					handler.sendMessage(msg);
				} else {
					Message msg = new Message();
					msg.what = UPDATA_VERSION;
					handler.sendMessage(msg);
				}
			} catch (Exception e) {

				e.printStackTrace();
			}
		}
	}
}
