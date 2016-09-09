/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ChafangOverviewActivity.java
 * @Package com.tiantanhehe.yidongchafang.features.overview
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.features.overview;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.ListView;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.R.string;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.utils.GuideGson;
import com.tiantanhehe.yidongchafang.views.activities.LoginActivity;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuBrowserActivity;
import com.tiantanhehe.yidongchafang.views.adapters.ChaFangGuideAdapter;

/**
 * @ClassName: ChafangOverviewActivity
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50
 * 
 */
public class ChafangYindaoActivity extends YiDongYiHuBrowserActivity {

	boolean issuccess = false;
	private ListView listView;
	private ArrayList<GuideGson> list = new ArrayList<GuideGson>();
	private ChaFangGuideAdapter adapter;
	private Handler handler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case 1:
				/*adapter = new ChaFangGuideAdapter(context, list,
						ChafangYindaoActivity.this);
				adapter.notifyDataSetChanged();
				listView.setAdapter(adapter);*/
				break;
			case 0:
				issuccess = true;
				break;
			}
		};
	};
	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.operation_guide_layout);
		
		orientationInit();
		viewInit();
		listView = (ListView) findViewById(R.id.guide);
		getData();

	}
	
	private void viewInit() {
		//initUserView();
		initHuanZheView();
		initTitleView();
		super.initSlidingMenu();
		super.initArcMenu();
		if (current_application.appConf.current_user_number.equals("")) {
			current_application.qingkongApplication();
			Intent intent = new Intent(this, LoginActivity.class);
			startActivity(intent);
		}



	}
	
	public void initHuanZheView() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "initHuanZheView");
		super.initRenShuView();

	}
	
	public void initTitleView() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "initTitleView");
		if (!current_application.appConf.current_patient_zhuyuan_id.equals("")) {

			// HuanzheWrapper huanzhe = mZhuyuanHuanzheDao.getFirstHuanzhe();
			// if (huanzhe != null) {
			// huanzhe.setGlobalData(current_application);
			// }

			// 2015.09.23_Arno修改_继承了TiantanActivity.java的setDingbuHuanZheXinXi()方法，完成显示主界面顶端患者信息功能
			setDingbuHuanZheXinXi();
		}
	}
	
	/****
	 * 
	 * @Title:获取界面数据
	 * @Description: TODO
	 * @author: zhangyali <zhangyali@tiantanhehe.com>
	 * @date: 2016年7月13日 下午8:00:10
	 */
	public void getData() {

		final String url = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/chafangYindao/zhuyuan_id/"
				+ current_application.appConf.current_patient_zhuyuan_id;
		list.clear();
		new Thread(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				HttpGet httpRequest = new HttpGet(url);
				try {
					HttpResponse httpResponse = new DefaultHttpClient()
							.execute(httpRequest);
					if (httpResponse.getStatusLine().getStatusCode() == 200) {
						String tempResult = EntityUtils.toString(httpResponse
								.getEntity());

						list = (GuideGson.getObject(tempResult));

						Message message = new Message();
						message.what = 1;
						handler.sendMessage(message);
					}
				} catch (ClientProtocolException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}).start();

	}

	/***
 * 
 */
	public void orientationInit() {
		if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
				&& current_application.appConf.screen_orientation == 1) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		} else if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
				&& current_application.appConf.screen_orientation == 2) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		} else if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE
				&& current_application.appConf.screen_orientation == 4) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
		}

	}

	/***
	 * 
	 * @Title: upDataChafang
	 * @Description: TODO(点击button更新数据,并判断更新是否成功)
	 * @author: zhangyali <zhangyali@tiantanhehe.com>
	 * @date: 2016年7月13日 下午3:51:51
	 * @param result
	 * @param jibing_mingcheng
	 * @param xaingmu
	 * @return
	 */
	public boolean upDataChafang(String result, String jibing_mingcheng,
			String xaingmu) {

		final Map<String, String> map = new HashMap<String, String>();
		final String urlString = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/updateChafangYindao/";
		map.put("result", result);
		map.put("zhuyuan_id",
				current_application.appConf.current_patient_zhuyuan_id);
		map.put("jibing_mingcheng", jibing_mingcheng);
		map.put("xiangmu", xaingmu);
		new AsyncTask<String, List<Map<String, string>>, String>() {
			protected void onPreExecute() {

			}

			@Override
			protected String doInBackground(String... params) {
				HttpHelper helper = new HttpHelper(context);
				String postResult = null;
				try {
					postResult = helper.postData(urlString, map);
					if (!"".equals(postResult)) {
						issuccess = true;
						Message message = new Message();
						message.what = 0;

						handler.sendMessage(message);
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return null;
			}

			protected void onProgressUpdate(List<Map<String, Object>>... values) {

			}

			protected void onPostExecute(String result) {
				try {
					// dialog.dismiss();
				} catch (Exception e) {

				}
			}

		}.execute(urlString);
		return issuccess;

	}

	@Override
	protected void onResume() {
		/**
		 * 设置为横屏
		 */
		// if (getRequestedOrientation() !=
		// ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
		// setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		// }
		super.onResume();
	}
}
