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
public class HulijiluListAdapter extends BaseAdapter {
	private List<Map<String, Object>> listdata = null;
	private Context context;
	public HulijiluListAdapter(List<Map<String, Object>> listdata, Context context) {
		this.listdata = listdata;
		this.context = context;
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
			convertView = LayoutInflater.from(context).inflate(R.layout.hulijilu_list_item, null);
			//convertView = inflater.inflate(R.layout.hulijilu_list_item, null);
			viewHolder.hulijibie_juti = (TextView) convertView.findViewById(R.id.hulijibie_juti);
			viewHolder.hulijibie_duiyingriqi = (TextView) convertView.findViewById(R.id.hulijibie_duiyingriqi);
			viewHolder.beizhu = (TextView) convertView.findViewById(R.id.beizhu);
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
			viewHolder.hulijibie_juti.setText(listdata.get(position).get("content").toString());
			viewHolder.hulijibie_duiyingriqi.setText(listdata.get(position).get("start_time").toString() + " 到 "
					+ listdata.get(position).get("jieshu_time").toString());
			viewHolder.beizhu.setText(listdata.get(position).get("zhuangtai").toString());
		}
		return convertView;
	}

	class ViewHolder {
		private TextView hulijibie_juti;
		private TextView hulijibie_duiyingriqi;
		private TextView beizhu;
	}

}
