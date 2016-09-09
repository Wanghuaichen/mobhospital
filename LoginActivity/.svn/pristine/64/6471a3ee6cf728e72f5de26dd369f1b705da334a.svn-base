/**
 * Project Name:MobileEMR
 * File Name:LianXinScanner.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-30下午4:39:25
 * Copyright (c) 2015, tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;

import com.capipad.BarCode2.barcode2;

/**
 * ClassName:ShouXinScanner <br/>
 * Desc: 封装联欣扫码驱动 <br/>
 * Date: 2015-9-22 下午4:39:25 <br/>
 * 
 * @author wuwenlong
 * @since JDK 1.6
 */
public class LianXinScanner implements IScanner {
	private boolean saomiaoFlag = true;
	private boolean saomaKeydownFlag = false;
	private IScanListener listener;
	private final Context context;
	private final Handler handler = new Handler();
	private ValueBroadcastReceiver valueBroadcastReceiver = null;

	public LianXinScanner(Context context) {
		this.context = context;
		scanInit();
	}

	public int scanInit() {
		startBarcodeBroadcastReceiver();
		return 0;
	}

	@Override
	public int scanExit() {
		// stopBarcodeBroadcastReceiver();
		return 0;
	}

	@Override
	public String getScanResult() {
		return barcode2.BarCodeRead();
	}

	/**
	 * 停止接收广播
	 */
	private void stopBarcodeBroadcastReceiver() {
		try {
			if (valueBroadcastReceiver != null)
				context.unregisterReceiver(valueBroadcastReceiver);
		} catch (Exception e) {

		}
	}

	/**
	 * 开始接收广播
	 */
	private void startBarcodeBroadcastReceiver() {
		try {
			if (valueBroadcastReceiver == null)
				valueBroadcastReceiver = new ValueBroadcastReceiver();
			IntentFilter filter = new IntentFilter();
			filter.addAction("lachesis_barcode_value_notice_broadcast");
			context.registerReceiver(valueBroadcastReceiver, filter);
		} catch (Exception e) {

		}
	}

	/**
	 * 关机广播接收者
	 * 
	 * @author
	 * 
	 */
	private class ValueBroadcastReceiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context arg0, Intent arg1) {
			Log.i("ValueBroadcastReceiver", "onReceive......");
			final String value = arg1
					.getStringExtra("lachesis_barcode_value_notice_broadcast_data_string");

			handler.post(new Runnable() {
				@Override
				public void run() {
					listener.handleScanResult(value);
					// System.out.println("123");
				}
			});
		}
	}

	@Override
	public void startScan() {
		// do nothing
	}

	@Override
	public void stopScan() {
		// do nothing
	}

	@Override
	public void addListener(IScanListener listener) {
		this.listener = listener;
	}

	@Override
	public boolean dispatchKeyEvent(KeyEvent event) {
		int keyCode = event.getKeyCode();
		int eventType = event.getAction();
		boolean processResult = false;
		if (eventType == KeyEvent.ACTION_UP) {
			saomiaoFlag = true;
			saomaKeydownFlag = false;
		} else if (eventType == KeyEvent.ACTION_DOWN) {
			switch (keyCode) {
			case 140:
				saomaKeydownFlag = true;
				processResult = true;
				if (saomiaoFlag) {
				}
				break;
			case 141:
				processResult = true;
				saomaKeydownFlag = true;
				if (saomiaoFlag) {
				}
				break;
			case 142:
				processResult = true;
				saomaKeydownFlag = true;
				if (saomiaoFlag) {
				}
				break;
			}
		}
		return processResult;
	}

	@Override
	public int getKeyCode(KeyEvent event) {
		int return_value = KeyMapperCode.DEVICE_KEY_ERROR;
		switch (event.getKeyCode()) {
		case 7:
			return_value = KeyMapperCode.DEVICE_KEY_0;
			break;
		case 8:
			return_value = KeyMapperCode.DEVICE_KEY_1;
			break;
		case 9:
			return_value = KeyMapperCode.DEVICE_KEY_2;
			break;
		case 10:
			return_value = KeyMapperCode.DEVICE_KEY_3;
			break;
		case 11:
			return_value = KeyMapperCode.DEVICE_KEY_4;
			break;
		case 12:
			return_value = KeyMapperCode.DEVICE_KEY_5;
			break;
		case 13:
			return_value = KeyMapperCode.DEVICE_KEY_6;
			break;
		case 14:
			return_value = KeyMapperCode.DEVICE_KEY_7;
			break;
		case 15:
			return_value = KeyMapperCode.DEVICE_KEY_8;
			break;
		case 16:
			return_value = KeyMapperCode.DEVICE_KEY_9;
			break;
		case 82:
			return_value = KeyMapperCode.DEVICE_KEY_MENU;
			break;
		case 4:
			return_value = KeyMapperCode.DEVICE_KEY_RETRUN;
			break;
		case 67:
			return_value = KeyMapperCode.DEVICE_KEY_DEL;
			break;
		case 131:
			return_value = KeyMapperCode.DEVICE_KEY_F1;
			break;
		case 132:
			return_value = KeyMapperCode.DEVICE_KEY_F2;
			break;
		case 17:
			return_value = KeyMapperCode.DEVICE_KEY_STAR;
			break;
		case 18:
			return_value = KeyMapperCode.DEVICE_KEY_SHAP;
			break;
		case 23:
			return_value = KeyMapperCode.DEVICE_KEY_SAVE;
			break;
		case 133:
			return_value = KeyMapperCode.DEVICE_KEY_SOS;
			break;
		case 3:
			return_value = KeyMapperCode.DEVICE_KEY_HOME;
			break;
		}
		return return_value;
	}
}
