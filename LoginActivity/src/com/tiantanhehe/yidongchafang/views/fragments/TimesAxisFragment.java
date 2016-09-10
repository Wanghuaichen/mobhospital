package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.Legend.LegendForm;
import com.github.mikephil.charting.components.Legend.LegendPosition;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.bean.BingliRecordBean;
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
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

/**
 * 思路:
 * @author Administrator 
 * 		       折线图如果不是从第一天开始画，先去获取timeList的每一项宽度*跳过的天数，就可以当做marginleft
 *         和 marginright,没有margin 可以用padding
 *
 *         PS:直线那里可以不需要那么麻烦，直接写一个横向的view，根据margin再做计算，也是可以的
 *         Volley队列并发处理所需的请求
 */

public class TimesAxisFragment extends Fragment implements OnItemClickListener{

	private DisplayMetrics mDisplayMetric;
	//需动态添加内容的LinearLayout布局
	private LinearLayout mdatelayout, mdruglayout, mtemperlayout,mmaibolayout;
	private TextView mtxtLivetime;
	
	//显示文本的列表(辅助检查/病历记录)
	private ListView mLvFuzhujiancha;
	private ArrayAdapter<String> mAdapFuzhujiancha;
	private List<String> mtxtFuzhujianchaList = new ArrayList<String>();
	private ListView mLvIllrecord;
	private ArrayAdapter<String> mAdapIllrecord;
	private List<String> mtxtIllrecordList = new ArrayList<String>();	
	private List<BingliRecordBean> mBingliRecordList = new ArrayList<BingliRecordBean>();
	
	//暂时考虑用GridView做血压，可能更换
	private GridView mGridView;
	private BloodAdapter mAdapter;

	// 解析后得到的数组数据
	private List<String> timeList = new ArrayList<String>();
	private List<JianchaTypeBean> typebeanList = new ArrayList<JianchaTypeBean>();
	private List<String> temperList = new ArrayList<String>();

	// 静态常量,Handle判断
	private static final int INIT_TITLE = 0x0001;

	private String url_titletime = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getZhuyuanZhouqiJson/zhuyuan_id/140180-7/timeformat/24/page/1";
	private String url_livetime ="http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getZhuyuanShijianJson/zhuyuan_id/140180-7/";
	private String url_druginfo = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getZhuyuanYongyaoDataJson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17";
	private String url_fuzhujiancha = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getFuzhuJianchaDataJson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17";
	private String url_nurse = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getHuliDataJson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17";
	private String url_illrecord = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getBingliJiluDataJson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17";
	private String url_temper = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getHuanzheTizhengDatajson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17/jiancha_type/%E4%BD%93%E6%B8%A9";
	private String url_maibo = "http://203.195.184.174/tiantan_emr/Mobile/YidongChafangClientCommunication/getHuanzheTizhengDatajson/zhuyuan_id/140180-7/start_time/2015-05-07/end_time/2017-05-17/jiancha_type/%e8%84%89%e6%90%8f";
	
	private Handler mHandler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case INIT_TITLE:
				drawTitleList((List) msg.obj);
				//取出start_time和end_time
				String start_time = timeList.get(0);
				String end_time = timeList.get(timeList.size()-1);
				//执行其他请求
				otherRequest(start_time,end_time);
				//画药品折线
				drawdrugLine(timeList);
				break;
			default:
				break;
			}
		};
	};

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		View view = LayoutInflater.from(getActivity()).inflate(R.layout.activity_timesaxis, null);

		// 主Item初始化
		mdatelayout = (LinearLayout) view.findViewById(R.id.ll_date_title);
		mtxtLivetime = (TextView) view.findViewById(R.id.txt_timesaxisfragment_livetime);
		mdruglayout = (LinearLayout) view.findViewById(R.id.ll_drug_item);
		mtemperlayout = (LinearLayout) view.findViewById(R.id.ll_temper_item);
		mmaibolayout = (LinearLayout) view.findViewById(R.id.ll_maibo_item);
		
		//列表初始化
		mLvFuzhujiancha= (ListView) view.findViewById(R.id.listview_fuzhujiancha);
		mLvIllrecord = (ListView) view.findViewById(R.id.listview_illrecord);
		//病例记录列表的Toast事件
		mLvIllrecord.setOnItemClickListener(this);
		
		mGridView = (GridView) view.findViewById(R.id.gridview_blood);
		mAdapter = new BloodAdapter(getActivity(), timeList);
		mGridView.setAdapter(mAdapter);
		mGridView.setEnabled(false);

		initRequest();
		initMetric();
		return view;
	}

	/**
	 * 初始请求
	 * 去获取时间列表
	 */
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
	}

	/**
	 * 初始化请求成功后执行以下请求
	 * 入参start_time和end_time
	 */
	private void otherRequest(String start_time,String end_time) {
		// 入院时间请求
		StringRequest liverequest = new StringRequest(url_livetime, new Response.Listener<String>() {
			@Override
			public void onResponse(String response) {
				try {
					JSONObject obj;
					JSONArray arr;
					obj = new JSONObject(response);
					String code = obj.getString("code");
					if (code.equals("1")) {
						/*后端返回的不是数组，无法用数组读取,改成数组后，将下列注释替换即可*/
//						arr = obj.getJSONArray("data");
//						obj = arr.getJSONObject(0);
//						String live_time = obj.getString("ruyuan_riqi_time");
						obj = obj.getJSONObject("data");
						//给mtxtLivetime设置入院时间
						mtxtLivetime.setText("   ○ 入院时间：" + obj + "");
					} 
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		liverequest.setTag(url_livetime);
		
		// 用药请求
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
//						Message msg = Message.obtain();
//						msg.what = INIT_TITLE;
//						msg.obj = timeList;
//						mHandler.sendMessage(msg);
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		drugrequest.setTag(url_druginfo);
		
		// 辅助检查请求
		StringRequest fuzhujiancharequest = new StringRequest(url_fuzhujiancha, new Response.Listener<String>() {
			@Override
			public void onResponse(String response) {
				try {
					JSONObject obj;
					JSONArray arr;
					obj = new JSONObject(response);
					String code = obj.getString("code");
					if (code.equals("1")) {
						arr = obj.getJSONArray("data");
						String jiancha_mingcheng;
						for (int i = 0; i < arr.length(); i++) {
							obj = arr.getJSONObject(i);
							jiancha_mingcheng = obj.getString("jiancha_mingcheng");
							mtxtFuzhujianchaList.add(" ☆ " + jiancha_mingcheng);
						}
						//将辅助检查的内容放入列表
						mAdapFuzhujiancha = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, mtxtFuzhujianchaList);
						mLvFuzhujiancha.setAdapter(mAdapFuzhujiancha);
					} 
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		fuzhujiancharequest.setTag(url_fuzhujiancha);
		
		//病例记录请求
		StringRequest illrecordrequest = new StringRequest(url_illrecord, new Response.Listener<String>() {
			@Override
			public void onResponse(String response) {
				try {
					JSONObject obj;
					JSONArray arr;
					BingliRecordBean illrecord;
					obj = new JSONObject(response);
					String code = obj.getString("code");
					if (code.equals("1")) {
						arr = obj.getJSONArray("data");
						String bingcheng_sub_leibie;
						for (int i = 0; i < arr.length(); i++) {
							obj = arr.getJSONObject(i);
							illrecord = new BingliRecordBean();
							illrecord.setBingcheng_sub_leibie(obj.getString("bingcheng_sub_leibie"));
							illrecord.setId(obj.getString("id"));
							illrecord.setLeixing(obj.getString("leixing"));
							illrecord.setRecord_time(obj.getString("record_time"));
							bingcheng_sub_leibie = obj.getString("bingcheng_sub_leibie");
							//用于显示病例记录中的文字
							mtxtIllrecordList.add( " □ " + bingcheng_sub_leibie);
							//用于Toast病例中的选中项
							mBingliRecordList.add(illrecord);
						}
						//将病例记录的内容放入列表
						mAdapIllrecord = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, mtxtIllrecordList);
						mLvIllrecord.setAdapter(mAdapIllrecord);
					} 
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		illrecordrequest.setTag(url_illrecord);
		
		// 体温请求
		StringRequest temperrequest = new StringRequest(url_temper, new Response.Listener<String>() {
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
						String jiancha_value;
						for (int i = 0; i < arr.length(); i++) {
							typebean = new JianchaTypeBean();
							obj = arr.getJSONObject(i);
							//可能不需要这个对象数组了，只需要其中的温度值
							typebean.setJiancha_value(obj.getString("jiancha_value"));
							typebean.setJiancha_time(obj.getString("jiancha_time"));
							typebeanList.add(typebean);
							//温度值放入数组
							jiancha_value = obj.getString("jiancha_value");
							temperList.add(jiancha_value);
						}
						//直接画折线图
						LineChart temperline = new LineChart(getActivity());
						LineData mLineData = makeLineData(temperList,"#cf87e8","#0e18ff");
						setChartStyle(temperline, mLineData, Color.WHITE);
						mtemperlayout.addView(temperline);
						
						// TODO画折线的数据，可能需要新建一个handler
//						Message msg = new Message();
//						msg.what = INIT_TEMPER;
//						msg.obj = typebeanList.size();
//						mHandler.sendMessage(msg);
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		temperrequest.setTag(url_temper);
		
		//脉搏请求
		StringRequest maiborequest = new StringRequest(url_maibo, new Response.Listener<String>() {
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
						String jiancha_value;
						for (int i = 0; i < arr.length(); i++) {
							typebean = new JianchaTypeBean();
							obj = arr.getJSONObject(i);
							//这里应该换脉搏值
							typebean.setJiancha_value(obj.getString("jiancha_value"));
							typebean.setJiancha_time(obj.getString("jiancha_time"));
							typebeanList.add(typebean);
							//脉搏值放入数组
							jiancha_value = obj.getString("jiancha_value");
							temperList.add(jiancha_value);
						}
						
						//直接画折线图(没有请求到脉搏数据，暂时用体温数据)
						LineChart maiboline = new LineChart(getActivity());
						LineData mLineData = makeLineData(temperList,"#339966","#ff0000");
						setChartStyle(maiboline, mLineData, Color.WHITE);
						mmaibolayout.addView(maiboline);
					} else {

					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}, null);
		maiborequest.setTag(maiborequest);
		
		//加入volley队列，并发请求
		GlobalInfoApplication.getHttpQueue().add(liverequest);
		GlobalInfoApplication.getHttpQueue().add(drugrequest);
		GlobalInfoApplication.getHttpQueue().add(fuzhujiancharequest);
		GlobalInfoApplication.getHttpQueue().add(illrecordrequest);
		GlobalInfoApplication.getHttpQueue().add(temperrequest);
		GlobalInfoApplication.getHttpQueue().add(maiborequest);
	}

	/**
	 * 测量屏幕
	 */
	private void initMetric() {
		mDisplayMetric = new DisplayMetrics();
		getActivity().getWindowManager().getDefaultDisplay().getMetrics(mDisplayMetric);
		Log.e("Pix",mDisplayMetric.heightPixels + "," + mDisplayMetric.widthPixels + "。dpi（X和Y是应该是相同的）xdpi= "
						+ mDisplayMetric.xdpi + ",ydpi = " + mDisplayMetric.ydpi + "。desityx（x的总密度）："
						+ mDisplayMetric.densityDpi + "，密度" + mDisplayMetric.density);
	}

	/**
	 *  日期列表
	 * @param mList
	 */
	private void drawTitleList(List mList) {
		for (int i = 0; i < mList.size(); i++) {
			TextView txt = new TextView(getActivity());
			txt.setText(timeList.get(i).trim());
			txt.setTextColor(Color.parseColor("#2185c6"));
			txt.setTextSize(18);
			txt.setGravity(Gravity.CENTER);
			// TODO其实不该是被动的，应该主动设一个宽度让其他项来适应
			txt.setWidth((int) (mDisplayMetric.density * 2400 / mList.size()));
			mdatelayout.addView(txt);

			TextView txttrim = new TextView(getActivity());
			txttrim.setWidth(40);
			mdatelayout.addView(txttrim);
		}
	}

	/**
	 *  药品折线图  TODO,改为自定义直线,根据药品种类，画线
	 * @param mList
	 */
	private void drawdrugLine(List mList) {
		for (int i = 0; i < 4; i++) {
			//自定义画线
			View drugline = new View(getActivity());
			LinearLayout.LayoutParams params=new LinearLayout.LayoutParams(1600,(int) (2*mDisplayMetric.density));
			params.leftMargin = (int) (8*mDisplayMetric.density);
			params.topMargin = (int) (16*mDisplayMetric.density);
			params.bottomMargin = (int) (8*mDisplayMetric.density);
			drugline.setLayoutParams(params);
			if(i%2 == 0){
				drugline.setBackgroundColor(Color.parseColor("#ff0000"));
			}else{
				drugline.setBackgroundColor(Color.parseColor("#339966"));
			}
			mdruglayout.addView(drugline);
			
			//第三方折线图			
//			LineChart drugline = new LineChart(getActivity());
//			LineData mLineData = makeLineData(null,null,null);// TODO这里的数量根据timeList来定
//			setChartStyle(drugline, mLineData, Color.WHITE);
//			mdruglayout.addView(drugline);
		}
	}
	
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
		mLineChart.setNoDataTextDescription("查询不到数据,患者无此项记录");

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

		 // 设置比例图标示，就是那个一组y的value的
		 Legend mLegend = mLineChart.getLegend();
		 mLegend.setPosition(LegendPosition.BELOW_CHART_CENTER);
		 mLegend.setForm(LegendForm.CIRCLE);// 样式
		 mLegend.setFormSize(0.0f);// 字体
		 mLegend.setTextColor(Color.WHITE);// 颜色

		// 沿x轴动画，时间2000毫秒。
		// mLineChart.animateX(100);
	}

	/**
	 * @param count
	 *            做数据点
	 * @return
	 */
	private LineData makeLineData(List<String> mList,String linecolor, String dotcolor) {
		// x轴的数据
		ArrayList<String> x = new ArrayList<String>();
		for (int i = 0; i < mList.size(); i++) {
			x.add("" + i);
		}

		// y轴的数据
		ArrayList<Entry> y = new ArrayList<Entry>();
		for (int i = 0; i < mList.size(); i++) {
			float val = Float.parseFloat(mList.get(i));
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
		mLineDataSet.setColor(Color.parseColor(linecolor));
		// 圆球的颜色
		mLineDataSet.setCircleColor(Color.parseColor(dotcolor));

		// 设置mLineDataSet.setDrawHighlightIndicators(false)后，
		// Highlight的十字交叉的纵横线将不会显示，
		// 同时，mLineDataSet.setHighLightColor(Color.CYAN)失效。
		mLineDataSet.setDrawHighlightIndicators(false);

		// 按击后，十字交叉线的颜色
		mLineDataSet.setHighLightColor(Color.WHITE);

		// 设置这项上显示的数据点的字体大小。
		mLineDataSet.setValueTextSize(10.0f);
		mLineDataSet.setValueTextColor(Color.parseColor(dotcolor));
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
		mLineDataSet.setCircleColorHole(Color.parseColor(dotcolor));

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

	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
		BingliRecordBean local_illrecord = mBingliRecordList.get(position);
		String show_text = local_illrecord.getRecord_time() + ":" + local_illrecord.getBingcheng_sub_leibie();
		Toast.makeText(getActivity(), show_text,Toast.LENGTH_LONG).show();
	}
}