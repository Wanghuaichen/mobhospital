package com.tiantanhehe.yidongchafang.features.jiancha;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.bean.JianchaResultBean;
import com.tiantanhehe.yidongchafang.utils.HttpClientUtils;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuActivity;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.widget.TextView;

public class ShowOneJianchaReport extends YiDongYiHuActivity {
	Intent intent;
	private String baogao_id;
	TextView tv_yiyuan_name, tv_baogao_name, tv_xingming, tv_xingbie, tv_nianling, tv_yingxiang_hao, tv_shebei_leixing,
			tv_jiancha_buwei, tv_jiancha_xiangmu, tv_jiancha_riqi, tv_suojian, tv_tishi;
	private HttpClientUtils httpClientUtils;
	private JianchaResultBean jianchaResultBean;
	private Gson gson;
	private List<JianchaResultBean.ResultBean> list;
	private String urlstring = current_application.appConf.server_url
			+ "Mobile/YidongChafangClientCommunication/getJianchaResultPad/jiancha_id/";

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_show_one_jiancha_report);
		orientationInit();
		intent = getIntent();
		baogao_id = intent.getStringExtra("jiancha_id");
		initView();
		InitData();

	}

	private void InitData() {
		httpClientUtils = new HttpClientUtils();
		jianchaResultBean = new JianchaResultBean();
		list = new ArrayList<JianchaResultBean.ResultBean>();
		gson = new Gson();
		String url = urlstring + baogao_id;
		try {
			String result = httpClientUtils.httpGet(url);
			jianchaResultBean = gson.fromJson(result, JianchaResultBean.class);
			list = jianchaResultBean.getResult();
			tv_yiyuan_name.setText(current_application.appConf.hospital_name);
			tv_xingming.setText(current_application.appConf.current_patient_xingming);
			tv_xingbie.setText(current_application.appConf.current_patient_xingbie);
			for (int i = 0; i < list.size(); i++) {
				tv_baogao_name.setText(list.get(i).getJiancha_mingcheng());
				tv_yingxiang_hao.setText(list.get(i).getJiancha_code());
				tv_shebei_leixing.setText(list.get(i).getJiancha_shebei());
				tv_jiancha_buwei.setText(list.get(i).getJiancha_buwei());
				tv_suojian.setText(list.get(i).getYingxiang_miaoshu());
				tv_tishi.setText(list.get(i).getYingxiang_jianyi());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void initView() {
		tv_yiyuan_name = (TextView) findViewById(R.id.yiyuan_name);
		tv_baogao_name = (TextView) findViewById(R.id.baogao_name);
		tv_xingming = (TextView) findViewById(R.id.xingming);
		tv_xingbie = (TextView) findViewById(R.id.xingbie);
		tv_nianling = (TextView) findViewById(R.id.nianling);
		tv_yingxiang_hao = (TextView) findViewById(R.id.yingxiang_hao);
		tv_shebei_leixing = (TextView) findViewById(R.id.shebei_leixing);
		tv_jiancha_buwei = (TextView) findViewById(R.id.jiancha_buwei);
		tv_jiancha_xiangmu = (TextView) findViewById(R.id.baogao_riqi);
		tv_suojian = (TextView) findViewById(R.id.suojian);
		tv_tishi = (TextView) findViewById(R.id.tishi);

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

}
