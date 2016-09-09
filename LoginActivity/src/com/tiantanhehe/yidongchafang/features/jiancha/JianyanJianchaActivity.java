/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ChafangOverviewActivity.java
 * @Package com.tiantanhehe.yidongchafang.features.overview
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.features.jiancha;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.bean.JianyanJianchaBean;
import com.tiantanhehe.yidongchafang.bean.JianyanJianchaBean.JianchaResultBean;
import com.tiantanhehe.yidongchafang.utils.HttpClientUtils;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuBrowserActivity;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

public class JianyanJianchaActivity extends YiDongYiHuBrowserActivity {
	private Gson gson;
	private Context context;
	private EditText edt_shenqingshijian, edt_jianchamingcheng, edt_yichangqingkuang;
	private Spinner spinner_jianchakeshi;
	private Button bt_shaixuan;
	private ListView listView_jianyanjiancha;
	private JianyanJianchaBean JianyanJianchaBean;
	private ArrayList<JianyanJianchaBean.JianchaResultBean> listdata;
	private HttpClientUtils httpClientUtils = new HttpClientUtils();
	private MyJianchaAdapter myadapter;
	private String url;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_jianyanjiancha);
		orientationInit();
		initview();
		url = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
				+ current_application.appConf.current_patient_zhuyuan_id;
		getData(url);
		JianchaKeshi_suanze();
	}

	// 检验检查spinner及监听
	private void JianchaKeshi_suanze() {
		spinner_jianchakeshi = (Spinner) findViewById(R.id.spinner_jianchakeshi);
		String spinner_itme[] = getResources().getStringArray(R.array.jianyanjiancha_spinner);
		ArrayAdapter<String> spinnerAdapter = new ArrayAdapter<String>(JianyanJianchaActivity.this,
				android.R.layout.simple_spinner_item, spinner_itme);
		spinner_jianchakeshi.setAdapter(spinnerAdapter);
		spinner_jianchakeshi.setOnItemSelectedListener(new OnItemSelectedListener() {

			@Override
			public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

				String keshi_name = parent.getItemAtPosition(position).toString();
				if (keshi_name.equals("任意")) {

					getData(url);
				} else if (keshi_name.equals("检验")) {
					String jianyan_url = current_application.appConf.server_url
							+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
							+ current_application.appConf.current_patient_zhuyuan_id + "/jiancha_keshi_name/检验科";
					getData(jianyan_url);
				} else if (keshi_name.equals("超声")) {
					String chaosheng_url = current_application.appConf.server_url
							+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
							+ current_application.appConf.current_patient_zhuyuan_id + "/jiancha_keshi_name/超声科";
					getData(chaosheng_url);
				} else if (keshi_name.equals("放射")) {
					String fangshe_url = current_application.appConf.server_url
							+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
							+ current_application.appConf.current_patient_zhuyuan_id + "/jiancha_keshi_name/放射科";
					getData(fangshe_url);

				}

			}

			@Override
			public void onNothingSelected(AdapterView<?> parent) {

			}

		});

	}

	// 筛选按钮监听事件
	public void jianchaShaixun(View view) {
		String edt_shenqingshijian_content = edt_shenqingshijian.getText().toString();
		String edt_jianchamingcheng_content = edt_jianchamingcheng.getText().toString();
		String edt_yichangqingkuang_content = edt_yichangqingkuang.getText().toString();

		getData(url);

		if (!"".equals(edt_shenqingshijian_content)) {
			String shijian_shaixuan_url = current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
					+ current_application.appConf.current_patient_zhuyuan_id + "/shenqing_time/"
					+ edt_shenqingshijian_content;
			getData(shijian_shaixuan_url);

		} else if (!"".equals(edt_jianchamingcheng_content))

		{
			String mingcheng_shaixuan_url = current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
					+ current_application.appConf.current_patient_zhuyuan_id + "/jiancha_mingcheng/"
					+ edt_jianchamingcheng_content;
			getData(mingcheng_shaixuan_url);

		} else if (!"".equals(edt_yichangqingkuang_content))

		{
			String yichang_shaixuan_url = current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/jianyanJianchaListPad/zhuyuan_id/"
					+ current_application.appConf.current_patient_zhuyuan_id + "/jiancha_yichangjieguo/"
					+ edt_yichangqingkuang_content;
			getData(yichang_shaixuan_url);
		}

	}

	// 获取数据
	private void getData(String urlString) {

		JianyanJianchaBean = new JianyanJianchaBean();
		listdata = new ArrayList<JianyanJianchaBean.JianchaResultBean>();
		gson = new Gson();
		try {
			// 获取json数据
			String jianyan_jiancha = httpClientUtils.httpGet(urlString);
			// 解析json字符串
			JianyanJianchaBean = gson.fromJson(jianyan_jiancha, JianyanJianchaBean.getClass());
			listdata = (ArrayList<JianchaResultBean>) JianyanJianchaBean.getJiancha_result();
			setAdapter(listdata);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	// 初始化控件
	private void initview() {
		edt_jianchamingcheng = (EditText) findViewById(R.id.edt_jianchamingcheng);
		edt_shenqingshijian = (EditText) findViewById(R.id.edt_shenqingshijian);
		edt_yichangqingkuang = (EditText) findViewById(R.id.edt_yichangqingkuang);
		bt_shaixuan = (Button) findViewById(R.id.bt_shaixuan);
		listView_jianyanjiancha = (ListView) findViewById(R.id.listView_jianyanjiancha);

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

	// 获取适配器
	public void setAdapter(ArrayList<JianyanJianchaBean.JianchaResultBean> arrays) {
		if (myadapter != null) {
			myadapter = null;
		}
		myadapter = new MyJianchaAdapter(arrays);
		listView_jianyanjiancha.setAdapter(myadapter);
		listView_jianyanjiancha.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				String shenqing_time = listdata.get(position).getShenqing_time();
				String songjian_keshi = listdata.get(position).getShenqing_keshi_name();
				String songjian_yisheng = listdata.get(position).getShenqing_zhe_name();
				String songjian_biaoben = listdata.get(position).getSongjian_wu();
				String jiancha_time = listdata.get(position).getJiancha_time();
				String jianyanz_zhe = listdata.get(position).getJiancha_zhe_name();
				String hedui_zhe = listdata.get(position).getHedui_zhe_name();
				String leixing = listdata.get(position).getLeixing();
				String jiancha_id = listdata.get(position).getId();
				String jiancha_code = listdata.get(position).getJiancha_code();
				if (leixing.equals("检查")) {
					Intent intent = new Intent(JianyanJianchaActivity.this, ShowOneJianchaReport.class);
					startActivity(intent);
				} else if (leixing.equals("检验")) {
					Intent intent = new Intent(JianyanJianchaActivity.this, ShowOneJianyanReport.class);
					intent.putExtra("jiancha_id", jiancha_id);
					intent.putExtra("shenqing_time", shenqing_time);
					intent.putExtra("songjian_keshi", songjian_keshi);
					intent.putExtra("songjian_yisheng", songjian_yisheng);
					intent.putExtra("songjian_biaoben", songjian_biaoben);
					intent.putExtra("jiancha_time", jiancha_time);
					intent.putExtra("jianyanz_zhe", jianyanz_zhe);
					intent.putExtra("hedui_zhe", hedui_zhe);
					intent.putExtra("jiancha_code", jiancha_code);
					intent.putExtra("zhuangtai", listdata.get(position).getJiancha_zhuangtai());
					startActivity(intent);
				}

			}

		});
	}

	// 自定义适配器
	class MyJianchaAdapter extends BaseAdapter {
		private ArrayList<JianyanJianchaBean.JianchaResultBean> list;

		public MyJianchaAdapter(ArrayList<JianchaResultBean> list) {
			super();
			this.list = list;
		}

		@Override
		public int getCount() {
			if (list == null) {
				return 0;
			}
			return list.size();
		}

		@Override
		public Object getItem(int position) {
			return list.get(position);
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
				convertView = View.inflate(JianyanJianchaActivity.this, R.layout.jianyanjiancha_list_item, null);
				holder.tv_shenqingshijian = (TextView) convertView.findViewById(R.id.tv_shenqingshijian);
				holder.tv_jiancha_keshi = (TextView) convertView.findViewById(R.id.tv_jiancha_keshi);
				holder.tv_jiancha_mingcheng = (TextView) convertView.findViewById(R.id.tv_jiancha_mingcheng);
				holder.tv_yichangqingkuang = (TextView) convertView.findViewById(R.id.tv_baogaoshijian);
				convertView.setTag(holder);
			} else {
				holder = (ViewHolder) convertView.getTag();

			}
			if (position % 2 == 0) {
				convertView.setBackgroundColor(Color.WHITE);
			} else {
				convertView.setBackgroundColor(convertView.getResources().getColor(R.color.jianyanjiancha_list));
			}
			holder.tv_shenqingshijian.setText(list.get(position).getShenqing_time());
			holder.tv_jiancha_keshi.setText(list.get(position).getJiancha_keshi_name());
			holder.tv_jiancha_mingcheng.setText(list.get(position).getJiancha_mingcheng());
			holder.tv_yichangqingkuang.setText(list.get(position).getJiancha_yichangjieguo());
			return convertView;
		}

		class ViewHolder {
			private TextView tv_shenqingshijian;
			private TextView tv_jiancha_keshi;
			private TextView tv_jiancha_mingcheng;
			private TextView tv_yichangqingkuang;
		}
	}

}
