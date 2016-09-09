package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.RunTimeState;

import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class LeftMenuListAdapter extends BaseAdapter
{
	private final List<Map<String, Object>> listData;

	private final LayoutInflater inflater;
	private HashMap<String, Object> menuRes;
	private Context context;

	
	public LeftMenuListAdapter(Context context, List<Map<String, Object>> data)
	{
		this.listData = data;
		inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		this.context = context;

	}

	public List<Map<String, Object>> getListData() {
		return listData;
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

		if (position == 0) {
			Log.d("tiantan", "call getView");
		}

		ViewHolder viewHolder = null;
		if (view == null) {
			viewHolder = new ViewHolder();
			view = inflater.inflate(R.layout.left_menu_item, null);
			
			viewHolder.tv_left_menu_name = (TextView) view.findViewById(R.id.left_menu_name);
			viewHolder.iv_left_menu_icon = (ImageView) view.findViewById(R.id.left_menu_icon);
			
			view.setTag(viewHolder);
		}else{
			viewHolder = (ViewHolder) view.getTag();
		}
		
		
		
		String menu_name = listData.get(position).get("menu_name").toString();
		viewHolder.tv_left_menu_name.setText(menu_name);

		int resId = RunTimeState.getInstance().leftmenuRes.get(menu_name);

		viewHolder.iv_left_menu_icon.setImageResource(resId);
		viewHolder.iv_left_menu_icon.setVisibility(View.VISIBLE);

		if (GlobalInfoApplication.getInstance().appConf.current_menu
				.equals(listData.get(position).get("menu_name").toString())) {
			viewHolder.tv_left_menu_name.setTextColor(Color.parseColor("#0e76bf"));
			// iv_left_menu_icon.setVisibility(View.VISIBLE);
			viewHolder.iv_left_menu_icon.setSelected(true);

		} else {
			viewHolder.tv_left_menu_name.setTextColor(Color.parseColor("#000000"));
			// iv_left_menu_icon.setVisibility(View.INVISIBLE);
			viewHolder.iv_left_menu_icon.setSelected(false);
		}

		return view;
	}

	private static class ViewHolder {
		TextView tv_left_menu_name;
		ImageView iv_left_menu_icon;
	}
}
