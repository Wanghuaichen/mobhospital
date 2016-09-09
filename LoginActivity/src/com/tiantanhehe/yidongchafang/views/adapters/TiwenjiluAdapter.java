package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;
import java.util.Map;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.tiantanhehe.yidongchafang.R;

public class TiwenjiluAdapter extends BaseAdapter {
	List<Map<String, Object>> listdata;
	private Context context;

	public TiwenjiluAdapter(List<Map<String, Object>> listdata, Context context) {
		// TODO Auto-generated constructor stub
		this.listdata = listdata;
		this.context = context;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		if (listdata == null) {
			return 0;
		}
		return listdata.size();
	}

	@Override
	public Object getItem(int position) {
		// TODO Auto-generated method stub
		return listdata.get(position);
	}

	@Override
	public long getItemId(int position) {
		// TODO Auto-generated method stub
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		ViewHolder mHolder;
		if (convertView == null) {
			convertView = LayoutInflater.from(context).inflate(
					R.layout.tiwen_list_item, null);
			mHolder = new ViewHolder();
			mHolder.week = (TextView) convertView.findViewById(R.id.week);
			mHolder.date = (TextView) convertView.findViewById(R.id.date);
			mHolder.beizhu = (TextView) convertView.findViewById(R.id.beizhu);
			convertView.setTag(mHolder);
		} else {
			mHolder = (ViewHolder) convertView.getTag();
		}
		if (position % 2 != 0) {
			convertView.setBackgroundResource(R.drawable.list_selector_bg_one);
		} else {
			convertView.setBackgroundResource(R.drawable.list_selector_bg_to);
		}

		mHolder.week.setText(listdata.get(position).get("zhouci").toString());
		mHolder.date.setText(listdata.get(position).get("zhouciriqi").toString());
		mHolder.beizhu.setText(listdata.get(position).get("beizhu").toString());
		return convertView;
	}

	class ViewHolder {
		TextView week, date, beizhu;
	}
}
