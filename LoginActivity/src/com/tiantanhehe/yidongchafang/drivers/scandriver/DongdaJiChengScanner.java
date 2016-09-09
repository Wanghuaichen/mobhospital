/**
 * Project Name:MobileEMR
 * File Name:LianXinScanner.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-31下午1:59:10
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import android.content.Context;
import android.view.KeyEvent;

import com.seuic.scanner.DecodeInfo;
import com.seuic.scanner.DecodeInfoCallBack;
import com.seuic.scanner.Scanner;
import com.seuic.scanner.ScannerFactory;

/**
 * ClassName:LianXinScanner <br/>
 * Desc: 东大集成设备驱动类 <br/>
 * Date: 2015-7-31 下午1:59:10 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public class DongdaJiChengScanner implements IScanner, DecodeInfoCallBack {

	private IScanListener listener;
	private final Context context;
	private Scanner scanner;
	private ScanThread tscan;
	private boolean saomiaoFlag = true;
	private boolean saomaKeydownFlag = false;

	public DongdaJiChengScanner(Context context) {
		this.context = context;
		scanInit();
	}

	private void scanInit() {

		// 获取scanner
		scanner = ScannerFactory.getScanner(context);

		// 注册扫描结果回调接口
		scanner.setDecodeInfoCallBack(this);

		// 设备初始化
		scanner.open();
		tscan = new ScanThread();
		tscan.start();
	}

	/**
	 * 连欣设备的扫码键code统一都是0
	 */
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
			case 0:
				saomaKeydownFlag = true;
				processResult = true;
				if (saomiaoFlag) {
					tscan.doThread();
				}
				break;
			}
		}
		return processResult;
	}

	@Override
	public void addListener(IScanListener listener) {
		this.listener = listener;
	}

	@Override
	public int scanExit() {
		return 0;
	}

	@Override
	public String getScanResult() {
		return null;
	}

	@Override
	public void startScan() {
		scanner.startScan();
	}

	@Override
	public void stopScan() {
		scanner.stopScan();
	}

	public class ScanThread extends Thread {
		private volatile boolean runflag = true;
		private volatile boolean doflag = false;

		public void doThread() {
			doflag = true;
		}

		public void stopThread() {
			runflag = false;
		}

		@Override
		public void run() {
			while (runflag) {
				if (doflag) {
					scanner.startScan();
					doflag = false;
				} else {
					try {
						Thread.sleep(100);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	/**
	 * 扫码消息回调函数
	 */
	@Override
	public void onDecodeComplete(DecodeInfo codeInfo) {
		if (saomaKeydownFlag) {
			saomiaoFlag = false;
		}
		listener.handleScanResult(codeInfo.barcode);
	}

	@Override
	public int getKeyCode(KeyEvent event) {
		int return_value = KeyMapperCode.DEVICE_KEY_ERROR;

		return return_value;
	}
}
