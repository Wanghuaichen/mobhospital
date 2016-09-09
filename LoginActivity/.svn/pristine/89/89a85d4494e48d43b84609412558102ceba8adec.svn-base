package com.tiantanhehe.yidongchafang.views.adapters;

import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.text.Html;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.TextView;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.utils.GuideGson;
import com.tiantanhehe.yidongchafang.utils.GuideGson.ContenBean;
import com.tiantanhehe.yidongchafang.utils.GuideGson.ContenBean.GuizeBean;
import com.tiantanhehe.yidongchafang.views.fragments.ChafangYindaoFragment;

/***
 * 
 * @ClassName: ChaFangGuideAdapter
 * @Description: TODO(适配查房引导)
 * @author zhangyali <zhangyali@tiantanhehe.com>
 * @date 2016年7月13日 下午3:45:05
 *
 */
public class ChaFangGuideAdapter extends BaseAdapter {
	private List<GuideGson> mList;
	private LayoutInflater inflater;
	private ChafangYindaoFragment fragment;
	private Context context;

	public ChaFangGuideAdapter(Context context, ArrayList<GuideGson> list,
			ChafangYindaoFragment fragment) {
		this.mList = list;
		this.context = context;
		this.fragment = fragment;
		inflater = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}

	public ChaFangGuideAdapter(Context context, ArrayList<GuideGson> list) {
		this.mList = list;
		this.context = context;
		inflater = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}
	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		if (mList == null) {
			return 0;
		}
		return mList.size();
	}

	@Override
	public Object getItem(int position) {
		// TODO Auto-generated method stub
		return mList.get(position);
	}

	@Override
	public long getItemId(int position) {
		// TODO Auto-generated method stub
		return position;
	}

	@Override
	public View getView(final int position, View convertView, ViewGroup parent) {
		ViewHolder holder = null;
		final List<ContenBean> conten = mList.get(position).getConten();


		if (convertView == null) {
			convertView = inflater.inflate(R.layout.chafang_guide_item, null);
			holder = new ViewHolder();
			holder.tv = (TextView) convertView.findViewById(R.id.item);
			holder.layout = (LinearLayout) convertView
					.findViewById(R.id.content);

			convertView.setTag(holder);
		} else {
			holder = (ViewHolder) convertView.getTag();
		}
		(holder.layout).removeAllViews();
		for (int i = 0; i < conten.size(); i++) {
				LinearLayout linearLayout = new LinearLayout(context);
				linearLayout.setOrientation(LinearLayout.HORIZONTAL);
				linearLayout.setLayoutParams(new LinearLayout.LayoutParams(
						LinearLayout.LayoutParams.MATCH_PARENT,
 100));
				linearLayout
						.setBackgroundResource(R.drawable.chafangyindao_item_background);
				TextView xiangmu = new TextView(context);
				xiangmu.setLayoutParams(new LinearLayout.LayoutParams(
						LinearLayout.LayoutParams.WRAP_CONTENT,
					LinearLayout.LayoutParams.MATCH_PARENT));
			xiangmu.setGravity(Gravity.CENTER);
			LinearLayout.LayoutParams params = (LayoutParams) xiangmu
					.getLayoutParams();
			params.setMargins(5, 5, 5, 5);
				String cishu = conten.get(i).getCishu();
				final String zhixing_cishu = conten.get(i).getZhixing_cishu();
				if (conten.get(i).getCishu().equals("1")) {
					xiangmu.setTextColor(context.getResources().getColor(
							R.color.lanse));
					xiangmu.setText(conten.get(i).getXiangmu().toString() + ":");
				} else {
					String html = "<font color=\"#3388CC\">"
							+ conten.get(i).getXiangmu() + "(" + "</font>"
							+ "<font color=\"#ff0000\">"
							+ conten.get(i).getZhixing_cishu() + "</font>"
							+ "<font color=\"#3388CC\">" + "/"
							+ conten.get(i).getCishu() + "):" + "</font>";
					xiangmu.setText(Html.fromHtml(html));
				}
				linearLayout.addView(xiangmu);
				LinearLayout guizelin = new LinearLayout(context);
				final List<GuizeBean> guize = conten.get(i).getGuize();
				final int pos = i;
				for (int j = 0; j < guize.size(); j++) {
					final int k = j;
					final String name = guize.get(j).getName();
					final String cishuString = guize.get(j).getCishu();
					guizelin.setOrientation(LinearLayout.HORIZONTAL);
					guizelin.setLayoutParams(new LinearLayout.LayoutParams(
							LinearLayout.LayoutParams.WRAP_CONTENT,
							LinearLayout.LayoutParams.WRAP_CONTENT));
				guizelin.setPadding(5, 5, 5, 5);
					Button tv = new Button(context);
					tv.setLayoutParams(new LinearLayout.LayoutParams(
						LinearLayout.LayoutParams.WRAP_CONTENT,
						LinearLayout.LayoutParams.WRAP_CONTENT));

				tv.setTextSize(16);
				LinearLayout.LayoutParams param = (LayoutParams) tv
						.getLayoutParams();
				param.setMargins(10, 5, 10, 5);
					tv.setOnClickListener(new OnClickListener() {

						@Override
						public void onClick(View v) {
							// TODO Auto-generated method stub
						boolean upDataChafang = fragment.upDataChafang(name,
								mList.get(position)
									.getJibing(), conten.get(pos).getXiangmu());
						if (upDataChafang) {
							mList.get(position)
									.getConten()
									.get(pos)
									.setZhixing_cishu(
											Integer.parseInt(zhixing_cishu) + 1
													+ "");

							mList.get(position)
									.getConten()
									.get(pos)
									.getGuize()
									.get(k)
									.setCishu(
											Integer.parseInt(cishuString) + 1
													+ "");
							notifyDataSetChanged();
						}

						}
					});


					if (cishu.equals("1")) {
						tv.setText(guize.get(j).getName());

						if (!guize.get(j).getCishu().equals("0")) {
							tv.setTextColor(context.getResources().getColor(
									R.color.white));
						tv.setBackgroundResource(R.color.lanse);
						}

					} else {
						if (guize.get(j).getCishu().equals("0")) {

							String guizehtml = "<font color=\"#000000\">"
									+ guize.get(j).getName() + "(" + "</font>"
									+ "<font color=\"#ff0000\">"
									+ guize.get(j).getCishu() + "</font>"
									+ "<font color=\"#000000\">" + "/" + cishu
									+ ")" + "</font>";
							tv.setText(Html.fromHtml(guizehtml));
						} else {
							tv.setBackgroundResource(R.color.lanse);
							String guizehtml = "<font color=\"#ffffff\">"
									+ guize.get(j).getName() + "(" + "</font>"
									+ "<font color=\"#ffff00\">"
									+ guize.get(j).getCishu() + "</font>"
									+ "<font color=\"#fffffff\">" + "/" + cishu
									+ ")" + "</font>";
							tv.setText(Html.fromHtml(guizehtml));
						}
					}

					guizelin.addView(tv);
				}
				linearLayout.addView(guizelin);
				holder.layout.addView(linearLayout);
			}

		holder.tv.setText(mList.get(position).getJibing());

		return convertView;
	}

	class ViewHolder {
		TextView tv;
		LinearLayout layout;
	}


}
