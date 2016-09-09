package com.tiantanhehe.yidongchafang.views.fragments;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.db.wrapper.HuanzheWrapper;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuActivity;
import com.tiantanhehe.yidongchafang.views.adapters.HuanzheAdapter;
import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.Spinner;
import android.widget.TextView;

public class HuanzheListFragment extends Fragment {
	private GridView gridView;
	private EditText edt_sousuo;
	private Button bt_sousuo;
	private Spinner patient_zhuangtai_xuanze, huanzhe_xuanze;
	private TextView zanwu;

	private YiDongYiHuActivity yidongyihu;
	private List<HuanzheWrapper> huanzhe_list = null;
	private List<Map<String, Object>> listData;
	private View view;
	private HuanzheAdapter dataAdapter;
	private String current_user_number, server_url, url;
	private Map<String, String> keyWord;

	public HuanzheListFragment() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

		view = inflater.inflate(R.layout.activity_main_patient, container,
				false);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_user_number = neirong.getString("current_user_number");
		url = server_url
				+ "Mobile/YidongChafangClientCommunication/showAllPatientDataList/";
		yidongyihu = (YiDongYiHuActivity) getActivity();
		listData = new ArrayList<Map<String, Object>>();
		initview();
		keyWord = new HashMap<String, String>();
		getBenkeshiAllHuanzhe(keyWord);
		return view;
	}

	private void initview() {
		gridView = (GridView) view.findViewById(R.id.patient_liebiao);
		huanzhe_xuanze = (Spinner) view.findViewById(R.id.huanzhe_xuanze);
		String[] departmentList = yidongyihu.mZhuyuanHuanzheDao
				.getAllUserDepartmentList().split("\\|");
		ArrayAdapter<String> pageadapter = new ArrayAdapter<String>(
				getActivity(), android.R.layout.simple_spinner_item,
				departmentList);
		pageadapter
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		// pages.setSelection(0, true);
		huanzhe_xuanze.setAdapter(pageadapter);
		huanzhe_xuanze.setSelection(0);
		patient_zhuangtai_xuanze = (Spinner) view
				.findViewById(R.id.zhuangtai_xuanze);
		edt_sousuo = (EditText) view.findViewById(R.id.edt_sousuo);
		bt_sousuo = (Button) view.findViewById(R.id.bt_sousuo);

		huanzhe_xuanze.setOnItemSelectedListener(new OnItemSelectedListener() {

			@Override
			public void onItemSelected(AdapterView<?> arg0, View arg1,
					int arg2, long arg3) {
				// TODO Auto-generated method stub
				bt_sousuo.performClick();
			}

			@Override
			public void onNothingSelected(AdapterView<?> arg0) {
				// TODO Auto-generated method stub

			}
		});

		patient_zhuangtai_xuanze
				.setOnItemSelectedListener(new OnItemSelectedListener() {

					@Override
					public void onItemSelected(AdapterView<?> arg0, View arg1,
							int arg2, long arg3) {
						// TODO Auto-generated method stub
						bt_sousuo.performClick();
					}

					@Override
					public void onNothingSelected(AdapterView<?> arg0) {
						// TODO Auto-generated method stub

					}
				});

		bt_sousuo.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				String huanzhe_leixing = huanzhe_xuanze.getSelectedItem()
						.toString();
				if (huanzhe_leixing.equals("科室患者")) {
					keyWord.remove("user_department");
					keyWord.remove("zeren_yishi");
				} else if (huanzhe_leixing.equals("我的患者")) {
					keyWord.remove("user_department");
					keyWord.put("zeren_yishi", current_user_number);
				} else {
					keyWord.remove("zeren_yishi");
					keyWord.put("user_department", huanzhe_leixing);
				}

				String zhuangtai = patient_zhuangtai_xuanze.getSelectedItem()
						.toString();
				if (!zhuangtai.equals("")) {
					keyWord.put("bingqing", zhuangtai);
				} else {
					keyWord.remove("bingqing");
				}

				String guanjianci = edt_sousuo.getText().toString();
				if (!guanjianci.equals("")) {
					keyWord.put("guanjianci", guanjianci);
				} else {
					keyWord.remove("guanjianci");
				}
				if (!huanzhe_leixing.equals("科室患者") && !huanzhe_leixing.equals("我的患者")) {
					getAllHuanzhe(url, keyWord);
				} else {
					getBenkeshiAllHuanzhe(keyWord);
				}

			}
		});
		zanwu = (TextView) view.findViewById(R.id.zanwu);
	}

	@SuppressLint("SimpleDateFormat")
	private void getBenkeshiAllHuanzhe(Map<String, String> str) {
		if (str.size() <= 0) {
			huanzhe_list = yidongyihu.mZhuyuanHuanzheDao.getAllHuanzheList();
		} else {
			huanzhe_list = yidongyihu.mZhuyuanHuanzheDao
					.getHuanzheListByKeyWord(str);
		}

		listData.clear();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (HuanzheWrapper huanzhe : huanzhe_list) {
			Map<String, Object> valueMap = huanzhe.transToMap();
			int tianshu = 0;
			try {
				Date curDateKaishi = simpleDateFormat.parse(huanzhe
						.getRuyuan_riqi_time().toString());
				Date curDateJieshu = new Date(System.currentTimeMillis());
				tianshu = getGapCount(curDateKaishi, curDateJieshu);
			} catch (Exception e) {
				// TODO: handle exception
			}
			valueMap.put("tianshu", tianshu + "天");
			listData.add(valueMap);
		}
		dataAdapter = new HuanzheAdapter(listData, getActivity());
		gridView.setAdapter(dataAdapter);
		gridView.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> parent, View view,
					int position, long id) {
				yidongyihu.qiehuanHuanzhe(listData.get(position)
						.get("zhuyuan_id").toString());
			}
		});
		if (listData.size() == 0) {
			zanwu.setVisibility(View.VISIBLE);
		} else {
			zanwu.setVisibility(View.GONE);
		}
	}

	public void getAllHuanzhe(String url, final Map<String, String> map) {
		if (map.size() <= 0) {

		} else {

		}
		listData.clear();
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpdata) {
				listData = httpdata;
				dataAdapter = new HuanzheAdapter(listData, getActivity());
				gridView.setAdapter(dataAdapter);
				gridView.setOnItemClickListener(new OnItemClickListener() {
					@Override
					public void onItemClick(AdapterView<?> parent, View view,
							int position, long id) {
						yidongyihu.qiehuanHuanzhe(listData.get(position));
					}
				});
				if (listData.size() == 0) {
					zanwu.setVisibility(View.VISIBLE);
				} else {
					zanwu.setVisibility(View.GONE);
				}
			}
		}).getDataFromServer(url, map);
	}

	/**
	 * 获取两个日期之间的间隔天数
	 * 
	 * @return
	 */
	public static int getGapCount(Date startDate, Date endDate) {
		Calendar fromCalendar = Calendar.getInstance();
		fromCalendar.setTime(startDate);
		fromCalendar.set(Calendar.HOUR_OF_DAY, 0);
		fromCalendar.set(Calendar.MINUTE, 0);
		fromCalendar.set(Calendar.SECOND, 0);
		fromCalendar.set(Calendar.MILLISECOND, 0);

		Calendar toCalendar = Calendar.getInstance();
		toCalendar.setTime(endDate);
		toCalendar.set(Calendar.HOUR_OF_DAY, 0);
		toCalendar.set(Calendar.MINUTE, 0);
		toCalendar.set(Calendar.SECOND, 0);
		toCalendar.set(Calendar.MILLISECOND, 0);

		return (int) ((toCalendar.getTime().getTime() - fromCalendar.getTime()
				.getTime()) / (1000 * 60 * 60 * 24));
	}
}