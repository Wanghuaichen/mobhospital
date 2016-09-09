/**
 * Project Name:MobileEMR
 * File Name:ScannerCtx.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-30下午5:11:01
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

import android.content.Context;

/**
 * ClassName:ScannerFactory <br/>
 * Function: 扫描驱动工厂类，根据上层传来不同的设备型号，返回制定的设备驱动 <br/>
 * Date: 2015-7-30 下午5:11:01 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public class DeviceDriverFactory {

	private static IScanner scanner = null;

	// 首信
	public static final int SCANER_FILM_SHOUXIN = 0;
	// 展讯
	public static final int SCANER_FILM_ZHANXUN = 1;
	// 东大集成
	public static final int SCANER_FILM_DONGDA = 2;
	// 首信_摩托的头
	public static final int SCANER_FILM_SHOUXIN_MOTO = 3;

	// 首信_C588
	public static final int SCANER_FILM_SHOUXIN_C588 = 4;

	// 联欣
	public static final int SCANER_FILM_LIANXIN = 5;

	// 傅里叶
	public static final int SCANER_FILM_FULIYE = 6;

	// IDATA
	public static final int SCANER_FILM_IDATA = 7;

	// 中标
	public static final int SCANER_FILM_ZHONGBIAO = 8;

	public static int current_device_type;

	/**
	 * 
	 * createScanner创建驱动，首先判断驱动是否存在，如果存在，不能再创建，直接返回已有驱动
	 * 
	 * @param name
	 *            设备名称
	 * @param ctx
	 *            activity上下文
	 * @return IScanner 驱动接口
	 * @exception
	 * @since 1.0.0
	 */
	public static IScanner createScanner(int device_type, Context ctx) {

		if (scanner != null) {
			return scanner;
		}
		if (SCANER_FILM_SHOUXIN == device_type) {
			scanner = new ShouXinScanner(ctx);
		} else if (SCANER_FILM_ZHANXUN == device_type) {
			scanner = new ZhanXunScaner(ctx);
		} else if (SCANER_FILM_DONGDA == device_type) {
			scanner = new DongdaJiChengScanner(ctx);
		} else if (SCANER_FILM_LIANXIN == device_type) {
			scanner = new LianXinScanner(ctx);
		} else if (SCANER_FILM_FULIYE == device_type) {
			scanner = new FuliyeScanner(ctx);
		} else if (SCANER_FILM_IDATA == device_type) {
			scanner = new IDataScaner(ctx);
		} else if (SCANER_FILM_ZHONGBIAO == device_type) {
			scanner = new ZhongbiaoScanner(ctx);
		}
		current_device_type = device_type;
		return scanner;
	}

	/*
	 * 工厂类私有化，避免重复调用底层驱动
	 */
	private DeviceDriverFactory() {

	}
}
