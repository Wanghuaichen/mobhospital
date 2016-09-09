package com.tiantanhehe.yidongchafang.drivers.scandriver;

import android.content.Context;
import android.hardware.barcode.Scanner;
import android.os.Handler;
import android.os.Message;
import android.view.KeyEvent;

public class FuliyeScanner implements IScanner {

	private IScanListener listener;
	private final Context context;
	private final Handler mHandler = new MainHandler();

	public FuliyeScanner(Context context) {
		this.context = context;
		scanInit();
	}

	public int scanInit() {
		Scanner.m_handler = mHandler;
		// 初始化扫描头
		int res = Scanner.InitSCA();
		System.out.println(res);
		return 0;
	}

	@Override
	public boolean dispatchKeyEvent(KeyEvent event) {
		int keyCode = event.getKeyCode();
		boolean res = false;
		if (keyCode == 220) {
			Scanner.Read();
			res = true;
		}

		return res;
	}

	@Override
	public void addListener(IScanListener listener) {
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

	private class MainHandler extends Handler {
		@Override
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case Scanner.BARCODE_READ: {
				listener.handleScanResult((String) msg.obj);
				break;
			}
			case Scanner.BARCODE_NOREAD: {
				break;
			}

			default:
				break;
			}
		}
	};

}
