/**
 * Project Name:MobileEMR
 * File Name:ZhanXunScaner.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-30下午4:47:13
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import mexxen.mx5010.barcode.BarcodeManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.view.KeyEvent;

import com.android.barcodescandemo.ScannerInerface;


public class IDataScaner implements IScanner {

	private BarcodeManager mBarcodeManager;
	private static final String SCANNER_READ = "SCANNER_READ";
	private static final boolean CODE_RESULT_HANDLE_SYNC = true;
	private Context context = null;
	IScanListener listener;

	private BroadcastReceiver mReceiver;
	private IntentFilter mFilter;
	ScannerInerface Controll;

	public IDataScaner(Context context) {
		this.context = context;
		scanInit();
	}

	private void scanInit() {
		Controll = new ScannerInerface(context);
		Controll.open();
		Controll.enablePlayBeep(false);
		Controll.enablePlayVibrate(false);// 不允许震动
		Controll.enableAddKeyValue(3);// 换行
		Controll.setOutputMode(1);// 使用广播模式
		mFilter = new IntentFilter("android.intent.action.SCANRESULT");

		mReceiver = new BroadcastReceiver() {
			@Override
			public void onReceive(Context context, Intent intent) {

				// 此处获取扫描结果信息
				final String scanResult = intent.getStringExtra("value");
				listener.handleScanResult(scanResult);
			}
		};
		context.registerReceiver(mReceiver, mFilter);
	}

	@Override
	public boolean dispatchKeyEvent(KeyEvent event) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void addListener(IScanListener listener) {
		// TODO Auto-generated method stub
		this.listener = listener;
	}

	@Override
	public int scanExit() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String getScanResult() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void startScan() {
		// TODO Auto-generated method stub

	}

	@Override
	public void stopScan() {
		// TODO Auto-generated method stub

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
