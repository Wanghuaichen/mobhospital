package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.method.ScrollingMovementMethod;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

public class ZhuyuanZonglanFragment extends Fragment {
	// 基本信息
	private TextView nianlingTextView = null;
	private TextView xingbieTextView = null;
	private TextView zhuyuanhaoTextView = null;
	private TextView bingchuanghaoTextView = null;
	private TextView suozaiBingquTextView = null;
	private TextView zhuyuanZhuangtaiTextView = null;
	private TextView ruyuanRiqiTextView = null;
	// 最新身体状况
	private TextView tiwenTextView = null;
	private TextView maiboTextView = null;
	private TextView shengaoTextView = null;
	private TextView xueyaTextView = null;
	private TextView chuliangTextView = null;
	private TextView ruliangTextView = null;
	// 最新护理状况
	private TextView huliTextView = null;
	// 最近病程记录
	private TextView bingchengJiluTextView = null;
	// 相关负责医师
	private TextView kezhurenTextView = null;
	private TextView zhurenYishiTextView = null;
	private TextView zhuzhiYishiTextView = null;
	private TextView zhuyuanYishiTextView = null;
	private TextView jinxiuYishiTextView = null;
	private TextView shixiYishiTextView = null;
	private TextView yanjiushengShixiYishiTextView = null;
	private LinearLayout kangfuzhenliao,huanzhe_guanli;
	private View view;
	private String server_url, current_patient_zhuyuan_id,current_patient_zhuyuan_id_show;
	private boolean kaifuzhiliao_kaiguan;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

		view = inflater.inflate(R.layout.activity_zhuyuan_zonglan, null);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_patient_zhuyuan_id = neirong.getString("current_patient_zhuyuan_id");
		current_patient_zhuyuan_id_show = neirong.getString("current_patient_zhuyuan_id_show");
		kaifuzhiliao_kaiguan = neirong.getBoolean("kaifuzhiliao_kaiguan");
		// 初始化界面
		dataInit();
		// 获取后台传递的数据并给界面加载数据
		getDataFromNet();
		return view;
	}

	/**
	 * 数据初始化
	 */
	private void dataInit() {
		// 基本信息
		nianlingTextView = (TextView) view.findViewById(R.id.nianling);
		xingbieTextView = (TextView) view.findViewById(R.id.xingbie);
		zhuyuanhaoTextView = (TextView) view.findViewById(R.id.zhuyuan_id);
		bingchuanghaoTextView = (TextView) view.findViewById(R.id.bingchuang_hao);
		suozaiBingquTextView = (TextView) view.findViewById(R.id.suozai_bingqu);
		zhuyuanZhuangtaiTextView = (TextView) view.findViewById(R.id.zhuyuan_zhuangtai);
		ruyuanRiqiTextView = (TextView) view.findViewById(R.id.ruyuan_riqi_time);
		// 最新身体状况
		tiwenTextView = (TextView) view.findViewById(R.id.zuijin_tiwen);
		maiboTextView = (TextView) view.findViewById(R.id.zuijin_maibo);
		shengaoTextView = (TextView) view.findViewById(R.id.zuijin_shengao);
		xueyaTextView = (TextView) view.findViewById(R.id.zuijin_xueya);
		chuliangTextView = (TextView) view.findViewById(R.id.zuijin_chuliang);
		ruliangTextView = (TextView) view.findViewById(R.id.zuijin_ruliang);
		// 最新护理状况
		huliTextView = (TextView) view.findViewById(R.id.zuijin_huli_zhuangkuang);
		// 最近病程记录
		bingchengJiluTextView = (TextView) view.findViewById(R.id.zuixin_bingcheng_jilu);
		bingchengJiluTextView.setMovementMethod(ScrollingMovementMethod.getInstance());
		// 相关负责医师
		kezhurenTextView = (TextView) view.findViewById(R.id.kezhuren);
		zhurenYishiTextView = (TextView) view.findViewById(R.id.zhuren_yishi);
		zhuzhiYishiTextView = (TextView) view.findViewById(R.id.zhuzhi_yishi);
		zhuyuanYishiTextView = (TextView) view.findViewById(R.id.zhuyuan_yishi);
		jinxiuYishiTextView = (TextView) view.findViewById(R.id.jinxiu_yishi);
		shixiYishiTextView = (TextView) view.findViewById(R.id.shixi_yishi);
		yanjiushengShixiYishiTextView = (TextView) view.findViewById(R.id.yanjiusheng_shixi_yishi);
		kangfuzhenliao = (LinearLayout) view.findViewById(R.id.kangfuzhenliao);
		huanzhe_guanli = (LinearLayout) view.findViewById(R.id.huanzhe_guanli);
		if(kaifuzhiliao_kaiguan)
		{
			huanzhe_guanli.setVisibility(View.VISIBLE);
			kangfuzhenliao.setVisibility(View.VISIBLE);
		}

	}

	/**
	 * 获取后台传递的数据
	 * 
	 * @return
	 */
	private void getDataFromNet() {
		String url = server_url + "Mobile/YidongChafangClientCommunication/showPatientZhuyuanDetailPadJson";
		Map<String, String> map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);

		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpData) {
				Map<String, Object> resultMap = new HashMap<String, Object>();
				if (httpData != null && httpData.size() > 0) {
					for (Map<String, Object> map_http : httpData) {
						resultMap = map_http;
					}
					dataInView(resultMap);// 加载界面数据
				}
			}

		}).getDataFromServer(url, map);
	}

	/**
	 * 给界面加载数据
	 * 
	 * @author arno
	 * @param resultMap
	 *            界面数据
	 */
	private void dataInView(Map<String, Object> resultMap) {

		zhuyuanhaoTextView.setText(current_patient_zhuyuan_id_show);
		if (resultMap != null) {
			// 年龄
			if (resultMap.get("nianling") != null && !resultMap.get("nianling").equals("")) {
				nianlingTextView.setText((String) resultMap.get("nianling"));
			} else {
				nianlingTextView.setText("");
			}
			// 性别
			if (resultMap.get("xingbie") != null && !resultMap.get("xingbie").equals("")) {
				xingbieTextView.setText((String) resultMap.get("xingbie"));
			} else {
				xingbieTextView.setText("");
			}
			// 病床号
			if (resultMap.get("bingchuang_hao") != null && !resultMap.get("bingchuang_hao").equals("")) {
				bingchuanghaoTextView.setText((String) resultMap.get("bingchuang_hao"));
			} else {
				bingchuanghaoTextView.setText("");
			}
			// 所在病区
			if (resultMap.get("suozai_bingqu") != null && !resultMap.get("suozai_bingqu").equals("")) {
				suozaiBingquTextView.setText((String) resultMap.get("suozai_bingqu"));
			} else {
				suozaiBingquTextView.setText("");
			}
			// 住院状态
			if (resultMap.get("zhuyuan_zhuangtai") != null && !resultMap.get("zhuyuan_zhuangtai").equals("")) {
				zhuyuanZhuangtaiTextView.setText((String) resultMap.get("zhuyuan_zhuangtai"));
			} else {
				zhuyuanZhuangtaiTextView.setText("");
			}
			// 入院日期
			if (resultMap.get("ruyuan_riqi") != null && !resultMap.get("ruyuan_riqi").equals("")) {
				ruyuanRiqiTextView.setText((String) resultMap.get("ruyuan_riqi"));
			} else {
				ruyuanRiqiTextView.setText("");
			}
			// 科主任
			if (resultMap.get("kezhuren_name") != null && !resultMap.get("kezhuren_name").equals("")) {
				kezhurenTextView.setText((String) resultMap.get("kezhuren_name"));
			} else {
				kezhurenTextView.setText("");
			}
			// 主(副)任医师
			if (resultMap.get("zhurenyishi_neme") != null && !resultMap.get("zhurenyishi_neme").equals("")) {
				zhurenYishiTextView.setText((String) resultMap.get("zhurenyishi_neme"));
			} else {
				zhurenYishiTextView.setText("");
			}
			// 主治医师
			if (resultMap.get("zhuzhi_yishi_neme") != null && !resultMap.get("zhuzhi_yishi_neme").equals("")) {
				zhuzhiYishiTextView.setText((String) resultMap.get("zhuzhi_yishi_neme"));
			} else {
				zhuzhiYishiTextView.setText("");
			}
			// 住院医师
			if (resultMap.get("zhuyuan_yishi_name") != null && !resultMap.get("zhuyuan_yishi_name").equals("")) {
				zhuyuanYishiTextView.setText((String) resultMap.get("zhuyuan_yishi_name"));
			} else {
				zhuyuanYishiTextView.setText("");
			}
			// 进修医师
			if (resultMap.get("jinxiu_yishi_name") != null && !resultMap.get("jinxiu_yishi_name").equals("")) {
				jinxiuYishiTextView.setText((String) resultMap.get("jinxiu_yishi_name"));
			} else {
				jinxiuYishiTextView.setText("");
			}
			// 实习医师
			if (resultMap.get("shixi_yishi_name") != null && !resultMap.get("shixi_yishi_name").equals("")) {
				shixiYishiTextView.setText((String) resultMap.get("shixi_yishi_name"));
			} else {
				shixiYishiTextView.setText("");
			}
			// 研究生实习医师
			if (resultMap.get("yanjiusheng_shixi_yishi_name") != null
					&& !resultMap.get("yanjiusheng_shixi_yishi_name").equals("")) {
				yanjiushengShixiYishiTextView.setText((String) resultMap.get("yanjiusheng_shixi_yishi_name"));
			} else {
				yanjiushengShixiYishiTextView.setText("");
			}
			// 体温
			if (resultMap.get("tiwen") != null && !resultMap.get("tiwen").equals("")) {
				tiwenTextView.setText((String) resultMap.get("tiwen"));
			} else {
				tiwenTextView.setText("");
			}
			// 脉搏
			if (resultMap.get("maibo") != null && !resultMap.get("maibo").equals("")) {
				maiboTextView.setText((String) resultMap.get("maibo"));
			} else {
				maiboTextView.setText("");
			}
			// 血压
			if (resultMap.get("xueya") != null && !resultMap.get("xueya").equals("")) {
				xueyaTextView.setText((String) resultMap.get("xueya"));
			} else {
				xueyaTextView.setText("");
			}
			// 身高
			if (resultMap.get("shengao") != null && !resultMap.get("shengao").equals("")) {
				shengaoTextView.setText((String) resultMap.get("shengao"));
			} else {
				shengaoTextView.setText("");
			}
			// 入量
			if (resultMap.get("ruliang") != null && !resultMap.get("ruliang").equals("")) {
				ruliangTextView.setText((String) resultMap.get("ruliang"));
			} else {
				ruliangTextView.setText("");
			}
			// 出量
			if (resultMap.get("chuliang") != null && !resultMap.get("chuliang").equals("")) {
				chuliangTextView.setText((String) resultMap.get("chuliang"));
			} else {
				chuliangTextView.setText("");
			}
			// 护理状况
			if (resultMap.get("hulizhuangkuang") != null && !resultMap.get("hulizhuangkuang").equals("")) {
				huliTextView.setText((String) resultMap.get("hulizhuangkuang"));
			} else {
				huliTextView.setText("");
			}
			// 病程记录
			if (resultMap.get("bingchengjilu") != null && !resultMap.get("bingchengjilu").equals("")) {
				bingchengJiluTextView.setText((String) resultMap.get("bingchengjilu"));
			} else {
				bingchengJiluTextView.setText("");
			}

			// 康复治疗
			if (resultMap.get("kangfu_array") != null && !resultMap.get("kangfu_array").equals("")) {
				String[] kangfu_array = resultMap.get("kangfu_array").toString().split(",");
				final Spinner kangfu_zhilaio = (Spinner) view.findViewById(R.id.kangfu_zhilaio);

				ArrayAdapter<String> adapter;// 数组 配置器 下拉菜单赋值用
				// 将可选内容与ArrayAdapter连接起来
				adapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_item, kangfu_array);
				// 设置下拉列表的风格
				adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
				kangfu_zhilaio.setAdapter(adapter);
				final String zhuanke_zhuangtai = resultMap.get("zhuanke_zhuangtai").toString();
				kangfu_zhilaio.setOnItemSelectedListener(new OnItemSelectedListener() {

					@Override
					public void onItemSelected(AdapterView<?> arg0, View arg1, int arg2, long arg3) {
						// TODO Auto-generated method stub
						if (arg2 != 0 && !kangfu_zhilaio.getSelectedItem().toString().equals(zhuanke_zhuangtai)) {
							new AlertDialog.Builder(getActivity()).setTitle("退出提示").setMessage("确定要更改为康复治疗患者吗？")
									.setIcon(R.drawable.ic_launcher)
									.setPositiveButton("确认", new DialogInterface.OnClickListener() {
								@Override
								public void onClick(DialogInterface dialog, int whichButton) {
									saveKangfuZhiliao(kangfu_zhilaio.getSelectedItem().toString());
								}
							}).setNegativeButton("取消", new DialogInterface.OnClickListener() {
								@Override
								public void onClick(DialogInterface dialog, int whichButton) {

								}
							}).show();
						}
					}

					@Override
					public void onNothingSelected(AdapterView<?> arg0) {
						// TODO Auto-generated method stub

					}
				});
				for (int i = 0; i < kangfu_array.length; i++) {
					if (resultMap.get("zhuanke_zhuangtai").toString().equals(kangfu_array[i])) {
						kangfu_zhilaio.setSelection(i);
						break;
					}
				}
			}

		}
	}

	private void saveKangfuZhiliao(final String str) {
		String url = server_url + "Mobile/YidongChafangClientCommunication/updateHuanzheZhuangtai";
		Map<String, String> map = new HashMap<String, String>();
		map.put("zhuyuan_id", current_patient_zhuyuan_id);
		map.put("huanzhe_zhuangtai", str);

		new HttpHelper(getActivity(), new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpData) {
				Map<String, Object> resultMap = new HashMap<String, Object>();
				if (httpData != null && httpData.size() > 0) {
					for (Map<String, Object> map_http : httpData) {
						resultMap = map_http;
						if (resultMap.get("zhuangtai").toString().equals("保存成功")) {
							Toast.makeText(getActivity(), "患者康复治疗状态修改成功", Toast.LENGTH_SHORT).show();
						}
					}
				} else {
					Toast.makeText(getActivity(), "患者康复治疗状态修改失败", Toast.LENGTH_SHORT).show();
				}
			}

		}).getDataFromServer(url, map);
	}
}