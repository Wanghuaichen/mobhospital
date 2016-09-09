package com.tiantanhehe.yidongchafang.services;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

public class XiezuoService extends Service {

	private GlobalInfoApplication globalInfoApplication;
	private int xiezuoRuning = 1;
	private int chafangTongbuRuning = 0;
	private String lastChafangTongbuUrl = "";
	private long lastChafangTongbuTime = 0;

	private Thread chafangTongbuThread;

	public static int CHAFANG_TONGBU_PERIOD = 500;

	@Override
	public void onCreate() {
		super.onCreate();

		Log.d("tiantan", "xiezuoService start");
		xiezuoRuning = 1;
		globalInfoApplication = GlobalInfoApplication.getInstance();

		if (chafangTongbuThread == null) {
			chafangTongbuThread = new Thread(new ChafangTongbuThread());
			chafangTongbuThread.start();
		}

	}

	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return new ControllBinder();
	}

	@Override
	public void onDestroy() {
		xiezuoRuning = 0;
		super.onDestroy();
		Log.d("tiantan", "xiezuoService destroy");
	}


	// 从Activity控制servic
	public class ControllBinder extends Binder {
		/**
		 * 获取当前Service的实例
		 * 
		 * @return
		 */
		public XiezuoService getService() {
			return XiezuoService.this;
		}
	}

	public class ChafangTongbuThread implements Runnable {

	@Override
		public void run() {
			// TODO Auto-generated method stub
			while (xiezuoRuning == 1) {
				if (chafangTongbuRuning == 1) {

					long currentTime = System.currentTimeMillis();
					String url = GlobalInfoApplication.getInstance().featureConf.now_url;
					if (url != null && (!lastChafangTongbuUrl.equals(url))) {

						// 上传查房同步信息
						setChafangTongbuUrl();
						lastChafangTongbuUrl = url;
						lastChafangTongbuTime = currentTime;

					}
					if (currentTime - lastChafangTongbuTime > (GlobalInfoApplication
							.getInstance().featureConf.chafangtongbu_reflesh_period * 1000)) {
						// 上传查房同步信息
						setChafangTongbuUrl();
						lastChafangTongbuUrl = url;
						lastChafangTongbuTime = currentTime;
					}
				}

				try {
					Thread.sleep(CHAFANG_TONGBU_PERIOD);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			Log.d("tiantan", "chafangtongbu exit");
			
		}
	
	}

	public int getChafangTongbuRuning() {
		return chafangTongbuRuning;
	}

	public void setChafangTongbuRuning(int chafangTongbuRuning) {
		this.chafangTongbuRuning = chafangTongbuRuning;
	}

	public void setChafangTongbuUrl() {
		if (chafangTongbuRuning != 1) {
			return;
		}

		Log.d("tiantan", "设置查房同步Url");
		String url = GlobalInfoApplication.getInstance().appConf.server_url + "Mobile/YidongChafangClientCommunication/setXiezuoUrl";

		
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_number", globalInfoApplication.appConf.current_user_number);
		map.put("user_name", globalInfoApplication.appConf.current_user_name);
		map.put("xiezuo_type", "chafang");
		map.put("tongbu_url", globalInfoApplication.featureConf.now_url);
		
		new HttpHelper(null, new IHandleHttpHelperResult() {
			@SuppressWarnings("unchecked")
			@Override
			public void handleResult(List<Map<String, Object>> httpData) {
				// 设置报告单属性

			}
		}).setDataToServerNoTip(url, map);
	}
}
