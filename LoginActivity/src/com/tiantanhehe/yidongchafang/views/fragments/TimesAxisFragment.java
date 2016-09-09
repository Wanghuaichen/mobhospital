package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.bean.JianchaTypeBean;
import com.tiantanhehe.yidongchafang.views.adapters.BloodAdapter;

import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.Fragment;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

/**
 * @author Administrator 折线图如果不是从第一天开始画，先去获取timeList的每一项宽度*跳过的天数，就可以当做marginleft
 *         和 marginright,没有margin 可以用padding
 *
 *         PS:直线那里可以不需要那么麻烦，直接写一个横向的view，也是可以的
 */

public class TimesAxisFragment extends Fragment {

	private DisplayMetrics mDisplayMetric;
	private LinearLayout mdatelayout, mdruglayout, mtemperlayout;

	private GridView mGridView;
	private BloodAdapter mAdapter;

	// 解析得到的数组数据
	private List<String> timeList = new ArrayList<String>();
	private List<JianchaTypeBean> typebeanList = new ArrayList<JianchaTypeBean>();

	// 静态常量,Handle判断
	private static final int INIT_TITLE = 0x0001;
	private static final int INIT_TEMPER = 0x0007;

	private String url_titletime = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getZhuyuanZhouqiJson/zhuyuan_id/140180-7/timeformat/12/page/1";
	// private String url_intohospitaltime ="http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getZhuyuanShijianJson/zhuyuan_id/140180-7/";
	private String url_druginfo = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getZhuyuanYongyaoDataJson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17";
	private String url_tiwen = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getHuanzheTizhengDatajson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17/jiancha_type/%E4%BD%93%E6%B8%A9";
	
	private Handler mHandler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case INIT_TITLE:
				drawTitleList((List) msg.obj);
				break;
			case INIT_TEMPER:
				LineChart temperline = new LineChart(getActivity());
				LineData mLineData = makeLineData((Integer) msg.obj);
				setChartStyle(temperline, mLineData, Color.WHITE);
				mtemperlayout.addView(temperline);
				break;
			default:
				break;
			}
		};
	};

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		View view = LayoutInflater.from(getActivity()).inflate(R.layout.activity_timesaxis, null);

		// 顶部时间linear
		mdatelayout = (LinearLayout) view.findViewById(R.id.ll_date_title);
		mdruglayout = (LinearLayout) view.findViewById(R.id.ll_drug_item);
		mtemperlayout = (LinearLayout) view.findViewById(R.id.ll_temper_item);
		mGridView = (GridView) view.findViewById(R.id.gridview_blood);
		mAdapter = new BloodAdapter(getActivity(), timeList);
		mGridView.setAdapter(mAdapter);
		mGridView.setEnabled(false);

		// 折线图相关
		LineChart mLinechart = new LineChart(getActivity());
		LineData mLineData = makeLineData(30);// TODO这里的数量根据timeList来定
		setChartStyle(mLinechart, mLineData, Color.WHITE);

		drawdrugLine(timeList);
		initRequest();
		initMetric();
		return view;
	}

	private void initRequest() {
		StringRequest timerequest = new StringRequest(url_titletime, new Response.Listener<String>() {
			@Override
			public void onResponse(String response) {
				try {
					JSONObject obj;
					JSONArray arr;
					obj = new JSONObject(response);
					String code = obj.getString("code");
					if (code.equals("1")) {
						arr = obj.getJSONArray("data");
						String a = arr.toString().replace('"', ' ').replace("[", "").replace("]", "");
						String[] b = a.split(",");
						for (int i = 0; i < b.length; i++) {
							timeList.add(b[i]);
						}
						// 传递给handle主线程处理
						Message msg = Message.obtain();
						msg.what = INIT_TITLE;
						msg.obj = timeList;
						mHandler.sendMessage(msg);
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		timerequest.setTag(url_titletime);
		GlobalInfoApplication.getHttpQueue().add(timerequest);

		// 药品请求
		StringRequest drugrequest = new StringRequest(url_druginfo, new Response.Listener<String>() {
			@Override
			public void onResponse(String response) {
				try {
					JSONObject obj;
					JSONArray arr;
					obj = new JSONObject(response);
					String code = obj.getString("code");
					if (code.equals("1")) {
						arr = obj.getJSONArray("data");
						String a = arr.toString().replace('"', ' ').replace("[", "").replace("]", "");
						String[] b = a.split(",");
						for (int i = 0; i < b.length; i++) {
							timeList.add(b[i]);
						}
						// 传递给handle主线程处理
						Message msg = Message.obtain();
						msg.what = INIT_TITLE;
						msg.obj = timeList;
						mHandler.sendMessage(msg);
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		drugrequest.setTag(url_druginfo);

		// 体温请求
		StringRequest tiwenrequest = new StringRequest(url_tiwen, new Response.Listener<String>() {
			@Override
			public void onResponse(String response) {
				try {
					JSONObject obj;
					JSONArray arr;
					JianchaTypeBean typebean;
					obj = new JSONObject(response);
					String code = obj.getString("code");
					if (code.equals("1")) {
						arr = obj.getJSONArray("data");
						for (int i = 0; i < arr.length(); i++) {
							typebean = new JianchaTypeBean();
							obj = arr.getJSONObject(i);
							typebean.setJiancha_value(obj.getString("jiancha_value"));
							typebean.setJiancha_time(obj.getString("jiancha_time"));
							typebeanList.add(typebean);
						}
						Toast.makeText(getActivity(), typebeanList + "", Toast.LENGTH_LONG).show();
						// 传递给handle主线程处理
						Message msg = new Message();
						msg.what = INIT_TEMPER;
						msg.obj = typebeanList.size();
						mHandler.sendMessage(msg);
					} else {

					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		tiwenrequest.setTag(url_tiwen);

		GlobalInfoApplication.getHttpQueue().add(timerequest);
		GlobalInfoApplication.getHttpQueue().add(drugrequest);
		GlobalInfoApplication.getHttpQueue().add(tiwenrequest);
	}

	private void initMetric() {
		mDisplayMetric = new DisplayMetrics();
		getActivity().getWindowManager().getDefaultDisplay().getMetrics(mDisplayMetric);
		// Toast.makeText(getActivity(), "屏幕密度为" + mDisplayMetric.density,
		// Toast.LENGTH_SHORT).show();
		Log.e("Pix",
				mDisplayMetric.heightPixels + "," + mDisplayMetric.widthPixels + "。dpi（X和Y是应该是相同的）xdpi= "
						+ mDisplayMetric.xdpi + ",ydpi = " + mDisplayMetric.ydpi + "。desityx（x的总密度）："
						+ mDisplayMetric.densityDpi + "，密度" + mDisplayMetric.density);
	}

	// 日期列表
	private void drawTitleList(List mList) {
		for (int i = 0; i < mList.size(); i++) {
			TextView txt = new TextView(getActivity());
			txt.setText(timeList.get(i).trim());
			txt.setTextColor(Color.parseColor("#2185c6"));
			txt.setGravity(Gravity.CENTER);
			// 其实不该是被动的，应该主动设一个宽度让其他项来适应
			txt.setWidth((int) (mDisplayMetric.density * 2400 / mList.size()));
			mdatelayout.addView(txt);

			TextView txttrim = new TextView(getActivity());
			txttrim.setWidth(40);
			mdatelayout.addView(txttrim);
		}
	}

	// 药品折线图
	private void drawdrugLine(List mList) {
		for (int i = 0; i < 4; i++) {
			LineChart drugline = new LineChart(getActivity());
			LineData mLineData = makeLineData(30);// TODO这里的数量根据timeList来定
			setChartStyle(drugline, mLineData, Color.WHITE);
			mdruglayout.addView(drugline);
		}
	}
	
	
/*-------------------------------------------------------------------------------------------------*/

	/**
	 * 设置折线图显示的样式
	 * 
	 * @param mLineChart
	 * @param lineData
	 * @param color
	 */
	private void setChartStyle(LineChart mLineChart, LineData lineData, int color) {
		// 是否在折线图上添加边框
		mLineChart.setDrawBorders(false);
		mLineChart.setDescription("");// 数据描述
		// 如果没有数据的时候，会显示这个，类似listview的emtpyview
		mLineChart.setNoDataTextDescription("查询不到数据,可能患者无此项记录");

		// 是否绘制背景颜色。
		// 如果mLineChart.setDrawGridBackground(false)，
		// 那么mLineChart.setGridBackgroundColor(Color.WHITE)将失效;
		mLineChart.setGridBackgroundColor(Color.WHITE);
		// 触摸
		mLineChart.setTouchEnabled(false);
		// 拖拽
		mLineChart.setDragEnabled(false);
		// 缩放
		mLineChart.setScaleEnabled(false);
		mLineChart.setPinchZoom(false);
		// 设置背景
		mLineChart.setBackgroundColor(color);

		// 设置x,y轴的数据
		mLineChart.setData(lineData);

		mLineChart.getAxisRight().setEnabled(false); // 隐藏右边 的坐标轴(true不隐藏)
		mLineChart.getAxisLeft().setEnabled(false); // 隐藏右边 的坐标轴(true不隐藏)
		mLineChart.getXAxis().setEnabled(false); // 隐藏右边 的坐标轴(true不隐藏)
		// mLineChart.getXAxis().setPosition(XAxisPosition.BOTTOM); // 让x轴在下面

		// // 设置比例图标示，就是那个一组y的value的
		// Legend mLegend = mLineChart.getLegend();
		// mLegend.setPosition(LegendPosition.BELOW_CHART_CENTER);
		// mLegend.setForm(LegendForm.CIRCLE);// 样式
		// mLegend.setFormSize(15.0f);// 字体
		// mLegend.setTextColor(Color.RED);// 颜色

		// 沿x轴动画，时间2000毫秒。
		// mLineChart.animateX(2000);
	}

	/**
	 * @param count
	 *            数据点的数量。
	 * @return
	 */
	private LineData makeLineData(int count) {
		// x轴的数据
		ArrayList<String> x = new ArrayList<String>();
		for (int i = 0; i < count; i++) {
			x.add("" + i);
		}

		// y轴的数据
		ArrayList<Entry> y = new ArrayList<Entry>();
		for (int i = 0; i < count; i++) {
			// int val = (int) (Math.random() * 100);
			int val = 0;
			Entry entry = new Entry(val, i);
			y.add(entry);
		}

		// y轴数据集
		LineDataSet mLineDataSet = new LineDataSet(y, "");
		// 用y轴的集合来设置参数
		// 线宽
		mLineDataSet.setLineWidth(3.0f);
		// 显示的圆形大小
		mLineDataSet.setCircleSize(4.0f);
		// 折线的颜色
		mLineDataSet.setColor(Color.RED);
		// 圆球的颜色
		mLineDataSet.setCircleColor(Color.GREEN);

		// 设置mLineDataSet.setDrawHighlightIndicators(false)后，
		// Highlight的十字交叉的纵横线将不会显示，
		// 同时，mLineDataSet.setHighLightColor(Color.CYAN)失效。
		mLineDataSet.setDrawHighlightIndicators(false);

		// 按击后，十字交叉线的颜色
		mLineDataSet.setHighLightColor(Color.WHITE);

		// 设置这项上显示的数据点的字体大小。
		mLineDataSet.setValueTextSize(0.0f);

		// mLineDataSet.setDrawCircleHole(true);

		// 改变折线样式，用曲线。
		// mLineDataSet.setDrawCubic(true);
		// 默认是直线
		// 曲线的平滑度，值越大越平滑。
		// mLineDataSet.setCubicIntensity(0.2f);

		// 填充曲线下方的区域，红色，半透明。
		// mLineDataSet.setDrawFilled(true);
		// mLineDataSet.setFillAlpha(128);
		// mLineDataSet.setFillColor(Color.RED);

		// 填充折线上数据点、圆球里面包裹的中心空白处的颜色。
		mLineDataSet.setCircleColorHole(Color.BLUE);

		// 设置折线上显示数据的格式。如果不设置，将默认显示float数据格式。
		// mLineDataSet.setValueFormatter(new ValueFormatter() {
		//
		// @Override
		// public String getFormattedValue(float value) {
		// int n = (int) value;
		// String s = "y:" + n;
		// return s;
		// }
		//
		// @Override
		// public String getFormattedValue(float value, Entry entry, int
		// dataSetIndex,
		// ViewPortHandler viewPortHandler) {
		// int n = (int) value;
		// String s = "y:" + n;
		// return s;
		// }
		// });

		ArrayList<LineDataSet> mLineDataSets = new ArrayList<LineDataSet>();
		mLineDataSets.add(mLineDataSet);

		LineData mLineData = new LineData(x, mLineDataSets);
		return mLineData;
	}
}