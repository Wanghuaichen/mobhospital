package com.tiantanhehe.yidongchafang.features.jiancha;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.bean.JianyanResultBean;
import com.tiantanhehe.yidongchafang.bean.JianyanResultBean.ResultBean;
import com.tiantanhehe.yidongchafang.utils.HttpClientUtils;
import com.tiantanhehe.yidongchafang.utils.StringUtil;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuBrowserActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

public class ShowOneJianyanReport extends YiDongYiHuBrowserActivity {
	Intent intent;
	private JianyanResultBean jianyanResultBean;
	private ArrayList<JianyanResultBean.ResultBean> arrayList;
	private HttpClientUtils httpClientUtils;
	private Gson gson;
	private String baogao_id;
	private ListView jianyanListview;
	private String jiancha_zhuangtai;
	private String url;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_show_one_jianyan_report);
		orientationInit();
		intent = getIntent();
		baogao_id = intent.getStringExtra("jiancha_id");
		jiancha_zhuangtai = intent.getStringExtra("zhuangtai");
		url = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/getJianyanResultPad/jiancha_id/";
		initView();
		InitDatat();
		getData(url + baogao_id);
	}

	private void initView() {
		jianyanListview = (ListView) findViewById(R.id.jianyan_result_list);

	}

	private void InitDatat() {
		String shenqing_time = intent.getStringExtra("shenqing_time");
		String songjian_keshi = intent.getStringExtra("songjian_keshi");
		String songjian_yisheng = intent.getStringExtra("songjian_yisheng");
		String songjian_biaoben = intent.getStringExtra("songjian_biaoben");
		String jiancha_time = intent.getStringExtra("jiancha_time");
		String jianyan_zhe = intent.getStringExtra("jianyanz_zhe");
		String hedui_zhe = intent.getStringExtra("hedui_zhe");
		String jiancha_code = intent.getStringExtra("jiancha_code");
		final String zhuyuan_id = current_application.appConf.current_patient_zhuyuan_id;
		final String xingming = current_application.appConf.current_patient_xingming;
		final String xingbie = current_application.appConf.current_patient_xingbie;
		final String nianling = current_application.appConf.current_patient_nianling;
		// 设置报告表头信息
		((TextView) findViewById(R.id.yiyuan_name)).setText(current_application.appConf.hospital_name);
		((TextView) findViewById(R.id.zhuyuan_id)).setText(zhuyuan_id);
		((TextView) findViewById(R.id.xingbie)).setText(xingbie);
		((TextView) findViewById(R.id.nianling)).setText(nianling);
		((TextView) findViewById(R.id.jianyan_bianhao)).setText(jiancha_code);
		((TextView) findViewById(R.id.songjian_keshi)).setText(songjian_keshi);
		((TextView) findViewById(R.id.songjian_yishi)).setText(songjian_yisheng);
		((TextView) findViewById(R.id.shenqing_shijian)).setText(shenqing_time);
		((TextView) findViewById(R.id.songjian_biaoben)).setText(songjian_biaoben);
		((TextView) findViewById(R.id.jianyan_shijian)).setText(jiancha_time);
		((TextView) findViewById(R.id.jianyanzhe)).setText(jianyan_zhe);
		((TextView) findViewById(R.id.heduizhe)).setText(hedui_zhe);

		// 设置报告单

	}

	/**
	 * 屏幕方向
	 */
	public void orientationInit() {
		if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
				&& current_application.appConf.screen_orientation == 1) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		} else if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
				&& current_application.appConf.screen_orientation == 2) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		} else if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE
				&& current_application.appConf.screen_orientation == 4) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
		}

	}

	private void getData(String url) {
		httpClientUtils = new HttpClientUtils();
		gson = new Gson();
		jianyanResultBean = new JianyanResultBean();
		arrayList = new ArrayList<JianyanResultBean.ResultBean>();
		try {
			String result = httpClientUtils.httpGet(url);
			jianyanResultBean = gson.fromJson(result, JianyanResultBean.class);
			arrayList = (ArrayList<ResultBean>) jianyanResultBean.getResult();
			jianyanListview.setAdapter(new MyjianyanResultAdapter(arrayList));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	class MyjianyanResultAdapter extends BaseAdapter {
		private ArrayList<JianyanResultBean.ResultBean> lisdata;

		public MyjianyanResultAdapter(ArrayList<JianyanResultBean.ResultBean> lisdata) {
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
				convertView = View.inflate(ShowOneJianyanReport.this, R.layout.jianyan_result_list_item, null);
				holder.tv_jianyan_mingcheng = (TextView) convertView.findViewById(R.id.jianyan_mingcheng);
				holder.linearLayout = (LinearLayout) convertView.findViewById(R.id.jianyanresult_item);
				holder.tv_jianyan_jiancheng = (TextView) convertView.findViewById(R.id.jianyan_jiancheng);
				holder.tv_jianyan_jieguo = (TextView) convertView.findViewById(R.id.jianyan_jieguo);
				holder.tv_jianyan_zhuangtai = (TextView) convertView.findViewById(R.id.jianyan_zhuangtai);
				holder.tv_jianyan_danwei = (TextView) convertView.findViewById(R.id.jianyan_danwei);
				holder.tv_jianyan_cankaozhi = (TextView) convertView.findViewById(R.id.jianyan_cankaozhi);
				convertView.setTag(holder);
			} else {
				holder = (ViewHolder) convertView.getTag();

			}
			holder.tv_jianyan_mingcheng.setText(lisdata.get(position).getZhongwen_mingcheng());
			holder.tv_jianyan_jiancheng.setText(lisdata.get(position).getYingwen_mingcheng());
			holder.tv_jianyan_jieguo.setText(lisdata.get(position).getJiancha_result());
			holder.tv_jianyan_zhuangtai.setText(jiancha_zhuangtai);
			holder.tv_jianyan_danwei.setText(lisdata.get(position).getDanwei());
			String yichang = lisdata.get(position).getYichang_tag();
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
