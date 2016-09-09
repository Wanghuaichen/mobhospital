/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: FenZhuAdapter.java
 * @Package com.tiantanhehe.yidongchafang.views.adapters
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月6日 下午9:02:01 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.RunTimeState;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * @ClassName: FenZhuAdapter
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月6日 下午9:02:01
 * 
 */
public class FenzuListAdapter extends BaseExpandableListAdapter {
	private final LayoutInflater inflater;
	private List<Map<String, String>> groups;
	private List<List<Map<String, Object>>> childs;
	private Context context;

	public FenzuListAdapter(Context context) {
		this.context = context;
		inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}

	public FenzuListAdapter(Context context, List<Map<String, String>> groups, List<List<Map<String, Object>>> childs) {
		this.context = context;
		inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		this.groups = groups;
		this.childs = childs;
	}

	@Override
	public Object getChild(int arg0, int arg1) {
		return childs.get(arg0).get(arg1);
	}

	@Override
	public long getChildId(int arg0, int arg1) {
		return arg1;
	}

	@Override
	public View getChildView(int arg0, int arg1, boolean arg2, View view, ViewGroup arg4) {
		if (view == null) {
			view = inflater.inflate(R.layout.right_huanzhe_item, null);
		}
		final int temp_arg0 = arg0;
		final int temp_arg1 = arg1;
		ImageView touxiang = (ImageView) view.findViewById(R.id.user_touxiang);
		if (childs.get(arg0).get(arg1).get("xingbie").toString().equals(context.getString(R.string.nv))) {// "女"
			touxiang.setImageResource(R.drawable.female_head);
		} else {
			touxiang.setImageResource(R.drawable.male_head);
		}

		TextView xingming = (TextView) view.findViewById(R.id.huanzhe_xingming);
		xingming.setText(childs.get(arg0).get(arg1).get("xingming").toString() + " ("
				+ childs.get(arg0).get(arg1).get("nianling").toString() + ")");
		TextView zhuyuanhao = (TextView) view.findViewById(R.id.huanzhe_zhuyuanhao);
		zhuyuanhao.setText(childs.get(arg0).get(arg1).get("zhuyuan_id_show").toString());
		TextView chuanghao = (TextView) view.findViewById(R.id.huanzhe_chuanghao);
		chuanghao.setText(childs.get(arg0).get(arg1).get("bingchuang_hao").toString());
		if (Integer.parseInt(childs.get(arg0).get(arg1).get("xiaoxi_number").toString()) > 0) {
			TextView xinxiaoxi_tixing = (TextView) view.findViewById(R.id.xinxiaoxi_tixing);
			xinxiaoxi_tixing.setVisibility(View.VISIBLE);
			xinxiaoxi_tixing.setText(childs.get(arg0).get(arg1).get("xiaoxi_number").toString());
			// xinxiaoxi_tixing.setOnClickListener(new OnClickListener() {
			// @Override
			// public void onClick(View arg0) {
			// current_application.current_patient_id =
			// childs.get(temp_arg0).get(temp_arg1).get("patient_id")
			// .toString();
			// current_application.current_patient_zhuyuan_id =
			// childs.get(temp_arg0).get(temp_arg1)
			// .get("zhuyuan_id").toString();
			// current_application.current_patient_zhuyuan_bingqu =
			// childs.get(temp_arg0).get(temp_arg1)
			// .get("zhuyuan_bingqu").toString();
			// current_application.current_patient_bingchuang_hao =
			// childs.get(temp_arg0).get(temp_arg1)
			// .get("bingchuang_hao").toString();
			// current_application.current_patient_xingming =
			// childs.get(temp_arg0).get(temp_arg1).get("xingming")
			// .toString();
			// current_application.current_patient_xingbie =
			// childs.get(temp_arg0).get(temp_arg1).get("xingbie")
			// .toString();
			// current_application.current_patient_nianling =
			// childs.get(temp_arg0).get(temp_arg1).get("nianling")
			// .toString();
			// current_application.current_patient_huli_jibie =
			// childs.get(temp_arg0).get(temp_arg1)
			// .get("hulijibie").toString();
			// current_application.current_patient_huli_jibie =
			// childs.get(temp_arg0).get(temp_arg1)
			// .get("zhenduan").toString();
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
		}

		if (GlobalInfoApplication.getInstance().appConf.current_patient_id
				.equals(childs.get(arg0).get(arg1).get("patient_id").toString())) {
			RunTimeState.getInstance().setFenzhuGroup(arg0);
			RunTimeState.getInstance().setFenzhuChild(arg1);
			view.setBackgroundColor(Color.rgb(97, 255, 255));
		} else {
			view.setBackgroundResource(0);
		}
		// 结束by Hooke@2015-8-25

		return view;
	}

	@Override
	public int getChildrenCount(int arg0) {
		return childs.get(arg0).size();
	}

	@Override
	public Object getGroup(int arg0) {
		return groups.get(arg0);
	}

	@Override
	public int getGroupCount() {
		return groups.size();
	}

	@Override
	public long getGroupId(int arg0) {
		return arg0;
	}

	public List<Map<String, String>> getGroups() {
		return groups;
	}

	public void setGroups(List<Map<String, String>> groups) {
		this.groups = groups;
	}

	public List<List<Map<String, Object>>> getChilds() {
		return childs;
	}

	public void setChilds(List<List<Map<String, Object>>> childs) {
		this.childs = childs;
	}

	@Override
	public View getGroupView(int arg0, boolean arg1, View view, ViewGroup arg3) {
		if (view == null) {
			view = inflater.inflate(R.layout.huanzhe_fenzu, null);
		}
		if (Integer.parseInt(groups.get(arg0).get("xiaoxi_number").toString()) > 0) {
			TextView fenzu_tixing = (TextView) view.findViewById(R.id.fenzu_tixing);
			fenzu_tixing.setVisibility(View.VISIBLE);
		}
		ImageView fenzu_img = (ImageView) view.findViewById(R.id.fenzu_img);
		if (arg1) {
			fenzu_img.setImageResource(R.drawable.akn);
		} else {
			fenzu_img.setImageResource(R.drawable.ako);
		}
		TextView fenzu_name = (TextView) view.findViewById(R.id.fenzu_name);
		fenzu_name.setText(groups.get(arg0).get("fenzu_name").toString());
		TextView fenzu_huanzhe_number = (TextView) view.findViewById(R.id.fenzu_huanzhe_number);
		fenzu_huanzhe_number.setText(groups.get(arg0).get("number").toString());
		return view;
	}

	@Override
	public boolean hasStableIds() {
		return false;
	}

	@Override
	public boolean isChildSelectable(int arg0, int arg1) {
		// Auto-generated method stub
		return true;
	}
}

//
