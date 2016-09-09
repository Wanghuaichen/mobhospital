package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;

import com.tiantanhehe.yidongchafang.R;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

public class BloodAdapter extends BaseAdapter {

	private List<String> mList;
	private LayoutInflater mInflater;

	public BloodAdapter(Context context, List<String> data) {
		mList = data;
		mInflater = LayoutInflater.from(context);
	}

	@Override
	public int getCount() {
		return mList.size();
	}

	@Override
	public Object getItem(int position) {
		return mList.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@SuppressLint("InflateParams")
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		ViewHolder viewHolder = null;
		if (convertView == null) {
			viewHolder = new ViewHolder();
			 convertView = mInflater.inflate(R.layout.item_timesaxisfragment_gridview, null);
			// viewHolder.imgPath = (ImageView)convertView.findViewById(R.id.img_item_lesson);
			convertView.setTag(viewHolder);
		} else {
			viewHolder = (ViewHolder) convertView.getTag();
		}
		// viewHolder.imgPath.setTag(url);
		return convertView;
	}

	class ViewHolder {
		public ImageView imgPath;
	}
}