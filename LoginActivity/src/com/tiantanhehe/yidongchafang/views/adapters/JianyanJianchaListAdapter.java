package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

@SuppressLint("InflateParams")
public class JianyanJianchaListAdapter extends BaseAdapter {
	private List<Map<String, Object>> listdata = null;
	private Context context;
	public JianyanJianchaListAdapter(List<Map<String, Object>> listdata,
			Context context) {
		this.listdata = listdata;
		this.context=context;
	}

	@Override
	public int getCount() {
		int count;
		if (listdata == null) {
			count = 0;
		} else {
			count = listdata.size();
		}

		return count;
	}

	@Override
	public Object getItem(int position) {
		return listdata.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {

		ViewHolder viewHolder = new ViewHolder();
		if (convertView == null) {
			convertView = LayoutInflater.from(context).inflate(R.layout.jianyanjiancha_list_item, null);
			viewHolder.tv_shenqingshijian = (TextView) convertView
					.findViewById(R.id.tv_shenqingshijian);
			viewHolder.tv_jiancha_keshi = (TextView) convertView
					.findViewById(R.id.tv_jiancha_keshi);
			viewHolder.tv_jiancha_mingcheng = (TextView) convertView
					.findViewById(R.id.tv_jiancha_mingcheng);
			viewHolder.tv_baogaoshijian = (TextView) convertView
					.findViewById(R.id.tv_baogaoshijian);
			convertView.setTag(viewHolder);
		} else {
			viewHolder = (ViewHolder) convertView.getTag();
		}

		if (position % 2 != 0) {
			convertView.setBackgroundResource(R.drawable.list_selector_bg_one);
		} else {
			convertView.setBackgroundResource(R.drawable.list_selector_bg_to);
		}
		if (getCount() != 0) {
			viewHolder.tv_shenqingshijian.setText(listdata.get(position)
					.get("shenqing_time").toString());
			viewHolder.tv_jiancha_keshi.setText(listdata.get(position)
					.get("jiancha_keshi_name").toString());
			viewHolder.tv_jiancha_mingcheng.setText(listdata.get(position)
					.get("jiancha_mingcheng").toString());
			viewHolder.tv_baogaoshijian.setText(listdata.get(position)
					.get("jiancha_time").toString());
		}
		return convertView;
	}

	class ViewHolder {
		private TextView tv_shenqingshijian;
		private TextView tv_jiancha_keshi;
		private TextView tv_jiancha_mingcheng;
		private TextView tv_baogaoshijian;
	}

}
