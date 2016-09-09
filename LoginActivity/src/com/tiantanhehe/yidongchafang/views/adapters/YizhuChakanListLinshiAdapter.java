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
public class YizhuChakanListLinshiAdapter extends BaseAdapter {

	private List<Map<String, Object>> mlist;
	private Context context;

	public YizhuChakanListLinshiAdapter(List<Map<String, Object>> list, Context context) {
		this.mlist = list;
		this.context = context;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		if (mlist == null) {
			return 0;
		}
		return mlist.size();
	}

	@Override
	public Object getItem(int position) {
		// TODO Auto-generated method stub
		return mlist.get(position);
	}

	@Override
	public long getItemId(int position) {
		// TODO Auto-generated method stub
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		ViewHolder holder;
		if (convertView == null) {
			convertView = LayoutInflater.from(context).inflate(R.layout.chakanyizhu_linshi_item, null);
			holder = new ViewHolder();
			holder.date = (TextView) convertView.findViewById(R.id.starttime);
			holder.doctor = (TextView) convertView.findViewById(R.id.doctor);
			holder.nurse = (TextView) convertView.findViewById(R.id.nurse);
			holder.content = (TextView) convertView
					.findViewById(R.id.yizhuContent);
			holder.yongfahePinlv = (TextView) convertView
					.findViewById(R.id.yongfahePinlv);
			holder.dotime = (TextView) convertView.findViewById(R.id.dotime);
			convertView.setTag(holder);
		} else {
			holder = (ViewHolder) convertView.getTag();
		}

		convertView.setBackgroundColor(position % 2 != 0 ? context
				.getResources().getColor(R.color.shuilan) : context
				.getResources().getColor(R.color.white));
		String content = mlist.get(position).get("content").toString();
		String[] split = content.split("\\,");
		if (split.length > 1) {
			String yizhucont = null;
			for (int j = 0; j < split.length; j++) {
				if (j == 0) {
					yizhucont = "┏" + split[0] + "\n";

				} else if (j == split.length - 1) {
					yizhucont += "┗" + split[split.length - 1];
				} else {
					yizhucont += "┃" + split[j] + "\n";
				}
			}
			holder.content.setText(yizhucont);
		} else {
			holder.content.setText(content);
		}
		String yongfaPinlvText = "";
		try {
			if(!mlist.get(position).get("pinlv")
					.toString().equals(""))
			{
				yongfaPinlvText += mlist.get(position).get("pinlv")
						.toString();
			}
			
			if(!mlist.get(position).get("yongfa")
					.toString().trim().equals(""))
			{
				yongfaPinlvText += "("+mlist.get(position).get("yongfa")
						.toString()+")";
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		if(!yongfaPinlvText.equals(""))
		{
			holder.yongfahePinlv.setVisibility(View.VISIBLE);
		}
		else
		{
			holder.yongfahePinlv.setVisibility(View.GONE);
		}
		holder.yongfahePinlv.setText(yongfaPinlvText);
		holder.date.setText(mlist.get(position).get("xiada_time").toString());
		holder.doctor.setText(mlist.get(position).get("xiada_yishi_name").toString());
		holder.nurse.setText(mlist.get(position).get("zhixing_name").toString());
		holder.dotime.setText(mlist.get(position).get("zhixing_time").toString());

		return convertView;
	}

	class ViewHolder {
		TextView date, doctor, nurse, content, dotime,yongfahePinlv;
	}

}
