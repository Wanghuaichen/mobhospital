package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.ArrayList;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.Legend.LegendForm;
import com.github.mikephil.charting.components.Legend.LegendPosition;
import com.github.mikephil.charting.components.XAxis.XAxisPosition;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.formatter.ValueFormatter;
import com.github.mikephil.charting.utils.ViewPortHandler;
import com.tiantanhehe.yidongchafang.R;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class TimesAxisFragment extends Fragment {

	private DisplayMetrics mDisplayMetric;
	private LinearLayout mLinelayout;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		View view = LayoutInflater.from(getActivity()).inflate(R.layout.activity_timesaxis, null);

		LineChart chart = (LineChart) view.findViewById(R.id.chart);
		// 制作7个数据点（沿x坐标轴）
		LineData mLineData = makeLineData(29);
		setChartStyle(chart, mLineData, Color.WHITE);

		initMetric();
		drawTitleList(view);
		return view;
	}

	private void initMetric() {
		mDisplayMetric = new DisplayMetrics();
		getActivity().getWindowManager().getDefaultDisplay().getMetrics(mDisplayMetric);
		Toast.makeText(getActivity(), "屏幕密度为" + mDisplayMetric.density, Toast.LENGTH_SHORT).show();
		Log.e("Pix",
				mDisplayMetric.heightPixels + "," + mDisplayMetric.widthPixels + "。dpi（X和Y是应该是相同的）xdpi= "
						+ mDisplayMetric.xdpi + ",ydpi = " + mDisplayMetric.ydpi + "。desityx（x的总密度）："
						+ mDisplayMetric.densityDpi + "，密度" + mDisplayMetric.density);
	}

	private void drawTitleList(View view) {
		mLinelayout = (LinearLayout) view.findViewById(R.id.ll_date_title);
		for (int i = 0; i < 29; i++) {
			TextView txt = new TextView(getActivity());
			txt.setText("第" + i + "天");
			txt.setTextColor(Color.parseColor("#2185c6"));
			txt.setGravity(Gravity.CENTER);
			
			txt.setWidth((int) (mDisplayMetric.density * 1600 / 29));
			mLinelayout.addView(txt);
		}
	}

	// 设置chart显示的样式
	private void setChartStyle(LineChart mLineChart, LineData lineData, int color) {
		// 是否在折线图上添加边框
		mLineChart.setDrawBorders(false);

		mLineChart.setDescription("");// 数据描述

		// 如果没有数据的时候，会显示这个，类似listview的emtpyview
		mLineChart.setNoDataTextDescription("如果传给MPAndroidChart的数据为空，那么你将看到这段文字。@Zhang Phil");

		// 是否绘制背景颜色。
		// 如果mLineChart.setDrawGridBackground(false)，
		// 那么mLineChart.setGridBackgroundColor(Color.CYAN)将失效;
		mLineChart.setDrawGridBackground(false);
		mLineChart.setGridBackgroundColor(Color.CYAN);

		// 触摸
		mLineChart.setTouchEnabled(true);

		// 拖拽
		mLineChart.setDragEnabled(true);

		// 缩放
		mLineChart.setScaleEnabled(true);

		mLineChart.setPinchZoom(false);

		// 设置背景
		mLineChart.setBackgroundColor(color);

		// 设置x,y轴的数据
		mLineChart.setData(lineData);

		mLineChart.getAxisRight().setEnabled(false); // 隐藏右边 的坐标轴(true不隐藏)
		mLineChart.getXAxis().setPosition(XAxisPosition.BOTTOM); // 让x轴在下面

		// 设置比例图标示，就是那个一组y的value的
		Legend mLegend = mLineChart.getLegend();

		mLegend.setPosition(LegendPosition.BELOW_CHART_CENTER);
		mLegend.setForm(LegendForm.CIRCLE);// 样式
		mLegend.setFormSize(15.0f);// 字体
		mLegend.setTextColor(Color.RED);// 颜色

		// 沿x轴动画，时间2000毫秒。
		mLineChart.animateX(100);
	}

	/**
	 * @param count
	 *            数据点的数量。
	 * @return
	 */
	private LineData makeLineData(int count) {
		ArrayList<String> x = new ArrayList<String>();
		for (int i = 0; i < count; i++) {
			// x轴显示的数据
			x.add("x:" + i);
		}

		// y轴的数据
		ArrayList<Entry> y = new ArrayList<Entry>();
		for (int i = 0; i < count; i++) {
			float val = (float) (Math.random() * 100);
			Entry entry = new Entry(val, i);
			y.add(entry);
		}

		// y轴数据集
		LineDataSet mLineDataSet = new LineDataSet(y, "测试数据集。");

		// 用y轴的集合来设置参数
		// 线宽
		mLineDataSet.setLineWidth(3.0f);

		// 显示的圆形大小
		mLineDataSet.setCircleSize(5.0f);

		// 折线的颜色
		mLineDataSet.setColor(Color.DKGRAY);

		// 圆球的颜色
		mLineDataSet.setCircleColor(Color.GREEN);

		// 设置mLineDataSet.setDrawHighlightIndicators(false)后，
		// Highlight的十字交叉的纵横线将不会显示，
		// 同时，mLineDataSet.setHighLightColor(Color.CYAN)失效。
		mLineDataSet.setDrawHighlightIndicators(true);

		// 按击后，十字交叉线的颜色
		mLineDataSet.setHighLightColor(Color.CYAN);

		// 设置这项上显示的数据点的字体大小。
		mLineDataSet.setValueTextSize(10.0f);

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
		mLineDataSet.setCircleColorHole(Color.YELLOW);

		// 设置折线上显示数据的格式。如果不设置，将默认显示float数据格式。
		mLineDataSet.setValueFormatter(new ValueFormatter() {

			// @Override
			// public String getFormattedValue(float value) {
			// int n = (int) value;
			// String s = "y:" + n;
			// return s;
			// }

			@Override
			public String getFormattedValue(float value, Entry entry, int dataSetIndex,
					ViewPortHandler viewPortHandler) {
				// TODO Auto-generated method stub
				int n = (int) value;
				String s = "y:" + n;
				return s;
			}
		});

		ArrayList<LineDataSet> mLineDataSets = new ArrayList<LineDataSet>();
		mLineDataSets.add(mLineDataSet);

		LineData mLineData = new LineData(x, mLineDataSets);

		return mLineData;
	}
}
