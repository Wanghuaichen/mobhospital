/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ShowHuliJiluListFragment.java
 * @Package com.tiantanhehe.yidongchafang.features.hulijilu
 * @Description: TODO 
 * @author Arno <zhongxinzhen@tiantanhehe.com>
 * @date 2016年7月15日 上午11:08:50 
 * @version V5.0   
 */
package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuActivity;
import com.tiantanhehe.yidongchafang.views.adapters.HulijiluListAdapter;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnTouchListener;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ListView;

@SuppressLint("InflateParams")
public class HuliJiluListFragment extends Fragment {
	private HulijiluListAdapter dataAdapter = null;
	private ListView listView;
	private View view = null;
	private String server_url, current_patient_zhuyuan_id;
	private List<Map<String, Object>> listData;
	private TextView detail;
	private Spinner pages;
	private LinearLayout bottom_page;
	private Map<String, String> map;
	private String url;
	private boolean clickState = false;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		initView(inflater);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_patient_zhuyuan_id = neirong
				.getString("current_patient_zhuyuan_id");
		url = server_url
				+ "Mobile/YidongChafangClientCommunication/showHlijiluListJson";

		map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);
		getData(url, map);
	        
		return view;
	}

	private void initView(LayoutInflater inflater) {
		view = inflater.inflate(R.layout.activity_showhulijilu_list, null);
		listView = (ListView) view.findViewById(R.id.listView);
		bottom_page = (LinearLayout) view.findViewById(R.id.bottom_page);
		pages = (Spinner) view.findViewById(R.id.pages);
		pages.setOnTouchListener(new OnTouchListener() {
			@Override
			public boolean onTouch(View arg0, MotionEvent arg1) {
				// TODO Auto-generated method stub
				clickState = true;
				pages.setOnItemSelectedListener(new OnItemSelectedListener() {

					@Override
					public void onItemSelected(AdapterView<?> arg0, View arg1,
							int arg2, long arg3) {
						// TODO Auto-generated method stub
						map.put("page", (pages.getSelectedItemId() + 1) + "");
						if (clickState) {
							getData(url, map);
						}
					}

					@Override
					public void onNothingSelected(AdapterView<?> arg0) {
						// TODO Auto-generated method stub

					}
				});
				return false;
			}
		});

		detail = (TextView) view.findViewById(R.id.detail);
	}

	/**
	 * @Title:获取后台界面并加载 adaper
	 * @Description: TODO
	 * @author: Arno <zhongxinzhen@tiantanhehe.com>
	 * @date: 2016年7月15日 上午12:00
	 */
	private void getData(String url, final Map<String, String> map) {
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpData) {
				listData = httpData;
				dataAdapter = new HulijiluListAdapter(listData, getActivity());
				dataAdapter.notifyDataSetChanged();
				listView.setAdapter(dataAdapter);
				listView.setOnItemClickListener(new OnItemClickListener() {
					@Override
					public void onItemClick(AdapterView<?> arg0, View arg1,
							int arg2, long arg3) {
						// TODO Auto-generated method stub
						YiDongYiHuActivity yidongyihu = (YiDongYiHuActivity) getActivity();
						yidongyihu.jiazaiWebJiemian(server_url
								+ "HuliJilu/showJilu/type/"
								+ listData.get(arg2).get("content").toString()
								+ "/zhuyuan_id/"
								+ current_patient_zhuyuan_id
								+ "/start/"
								+ listData.get(arg2).get("start_time")
										.toString()
								+ "/jieshu/"
								+ listData.get(arg2).get("jieshu_time")
										.toString() + "#bottom");
					}
				});
				try {
					if(map.get("page") == null)
					{
						setQitaInfo();
					}
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}).getDataFromServer(url, map);
	}

	private void setQitaInfo() {
		if (listData.size() <= 0) {
			bottom_page.setVisibility(View.GONE);
			return;
		} else {
			if(Integer.parseInt(listData.get(0).get("page_number").toString()) > 1)
			{
				bottom_page.setVisibility(View.VISIBLE);
			}
			else
			{
				bottom_page.setVisibility(View.GONE);
			}
		}
		detail.setText("每页显示" + listData.get(0).get("pageSize").toString()
				+ "条/共" + listData.get(0).get("zongtiaoshu").toString() + "条");
		int num = Integer.parseInt(listData.get(0).get("page_number")
				.toString());
		if(num < 1)
		{
			return;
		}
		String pagesString[] = new String[num];
		for (int i = 0; i < pagesString.length; i++) {
			pagesString[i] = "第 " + String.valueOf(i + 1) + " 页";
		}
		ArrayAdapter<String> pageadapter = new ArrayAdapter<String>(
				getActivity(), android.R.layout.simple_spinner_item,
				pagesString);
		pageadapter
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		// pages.setSelection(0, true);
		pages.setAdapter(pageadapter);
	}
}
