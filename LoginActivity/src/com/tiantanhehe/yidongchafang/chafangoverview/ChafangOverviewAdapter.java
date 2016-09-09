package com.tiantanhehe.yidongchafang.chafangoverview;

import java.util.ArrayList;
import java.util.List;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.features.overview.ChafangOverviewActivity;

import android.content.Context;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;



public class ChafangOverviewAdapter extends BaseAdapter {

	private List<XitongWrapper> xitongWrapperList;
	//private List<ArrayList<YongyaoXitong>> yongyaoWrapperList;
	private LayoutInflater inflater;
	private ChafangOverviewActivity activity;
	private Context context;
	

	public List<XitongWrapper> getxitongWrapperList() {
		return xitongWrapperList;
	}

	public void setxitongWrapperList(List<XitongWrapper> mList) {
		this.xitongWrapperList = mList;
	}

	public ChafangOverviewAdapter(
			ChafangOverviewActivity activity, Context context) {
		this.activity = activity;
		this.context = context;
		inflater = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}

	@Override
	public int getCount() {
		if (xitongWrapperList == null) {
			return 0;
		}
		return xitongWrapperList.size();
	}

	@Override
	public Object getItem(int position) {
		// TODO Auto-generated method stub
		return xitongWrapperList.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}
	
	class ViewHolder {
		TextView tv;
		ImageView iv;
		LinearLayout layout;
	}
	
	@Override
	public View getView(int position, View view, ViewGroup parent) {
		ViewHolder holder = null;
		View convertView=null;
		if (convertView == null) {
			convertView = inflater.inflate(R.layout.item_chafangoverview, null);
			holder = new ViewHolder();
			holder.tv = (TextView) convertView.findViewById(R.id.name_xitong);
			holder.iv = (ImageView) convertView.findViewById(R.id.pic_xitong);
			holder.layout = (LinearLayout) convertView.findViewById(R.id.lis_result);
			

			convertView.setTag(holder);
		} else {
			holder = (ViewHolder) convertView.getTag();
		}
		//(holder.layout).removeAllViews();
		holder.layout.setLayoutParams(new LinearLayout.LayoutParams(
				LinearLayout.LayoutParams.MATCH_PARENT,
				LinearLayout.LayoutParams.WRAP_CONTENT));
		//final List<XitongWrapper> xitong = mList.get(position);
		holder.tv.setText(xitongWrapperList.get(position).getIconName());
		holder.iv.setImageResource(xitongWrapperList.get(position).getDrawable());
		//holder.layout.setOrientation(orientation);
		ArrayList<Xitong> xitongList = xitongWrapperList.get(position).getXitongList();
		int sizeXitongList = 0;
		if(xitongList!=null)
		{
			sizeXitongList = xitongList.size();
		}
		for (int i = 0; i < xitongList.size(); i++) {
			LinearLayout oneXitong = new LinearLayout(context);
			oneXitong.setBackgroundResource(R.drawable.border_item_chafangoverview_one_jianchaxiang);
			oneXitong.setPadding(5, 5, 5, 5);
			oneXitong.setOrientation(LinearLayout.VERTICAL);
			LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
					LinearLayout.LayoutParams.WRAP_CONTENT,
					LinearLayout.LayoutParams.WRAP_CONTENT);
			params.setMargins(5, 5, 5, 5);
			oneXitong.setLayoutParams(params);
			
			TextView tvKeyword = new TextView(context);
			tvKeyword.setPadding(5, 5, 5, 5);
			String strKeyword = "<font color='#2778eb'>"+xitongList.get(i).getKeyword()+":"+"</font>";
			String strShifo_yichang = xitongList.get(i).getShifo_yichang();
			if(strShifo_yichang==null)
			{
				strShifo_yichang="";
			}
			else if(strShifo_yichang.equals("未查"))
			{
				strShifo_yichang = "<font color='#006300'>"+strShifo_yichang+"</font>";
			}
			else
			{
				strShifo_yichang = "<font color='#f00'>"+strShifo_yichang+"</font>";
			}
			tvKeyword.setText(Html.fromHtml(strKeyword+strShifo_yichang));
			
			//holder.layout.addView(tvKeyword);
			LinearLayout.LayoutParams params_tvKeyword = new LinearLayout.LayoutParams(
					LinearLayout.LayoutParams.WRAP_CONTENT,
					LinearLayout.LayoutParams.WRAP_CONTENT);
			tvKeyword.setLayoutParams(params_tvKeyword);
			oneXitong.addView(tvKeyword);
			
			Xitong xitong = xitongList.get(i);
			int sizeLis_result = 0;
			if(xitong.getLis_result()!=null)
			{
				sizeLis_result = xitong.getLis_result().size();
			}
			for(int j=0;j<sizeLis_result;j++)
			{
				LinearLayout oneJianchajieguo = new LinearLayout(context);
				oneJianchajieguo.setBackgroundResource(R.drawable.border_item_chafangoverview_one_jianchajieguo);
				oneJianchajieguo.setPadding(1, 1, 1, 1);
				oneJianchajieguo.setOrientation(LinearLayout.HORIZONTAL);
				LinearLayout.LayoutParams params_oneJianchajieguo = new LinearLayout.LayoutParams(
						LinearLayout.LayoutParams.WRAP_CONTENT,
						LinearLayout.LayoutParams.WRAP_CONTENT);
				params_oneJianchajieguo.setMargins(1, 1, 1, 1);
				oneJianchajieguo.setLayoutParams(params_oneJianchajieguo);
				
				
				JianchaResult jianchaResult = xitong.getLis_result().get(j);
				TextView tvYinwen_mingcheng = new TextView(context);
				tvYinwen_mingcheng.setPadding(5, 5, 5, 5);
				String strYingwen_mingcheng = jianchaResult.getYingwen_mingcheng();
				tvYinwen_mingcheng.setText(strYingwen_mingcheng);
				//holder.layout.addView(tvYinwen_mingcheng);
				LinearLayout.LayoutParams params_tvYinwen_mingcheng = new LinearLayout.LayoutParams(
						LinearLayout.LayoutParams.MATCH_PARENT,
						LinearLayout.LayoutParams.WRAP_CONTENT);
				tvYinwen_mingcheng.setLayoutParams(params_tvYinwen_mingcheng);
				//oneXitong.addView(tvYinwen_mingcheng);
				oneJianchajieguo.addView(tvYinwen_mingcheng);
				
				if(jianchaResult.getShuoming() != null && jianchaResult.getShuoming()!="")
				{
					TextView tvJiancha_result_dingliang = new TextView(context);
					tvYinwen_mingcheng.setPadding(5, 5, 5, 5);
					String strJiancha_result_dingliang =  "<font color='#f00'>"+
							jianchaResult.getJiancha_result_dingliang()+jianchaResult.getShuoming()+"</font>";
					tvJiancha_result_dingliang.setText(Html.fromHtml(strJiancha_result_dingliang));
					//holder.layout.addView(tvJiancha_result_dingliang);
					LinearLayout.LayoutParams params_tvJiancha_result_dingliang = new LinearLayout.LayoutParams(
							LinearLayout.LayoutParams.WRAP_CONTENT,
							LinearLayout.LayoutParams.WRAP_CONTENT);
					tvJiancha_result_dingliang.setLayoutParams(params_tvJiancha_result_dingliang);
					//oneXitong.addView(tvJiancha_result_dingliang);
					oneJianchajieguo.addView(tvJiancha_result_dingliang);
				}
				oneXitong.addView(oneJianchajieguo);
			}
			holder.layout.addView(oneXitong);
		}
		//显示用药--start
		ArrayList<YongyaoXitong> yongyaoXitongList = xitongWrapperList.get(position).getYongyaoXitongList();
		if(null != yongyaoXitongList)
		{
			for(int k=0;k<yongyaoXitongList.size();k++)
			{
				TextView tvYongyao = new TextView(context);
				tvYongyao.setPadding(5, 5, 5, 5);
				String strYongyao =  "<font color='#f00'>"+yongyaoXitongList.get(k).getKeyword()+"</font>";
				tvYongyao.setText(Html.fromHtml(strYongyao));
				//holder.layout.addView(tvJiancha_result_dingliang);
				LinearLayout.LayoutParams params_tvYongyao = new LinearLayout.LayoutParams(
						LinearLayout.LayoutParams.WRAP_CONTENT,
						LinearLayout.LayoutParams.WRAP_CONTENT);
				tvYongyao.setLayoutParams(params_tvYongyao);
				tvYongyao.setBackgroundResource(R.drawable.border_item_chafangoverview_one_jianchajieguo);
				//oneXitong.addView(tvJiancha_result_dingliang);
				holder.layout.addView(tvYongyao);
			}
		}
		//显示用药--end
		Log.i("xitongWrapperList size",xitongWrapperList.size()+"");
		Log.i("xitongWrapperList",xitongWrapperList.toString());
		Log.i("convertView",convertView.toString());
		return convertView;
	}

}
