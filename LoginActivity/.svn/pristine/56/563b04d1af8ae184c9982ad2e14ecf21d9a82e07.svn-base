package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.utils.LinYizhuBean;
import com.tiantanhehe.yidongchafang.views.adapters.YizhuChakanListChangqiAdapter;
import com.tiantanhehe.yidongchafang.views.adapters.YizhuChakanListLinshiAdapter;
import com.tiantanhehe.yidongchafang.views.views.CustomListview;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

public class YiZhuChakanListFragment extends Fragment {
	private Button changqi, linshi, stop, start;
	private TextView name, sex, age, keshi, chuanghao, zhuyuan_hao, hospital,
			table, detail;
	private LinearLayout bottom_page;
	private Spinner pages;
	public String currentpages = "1";
	private LinearLayout changqiLayout, linearLayout;
	public LinYizhuBean linYizhuBean;
	private View view;

	private String server_url, current_patient_zhuyuan_id,current_patient_zhuyuan_id_show,
			current_patient_xingming, current_patient_xingbie,
			current_patient_nianling, current_patient_bingchuang_hao,
			current_patient_zhuyuan_bingqu;
	private CustomListview listView;
	private String changqiYizhuUrl, linshiYizhuUrl;
	private List<Map<String, Object>> listData;
	private YizhuChakanListChangqiAdapter changqiDataAdapter;
	private YizhuChakanListLinshiAdapter linshiDataAdapter;
	private Map<String, String> map;
	private boolean clickState = false;
	private String tabState = "长期";

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		view = inflater.inflate(R.layout.activity_yizhuchakan_layout,
				container, false);
		Bundle bundle = getArguments();
		server_url = bundle.getString("server_url");
		current_patient_xingming = bundle.getString("current_patient_xingming");
		current_patient_xingbie = bundle.getString("current_patient_xingbie");
		current_patient_nianling = bundle.getString("current_patient_nianling");
		current_patient_zhuyuan_bingqu = bundle
				.getString("current_user_department");
		current_patient_bingchuang_hao = bundle
				.getString("current_patient_bingchuang_hao");
		current_patient_zhuyuan_id = bundle
				.getString("current_patient_zhuyuan_id");
		current_patient_zhuyuan_id_show = bundle
				.getString("current_patient_zhuyuan_id_show");
		changqiYizhuUrl = server_url
				+ "Mobile/YidongChafangClientCommunication/getChangqiYizhuDataJson/";
		linshiYizhuUrl = server_url
				+ "Mobile/YidongChafangClientCommunication/getLinshiYizhuDataJson/";
		map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);

		initview();
		getData(changqiYizhuUrl, map, "长期");
		table.setText("长期医嘱单");
		changqi.setBackgroundResource(R.drawable.button_green);

		return view;
	}

	/***
	 * 
	 * @Title: initview
	 * @Description: TODO初始化布局
	 * @author: zhangyali <zhangyali@tiantanhehe.com>
	 * @date: 2016年7月19日 下午5:29:55
	 */
	public void initview() {
		bottom_page = (LinearLayout) view.findViewById(R.id.bottom_page);

		changqiLayout = (LinearLayout) view.findViewById(R.id.head);
		linearLayout = (LinearLayout) view.findViewById(R.id.headlinshi);

		changqi = (Button) view.findViewById(R.id.changqi);
		changqi.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				tabState = "长期";
				changqi.setBackgroundResource(R.drawable.button_green);
				linshi.setBackgroundResource(R.drawable.button_bule);
				start.setBackgroundResource(R.drawable.button_bule);
				stop.setBackgroundResource(R.drawable.button_bule);
				start.setText("开始执行");
				stop.setText("停止执行");
				map.remove("page");
				map.remove("state");
				table.setText("长期医嘱单");
				getData(changqiYizhuUrl, map, "长期");
			}
		});
		linshi = (Button) view.findViewById(R.id.linshi);
		linshi.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				tabState = "临时";
				linshi.setBackgroundResource(R.drawable.button_green);
				changqi.setBackgroundResource(R.drawable.button_bule);
				start.setBackgroundResource(R.drawable.button_bule);
				stop.setBackgroundResource(R.drawable.button_bule);
				start.setText("已下达");
				stop.setText("已执行");
				map.remove("page");
				map.remove("state");
				table.setText("临时医嘱单");
				getData(linshiYizhuUrl, map, "临时");
			}
		});

		start = (Button) view.findViewById(R.id.start);
		start.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				start.setBackgroundResource(R.drawable.button_orange);
				stop.setBackgroundResource(R.drawable.button_bule);
				map.remove("page");
				if (tabState.equals("长期")) {
					map.put("state", "开始执行");
					getData(changqiYizhuUrl, map, "长期");
				} else if (tabState.equals("临时")) {
					map.put("state", "已下达");
					getData(linshiYizhuUrl, map, "临时");
				}
			}
		});

		stop = (Button) view.findViewById(R.id.stop);
		stop.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				start.setBackgroundResource(R.drawable.button_bule);
				stop.setBackgroundResource(R.drawable.button_orange);
				map.remove("page");
				if (tabState.equals("长期")) {
					map.put("state", "停止执行");
					getData(changqiYizhuUrl, map, "长期");
				} else if (tabState.equals("临时")) {
					map.put("state", "执行完毕");
					getData(linshiYizhuUrl, map, "临时");
				}
			}
		});

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
							if (tabState.equals("长期")) {
								getData(changqiYizhuUrl, map, "长期");
							} else if (tabState.equals("临时")) {
								getData(linshiYizhuUrl, map, "临时");
							}
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

		listView = (CustomListview) view.findViewById(R.id.yizhulist);
		table = (TextView) view.findViewById(R.id.tablename);

		hospital = (TextView) view.findViewById(R.id.hospital);
		hospital.setVisibility(View.GONE);
		name = (TextView) view.findViewById(R.id.name);
		name.setText("姓名: " + current_patient_xingming);
		sex = (TextView) view.findViewById(R.id.sex);
		sex.setText("性别: " + current_patient_xingbie);
		age = (TextView) view.findViewById(R.id.age);
		age.setText("年龄: " + current_patient_nianling);
		chuanghao = (TextView) view.findViewById(R.id.chuanghao);
		chuanghao.setText("床号: " + current_patient_bingchuang_hao);
		keshi = (TextView) view.findViewById(R.id.keshi);
		keshi.setText("科室: " + current_patient_zhuyuan_bingqu);
		zhuyuan_hao = (TextView) view.findViewById(R.id.zhuyuanhao);
		zhuyuan_hao.setText("住院号:" + current_patient_zhuyuan_id_show);

	}

	private void getData(String url, final Map<String, String> map,
			final String zhuangtai) {
		clickState = false;
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpdata) {
				listData = httpdata;
				if (zhuangtai.equals("长期")) {
					changqiDataAdapter = new YizhuChakanListChangqiAdapter(
							listData, getActivity());
					listView.setAdapter(changqiDataAdapter);
					changqiLayout.setVisibility(View.VISIBLE);
					linearLayout.setVisibility(View.GONE);
				} else {
					linshiDataAdapter = new YizhuChakanListLinshiAdapter(
							listData, getActivity());
					listView.setAdapter(linshiDataAdapter);
					changqiLayout.setVisibility(View.GONE);
					linearLayout.setVisibility(View.VISIBLE);
				}
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
			if (Integer.parseInt(listData.get(0).get("page_number").toString()) > 1) {
				bottom_page.setVisibility(View.VISIBLE);
			} else {
				bottom_page.setVisibility(View.GONE);
			}
		}
		detail.setText("每页显示" + listData.get(0).get("pageSize").toString()
				+ "条/共" + listData.get(0).get("zongtiaoshu").toString() + "条");
		int num = Integer.parseInt(listData.get(0).get("page_number")
				.toString());
		String pagesString[] = new String[num];
		if(num < 1)
		{
			return;
		}
		for (int i = 0; i < pagesString.length; i++) {
			pagesString[i] = "第 " + String.valueOf(i + 1) + " 页";
		}
		ArrayAdapter<String> pageadapter = new ArrayAdapter<String>(
				getActivity(), android.R.layout.simple_spinner_item,
				pagesString);
		pageadapter
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		pages.setAdapter(pageadapter);
	}
}
