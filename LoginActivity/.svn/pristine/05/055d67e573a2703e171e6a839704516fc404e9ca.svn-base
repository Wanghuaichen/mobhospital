package com.tiantanhehe.yidongchafang.views.fragments;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.utils.DateTimePickDialogUtil;
import com.tiantanhehe.yidongchafang.views.adapters.JianyanJianchaListAdapter;

public class JianyanJianchaListFragment extends Fragment {
	private View view;
	private String server_url, current_patient_zhuyuan_id,
			current_patient_xingming, current_patient_nianling,
			current_patient_xingbie, hospital_name, baogao_id,
			jiancha_zhuangtai, shenqing_time, songjian_keshi, songjian_yisheng,
			songjian_biaoben, jiancha_time, jianyanz_zhe, hedui_zhe, leixing,
			jiancha_code, baogao_name,jiancha_keshi_name,current_patient_bingchuang_hao;
	private Button bt_shaixuan;
	private EditText showdate, edt_jianchamingcheng,
			edt_yichangqingkuang;
	private TextView detail;
	private Spinner spinner_jianchakeshi, pages;
	private ListView listView;
	private String url;
	private LinearLayout bottom_page;
	private Map<String, String> map;
	private List<Map<String, Object>> listData;
	private JianyanJianchaListAdapter dataAdapter;
	private boolean clickState = false;
	private String initEndDateTime = "2014-08-23"; // 初始化结束时间

	public static JianyanJianchaListFragment newInstance() {
		JianyanJianchaListFragment fragment1 = new JianyanJianchaListFragment();
		return fragment1;
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

		view = inflater.inflate(R.layout.activity_jianyanjiancha, container,
				false);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_patient_xingming = neirong
				.getString("current_patient_xingming");
		current_patient_zhuyuan_id = neirong
				.getString("current_patient_zhuyuan_id");
		current_patient_nianling = neirong
				.getString("current_patient_nianling");
		current_patient_xingbie = neirong.getString("current_patient_xingbie");
		current_patient_bingchuang_hao = neirong.getString("current_patient_bingchuang_hao");
		url = server_url
				+ "Mobile/YidongChafangClientCommunication/getJianyanJianchaListDataJson/"
				+ current_patient_zhuyuan_id;
		map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);

		viewInit();

		getData(url, map);

		// JianchaKeshi_suanze();
		return view;
	}

	// 初始化界面
	private void viewInit() {
		bottom_page = (LinearLayout) view.findViewById(R.id.bottom_page);
		listView = (ListView) view.findViewById(R.id.listView_jianyanjiancha);
		showdate = (EditText) view
				.findViewById(R.id.edt_shenqingshijian);
		showdate.setInputType(InputType.TYPE_NULL);
		showdate.setFocusable(false);
		/*initEndDateTime = new SimpleDateFormat("yyyy年MM月dd日 HH:mm")
				.format(new java.util.Date());
		showdate.setText(initEndDateTime);*/
		showdate.setOnClickListener(new OnClickListener() {
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

			}
		});
		edt_jianchamingcheng = (EditText) view
				.findViewById(R.id.edt_jianchamingcheng);
		edt_yichangqingkuang = (EditText) view
				.findViewById(R.id.edt_yichangqingkuang);
		spinner_jianchakeshi = (Spinner) view
				.findViewById(R.id.spinner_jianchakeshi);
		String spinner_itme[] = getResources().getStringArray(
				R.array.jianyanjiancha_spinner);
		ArrayAdapter<String> spinnerAdapter = new ArrayAdapter<String>(
				getActivity(), android.R.layout.simple_list_item_1,
				spinner_itme);
		spinner_jianchakeshi.setAdapter(spinnerAdapter);
		spinner_jianchakeshi.setSelection(0, true);

		bt_shaixuan = (Button) view.findViewById(R.id.bt_shaixuan);
		bt_shaixuan.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				String riqiText = showdate.getText().toString();
				if (!riqiText.equals("")) {
					map.put("shenqing_time", riqiText);
				} else {
					map.remove("shenqing_time");
				}

				String jianchaNameText = edt_jianchamingcheng.getText()
						.toString();
				if (!jianchaNameText.equals("")) {
					map.put("jiancha_mingcheng", jianchaNameText);
				} else {
					map.remove("jiancha_mingcheng");
				}

				String yichangQingkuangText = edt_yichangqingkuang.getText()
						.toString();
				if (!yichangQingkuangText.equals("")) {
					map.put("jiancha_yichangjieguo", yichangQingkuangText);
				} else {
					map.remove("jiancha_yichangjieguo");
				}

				String jianchakeshiText = spinner_jianchakeshi
						.getSelectedItem().toString();
				if (!jianchakeshiText.equals("")
						&& !jianchakeshiText.equals("任意")) {
					map.put("jiancha_keshi_name", jianchakeshiText);
				} else {
					map.remove("jiancha_keshi_name");
				}
				map.remove("page");
				getData(url, map);
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

	private void getData(String url, final Map<String, String> map) {
		clickState = false;
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpdata) {
				listData = httpdata;
				dataAdapter = new JianyanJianchaListAdapter(listData,
						getActivity());
				listView.setAdapter(dataAdapter);
				listView.setOnItemClickListener(new OnItemClickListener() {
					@Override
					public void onItemClick(AdapterView<?> arg0, View arg1,
							int arg2, long arg3) {
						// TODO Auto-generated method stub
						shenqing_time = listData.get(arg2).get("jiancha_time")
								.toString();
						songjian_keshi = listData.get(arg2)
								.get("shenqing_keshi_name").toString();
						songjian_yisheng = listData.get(arg2)
								.get("shenqing_zhe_name").toString();
						songjian_biaoben = listData.get(arg2)
								.get("songjian_wu").toString();
						jiancha_time = listData.get(arg2).get("jiancha_time")
								.toString();
						jianyanz_zhe = listData.get(arg2)
								.get("jiancha_zhe_name").toString();
						hedui_zhe = listData.get(arg2).get("hedui_zhe_name")
								.toString();
						leixing = listData.get(arg2).get("leixing").toString();
						baogao_id = listData.get(arg2).get("id").toString();
						jiancha_code = listData.get(arg2).get("jiancha_code")
								.toString();
						jiancha_zhuangtai = listData.get(arg2)
								.get("jiancha_zhuangtai").toString();
						baogao_name = listData.get(arg2)
								.get("jiancha_mingcheng").toString();
						hospital_name = listData.get(arg2).get("hospital_name")
								.toString();
						jiancha_keshi_name = listData.get(arg2).get("jiancha_keshi_name")
								.toString();
						goJianyanReport(leixing);
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
		pages.setAdapter(pageadapter);
	}

	public void goJianyanReport(String str) {
		Bundle bundle = new Bundle();
		bundle.putString("server_url", server_url);
		bundle.putString("current_patient_zhuyuan_id",
				current_patient_zhuyuan_id);
		bundle.putString("current_patient_xingming", current_patient_xingming);
		bundle.putString("current_patient_nianling", current_patient_nianling);
		bundle.putString("hospital_name", hospital_name);
		bundle.putString("current_patient_xingbie", current_patient_xingbie);
		bundle.putString("baogao_id", baogao_id);
		bundle.putString("jiancha_zhuangtai", jiancha_zhuangtai);
		bundle.putString("shenqing_time", shenqing_time);
		bundle.putString("songjian_keshi", songjian_keshi);
		bundle.putString("songjian_yisheng", songjian_yisheng);
		bundle.putString("songjian_biaoben", songjian_biaoben);
		bundle.putString("jiancha_time", jiancha_time);
		bundle.putString("jianyanz_zhe", jianyanz_zhe);
		bundle.putString("hedui_zhe", hedui_zhe);
		bundle.putString("leixing", leixing);
		bundle.putString("jiancha_code", jiancha_code);
		bundle.putString("baogao_name", baogao_name);
		bundle.putString("jiancha_keshi_name", jiancha_keshi_name);
		bundle.putString("current_patient_bingchuang_hao", current_patient_bingchuang_hao);

		FragmentManager fragmentManager = getActivity()
				.getSupportFragmentManager();
		FragmentTransaction fragmentTransaction = fragmentManager
				.beginTransaction();
		if (str.equals("检查")) {
			ShowOneJianchaReportFragment JianchaReport = new ShowOneJianchaReportFragment();
			JianchaReport.setArguments(bundle);
			fragmentTransaction
					.replace(R.id.contentView, JianchaReport, "left");
		} else {
			ShowOneJianyanReportFragment JianyanReport = new ShowOneJianyanReportFragment();
			JianyanReport.setArguments(bundle);
			fragmentTransaction
					.replace(R.id.contentView, JianyanReport, "left");
		}

		fragmentTransaction.commit();
	}
}