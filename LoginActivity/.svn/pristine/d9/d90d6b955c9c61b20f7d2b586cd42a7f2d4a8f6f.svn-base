/**
 * Project Name:MobileEMR
 * File Name:ZhanXunScaner.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-30下午4:47:13
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import mexxen.mx5010.barcode.BarcodeEvent;
import mexxen.mx5010.barcode.BarcodeListener;
import mexxen.mx5010.barcode.BarcodeManager;
import android.content.Context;
import android.view.KeyEvent;

/**
 * ClassName:ZhanXunScaner <br/>
 * Desc: 封装展讯扫码驱动 <br/>
 * Date: 2015-7-30 下午4:47:13 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public class ZhanXunScaner implements IScanner {

	private BarcodeManager mBarcodeManager;
	private static final String SCANNER_READ = "SCANNER_READ";
	private static final boolean CODE_RESULT_HANDLE_SYNC = true;
	private final Context context;
	IScanListener listener;

	public ZhanXunScaner(Context context) {
		this.context = context;
		scanInit();
	}

	public int scanInit() {
		mBarcodeManager = new BarcodeManager(context);
		mBarcodeManager.addListener(new BarcodeListener() {
			@Override
			public void barcodeEvent(BarcodeEvent event) {
				// 当条码事件的命令为“SCANNER_READ”时，进行操作
				if (event.getOrder().equals(SCANNER_READ)) {
					if (CODE_RESULT_HANDLE_SYNC) {
						String barcode = mBarcodeManager.getBarcode();
						if (barcode != null) {
							listener.handleScanResult(barcode);
						} else {
						}

					}
				}

			}
		});
		return 0;
	}

	@Override
	public int scanExit() {
		stopScan();
		return 0;
	}

	@Override
	public String getScanResult() {
		return mBarcodeManager.getBarcode();
	}

	@Override
	public void startScan() {
		mBarcodeManager.startScanner();
	}

	@Override
	public void stopScan() {
		mBarcodeManager.stopScanner();
	}

	@Override
	public void addListener(IScanListener listener) {
		this.listener = listener;
	}

	@Override
	public boolean dispatchKeyEvent(KeyEvent event) {
		/**
		 * 展讯的设备不需要做按键的侦听，应该是底层写死的，无需多余操作
		 */
		return false;
	}

	@Override
	public int getKeyCode(KeyEvent event) {
		int return_value = KeyMapperCode.DEVICE_KEY_ERROR;
		int keycode = event.getKeyCode();
		// Toast.makeText(context, keycode, 1).show();
		switch (event.getKeyCode()) {
		case 7:
			return_value = KeyMapperCode.DEVICE_KEY_STAR;
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
			return_value = KeyMapperCode.DEVICE_KEY_7;
			break;
		case 13:
			return_value = KeyMapperCode.DEVICE_KEY_8;
			break;
		case 14:
			return_value = KeyMapperCode.DEVICE_KEY_4;
			break;
		case 15:
			return_value = KeyMapperCode.DEVICE_KEY_5;
			break;
		case 16:
			return_value = KeyMapperCode.DEVICE_KEY_6;
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
		case 143:
			return_value = KeyMapperCode.DEVICE_KEY_9;
			break;
		case 17:
			return_value = KeyMapperCode.DEVICE_KEY_0;
			break;
		case 18:
			return_value = KeyMapperCode.DEVICE_KEY_SHAP;
			break;
		case 23:
			return_value = KeyMapperCode.DEVICE_KEY_SAVE;
			break;

		case 3:
			return_value = KeyMapperCode.DEVICE_KEY_HOME;
			break;
		}
		return return_value;
	}

	// @Override
	// public int getKeyCode(KeyEvent event) {
	//
	// // TODO Auto-generated method stub
	// return 0;
	// }
}
