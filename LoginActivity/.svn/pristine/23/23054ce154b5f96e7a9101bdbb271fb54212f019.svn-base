package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;
import java.util.Map;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.tiantanhehe.yidongchafang.R;

public class HuanzheAdapter extends BaseAdapter {
	private List<Map<String, Object>> arrays;
	private LayoutInflater inflater;

	public HuanzheAdapter(List<Map<String, Object>> arrays,
			Context context) {
		this.arrays = arrays;
		inflater = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}

	@Override
	public int getCount() {
		if (arrays == null) {
			return 0;
		}
		return arrays.size();
	}

	@Override
	public Object getItem(int position) {
		return arrays.get(position);
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
			convertView = inflater.inflate(R.layout.main_patient_gridview_item, null);
			holder.huanzhe_touxiang = (ImageView) convertView
					.findViewById(R.id.huanzhe_touxiang);
			holder.huanzhe_hulijibie = (ImageView) convertView
					.findViewById(R.id.huanzhe_hulijibie);
			holder.huanzhe_xingming = (TextView) convertView
					.findViewById(R.id.huanzhe_xingming);
			holder.huanzhe_nianling = (TextView) convertView
					.findViewById(R.id.huanzhe_nianling);
			holder.huanzhe_chuanghao = (TextView) convertView
					.findViewById(R.id.huanzhe_chuanghao);
			holder.huanzhe_zhuyuan_tianshu = (TextView) convertView
					.findViewById(R.id.huanzhe_zhuyuan_tianshu);
			holder.huanzhe_zhuyuan_id = (TextView) convertView
					.findViewById(R.id.huanzhe_zhuyuan_id);
			convertView.setTag(holder);
		} else {
			holder = (ViewHolder) convertView.getTag();
		}
		String bingchuang_hao = arrays.get(position).get("bingchuang_hao").toString()+"床";
		String xingming = arrays.get(position).get("xingming").toString();
		String nianling = arrays.get(position).get("nianling").toString() + "("
				+ arrays.get(position).get("xingbie").toString() + ")";
		
		
		
		String zhuyuan_tianshu = "住院："
				+ arrays.get(position).get("tianshu").toString();//需要计算成住院天数
		String zhuyuan_id = arrays.get(position).get("zhuyuan_id_show").toString();
		String hulijibie = arrays.get(position).get("hulijibie").toString();
		if (arrays.get(position).get("xingbie").toString().equals("男")) {
			holder.huanzhe_touxiang.setImageResource(R.drawable.ipad_male_head);
		} else {
			holder.huanzhe_touxiang
					.setImageResource(R.drawable.ipad_female_head);
		}
		if (hulijibie.equals("一级护理")) {
			holder.huanzhe_hulijibie.setImageResource(R.drawable.yijihuli);
		} else if (hulijibie.equals("二级护理")) {
			holder.huanzhe_hulijibie.setImageResource(R.drawable.erjihuli);
		} else if (hulijibie.equals("三级护理")) {
			holder.huanzhe_hulijibie.setImageResource(R.drawable.sanjihuli);
		} else if (arrays.get(position).get("hulijibie").toString().equals("特级护理")) {
			holder.huanzhe_hulijibie.setImageResource(R.drawable.tejihuli);
		} else {
			holder.huanzhe_hulijibie.setVisibility(View.INVISIBLE);

		}
		
		String bingqing = arrays.get(position).get("bingqing").toString();
		if(bingqing.equals("病危"))
		{
			convertView.setBackgroundResource(R.color.red);
		}
		else if(bingqing.equals("病重"))
		{
			convertView.setBackgroundResource(R.color.coral);
		}
		else
		{
			convertView.setBackgroundResource(R.drawable.list_selector_bg_one);
		}
		
		holder.huanzhe_chuanghao.setText(bingchuang_hao);
		holder.huanzhe_xingming.setText(xingming);
		holder.huanzhe_nianling.setText(nianling);
		holder.huanzhe_zhuyuan_tianshu.setText(zhuyuan_tianshu);
		holder.huanzhe_zhuyuan_id.setText(zhuyuan_id);
		return convertView;
	}
	
	class ViewHolder {
		ImageView huanzhe_touxiang;
		ImageView huanzhe_hulijibie;
		TextView huanzhe_xingming;
		TextView huanzhe_nianling;
		TextView huanzhe_chuanghao;
		TextView huanzhe_zhuyuan_tianshu;
		TextView huanzhe_zhuyuan_id;
	}
}
