package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuActivity;

public class ShowOneJianchaReportFragment extends Fragment {
	private View view;
	private String server_url, current_patient_xingming,
			current_patient_bingchuang_hao, current_patient_xingbie,
			current_patient_nianling, baogao_id, jiancha_keshi_name;
	Intent intent;
	TextView tv_yiyuan_name, tv_baogao_name, tv_xingming, tv_xingbie,
			tv_nianling, tv_yingxiang_hao, tv_shebei_leixing, tv_jiancha_buwei,
			tv_baogao_riqi, tv_jiancha_riqi, tv_suojian, tv_tishi,
			shenqing_keshi_name, zhuyuan_id, baogao_yizhi, shenhe_yishi,
			shenqi_yishi, bingchuanghao, shenbeixinghao,ct_tuxiang,fangshe_tuxiang,chaosheng_tuxiang;
	private ImageView fanhui_bt;
	private String urlstring = "";
	private YiDongYiHuActivity yidongyihu;

	public static ShowOneJianchaReportFragment newInstance() {
		ShowOneJianchaReportFragment fragment1 = new ShowOneJianchaReportFragment();
		return fragment1;
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		yidongyihu = (YiDongYiHuActivity) getActivity();
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_patient_nianling = neirong
				.getString("current_patient_nianling");
		baogao_id = neirong.getString("baogao_id");
		current_patient_xingming = neirong
				.getString("current_patient_xingming");
		current_patient_xingbie = neirong.getString("current_patient_xingbie");
		jiancha_keshi_name = neirong.getString("jiancha_keshi_name");
		current_patient_bingchuang_hao = neirong
				.getString("current_patient_bingchuang_hao");
		if (jiancha_keshi_name.equals("超声科")) {
			view = inflater.inflate(
					R.layout.activity_show_one_jiancha_chaosheng_report,
					container, false);
			bingchuanghao = (TextView) view.findViewById(R.id.bingchuanghao);
			shenbeixinghao = (TextView) view.findViewById(R.id.shenbeixinghao);
			chaosheng_tuxiang = (TextView) view.findViewById(R.id.chaosheng_tuxiang);
			chaosheng_tuxiang.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View arg0) {
					// TODO Auto-generated method stub
					//openUrl("http://www.qq.com");
				}
			});
		} else if (jiancha_keshi_name.equals("放射科")) {
			view = inflater.inflate(
					R.layout.activity_show_one_jiancha_fangshe_report,
					container, false);
			fangshe_tuxiang = (TextView) view.findViewById(R.id.fangshe_tuxiang);
			fangshe_tuxiang.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View arg0) {
					// TODO Auto-generated method stub
					//openUrl("http://www.sina.com.cn");
				}
			});
		} else if (jiancha_keshi_name.equals("CT室")) {
			view = inflater.inflate(
					R.layout.activity_show_one_jiancha_ct_report, container,
					false);
			bingchuanghao = (TextView) view.findViewById(R.id.bingchuanghao);
			shenbeixinghao = (TextView) view.findViewById(R.id.shenbeixinghao);
			shenqi_yishi = (TextView) view.findViewById(R.id.shenqi_yishi);
			ct_tuxiang = (TextView) view.findViewById(R.id.ct_tuxiang);
			ct_tuxiang.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View arg0) {
					// TODO Auto-generated method stub
					//openUrl("https://www.baidu.com");
				}
			});
		} else {
			view = inflater.inflate(R.layout.activity_show_one_jiancha_report,
					container, false);
		}

		urlstring = server_url
				+ "Mobile/YidongChafangClientCommunication/getJianchaResultPad/jiancha_id/";
		initView();
		InitData();
		return view;
	}

	private void InitData() {
		Map<String, String> map = new HashMap<String, String>();
		map.put("jiancha_id", baogao_id);
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(List<Map<String, Object>> httpdata) {
				if (httpdata != null && httpdata.size() > 0) {
					setViewvalue(httpdata);
				}
			}
		}).getDataFromServer(urlstring, map);
	}

	private void setViewvalue(List<Map<String, Object>> httpdata) {
		tv_xingming.setText(current_patient_xingming);
		tv_xingbie.setText(current_patient_xingbie);
		tv_nianling.setText(current_patient_nianling);
		for (int i = 0; i < httpdata.size(); i++) {
			tv_yiyuan_name.setText(httpdata.get(i).get("hospital_name")
					.toString());
			tv_baogao_name.setText(httpdata.get(i).get("jiancha_mingcheng")
					.toString());
			tv_baogao_riqi.setText(httpdata.get(i).get("shenhe_time")
					.toString());
			tv_yingxiang_hao.setText(httpdata.get(i).get("jiancha_code")
					.toString());
			tv_shebei_leixing.setText(httpdata.get(i).get("jiancha_shebei")
					.toString());
			tv_jiancha_buwei.setText(httpdata.get(i).get("jiancha_buwei")
					.toString());
			tv_jiancha_riqi.setText(httpdata.get(i).get("jiancha_time")
					.toString());
			tv_suojian.setText(httpdata.get(i).get("yingxiang_miaoshu")
					.toString());
			tv_tishi.setText(httpdata.get(i).get("yingxiang_jianyi").toString());
			shenqing_keshi_name.setText(httpdata.get(i)
					.get("shenqing_keshi_name").toString());
			zhuyuan_id.setText(httpdata.get(i).get("zhixing_id").toString());
			baogao_yizhi.setText(httpdata.get(i).get("hedui_doctor_name")
					.toString());
			shenhe_yishi.setText(httpdata.get(i).get("hedui_doctor_name")
					.toString());
			if (jiancha_keshi_name.equals("超声科")) {
				bingchuanghao.setText(current_patient_bingchuang_hao);
				shenbeixinghao.setText(httpdata.get(i).get("jiancha_shebei")
						.toString());
			} else if (jiancha_keshi_name.equals("放射科")) {

			} else if (jiancha_keshi_name.equals("CT室")) {
				bingchuanghao.setText(current_patient_bingchuang_hao);
				shenbeixinghao.setText(httpdata.get(i).get("jiancha_shebei")
						.toString());
				shenqi_yishi.setText(httpdata.get(i).get("shenqing_zhe_name")
						.toString());
			}
		}
	}

	private void initView() {
		tv_yiyuan_name = (TextView) view.findViewById(R.id.yiyuan_name);
		tv_baogao_name = (TextView) view.findViewById(R.id.baogao_name);
		tv_xingming = (TextView) view.findViewById(R.id.xingming);
		tv_xingbie = (TextView) view.findViewById(R.id.xingbie);
		tv_nianling = (TextView) view.findViewById(R.id.nianling);
		tv_yingxiang_hao = (TextView) view.findViewById(R.id.yingxiang_hao);
		tv_shebei_leixing = (TextView) view.findViewById(R.id.shebei_leixing);
		tv_jiancha_buwei = (TextView) view.findViewById(R.id.jiancha_buwei);
		tv_baogao_riqi = (TextView) view.findViewById(R.id.baogao_riqi);
		tv_jiancha_riqi = (TextView) view.findViewById(R.id.jiancha_riqi);
		tv_suojian = (TextView) view.findViewById(R.id.suojian);
		tv_tishi = (TextView) view.findViewById(R.id.tishi);
		shenqing_keshi_name = (TextView) view
				.findViewById(R.id.shenqing_keshi_name);
		zhuyuan_id = (TextView) view.findViewById(R.id.zhuyuan_id);
		baogao_yizhi = (TextView) view.findViewById(R.id.baogao_yizhi);
		shenhe_yishi = (TextView) view.findViewById(R.id.shenhe_yishi);
		fanhui_bt = (ImageView) view.findViewById(R.id.fanhui_bt);
		fanhui_bt.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				yidongyihu.setNewFragment(getString(R.string.jianchajilu));
			}
		});
	}

	private void openUrl(String str) {
		Uri uri = Uri.parse(str);
		Intent intent = new Intent(Intent.ACTION_VIEW, uri);
		startActivity(intent);
	}
}