/**
 * @fileName: TiantanLog.java
 * @package: com.tiantanhehe.mobileemr.utils
 * @copyright: Copyright (c) 2015, Tiantan All Rights Reserved.
 * @author Tian Ran <tianran@tiantanhehe.com>
 * @date 2015年9月6日 下午9:43:42
 * @version V4.0
 */

package com.tiantanhehe.yidongchafang.common;

import android.util.Log;

/**
 * @className: TiantanLog
 * @description: 重写日志类
 * @author Tian Ran <tianran@tiantanhehe.com>
 * @date 2015年9月6日 下午4:43:42
 *
 */

public class TiantanLog {

	/**
	 * 定义当前日志级别，小于此级别的日志均不会被输出 建议开发环境设置为verbose或debug，生产环境设置为warn或error或者直接关闭
	 */
	public static final int LOG_LEVEL = TiantanLog.INFO;

	/**
	 * 日志级别，由低至高依次为verbose,debug,info,warn,error,assert（2-7）以及close（8，关闭日志输出）
	 */
	public static final int VERBOSE = 2;
	public static final int DEBUG = 3;
	public static final int INFO = 4;
	public static final int WARN = 5;
	public static final int ERROR = 6;
	public static final int ASSERT = 7;
	public static final int CLOSE = 8;

	/**
	 * 通用日志标签，调用不带tag参数的方法时使用此标签
	 */
	public static final String LOG_TAG = "tiantan";

	/**
	 * 
	 * @Title: verbose
	 * @Description: 输出详细信息
	 * @param: @param tag
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void verbose(String tag, String msg) {
		if (LOG_LEVEL <= VERBOSE) {
			Log.v(tag, msg);
		}
	}

	/**
	 * 
	 * @Title: debug
	 * @Description: 输出调试信息
	 * @param: @param tag
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void debug(String tag, String msg) {
		if (LOG_LEVEL <= DEBUG) {
			Log.d(tag, msg);
		}
	}

	/**
	 * 
	 * @Title: info
	 * @Description: 输出通告信息
	 * @param: @param tag
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void info(String tag, String msg) {
		if (LOG_LEVEL <= INFO) {
			Log.i(tag, msg);
		}
	}

	/**
	 * 
	 * @Title: warning
	 * @Description: 输出警告信息
	 * @param: @param tag
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void warn(String tag, String msg) {
		if (LOG_LEVEL <= WARN) {
			Log.w(tag, msg);
		}
	}

	/**
	 * 
	 * @Title: error
	 * @Description: 输出错误信息
	 * @param: @param tag
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void error(String tag, String msg) {
		if (LOG_LEVEL <= ERROR) {
			Log.e(tag, msg);
		}
	}

	/**
	 * 
	 * @Title: verbose
	 * @Description: 输出详细信息
	 * @param: @param tag
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void verbose(String msg) {
		verbose(LOG_TAG, msg);
	}

	/**
	 * 
	 * @Title: debug
	 * @Description: 输出调试信息
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void debug(String msg) {
		debug(LOG_TAG, msg);
	}

	/**
	 * 
	 * @Title: info
	 * @Description: 输出通告信息
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void info(String msg) {
		info(LOG_TAG, msg);
	}

	/**
	 * 
	 * @Title: warning
	 * @Description: 输出警告信息
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void warn(String msg) {
		warn(LOG_TAG, msg);
	}

	/**
	 * 
	 * @Title: error
	 * @Description: 输出错误信息
	 * @param: @param msg
	 * @return: void
	 * @throws
	 */
	public static void error(String msg) {
		error(LOG_TAG, msg);
	}

}
