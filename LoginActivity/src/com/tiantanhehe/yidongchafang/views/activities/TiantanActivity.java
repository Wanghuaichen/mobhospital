package com.tiantanhehe.yidongchafang.views.activities;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.ActivityNumber;
import com.tiantanhehe.yidongchafang.drivers.scandriver.DeviceDriverFactory;
import com.tiantanhehe.yidongchafang.drivers.scandriver.IScanListener;
import com.tiantanhehe.yidongchafang.drivers.scandriver.IScanner;
import com.tiantanhehe.yidongchafang.services.MonitorService;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.FragmentActivity;
import android.util.Log;

/**************************************************
 * Created: 2015-03 Info:Activity基类,用于实现与具体业务无关的公共程序
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 2.0
 * @Updated History:
 ***************************************************/
public class TiantanActivity extends FragmentActivity {
	public GlobalInfoApplication current_application = null;
	public IScanner scanner = null;
	private AudioManager mAudioManager;
	public boolean player_canPlay = true;
	public boolean player_switch = true;
	public Map<String, MediaPlayer> players = null;
	public Map<Context, Dialog> dialogs = new HashMap<Context, Dialog>();
	public Map<Context, Boolean> dialogsState = new HashMap<Context, Boolean>();
	/**
	 * 窗口消失 监听
	 */
	private tipDialogDissmissListener mDialogDissmissListener = null;

	public Class<?> tiaoZhuangActivity = null;
	public Context context;
	public ActivityNumber activityNumber;


	public static final String PLAYER_BEEP = "beep";
	public static final String PLAYER_ERROR = "error";
	public static final int RINGER_MODE_NORMAL = AudioManager.RINGER_MODE_NORMAL;
	public static final int RINGER_MODE_SILENT = AudioManager.RINGER_MODE_SILENT;
	public static final String TIANTAN_ROOT_PATH = Environment.getExternalStorageDirectory().getPath() + File.separator
			+ "tiantan" + File.separator;
	public static final String TIANTAN_TMP_PATH = TIANTAN_ROOT_PATH + "tmp" + File.separator;

	public TiantanActivity() {
		activityNumber = new ActivityNumber();
	}


	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		current_application = GlobalInfoApplication.getInstance();
		context = this;

		hardwareInit(); // 硬件相关初始化，比如扫码头，蓝牙适配器等

		dataInit(); // 数据初始化
		viewInit(); // 界面相关初始化

	}

	@Override
	protected void onStart() {
		super.onStart();
		serviceInit(); // 服务初始化，启动相关后台服务，包括但不限于android service
	}

	@Override
	public void onDestroy() {
		// db.close();


		super.onDestroy();
	}


	// @Override
	// public boolean dispatchKeyEvent(KeyEvent event) {
	// if (scanner.dispatchKeyEvent(event)) {
	// return true;
	// } else {
	// return super.dispatchKeyEvent(event);
	// }
	// }

	private void viewInit() {


	}


	private void dataInit() {
		// TODO Auto-generated method stub

	}

	private void hardwareInit() {
		/**
		 * 创建扫码工具
		 * 
		 */
		scanner = DeviceDriverFactory.createScanner(current_application.appConf.scanner_film_driver,
				getApplicationContext());

		/**
		 * 注册扫码结果回调接口，当扫码完成后，调用该接口回传参数
		 */
		scanner.addListener(new IScanListener() {
			@Override
			public void handleScanResult(String code) {
				code = code.trim();
				sucessScanBarbode(code);
				// playMedia(PLAYER_BEEP);
				// player_canPlay = true;
			}
		});

		mAudioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);

		// init sdcard
		File path = new File(TIANTAN_ROOT_PATH);
		if (!path.exists()) {
			path.mkdir();
		}
		path = new File(TIANTAN_TMP_PATH);
		if (!path.exists()) {
			path.mkdir();
		}

	}

	private void serviceInit() {
		Intent serviceIntent = new Intent(this, MonitorService.class);
		startService(serviceIntent);


	}

	/**
	 * @Title: orientationInit
	 * @Description: 初始化程序的方向
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年6月26日 下午3:46:22
	 */
	public void orientationInit() {
		if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
				&& current_application.appConf.screen_orientation == 1) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		} else if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
				&& current_application.appConf.screen_orientation == 2) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		} else if (this.getRequestedOrientation() != ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE
				&& current_application.appConf.screen_orientation == 4) {
			this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
		}

	}

	public int getRangerMode() {
		return mAudioManager.getRingerMode();
	}

	public void setRangerMode(int mode) {
		if (mode == RINGER_MODE_NORMAL) {
			player_switch = true;
		} else {
			player_switch = false;
		}
		mAudioManager.setRingerMode(mode);
	}

	/*
	 * 播放音乐，单开一个线程 来处理，避免多次点击冲突
	 */
	public void playMedia(final String name) {
		// if (current_application.scanner_film_driver !=
		// DeviceDriverFactory.SCANER_FILM_SHOUXIN) {
		// return;
		// }
		if (player_switch && players.containsKey(name) && player_canPlay) {
			if (name.endsWith(PLAYER_ERROR)) {
				player_canPlay = false;
			}
			new Thread(new Runnable() {
				@Override
				public void run() {
					try {
						if (!players.get(name).isPlaying()) {
							players.get(name).start();
						}
					} catch (Exception e) {

					}
				}
			}).start();
		}
	}

	/*
	 * 错误提示框
	 */
	public void tipDialog(Context context, String title, String message) {
		Builder builder = new Builder(context);
		if (dialogsState.containsKey(context) && dialogsState.get(context).booleanValue()) {
			Dialog temp = dialogs.remove(context);
			temp.dismiss();
		}
		builder.setIcon(R.drawable.ic_launcher);
		builder.setTitle(title);
		builder.setMessage(message);
		builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {

			@Override
			public void onClick(DialogInterface arg0, int arg1) {
				if (mDialogDissmissListener != null) {
					mDialogDissmissListener.onDissmiss();
				}
			}
		});

		if (mDialogDissmissListener != null) {
			builder.setOnCancelListener(new OnCancelListener() {

				public void onCancel(DialogInterface arg0) {
					mDialogDissmissListener.onDissmiss();
				}
			});
			mDialogDissmissListener.onShowing();
		}
		final AlertDialog dialog = builder.show();
		dialogs.put(context, dialog);
		final Timer t = new Timer();
		t.schedule(new TimerTask() {
			public void run() {
				dialog.dismiss();
				if (mDialogDissmissListener != null) {
					mDialogDissmissListener.onDissmiss();
				}
				t.cancel();
			}
		}, 2000);
	}

	/**
	 * 错误提示框，带监听事件
	 * 
	 * @Title: tipDialog
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-2-29 下午7:28:01
	 * @param context
	 * @param title
	 * @param message
	 * @param listener
	 */
	public void tipDialog(Context context, String title, String message,
			android.content.DialogInterface.OnClickListener listener) {
		Builder builder = new Builder(context);
		if (dialogsState.containsKey(context) && dialogsState.get(context).booleanValue()) {
			Dialog temp = dialogs.remove(context);
			temp.dismiss();
		}
		builder.setIcon(R.drawable.ic_launcher);
		builder.setTitle(title);
		builder.setMessage(message);
		builder.setPositiveButton("确定", listener);
		AlertDialog dialog = builder.show();
		dialogs.put(context, dialog);
	}

	public void tipDialogWithError(Context context, String title, String message) {
		tipDialog(context, title, message, TiantanActivity.PLAYER_ERROR);
	}

	/*
	 * 带声音的
	 */
	public void tipDialog(Context context, String title, String message, String playerName) {
		playMedia(playerName);
		tipDialog(context, title, message);
	}


	public void sucessScanBarbode(String barcode) {
		Log.d("tiantan", "tiantanactivity:" + barcode);
	}

	/**
	 * 弹窗显示及消失监听事件
	 * 
	 * @ClassName: tipDialogDissmissListener
	 * @Description: TODO
	 * @author Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date 2016-3-22 下午4:39:38
	 * 
	 */
	public interface tipDialogDissmissListener {
		public void onDissmiss();

		public void onShowing();
	}


}
