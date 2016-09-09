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
public class BingchengJiluListAdapter extends BaseAdapter {
	private List<Map<String, Object>> listdata = null;
	//private LayoutInflater inflater;
	private Context context;

	public BingchengJiluListAdapter(List<Map<String, Object>> listdata, Context context) {
		this.listdata = listdata;
		this.context=context;
//		inflater = (LayoutInflater) context
//				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
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
			convertView = LayoutInflater.from(context).inflate(R.layout.bingcheng_list_item, null);
			viewHolder.time = (TextView) convertView.findViewById(R.id.time);
			viewHolder.type = (TextView) convertView.findViewById(R.id.type);
			viewHolder.doctor = (TextView) convertView
					.findViewById(R.id.doctor);
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
			viewHolder.time.setText(listdata.get(position).get("record_time")
					.toString());
			viewHolder.type.setText(listdata.get(position)
					.get("bingcheng_sub_leibie").toString());
			viewHolder.doctor.setText(listdata.get(position)
					.get("chafang_doctor").toString());
		}
		return convertView;
	}

	class ViewHolder {
		private TextView time;
		private TextView type;
		private TextView doctor;
	}

}
