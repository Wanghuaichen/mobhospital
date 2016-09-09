package com.tiantanhehe.yidongchafang.views.activities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.ScreenObserver;
import com.tiantanhehe.yidongchafang.common.ScreenObserver.ScreenStateListener;
import com.tiantanhehe.yidongchafang.common.TiantanLog;
import com.tiantanhehe.yidongchafang.services.DataTongbuService;
import com.tiantanhehe.yidongchafang.services.XiezuoService;
import com.tiantanhehe.yidongchafang.views.activities.tools.PingToolsActivity;
import com.tiantanhehe.yidongchafang.views.activities.tools.ResetPasswordActivity;
import com.tiantanhehe.yidongchafang.views.adapters.MokuaiAdapter;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

/**************************************************
 * Created: 2015-03 Info:主界面
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class MainActivity extends YiDongYiHuBrowserActivity {

	private int disPlayWidth;
	private int icon_width;
	public Intent yizhuTongbuIntent;

	private GridView gridView = null;
	private MokuaiAdapter adapter;
	private List<Map<String, Object>> listdata;
	private ScreenObserver mScreenObserver;
	private SharedPreferences sharedPreferences;
	private View v;
	@Override
	public String buildRequestArg(String initial_arg) {
		String request_arg = super.buildRequestArg(initial_arg);
		return request_arg;
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "oncreate start");
		// super.openRightHuanzheList();
		orientationInit();
		viewInit();
		serviceInit();
		dataInit();
		testInit();
		settingsInit();
		if (this.getClass().isAssignableFrom(MainActivity.class)) {
			super.loadConent();
		}

		user_info.setVisibility(View.VISIBLE);
		left_content.setVisibility(View.GONE);
		left_state = true;
		super.openLeftFeatureMenu(v);
	}

	@Override
	protected void settingsInit() {
		super.settingsInit();

	};


	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		if (current_application.appConf.qiangzhi_tuichu && current_application.appConf.enableToUse.equals("否")) {
			tipDialog(context, "提示", "您被系统强制下线。", new OnClickListener() {
				public void onClick(DialogInterface arg0, int arg1) {
					// TODO Auto-generated method stub
					QiangZhiTuiChu();
				}
			});
		}
	}

	private void dataInit() {
		// super.initHuanZheData();
		// super.setDingbuHuanZheXinXi();
		super.tiaoZhuangActivity = MainActivity.class;
		super.setUserInfoData();

		// 处理锁屏相关数据
		sharedPreferences = getSharedPreferences("suoping", MODE_PRIVATE);
		Editor editor = sharedPreferences.edit();
		editor.clear();
		editor.commit();

	}

	/**
	 * @Title: viewInit
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月6日 下午7:29:57
	 */
	private void viewInit() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "viewInit");
		initFrameView();

		initUserView();

		initHuanZheView();

		initTitleView();

		// initMokuai();


		if (current_application.appConf.current_user_number.equals("")) {
			current_application.qingkongApplication();
			Intent intent = new Intent(MainActivity.this, LoginActivity.class);
			startActivity(intent);
		}



	}

	/**
	 * @Title: testInit
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月28日 上午9:20:56
	 */
	private void testInit() {

		// crash test
		// String test = "123";
		// test.substring(5);

	}

	/**
	 * @Title: initHuanZheView
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月12日 下午6:57:02
	 */
	public void initHuanZheView() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "initHuanZheView");
		super.initRenShuView();

	}

	public void initTitleView() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "initTitleView");
		if (!current_application.appConf.current_patient_zhuyuan_id.equals("")) {
			// 2015.09.23_Arno修改_继承了TiantanActivity.java的setDingbuHuanZheXinXi()方法，完成显示主界面顶端患者信息功能
			setDingbuHuanZheXinXi();
		}
	}



	public void initFrameView() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "initFrameView");
		actionBar = getActionBar();
		actionBar.setCustomView(R.layout.main_header);
		actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
		actionBar.setDisplayShowCustomEnabled(true);
	}

	private void serviceInit() {
		// 开启一个服务后台进行协作数据处理
		Intent serviceIntent;
		if (current_application.appConf.open_xiezuo) {

			serviceIntent = new Intent(this, XiezuoService.class);
			xiezuoServiceConnection = new XiezuoServiceConnection();
			try {
				// startService(serviceIntent);
				bindService(serviceIntent, xiezuoServiceConnection, Context.BIND_AUTO_CREATE);
				Log.d("tiantan", "ziezuo service bind");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		// 开启一个服务后台同步数据
		if (current_application.appConf.open_data_tongbu && !current_application.appConf.current_user_number.equals("")
				&& current_application.appConf.heart_beart_period > 0) {
			serviceIntent = new Intent(this, DataTongbuService.class);
			try {

				startService(serviceIntent);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		mScreenObserver = new ScreenObserver(this);
		mScreenObserver.requestScreenStateUpdate(new ScreenStateListener() {
			@Override
			public void onScreenOn() {

				doSomethingOnScreenOn();
			}

			@Override
			public void onScreenOff() {
				doSomethingOnScreenOff();
			}
		});

	}

	/**
	 * @Title: initUserInfo
	 * @Description:初始化左侧用户信息界面
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月6日 下午7:23:00
	 */
	public void initUserView() {
		Log.d("tiantan", "[UI]" + "[mainactivity]" + "initUserView");
		ImageView iv_user = (ImageView) findViewById(R.id.user_touxiang);
		if (iv_user != null) {
			iv_user.setOnClickListener(new View.OnClickListener() {

				@Override
				public void onClick(View v) {
					goXiezuo(v);
				}
			});
		}

		// Switch yinxiaoSwitch = ((Switch) findViewById(R.id.yinxiaoSwitch));
		ToggleButton yinxiaoSwitch = (ToggleButton) findViewById(R.id.yinxiaoSwitch);
		int ranger_mode = getRangerMode();
		if (RINGER_MODE_SILENT == ranger_mode) {
			yinxiaoSwitch.setChecked(false);
			setRangerMode(RINGER_MODE_SILENT);
		} else {
			yinxiaoSwitch.setChecked(true);
		}
		yinxiaoSwitch.setOnCheckedChangeListener(new OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {

				if (isChecked) {
					setRangerMode(RINGER_MODE_NORMAL);
					Toast.makeText(MainActivity.this, "提示音已打开", Toast.LENGTH_LONG).show();
				} else {
					setRangerMode(RINGER_MODE_SILENT);
					Toast.makeText(MainActivity.this, "提示音已关闭", Toast.LENGTH_LONG).show();
				}
			}
		});

		TextView dangqian_banben = (TextView) findViewById(R.id.dangqian_banben);
		dangqian_banben.setText(current_application.appConf.version);
		TextView shebeihao = (TextView) findViewById(R.id.shebeihao);
		shebeihao.setText(current_application.appConf.device_id);
		if (current_application.appConf.denglubiaozhi == true) {
			if ((current_application.appConf.showinfo != null && current_application.appConf.showinfo.length > 0)
					&& (!current_application.appConf.showinfo[0].equals(""))) {
				StringBuilder stb = new StringBuilder();
				for (int i = 0; i <= current_application.appConf.showinfo.length - 1; i++) {
					stb.append((i + 1) + "、" + current_application.appConf.showinfo[i].toString());
					stb.append("\n");
				}
				quanyuantongzhitanchuang(stb);
			}

		}

		// 查房同步
		Switch chafangtongbu = ((Switch) findViewById(R.id.chafangtongbuSwitch));
		chafangtongbu.setChecked(current_application.featureConf.chafangtongbu_switch);
		chafangtongbu.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				if (!current_application.featureConf.chafangtongbu_switch) {
					getRefleshUrl(TYPE_CONTROL);
				} else {
					xiezuoBinder.getService().setChafangTongbuRuning(0);
					current_application.featureConf.chafangtongbu_switch = false;
					Toast.makeText(MainActivity.this, "查房同步已关闭", Toast.LENGTH_LONG).show();
				}

			}
		});

		LinearLayout ll_chafangyanshi = (LinearLayout) findViewById(R.id.ll_chafangyanshi);

		if (ll_chafangyanshi != null && !current_application.appConf.open_xiezuo) {
			ll_chafangyanshi.setVisibility(View.GONE);

		}

		// chafangtongbu.setOnCheckedChangeListener(new
		// OnCheckedChangeListener() {
		// @Override
		// public void onCheckedChanged(CompoundButton buttonView, boolean
		// isChecked) {
		//
		// if (isChecked) {
		// getRefleshUrl(TYPE_CONTROL);
		//
		// // xiezuoBinder.getService().setChafangTongbuRuning(1);
		// // current_application.featureConf.chafangtongbu_switch =
		// // true;
		// // Toast.makeText(MainActivity.this, "查房同步已打开",
		// // Toast.LENGTH_LONG).show();
		// } else {
		// xiezuoBinder.getService().setChafangTongbuRuning(0);
		// current_application.featureConf.chafangtongbu_switch = false;
		// Toast.makeText(MainActivity.this, "查房同步已关闭",
		// Toast.LENGTH_LONG).show();
		// }
		// }
		// });


	}

	public void quanyuantongzhitanchuang(StringBuilder stb) {
		new AlertDialog.Builder(this).setTitle("提示").setMessage(stb.toString())
				.setIcon(R.drawable.ic_launcher)
				.setPositiveButton("确定", new DialogInterface.OnClickListener() {

					@Override
					public void onClick(DialogInterface dialog, int which) {
						// TODO Auto-generated method stub
						current_application.appConf.denglubiaozhi = false;
					}
				}).show();
	}




	@SuppressWarnings("deprecation")
	public void initMokuai() {
		disPlayWidth = getWindowManager().getDefaultDisplay().getWidth();
		if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
			disPlayWidth = disPlayWidth * 3 / 4;
		}

		icon_width = (disPlayWidth - 70) / 3;
		listdata = new ArrayList<Map<String, Object>>();
		gridView = (GridView) findViewById(R.id.grid_view);
		final String[] mokuaiName = current_application.appConf.mokuai_peizhi;
		int[] tubiao = { R.drawable.pyhd, R.drawable.bbjc, R.drawable.yzzx, R.drawable.lrtz, R.drawable.hlws,
				R.drawable.hzxs, R.drawable.rypg, R.drawable.hljl, R.drawable.xtjc1, R.drawable.hzxx, R.drawable.zyjf,
				R.drawable.jxtj, R.drawable.blsj1, R.drawable.hlcz, R.drawable.chakanyizhu, R.drawable.jianyanjiancha,
				R.drawable.tshz, R.drawable.mokuai_chafang_gailan, R.drawable.mokuai_show_yizhu,
				R.drawable.mokuai_view_bingchengjilu, R.drawable.mokuai_view_jiancha, R.drawable.mokuai_show_sancedan,
				R.drawable.mokuai_shijianshitu, R.drawable.mokuai_show_patient };
		for (int i = 0; i < mokuaiName.length; i++) {
			Map<String, Object> valueMap = new HashMap<String, Object>();
			valueMap.put("fenlei_name", mokuaiName[i]);
			if (mokuaiName[i].equals(getString(R.string.peiyaohedui))) {// 配药核对
				valueMap.put("tubiao", tubiao[0]);
			} else if (mokuaiName[i].equals(getString(R.string.peiyaoheduiv415))) {// 配药核对v415
				valueMap.put("tubiao", tubiao[0]);
			} else if (mokuaiName[i].equals(getString(R.string.newpeiyaohedui))) {// 新配药核对
				valueMap.put("tubiao", tubiao[0]);
			} else if (mokuaiName[i].equals(getString(R.string.biaobenjiancha))) {// "标本检查"
				valueMap.put("tubiao", tubiao[1]);
			} else if (mokuaiName[i].equals(getString(R.string.yizhuzhixing))) {// "医嘱执行"
				valueMap.put("tubiao", tubiao[2]);
			} else if (mokuaiName[i].equals(getString(R.string.yizhuzhixingv415))) {// "医嘱执行v415"
				valueMap.put("tubiao", tubiao[2]);
			} else if (mokuaiName[i].equals(getString(R.string.xinyizhuzhixing))) {// "新医嘱执行"
				valueMap.put("tubiao", tubiao[2]);
			} else if (mokuaiName[i].equals(getString(R.string.tizhengluru))) {// "体征录入"
				valueMap.put("tubiao", tubiao[3]);
			} else if (mokuaiName[i].equals(getString(R.string.xintizhengluru))) {// "新体征录入"
				valueMap.put("tubiao", tubiao[3]);
			} else if (mokuaiName[i].equals(getString(R.string.huliwenshu))) {// "护理文书"
				valueMap.put("tubiao", tubiao[4]);
			} else if (mokuaiName[i].equals(getString(R.string.newhuliwenshu))) {// "新护理文书"
				valueMap.put("tubiao", tubiao[4]);
			} else if (mokuaiName[i].equals(getString(R.string.huanzhexunshi))) {// "患者巡视"
				valueMap.put("tubiao", tubiao[5]);
			} else if (mokuaiName[i].equals(getString(R.string.ruyuanpinggu))) {// "入院评估"
				valueMap.put("tubiao", tubiao[6]);
			} else if (mokuaiName[i].equals(getString(R.string.hulijilu))) {// "护理记录"
				valueMap.put("tubiao", tubiao[7]);
			} else if (mokuaiName[i].equals(getString(R.string.xinhulijilu))) {// "新护理记录"
				valueMap.put("tubiao", tubiao[7]);
			} else if (mokuaiName[i].equals(getString(R.string.xuetangjiance))) {// "血糖监测"
				valueMap.put("tubiao", tubiao[8]);
			} else if (mokuaiName[i].equals(getString(R.string.huanzhexinxi))) {// "患者信息"
				valueMap.put("tubiao", tubiao[9]);
			} else if (mokuaiName[i].equals(getString(R.string.zhuyuanjingfei))) {// "住院经费"
				valueMap.put("tubiao", tubiao[10]);
			} else if (mokuaiName[i].equals(getString(R.string.jixiaotongji))) {// "绩效统计"
				valueMap.put("tubiao", tubiao[11]);
			} else if (mokuaiName[i].equals(getString(R.string.buliangshijian))) {// "不良事件"
				valueMap.put("tubiao", tubiao[12]);
			} else if (mokuaiName[i].equals(getString(R.string.hulicaozuo))) {// "护理操作"
				valueMap.put("tubiao", tubiao[13]);
			} else if (mokuaiName[i].equals(getString(R.string.chakanyizhu))) {// "查看医嘱"
				valueMap.put("tubiao", tubiao[18]);
			} else if (mokuaiName[i].equals(getString(R.string.jianyanjiancha))) {// "检验检查"
				valueMap.put("tubiao", tubiao[20]);
			} else if (mokuaiName[i].equals(getString(R.string.teshuhuanze))) {// "特殊患者"
				valueMap.put("tubiao", tubiao[16]);
			} else if (mokuaiName[i].equals(getString(R.string.chakanhuanzhe))) {
				valueMap.put("tubiao", tubiao[23]);
			} else if (mokuaiName[i].equals(getString(R.string.chafangoverview))) {
				valueMap.put("tubiao", tubiao[17]);
			} else if (mokuaiName[i].equals(getString(R.string.tiwenjiludan))) {// 三测单
				valueMap.put("tubiao", tubiao[21]);
			} else if (mokuaiName[i].equals(getString(R.string.bingchengjilu))) {
				valueMap.put("tubiao", tubiao[19]);
			} else if (mokuaiName[i].equals(getString(R.string.shijianshitu))) {// 时间视图
				valueMap.put("tubiao", tubiao[22]);
			}



			listdata.add(valueMap);
			}
		adapter = new MokuaiAdapter(MainActivity.this, listdata, icon_width);
		gridView.setAdapter(adapter);
		gridView.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2, long arg3) {
				jumpToMokuai(mokuaiName[arg2]);
				current_application.appConf.current_menu = mokuaiName[arg2];
			}
		});
	}



	public void goResetPassword(View v) {

		Intent intent = new Intent(MainActivity.this,
				ResetPasswordActivity.class);
		startActivity(intent);
	}
	
	public void jumpToPing(View v) {
		Intent intent = new Intent(MainActivity.this, PingToolsActivity.class);
		startActivity(intent);
	}

	/**
	 * 系统强制退出
	 * 
	 * @Title: QiangZhiTuiChu
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-3-1 下午3:51:15
	 */
	private void QiangZhiTuiChu() {
		TiantanLog.error("退出登录");
		if (current_application.appConf.open_data_tongbu) {
			current_application.appConf.suoping_flag = false;
			current_application.appConf.sync_data_flag = false;

			current_application.data_manager.qingkongChuangjian();
			current_application.data_manager
					.syncDataWithServerLogin(MainActivity.this);
		}
		// 停止监听screen状态
		try {
			current_application.qingkongApplication();
			for (int i = 0; i < activityNumber.activityList().size(); i++) {
				if (null != activityNumber.activityList().get(i)) {
					activityNumber.activityList().get(i).finish();
				}
			}
		} catch (Exception e) {

		}

		Intent intent = new Intent(MainActivity.this, LoginActivity.class);
		finish();
		startActivity(intent);
	}

	private void tuichuDenglu() {
		TiantanLog.error("退出登录");
		if (current_application.appConf.open_data_tongbu) {
			current_application.appConf.suoping_flag = false;
			current_application.appConf.sync_data_flag = false;
			shoudongChufaTongbu();
		}
		// 停止监听screen状态
		try {
			// mScreenObserver.stopScreenStateUpdate();
			current_application.qingkongApplication();
			for (int i = 0; i < activityNumber.activityList().size(); i++) {
				if (null != activityNumber.activityList().get(i)) {
					activityNumber.activityList().get(i).finish();
				}
			}
		} catch (Exception e) {

		}

		clearInfo();

		// 清除全局信息
		current_application.clearConfig();

		Intent intent = new Intent(MainActivity.this, LoginActivity.class);
		finish();
		startActivity(intent);

		// 退出相关服务

		try {
			unbindService(xiezuoServiceConnection);
			Log.d("tiantan", "xiezuoService unbind");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}



	public void goExit(View v) {
		new AlertDialog.Builder(this).setTitle("退出提示").setMessage("是否确认退出系统？").setIcon(R.drawable.ic_launcher)
				.setPositiveButton("确认", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int whichButton) {

						tuichuDenglu();
					}
				}).setNegativeButton("取消", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int whichButton) {

					}
				}).show();
	}


	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		return true;
	}



	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if ((keyCode == KeyEvent.KEYCODE_BACK) && contentWebView.canGoBack()) {
			contentWebView.goBack();
			guanbiLeftRightMenu();
			return true;
		}
		if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
			if (event.getAction() == KeyEvent.ACTION_DOWN
					&& event.getRepeatCount() == 0) {
				guanbiLeftRightMenu();
			}

			return true;
		}
		return super.onKeyDown(keyCode, event);
	}


	// @Override
	// public boolean onKeyUp(int keyCode, KeyEvent event) {
	// if (super.onKeyUp(keyCode, event)) {
	// return true;
	// }
	// int mapKeyCode = scanner.getKeyCode(event);
	// int jumpCode = 999;
	// if (!super.right_state) {
	// switch (mapKeyCode) {
	// case KeyMapperCode.DEVICE_KEY_1:
	// jumpCode = 0;
	// break;
	// case KeyMapperCode.DEVICE_KEY_2:
	// jumpCode = 1;
	// break;
	// case KeyMapperCode.DEVICE_KEY_3:
	// jumpCode = 2;
	// break;
	// case KeyMapperCode.DEVICE_KEY_4:
	// jumpCode = 3;
	// break;
	// case KeyMapperCode.DEVICE_KEY_5:
	// jumpCode = 4;
	// break;
	// case KeyMapperCode.DEVICE_KEY_6:
	// jumpCode = 5;
	// break;
	// case KeyMapperCode.DEVICE_KEY_7:
	// jumpCode = 6;
	// break;
	// case KeyMapperCode.DEVICE_KEY_8:
	// jumpCode = 7;
	// break;
	// case KeyMapperCode.DEVICE_KEY_9:
	// jumpCode = 8;
	// break;
	// case KeyMapperCode.DEVICE_KEY_STAR:
	// jumpCode = 9;
	// break;
	// case KeyMapperCode.DEVICE_KEY_0:
	// jumpCode = 10;
	// break;
	// case KeyMapperCode.DEVICE_KEY_SHAP:
	// jumpCode = 11;
	// break;
	// }
	// }
	// switch (mapKeyCode) {
	// case KeyMapperCode.DEVICE_KEY_F1:
	// goExit(view);
	// break;
	// }
	//
	// if (jumpCode < listdata.size()) {
	// String name = (String) listdata.get(jumpCode).get("fenlei_name");
	// jumpToMokuai(name);
	// }
	//
	// return super.onKeyUp(keyCode, event);
	// }

	@Override
	public void sucessScanBarbode(String barcode) {

	}

	@SuppressLint("SimpleDateFormat")
	private void doSomethingOnScreenOn() {
		if (sharedPreferences == null) {
			return;
		}
		// String jiange = sharedPreferences.getString("jiange", "");
		long suopingJiange = sharedPreferences.getLong("suopingJiange",
				System.currentTimeMillis());
		Editor edit = sharedPreferences.edit();
		edit.putLong("suopingJiange", System.currentTimeMillis());
		edit.commit();
		if ((System.currentTimeMillis() - suopingJiange) > current_application.appConf.suoping_dengdai_time
				&& current_application.appConf.suoping_flag) {
			Log.d("info", "123:" + (System.currentTimeMillis() - suopingJiange));
			TiantanLog.error("jiange: "
					+ (System.currentTimeMillis() - suopingJiange));
			tuichuDenglu();
			current_application.appConf.suoping_flag = false;
			return;
		}

		String temp = this.getIntent().getStringExtra("jumpFrom");
		if (null == temp || !temp.equalsIgnoreCase("activity")) {
			shoudongChufaTongbu();
			current_application.appConf.sync_data_flag = true;
		}
	}

	@SuppressLint("SimpleDateFormat")
	private void doSomethingOnScreenOff() {
		if (sharedPreferences == null) {
			return;
		}
		Editor edit = sharedPreferences.edit();
		current_application.appConf.suoping_flag = true;
		edit.putLong("suopingJiange", System.currentTimeMillis());
		edit.commit();
		shoudongChufaTongbu();
		current_application.appConf.sync_data_flag = false;
	}

	public void shoudongChufaTongbu() {
		current_application.appConf.sync_data_shoudong_chufa = true;

	}

	@Override
	public void onDestroy() {
		scanner.scanExit();
		if (mScreenObserver != null) {
			mScreenObserver.stopScreenStateUpdate();
		}

		// 解绑服务
		try {
			unbindService(xiezuoServiceConnection);
			Log.d("tiantan", "xiezuoService unbind");
		} catch (Exception e) {
			e.printStackTrace();
		}

		super.onDestroy();
	}
}
