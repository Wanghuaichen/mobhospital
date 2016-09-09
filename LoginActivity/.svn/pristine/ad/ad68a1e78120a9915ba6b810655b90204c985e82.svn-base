/**
 * Project Name:MobileEMR
 * File Name:IScanner.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-30下午4:26:45
 * Copyright (c) 2015, tiantan All Rights Reserved.
 * 
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import android.view.KeyEvent;

/**
 * ClassName:IScanner <br/>
 * Function: 扫码驱动接口，定义扫码的基本操作 <br/>
 * Date: 2015-7-30 下午4:26:45 <br/>
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public interface IScanner {
	
	/**
	 * dispatchKeyEvent处理按键事件侦听，提出该方法，主要是因为不同厂商的扫描按键是不同的
	 * 
	 * @param event
	 *            按键事件
	 * @return boolean
	 * @exception
	 * @since 1.0.0
	 */
	boolean dispatchKeyEvent(KeyEvent event);

	/**
	 * addListener添加扫描结果回调接口，当设备扫描到数据之后，通过改接口进行回传
	 * @param listener
	 *            void
	 * @exception
	 * @since 1.0.0
	 */
	void addListener(IScanListener listener);

	/**
	 * scanExit扫描头退出
	 * 
	 * @return int 去初始化返回值，1：失败，0：成功
	 * @exception
	 * @since 1.0.0
	 */
	int scanExit();

	/**
	 * getScanResult获取扫描结果
	 * 
	 * @return String 扫描结果
	 * @exception
	 * @since 1.0.0
	 */
	String getScanResult();

	/**
	 * startScan 启动扫描头
	 * 
	 * @exception
	 * @since 1.0.0
	 */
	void startScan();
	
	/**
	 * 
	 * stopScan停止扫描头
	 * @exception
	 * @since 1.0.0
	 */
	void stopScan();

	int getKeyCode(KeyEvent event);
}

