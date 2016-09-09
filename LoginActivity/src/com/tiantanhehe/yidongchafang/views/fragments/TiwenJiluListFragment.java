package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import android.os.Bundle;
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

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuActivity;
import com.tiantanhehe.yidongchafang.views.adapters.TiwenjiluAdapter;
import com.tiantanhehe.yidongchafang.views.views.CustomListview;

public class TiwenJiluListFragment extends Fragment {
	private CustomListview listview;
	private View view;
	private Spinner  pages;
	private String server_url, current_patient_zhuyuan_id;
	private TiwenjiluAdapter adapter;
	private List<Map<String, Object>> listData;
	private Map<String, String> map;
	private LinearLayout bottom_page;
	private TextView detail;
	private String url;
	private boolean clickState = false;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		view = inflater.inflate(R.layout.activity_tiwenjilu_list, container,
				false);
		listview = (CustomListview) view.findViewById(R.id.tiwenlist);
		Bundle bundle = getArguments();
		server_url = bundle.getString("server_url");
		current_patient_zhuyuan_id = bundle
				.getString("current_patient_zhuyuan_id");
		url = server_url
				+ "Mobile/YidongChafangClientCommunication/ShowTiwenJiludanListJson";
		map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);
		initView();
		getData(url,map);
		return view;
	}
	
	private void initView()
	{
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
						map.put("page", (pages.getSelectedItemId()+1)+"");
						if(clickState)
						{
							getData(url,map);
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
	
	private void getData(String url,final Map<String, String> map) {
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpdata) {
				listData = httpdata;
				adapter = new TiwenjiluAdapter(listData, getActivity());
				listview.setAdapter(adapter);
				listview.setOnItemClickListener(new OnItemClickListener() {
					@Override
					public void onItemClick(AdapterView<?> arg0, View arg1,
							int arg2, long arg3) {
						// TODO Auto-generated method stub
						YiDongYiHuActivity yidongyihu = (YiDongYiHuActivity ) getActivity();
						yidongyihu.jiazaiWebJiemian(server_url+"TiwenJiludan/showSancedan/zhuyuan_id/"+current_patient_zhuyuan_id+"/count/"+listData.get(arg2).get("count").toString()+"/week_begin/"+listData.get(arg2).get("week_begin").toString()+"/week_end/"+listData.get(arg2).get("week_end").toString());
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
	
	private void setQitaInfo()
	{
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
		detail.setText("每页显示"+listData.get(0).get("pageSize").toString()+"条/共"+listData.get(0).get("zongtiaoshu").toString()+"条");
		int num = Integer.parseInt(listData.get(0).get("page_number").toString());
		if(num < 1)
		{
			return;
		}
		String pagesString[] = new String[num];
		for (int i = 0; i < pagesString.length; i++) {
			pagesString[i] = "第 "+String.valueOf(i + 1)+" 页";
		}
		ArrayAdapter<String> pageadapter = new ArrayAdapter<String>(
				getActivity(), android.R.layout.simple_spinner_item,
				pagesString);
		pageadapter
				.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		//pages.setSelection(0, true);
		pages.setAdapter(pageadapter);
	}
}
