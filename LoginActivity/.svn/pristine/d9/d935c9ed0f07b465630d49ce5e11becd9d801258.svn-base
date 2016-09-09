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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;
import android.widget.GridView;
import android.widget.SimpleAdapter;

import com.google.gson.Gson;
import com.tiantanhehe.yidongchafang.HttpClientUtils;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.chafangoverview.ChafangOverviewAdapter;
import com.tiantanhehe.yidongchafang.chafangoverview.ChafangOverviewBean;
import com.tiantanhehe.yidongchafang.chafangoverview.Xitong;
import com.tiantanhehe.yidongchafang.chafangoverview.XitongWrapper;
import com.tiantanhehe.yidongchafang.chafangoverview.YongyaoXitong;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuBrowserActivity;

import android.util.Log;

/**
 * @ClassName: ChafangOverviewActivity
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50
 * 
 */
public class ChafangOverviewActivity extends YiDongYiHuBrowserActivity {

	private GridView gridView_chafangoverview;
	private List<Map<String, Object>> dataList;
	// private SimpleAdapter adapter;
	private ChafangOverviewAdapter adapter;
	private HttpClientUtils httpClientUtils;
	private Gson gson;
	private String urlString;
	private List<XitongWrapper> xitongWrapperList;
	ChafangOverviewBean chafangOverviewBean;

	@Override
	protected void onResume() {
		/**
		 * 设置为横屏
		 */
		if (getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		}
		super.onResume();
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_chafangoverview);
		gridView_chafangoverview = (GridView) findViewById(R.id.gridView_chafangoverview);
		// dataList = new ArrayList<Map<String, Object>>();
		// adapter = new SimpleAdapter(this, getData(),
		// R.layout.item_chafangoverview, new String[] { "pic_xitong",
		// "name_xitong" }, new int[] { R.id.pic_xitong,
		// R.id.name_xitong });

		initData();

		gridView_chafangoverview.setAdapter(adapter);
		// gridView_chafangoverview.set
	}

	@Override
	public String buildRequestArg(String initial_arg) {
		String request_arg = super.buildRequestArg(initial_arg);
		return request_arg;
	}

	private void initData() {
		xitongWrapperList = new ArrayList<XitongWrapper>();
		adapter = new ChafangOverviewAdapter(this, this);
		int[] drawable = { R.drawable.huxixitong, R.drawable.ganranxitong,
				R.drawable.xunhuanxitong, R.drawable.miniaoxitong,
				R.drawable.neifenmixitong, R.drawable.xueyexitong,
				R.drawable.shenjingxitong, R.drawable.xiaohuaxitong,
				R.drawable.mianyixitong };
		String[] iconName = { getString(R.string.huxixitong),
				getString(R.string.ganranxitong),
				getString(R.string.xunhuanxitong),
				getString(R.string.miniaoxitong),
				getString(R.string.neifenmixitong),
				getString(R.string.xueyexitong),
				getString(R.string.shenjingxitong),
				getString(R.string.xiaohuaxitong),
				getString(R.string.mianyixitong) };
		// xitongWrapperList.clear();
		XitongWrapper xitongWrapper;

		urlString = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/showPatientZongheChafang/zhuyuan_id/"
				+ current_application.appConf.current_patient_zhuyuan_id;
		Log.e("aa", urlString);
		getDataFromServer(urlString);

		for (int i = 0; i < drawable.length; i++) {
			xitongWrapper = new XitongWrapper();
			ArrayList<Xitong> xitong = new ArrayList<Xitong>();
			ArrayList<YongyaoXitong> yongyaoXitong = new ArrayList<YongyaoXitong>();

			xitongWrapper.setDrawable(drawable[i]);
			xitongWrapper.setIconName(iconName[i]);
			switch (drawable[i]) {
			case R.drawable.huxixitong:
				if (chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list().getHuxixitong();
				else
					xitong = chafangOverviewBean.getJiancha_list().getHuxixitong();
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getHuxixitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.ganranxitong:
				if(chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list().getGanran();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getGanran();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.xunhuanxitong:
				if(chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list()
						.getXunhuanxitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getXunhuanxitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.miniaoxitong:
				if(chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list()
						.getMiniaoxitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getMiniaoxitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.neifenmixitong:
				if(chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list()
						.getNeifenmixitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getNeifenmixitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.xueyexitong:
				if(chafangOverviewBean.getJiancha_list()!= null)
					xitong = chafangOverviewBean.getJiancha_list().getXueyexitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getXueyexitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.shenjingxitong:
				if(chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list()
						.getShenjingxitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getShenjingxitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.xiaohuaxitong:
				if( chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list()
						.getXiaohuaxitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
						.getXiaohuaxitong();
				else
					yongyaoXitong = null;
				break;
			case R.drawable.mianyixitong:
				if(chafangOverviewBean.getJiancha_list() != null)
					xitong = chafangOverviewBean.getJiancha_list()
						.getMianyixitong();
				else
					xitong = null;
				if (chafangOverviewBean.getYongyao() != null)
					yongyaoXitong = chafangOverviewBean.getYongyao()
							.getMianyixitong();
				else
					yongyaoXitong = null;
				break;
			}
			xitongWrapper.setXitongList(xitong);
			xitongWrapper.setYongyaoXitongList(yongyaoXitong);
			xitongWrapperList.add(xitongWrapper);
		}
		adapter.setxitongWrapperList(xitongWrapperList);
	}

	private void getDataFromServer(String urlString) {
		httpClientUtils = new HttpClientUtils();
		try {
			String stringResult = httpClientUtils.httpGet(urlString);
			gson = new Gson();
			chafangOverviewBean = gson.fromJson(stringResult,
					ChafangOverviewBean.class);
			Log.i("log", "解析json成功");
			// ArrayList<Xitong> neifenmixitong =
			// chafangOverviewBean.getJiancha_list().getNeifenmixitong();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
