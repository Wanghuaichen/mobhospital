package com.tiantanhehe.yidongchafang.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.common.TiantanLog;
import com.tiantanhehe.yidongchafang.common.compression.GlibCompression;
import com.tiantanhehe.yidongchafang.common.compression.ICompression;
import com.tiantanhehe.yidongchafang.dao.db.DatabaseHelper;

import android.annotation.SuppressLint;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.IBinder;
import android.os.PowerManager;
import android.util.Log;

public class DataTongbuService extends Service {
	public GlobalInfoApplication current_application;
	// public SQLiteDatabase db;
	DatabaseHelper db;
	public SimpleDateFormat formatter;
	public Thread sync_data_full;// 全面同步数据线程
	public Thread sync_data_fast;// 快速同步各项动态数据线程
	private PowerManager pm;
	private PowerManager.WakeLock wl;

	private static final int SLEEP_TIME = 50000;
	private static final int SLEEP_QUICK_TIME = 30000;
	private static final int SUOPING_JIANGE = 10000;
	private long last_sys_time;
	private long last_sys_quick_time;
	private long last_heart_beat_time;
	public int number = 1;

	@SuppressLint("SimpleDateFormat")
	@Override
	public void onCreate() {
		last_sys_time = System.currentTimeMillis() - SLEEP_TIME;
		last_sys_quick_time = System.currentTimeMillis() - SLEEP_QUICK_TIME;
		last_heart_beat_time = System.currentTimeMillis();
		current_application = GlobalInfoApplication.getInstance();
		db = DatabaseHelper.getInstance(this, current_application.appConf.database_name);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date curDate = new Date(System.currentTimeMillis());
		// current_application.gengxin_shijian =
		// formatter.format(curDate).toString();
		SharedPreferences sharedPreferences = getSharedPreferences("suoping", MODE_PRIVATE);
		Editor edit = sharedPreferences.edit();
		edit.putString("jiange", formatter.format(curDate).toString());
		edit.commit();

		pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
		wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "Tiantan");
		// 获取wakelock，让系统在锁屏时仍然能够发送心跳
		if (wl != null) {
			wl.acquire();
		}
		try {

			if (sync_data_full == null) {
				sync_data_full = new Thread(new SyncDataFull());
				sync_data_full.start();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		number = 0;
		// db.close();
		if (wl != null) {
			wl.release(); // 释放lock
		}

		super.onDestroy();
	}

	@Override
	public IBinder onBind(Intent arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	private void sysData_quick() {
		Log.d("tiantan", "数据同步sysData_quick开始");
		checkUserLoginState(current_application.appConf.server_url + "Mobile/YidongChafangClientCommunication/getLoginStateInfo/");

		Log.d("tiantan", "数据同步sysData_quick结束");
	}

	private void sysData() {
		Log.d("tiantan", "数据同步开始");
		current_application.data_manager.dataDownload("huanzhe");

		Log.d("tiantan", "数据同步结束");
	}

	@SuppressLint("SimpleDateFormat")
	public class SyncDataFull implements Runnable {
		@Override
		public void run() {
			while (number == 1) {
				long current_time = System.currentTimeMillis();
				// 1.先判断是否需要手动触发一次
				if (current_application.appConf.sync_data_shoudong_chufa) {
					current_application.appConf.sync_data_shoudong_chufa = false;
					if ((current_time - last_sys_time) > SUOPING_JIANGE) {
						TiantanLog.error("手动触发");
						sysData_quick();
						sysData();
						last_sys_time = current_time;
					}
					continue;
				}

				// 快速同步数据
				if ((current_time - last_sys_quick_time) > SLEEP_QUICK_TIME) {
					if (current_application.appConf.sync_data_flag && !current_application.appConf.sysc_data_state) {
						current_application.appConf.sysc_data_state = true;
						sysData_quick();
						current_application.appConf.sysc_data_state = false;
						last_sys_quick_time = current_time;
					}
				}

				// 正常数据同步
				if ((current_time - last_sys_time) > SLEEP_TIME) {
					if (current_application.appConf.sync_data_flag && !current_application.appConf.sysc_data_state) {
						current_application.appConf.sysc_data_state = true;
						sysData();
						current_application.appConf.sysc_data_state = false;
						last_sys_time = current_time;
					}
				}

				if ((current_time - last_heart_beat_time) > (current_application.appConf.heart_beart_period * 1000)) {
					String url = current_application.appConf.server_url + "Mobile/YidongChafangClientCommunication/heartBeat/";
					sendHeartbeat(url);
					last_heart_beat_time = current_time;
				}

				try {
					Thread.sleep(20000); // 线程每隔10秒钟运行一次
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}


	// 发送心跳
	@SuppressLint("SimpleDateFormat")
	public boolean sendHeartbeat(String url) {
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("current_user_name", current_application.appConf.current_user_name));
		// pairList.add(new BasicNameValuePair("current_user_id",
		// current_application.current_user_name));
		pairList.add(new BasicNameValuePair("current_patient_zhuyuan_bingqu",
				current_application.appConf.current_patient_zhuyuan_bingqu));
		pairList.add(
				new BasicNameValuePair("current_user_department", current_application.appConf.current_user_department));
		pairList.add(new BasicNameValuePair("current_user_ip", current_application.getLocalIpAddress()));
		pairList.add(new BasicNameValuePair("current_device_id", current_application.getDeviceID()));
		pairList.add(new BasicNameValuePair("current_mokuai", current_application.appConf.current_mokuai));
		pairList.add(new BasicNameValuePair("current_version", current_application.appConf.version));
		pairList.add(new BasicNameValuePair("marker", "1"));
		SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date curDate = new Date(System.currentTimeMillis());
		String date = sDateFormat.format(curDate);
		pairList.add(new BasicNameValuePair("current_time", date));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String strResult = EntityUtils.toString(httpResponse.getEntity());
				JSONObject return_data = new JSONObject(strResult);
				current_application.appConf.enableToUse = return_data.get("display").toString();
				if (return_data.get("state").equals("ok")) {
					// TiantanLog.error("tiantan", "发送心跳消息成功");
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}


	// 检测帐号登录状态
	public void checkUserLoginState(String url) {
		ICompression mCompress = new GlibCompression();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("current_user_id", current_application.appConf.current_user_number));
		pairList.add(new BasicNameValuePair("user_department", current_application.appConf.current_user_department));

		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);

			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String retSrc = "";
				byte[] result = null;
				if (current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					retSrc = mCompress.decompress(result);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}

				JSONObject jsonObject = new JSONObject(retSrc);
				if (jsonObject.get("response_state").toString().equals("true")) {
					if (!current_application.getDeviceID().equals(jsonObject.get("shebei_id").toString())
							&& !jsonObject.get("shebei_id").toString().equals("")) {
						Intent intent = new Intent(this, MessageReceiver.class);
						sendBroadcast(intent);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
