package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class MokuaiAdapter extends BaseAdapter
{
	private List<Map<String, Object>> listData;
	private LayoutInflater inflater;
	private int icon_width;
	public MokuaiAdapter(Context context, List<Map<String, Object>> data,int icon_width)
	{
		this.listData = data;
		inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		this.icon_width = icon_width;
	}

	@Override
	public int getCount()
	{
		return listData.size();
	}

	@Override
	public Object getItem(int position)
	{
		return listData.get(position);
	}

	@Override
	public long getItemId(int position)
	{
		return position;
	}

	@Override
	public View getView(int position, View view, ViewGroup parent)
	{
		if (view == null) {
			view = inflater.inflate(R.layout.mokuai_item, null);
		}
		RelativeLayout seticon = (RelativeLayout) view.findViewById(R.id.mokuai);
		android.view.ViewGroup.LayoutParams seticonParams = seticon
				.getLayoutParams();
		seticonParams.height = icon_width;
		seticon.setLayoutParams(seticonParams);
		ImageView tubiao = (ImageView) view.findViewById(R.id.mokuai_tubiao);
		tubiao.setImageResource(Integer.parseInt(listData.get(position).get("tubiao").toString()));
		return view;
	}
}
