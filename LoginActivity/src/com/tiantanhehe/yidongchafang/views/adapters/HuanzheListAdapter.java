/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: HuanzheListAdapter.java
 * @Package com.tiantanhehe.yidongchafang.views.adapters
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月7日 下午3:18:49 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;
import java.util.Map;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.RunTimeState;

/**
 * @ClassName: HuanzheListAdapter
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月7日 下午3:18:49
 * 
 */
public class HuanzheListAdapter extends BaseAdapter {
	private final List<Map<String, Object>> listData;
	private final LayoutInflater inflater;
	private Context context;
	private String user_type;

	public HuanzheListAdapter(Context context, List<Map<String, Object>> data,String user_type) {
		this.listData = data;
		inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		this.context = context;
		this.user_type = user_type;
	}

	@Override
	public int getCount() {
		return listData.size();
	}

	@Override
	public Object getItem(int position) {
		return listData.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View view, ViewGroup parent) {
		if (view == null) {
			view = inflater.inflate(R.layout.right_huanzhe_item, null);
		}
		final int temp_position = position;
		ImageView touxiang = (ImageView) view.findViewById(R.id.user_touxiang);

		Drawable user_icon;

		String hljb = listData.get(position).get("hulijibie").toString();
		// 判断患者性别
		if (listData.get(position).get("xingbie").toString()
				.equals(context.getString(R.string.nv))) {
			// 判断患者护理级别
			if (hljb.equals(context.getString(R.string.yijihuli))) {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_women_yi);
			} else if (hljb.equals(context.getString(R.string.erjihuli))) {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_women_er);
			} else if (hljb.equals(context.getString(R.string.tejihuli))) {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_women_te);
			} else {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_women_san);
			}
		} else {
			// 判断患者护理级别
			if (hljb.equals(context.getString(R.string.yijihuli))) {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_men_yi);
			} else if (hljb.equals(context.getString(R.string.erjihuli))) {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_men_er);
			} else if (hljb.equals(context.getString(R.string.tejihuli))) {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_men_te);
			} else {
				user_icon = context.getResources().getDrawable(
						R.drawable.hljb_men_san);
			}
		}
		touxiang.setImageDrawable(user_icon);
		TextView xingming = (TextView) view.findViewById(R.id.huanzhe_xingming);
		xingming.setText(listData.get(position).get("xingming").toString() + " ("
				+ listData.get(position).get("nianling").toString() + ")");
		TextView zhuyuanhao = (TextView) view.findViewById(R.id.huanzhe_zhuyuanhao);
		zhuyuanhao.setText(listData.get(position).get("zhuyuan_id_show").toString());
		TextView chuanghao = (TextView) view.findViewById(R.id.huanzhe_chuanghao);
		chuanghao.setText(listData.get(position).get("bingchuang_hao")
				.toString()
				+ "床");
		
		TextView zhuanzhen_type = (TextView) view.findViewById(R.id.zhuanzhen_type);
		
		String jigou_name = "";
		String yiyuan_name = "";
		try {
			jigou_name = listData.get(position).get("huanzhe_zhuangtai").toString();
			yiyuan_name = listData.get(position).get("yiyuan_name").toString();
		} catch (Exception e) {
			// TODO: handle exception
		}
		LinearLayout zhuanzhen_info = (LinearLayout) view.findViewById(R.id.zhuanzhen_info);
		TextView zhuanzhen_jigou_name = (TextView) view.findViewById(R.id.zhuanzhen_jigou_name);
		if(jigou_name.equals(""))
		{
			zhuanzhen_info.setVisibility(View.GONE);
		}
		else
		{
			zhuanzhen_info.setVisibility(View.VISIBLE);
		}
		if (user_type.equals("基层康复诊疗组"))
		{
			zhuanzhen_type.setText("转诊医院：");
			zhuanzhen_jigou_name.setText(yiyuan_name);
		}
		else
		{
			zhuanzhen_type.setText("转诊科室：");
			zhuanzhen_jigou_name.setText(jigou_name);
		}
		
		TextView xinxiaoxi_tixing = (TextView) view.findViewById(R.id.xinxiaoxi_tixing);
		if (Integer.parseInt(listData.get(position).get("xiaoxi_number").toString()) > 0) {

			xinxiaoxi_tixing.setVisibility(View.GONE);
			xinxiaoxi_tixing.setText(listData.get(position).get("xiaoxi_number").toString());
			// xinxiaoxi_tixing.setOnClickListener(new OnClickListener() {
			// @Override
			// public void onClick(View arg0) {
			// current_application.current_patient_id =
			// listData.get(temp_position).get("patient_id").toString();
			// current_application.current_patient_zhuyuan_id =
			// listData.get(temp_position).get("zhuyuan_id")
			// .toString();
			// current_application.current_patient_zhuyuan_bingqu =
			// listData.get(temp_position)
			// .get("zhuyuan_bingqu").toString();
			// current_application.current_patient_bingchuang_hao =
			// listData.get(temp_position)
			// .get("bingchuang_hao").toString();
			// current_application.current_patient_xingming =
			// listData.get(temp_position).get("xingming")
			// .toString();
			// current_application.current_patient_xingbie =
			// listData.get(temp_position).get("xingbie").toString();
			// current_application.current_patient_nianling =
			// listData.get(temp_position).get("nianling")
			// .toString();
			// current_application.current_patient_huli_jibie =
			// listData.get(temp_position).get("hulijibie")
			// .toString();
			// current_application.current_patient_zhenduan =
			// listData.get(temp_position).get("zhenduan")
			// .toString();
			// current_application.current_patient_zhuyuan_id_show =
			// listData.get(temp_position)
			// .get("zhuyuan_id_show").toString();
			// menu.showContent(); // 关闭右侧菜单
			// right_state = false;
			// if (tiaoZhuangActivity == MainActivity.class) {
			// // 设置主界面顶端患者信息
			// setDingbuHuanZheXinXi();
			// }
			//
			// menu.showMenu(true);
			// }
			// });
		} else {
			xinxiaoxi_tixing.setVisibility(View.GONE);
		}

		// 增加by Hooke@2015-8-25 为选中的患者item设置制定的背景色
		if (GlobalInfoApplication.getInstance().appConf.current_patient_id
				.equals(listData.get(position).get("patient_id").toString())) {
			RunTimeState.getInstance().setFenzhuChild(position);
			view.setBackgroundColor(Color.rgb(97, 255, 255));
		} else {
			view.setBackgroundResource(0);
		}
		// 结束by Hooke@2015-8-25

		return view;
	}
}
