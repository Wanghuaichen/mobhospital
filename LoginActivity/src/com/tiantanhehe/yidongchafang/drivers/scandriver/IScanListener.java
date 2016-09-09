/**
 * Project Name:MobileEMR
 * File Name:IScanListener.java
 * Package Name:com.tiantanhehe.mobileemr.scandriver
 * Date:2015-7-30下午5:23:04
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.drivers.scandriver;

/**
 * ClassName:IScanListener <br/>
 * Desc: 侦听扫描结果接口类，侦听底层驱动返回的结果 <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2015-7-30 下午5:23:04 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public interface IScanListener {
	/**
	 * handleScanResult 处理扫描返回的结果
	 * 
	 * @param code
	 *            扫描结果
	 * @exception
	 * @since 1.0.0
	 */
	void handleScanResult(String code);

}

