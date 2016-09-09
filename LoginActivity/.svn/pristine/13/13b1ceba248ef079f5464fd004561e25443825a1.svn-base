/**
 * Project Name:MobileEMR
 * File Name:ShouXinMotoScanner.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-8-12下午3:34:02
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import com.capipad.scan.ScanManager;
import com.capipad.scan.ScanResult;
import com.capipad.system.CapipadInterfaceManager;

import android.content.Context;
import android.view.KeyEvent;

/**
 * ClassName:ShouXinMotoScanner <br/>
 * Desc: 首信新的扫码头，使用的是moto的扫码头 <br/>
 * Date: 2015-8-12 下午3:34:02 <br/>
 * 
 * @author wuwenlong
 * @since JDK 1.6
 * @see
 */
public class ShouXinScanner implements IScanner {
	// private GlobalInfoApplication application;
	private final Context mContext;
	private IScanListener mListener;
	private final ScanManager mScan;
	private boolean saomiaoFlag = true;
	private boolean saomaKeydownFlag = false;

	// SystemSettings mSystemSettings;

	public ShouXinScanner(Context context) {
		this.mContext = context;
		mScan = new ScanManager(mContext);
		CapipadInterfaceManager cm = new CapipadInterfaceManager(mContext);
		// application = (GlobalInfoApplication)
		// mContext.getApplicationContext();
		cm.setScanVoiceState(false);
		// cm.setHomekeyandStatusbarState(application.mHomekeyandStatusbarState);
	}

	private void funcInit() {
		int ret = 0;
		try {
			mScan.setScanState(true);
			;
		} catch (Exception e) {
			e.printStackTrace();
		}
		ret = 1;
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
					// tscan.doThread();
					mScan.startScan();
				}
				break;
			case 141:
				processResult = true;
				saomaKeydownFlag = true;
				if (saomiaoFlag) {
					// tscan.doThread();
					mScan.startScan();
				}
				break;
			case 142:
				processResult = true;
				saomaKeydownFlag = true;
				if (saomiaoFlag) {
					// tscan.doThread();
					mScan.startScan();
				}
				break;
			}
		}
		return processResult;
	}

	@Override
	public void addListener(final IScanListener listener) {
		this.mListener = listener;
		mScan.registScanDataListen(new ScanResult() {
			@Override
			public void onResult(String msg) {
				if (msg != "" && !msg.isEmpty()) {
					mListener.handleScanResult(msg);
				}
			}
		});

		mScan.setScanState(true);
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

