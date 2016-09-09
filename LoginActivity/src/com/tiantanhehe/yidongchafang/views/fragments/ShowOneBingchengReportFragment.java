package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class ShowOneBingchengReportFragment extends Fragment {
	private View view;
	private String server_url, bingcheng_id, tap;
	Intent intent;
	TextView bingcheng_name,bingcheng_time,bingcheng_conten,bingcheng_jiluren;
	private String urlstring, urlstring2, urlstring3;
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

		view = inflater
				.inflate(R.layout.activity_show_one_bingcheng_report,container,false);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		bingcheng_id = neirong.getString("bingcheng_id");
		urlstring = neirong.getString("showoneBingchengUrl");
		urlstring2 = neirong.getString("ruyuanjiluUrl");
		urlstring3 = neirong.getString("chuyuanjiluUrl");
		tap = neirong.getString("tap");
		// urlstring = server_url
		// +
		// "Mobile/YidongChafangClientCommunication/getBingchengJiluResultDataJson/bingcheng_id/"+bingcheng_id;
		initView();
		if (tap.equals("病程")) {
			InitData(urlstring);
		} else if (tap.equals("入院")) {
			InitData(urlstring2);
		} else if (tap.equals("出院")) {
			InitData(urlstring3);

		}

		return view;
	}
	
	private void initView() {
		bingcheng_name = (TextView) view.findViewById(R.id.bingcheng_name);
		bingcheng_time = (TextView) view.findViewById(R.id.bingcheng_time);
		bingcheng_conten = (TextView) view.findViewById(R.id.bingcheng_conten);
		bingcheng_jiluren = (TextView) view.findViewById(R.id.bingcheng_jiluren);
	}
	
	private void InitData(String url) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("bingcheng_id", bingcheng_id);
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(List<Map<String, Object>> httpdata) {
				if (httpdata != null && httpdata.size() > 0) {
					setViewValue(httpdata);
				}
			}
		}).getDataFromServer(url, map);
	}

	private void setViewValue(List<Map<String, Object>> httpdata)
	{
		if (tap.equals("病程")) {
			bingcheng_name.setText(httpdata.get(0).get("chafang_doctor").toString() + ""
					+ httpdata.get(0).get("bingcheng_sub_leibie").toString());
			bingcheng_time.setText(httpdata.get(0).get("record_time").toString());
			bingcheng_conten.setText(httpdata.get(0).get("content").toString());
			bingcheng_jiluren.setText(httpdata.get(0).get("chafang_doctor").toString());
		} else if (tap.equals("入院")) {
			bingcheng_name.setText(httpdata.get(0).get("biaodan_name").toString());
			bingcheng_time.setText(httpdata.get(0).get("record_time").toString());
			bingcheng_conten.setText(httpdata.get(0).get("yibanqingkuang").toString());
			bingcheng_jiluren.setText(httpdata.get(0).get("doctor_name").toString());
		} else {
			bingcheng_name.setText(httpdata.get(0).get("biaodan_name").toString());
			bingcheng_time.setText(httpdata.get(0).get("record_time").toString());
			bingcheng_conten.setText(httpdata.get(0).get("yibanqingkuang").toString());
			bingcheng_jiluren.setText(httpdata.get(0).get("doctor_name").toString());
		}

	}
}