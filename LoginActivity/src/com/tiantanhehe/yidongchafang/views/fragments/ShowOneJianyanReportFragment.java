package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.utils.StringUtil;

public class ShowOneJianyanReportFragment extends Fragment {
	private View view;
	private TextView hospital_name, baogao_name, shenqing_time, songjian_keshi,
			songjian_yisheng, songjian_biaoben, jiancha_time, jianyan_zhe,
			hedui_zhe, jiancha_code;
	private String server_url, current_patient_zhuyuan_id,
			current_patient_xingming, current_patient_nianling,
			current_patient_xingbie, baogao_id, jiancha_zhuangtai;
	Intent intent;
	private ListView jianyanListview;
	private String url;

	public static ShowOneJianyanReportFragment newInstance() {
		ShowOneJianyanReportFragment fragment1 = new ShowOneJianyanReportFragment();
		return fragment1;
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

		view = inflater.inflate(R.layout.activity_show_one_jianyan_report,
				container, false);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_patient_zhuyuan_id = neirong
				.getString("current_patient_zhuyuan_id");
		current_patient_xingming = neirong
				.getString("current_patient_xingming");
		current_patient_nianling = neirong
				.getString("current_patient_nianling");
		current_patient_xingbie = neirong.getString("current_patient_xingbie");
		baogao_id = neirong.getString("baogao_id");
		url = server_url
				+ "Mobile/YidongChafangClientCommunication/getJianyanResultPad/";
		initView();
		InitData();
		// getData(url + baogao_id);
		return view;
	}

	private void initView() {
		jianyanListview = (ListView) view
				.findViewById(R.id.jianyan_result_list);
		// 设置报告表头信息
		((TextView) view.findViewById(R.id.xingming)).setText(current_patient_xingming);
		((TextView) view.findViewById(R.id.zhuyuan_id)).setText(current_patient_zhuyuan_id);
		((TextView) view.findViewById(R.id.xingbie)).setText(current_patient_xingbie);
		((TextView) view.findViewById(R.id.nianling)).setText(current_patient_nianling);
		hospital_name = (TextView) view.findViewById(R.id.yiyuan_name);
		baogao_name = (TextView) view.findViewById(R.id.baogao_name);
		jiancha_code = (TextView) view.findViewById(R.id.jianyan_bianhao);
		songjian_keshi = (TextView) view.findViewById(R.id.songjian_keshi);
		songjian_yisheng = (TextView) view.findViewById(R.id.songjian_yishi);
		shenqing_time = (TextView) view.findViewById(R.id.shenqing_shijian);
		songjian_biaoben = (TextView) view.findViewById(R.id.songjian_biaoben);
		jiancha_time = (TextView) view.findViewById(R.id.jianyan_shijian);
		jianyan_zhe = (TextView) view.findViewById(R.id.jianyanzhe);
		hedui_zhe = (TextView) view.findViewById(R.id.heduizhe);
	}

	private void InitData() {
		Map<String, String> map = new HashMap<String, String>();
		map.put("jiancha_id", baogao_id);
		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(List<Map<String, Object>> httpdata) {
				if (httpdata != null && httpdata.size() > 0) {
					jianyanListview.setAdapter(new MyjianyanResultAdapter(
							httpdata));
					hospital_name.setText(httpdata.get(0).get("hospital_name").toString());
					baogao_name.setText(httpdata.get(0).get("baogao_name").toString());
					jiancha_code.setText(httpdata.get(0).get("jiancha_code").toString());
					songjian_keshi.setText(httpdata.get(0).get("songjian_keshi").toString());
					songjian_yisheng.setText(httpdata.get(0).get("songjian_yisheng").toString());
					shenqing_time.setText(httpdata.get(0).get("shenqing_time").toString());
					songjian_biaoben.setText(httpdata.get(0).get("songjian_biaoben").toString());
					jiancha_time.setText(httpdata.get(0).get("jiancha_time").toString());
					jianyan_zhe.setText(httpdata.get(0).get("jianyan_zhe").toString());
					hedui_zhe.setText(httpdata.get(0).get("hedui_zhe").toString());
				}
			}
		}).getDataFromServer(url, map);
	}

	class MyjianyanResultAdapter extends BaseAdapter {
		private List<Map<String, Object>> lisdata;

		public MyjianyanResultAdapter(List<Map<String, Object>> lisdata) {
			super();
			this.lisdata = lisdata;
		}

		@Override
		public int getCount() {
			if (lisdata == null) {
				return 0;
			}
			return lisdata.size();
		}

		@Override
		public Object getItem(int position) {
			return lisdata.get(position);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			ViewHolder holder;
			if (convertView == null) {
				holder = new ViewHolder();
				convertView = View.inflate(getActivity(),
						R.layout.jianyan_result_list_item, null);
				holder.tv_jianyan_mingcheng = (TextView) convertView
						.findViewById(R.id.jianyan_mingcheng);
				holder.linearLayout = (LinearLayout) convertView
						.findViewById(R.id.jianyanresult_item);
				holder.tv_jianyan_jiancheng = (TextView) convertView
						.findViewById(R.id.jianyan_jiancheng);
				holder.tv_jianyan_jieguo = (TextView) convertView
						.findViewById(R.id.jianyan_jieguo);
				holder.tv_jianyan_zhuangtai = (TextView) convertView
						.findViewById(R.id.jianyan_zhuangtai);
				holder.tv_jianyan_danwei = (TextView) convertView
						.findViewById(R.id.jianyan_danwei);
				holder.tv_jianyan_cankaozhi = (TextView) convertView
						.findViewById(R.id.jianyan_cankaozhi);
				convertView.setTag(holder);
			} else {
				holder = (ViewHolder) convertView.getTag();

			}
			holder.tv_jianyan_mingcheng.setText(lisdata.get(position)
					.get("zhongwen_mingcheng").toString());
			holder.tv_jianyan_jiancheng.setText(lisdata.get(position)
					.get("yingwen_mingcheng").toString());
			holder.tv_jianyan_jieguo.setText(lisdata.get(position)
					.get("jiancha_result").toString());
			holder.tv_jianyan_zhuangtai.setText(jiancha_zhuangtai);
			holder.tv_jianyan_danwei.setText(lisdata.get(position)
					.get("danwei").toString());
			String yichang = lisdata.get(position).get("yichang_tag")
					.toString();
			if (StringUtil.isNull(yichang)) {
				holder.linearLayout.setBackgroundColor(Color.WHITE);
			} else {
				holder.linearLayout.setBackgroundColor(Color.RED);
			}
			holder.tv_jianyan_cankaozhi.setText(yichang);
			return convertView;
		}

		class ViewHolder {
			private LinearLayout linearLayout;
			private TextView tv_jianyan_mingcheng;
			private TextView tv_jianyan_jiancheng;
			private TextView tv_jianyan_jieguo;
			private TextView tv_jianyan_zhuangtai;
			private TextView tv_jianyan_danwei;
			private TextView tv_jianyan_cankaozhi;
		}

	}
}