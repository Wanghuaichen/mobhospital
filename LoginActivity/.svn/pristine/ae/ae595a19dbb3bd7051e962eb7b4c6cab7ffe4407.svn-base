/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ChafangOverviewActivity.java
 * @Package com.tiantanhehe.yidongchafang.features.overview
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.features.xiezuo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.MainActivity;

import android.app.ActionBar;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

/**
 * @ClassName: ChafangOverviewActivity
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50
 * 
 */
public class ChafangGensuiActivity extends MainActivity {
	public Handler myHandler;
	public Runnable runnable;
	public final static int MSG_REFLESH = 1;
	private int mRunning = 0;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// super.openRightHuanzheList();
		// viewInit();
		dataInit();

		// settingsInit();


	}

	@Override
	public String buildRequestArg(String initial_arg) {
		String request_arg = super.buildRequestArg(initial_arg);
		return request_arg;
	}

	private void viewInit() {
		actionBar = getActionBar();
		actionBar.setCustomView(R.layout.main_header);
		actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
		actionBar.setDisplayShowCustomEnabled(true);
	}

	private void dataInit() {
		mRunning = 1;

		//
		myHandler = new Handler() {

			@Override
			public void handleMessage(Message msg) {

				switch (msg.what) {

				case MSG_REFLESH:

					loadConent(msg.getData().getString("gensuiUrl"));
				default:

				}
				super.handleMessage(msg);
			}
		};

		runnable = new Runnable() {

			@Override
			public void run() {

				while (mRunning == 1) {
				getGensuiUrl();

				try {
					Thread.sleep(current_application.featureConf.chafanggensui_reflesh_period * 1000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
			}
		};

		Thread refleshThread = new Thread(runnable);
		refleshThread.start();


	}

	@Override
	protected void settingsInit() {
		super.settingsInit();

	};

	// 获取呼叫信息
	public void getGensuiUrl() {
		Log.d("tiantan", "获取查房跟随Url");
		String url = current_application.appConf.server_url 
				+ "Mobile/ClientCommunication/getHujiaoInfo";
		
		Map<String, String> map = new HashMap<String, String>();
		new HttpHelper(null, new IHandleHttpHelperResult() {
			@SuppressWarnings("unchecked")
			@Override
			public void handleResult(List<Map<String, Object>> httpData) {
				// 设置报告单属性
				String gensuiUrl = current_application.appConf.server_url + "ZhuyuanYishi/Patient/showPatientListPad/";

				Message message = new Message();
				Bundle bundle = new Bundle();
				message.what = MSG_REFLESH;
				bundle.putString("gensuiUrl", gensuiUrl);
				message.setData(bundle);

				ChafangGensuiActivity.this.myHandler.sendMessage(message);

				if (httpData == null || httpData.size() == 0) {
					return;
				}



			}
		}).getDataFromServerNoTip(url, map);
	}

	@Override
	public void onDestroy() {
		mRunning = 0;

		super.onDestroy();

	}

}
