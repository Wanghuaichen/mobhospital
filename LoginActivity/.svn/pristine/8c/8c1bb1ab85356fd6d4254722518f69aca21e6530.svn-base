package com.tiantanhehe.yidongchafang.views.fragments;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.utils.DateTimePickDialogUtil;
import com.tiantanhehe.yidongchafang.views.adapters.BingchengJiluListAdapter;
import com.tiantanhehe.yidongchafang.views.views.CustomListview;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

public class BingChengJiluListFragment extends Fragment {
	private EditText showdate, yishi;
	private LinearLayout bottom_page;
	private Spinner pages,bingcheng_type;
	private Button shaixuan;
	private CustomListview listview;
	private TextView detail;
	public String currentpages = "1";
	public String leibie;
	private BingchengJiluListAdapter dataAdapter;
	private View view;
	private String server_url, current_patient_zhuyuan_id;
	private String url;
	private List<Map<String, Object>> listData;
	private Map<String, String> map;
	private boolean clickState = false;
	int yeshu = 0;
	private String initEndDateTime = "2014-08-23"; // 初始化结束时间

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		view = inflater.inflate(R.layout.activity_bingchengjilu_list,
				container, false);
		Bundle bundle = getArguments();
		server_url = bundle.getString("server_url");

		current_patient_zhuyuan_id = bundle
				.getString("current_patient_zhuyuan_id");
		url = server_url
				+ "Mobile/YidongChafangClientCommunication/getBingchengJiluListDataJson/";
		map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);
		map.put("page", "1");
		initView();
		getData(url, map);
		return view;
	}

	private void initView() {
		//riqi = (EditText) view.findViewById(R.id.date);
		bingcheng_type = (Spinner) view.findViewById(R.id.bingcheng_type);
		yishi = (EditText) view.findViewById(R.id.doctor);
		shaixuan = (Button) view.findViewById(R.id.serach);
		shaixuan.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				String riqiText = showdate.getText().toString();
				if (!riqiText.equals("")) {
					map.put("riqi", riqiText);
				} else {
					map.remove("riqi");
				}

				String typeText = bingcheng_type.getSelectedItem().toString();
				if (!typeText.equals("")) {
					map.put("type", typeText);
				} else {
					map.remove("type");
				}

				String yishiText = yishi.getText().toString();
				if (!yishiText.equals("")) {
					map.put("yishi", yishiText);
				} else {
					map.remove("yishi");
				}
				getData(url, map);
			}
		});
		listview = (CustomListview) view.findViewById(R.id.listView);
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
		showdate = (EditText) view.findViewById(R.id.date);
		showdate.setInputType(InputType.TYPE_NULL);
		showdate.setFocusable(false);
		/*initEndDateTime = new SimpleDateFormat("yyyy年MM月dd日 HH:mm")
				.format(new java.util.Date());
		showdate.setText(initEndDateTime);*/
		showdate.setOnClickListener(new OnClickListener() {
			@SuppressLint("SimpleDateFormat")
			@Override
			public void onClick(View v) {
				initEndDateTime = new SimpleDateFormat("yyyy-MM-dd")
				.format(new java.util.Date());
				DateTimePickDialogUtil dateTimePicKDialog = new DateTimePickDialogUtil(
						getActivity(), initEndDateTime);
				dateTimePicKDialog.dateTimePicKDialog(showdate);
			}
		});

		showdate.addTextChangedListener(new TextWatcher() {

			public void onTextChanged(CharSequence arg0, int arg1, int arg2,
					int arg3) {

			}

			public void beforeTextChanged(CharSequence arg0, int arg1,
					int arg2, int arg3) {

			}

			public void afterTextChanged(Editable arg0) {
				// 检查是否大于最大日期
				/*String newRiqi = arg0.toString();
				newRiqi = newRiqi.replace("年", "-");
				newRiqi = newRiqi.replace("月", "-");
				newRiqi = newRiqi.replace("日", "");
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm");
				showdate.setText(initEndDateTime);*/
			}
		});
	}

	private void getData(String url, final Map<String, String> map) {
		clickState = false;
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpdata) {
				listData = httpdata;
				dataAdapter = new BingchengJiluListAdapter(listData,
						getActivity());
				listview.setAdapter(dataAdapter);
				listview.setOnItemClickListener(new OnItemClickListener() {
					@Override
					public void onItemClick(AdapterView<?> arg0, View arg1,
							int arg2, long arg3) {
						// TODO Auto-generated method stub
						goXiangxi(listData.get(arg2).get("id").toString());
						try {
							if(map.get("page") == null)
							{
								setQitaInfo();
							}
						} catch (Exception e) {
							// TODO: handle exception
						}
						
					}
				});
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
		yeshu = num;
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

	private void goXiangxi(String bingcheng_id) {
		String urlstring = server_url
				+ "Mobile/YidongChafangClientCommunication/getBingchengJiluResultDataJson/bingcheng_id/" + bingcheng_id;
		String tap = "病程";
		Bundle bundle1 = new Bundle();
		bundle1.putString("tap", tap);
		bundle1.putString("server_url", server_url);
		bundle1.putString("bingcheng_id", bingcheng_id);
		bundle1.putString("showoneBingchengUrl", urlstring);
		FragmentManager fragmentManager = getActivity()
				.getSupportFragmentManager();
		FragmentTransaction fragmentTransaction = fragmentManager
				.beginTransaction();
		ShowOneBingchengReportFragment BingchengReport = new ShowOneBingchengReportFragment();
		BingchengReport.setArguments(bundle1);
		fragmentTransaction.replace(R.id.contentView, BingchengReport, "left");

		fragmentTransaction.commit();
	}
}
