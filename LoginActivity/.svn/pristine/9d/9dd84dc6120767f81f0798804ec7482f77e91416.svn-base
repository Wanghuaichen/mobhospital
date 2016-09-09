package com.tiantanhehe.yidongchafang.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import android.annotation.SuppressLint;

/***
 * DateFomatUtils
 * 
 * @author Lizining
 * 
 */
public class MyDateFomatUtils {

	private static MyDateFomatUtils mInstance;

	public static final String TIMEFOMAT = "yyyy-MM-dd hh:mm";

	private static final String DATEFORMAT = "yyyy-MM-dd";

	private static final String ZEROHOUR = " 00:00";

	public static final String yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";

	private static final int ONEDAY = 24 * 60 * 60 * 1000;


	private MyDateFomatUtils() {
		init();
	}

	public static MyDateFomatUtils getInstance() {
		if (mInstance == null) {
			mInstance = new MyDateFomatUtils();
		}
		return mInstance;
	}

	private SimpleDateFormat mTimeFormat;

	private SimpleDateFormat mDateFormat;

	@SuppressLint("SimpleDateFormat")
	private void init() {
		mTimeFormat = new SimpleDateFormat(TIMEFOMAT);
		mDateFormat = new SimpleDateFormat(DATEFORMAT);
	}

	/**
	 * 
	 * @param date
	 *            2015-02-05 17:22:33
	 * @return 毫秒
	 */
	public long getTimeWithSecond(String date) {
		long second = -1;

		try {
			second = mTimeFormat.parse(date).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return second;
	}

	/**
	 * 得到今天的0时的时间(毫秒)
	 * 
	 * @return
	 */
	public long getTadayZeroHour() {
		Date date = new Date(System.currentTimeMillis());
		String time = mDateFormat.format(date);
		return getTimeWithSecond(time + "" + ZEROHOUR);
	}

	/**
	 * 判断时间是否合适
	 * 
	 * @param date
	 * @return
	 */
	public boolean isFitTime(String date) {
		long time = getTimeWithSecond(date);
		if (time != -1) {
			if (time >= getTadayZeroHour()
					&& time <= getTadayZeroHour() + ONEDAY) { // 大于今天的时间且小于明天的~~返回ture
				return true;
			}
		} else {

		}
		return false;
	}

	/**
	 * 
	 * @param time
	 *            01:00
	 * @return 2015-04-15 10;00
	 */
	public String getFitTime(String time) {
		Date date = new Date(System.currentTimeMillis());
		String mTime = mDateFormat.format(date);

		return mTime + " " + time;
	}

	/**
	 * 时间格式转字符串
	 * 
	 * @param date
	 * @return
	 */
	public String formatTime(Date date) {
		return mDateFormat.format(date);
	}

	/**
	 * 长整形转字符串
	 * 
	 * @param time
	 * @return
	 */
	public String formatTime(long time) {
		return formatTime(new Date(time));
	}

	/**
	 * 返回两个日期相差分钟数
	 * 
	 * @param d1
	 *            日期
	 * @param d2
	 *            日期
	 * @return 分钟数
	 */
	public static int diffMinu(Date d1, Date d2) {
		// 如果两个日期都为空，则返回.
		if ((d1 == null) || (d2 == null)) {
			// 0表示返回值为空
			return 0;
		}

		Calendar cal = Calendar.getInstance();
		// from Locale, has nothing to do with your input date format
		int zoneoffset = cal.get(Calendar.ZONE_OFFSET);
		int dstoffset = cal.get(Calendar.DST_OFFSET);

		// getTime() return absolute GMT time
		// compensate with the offsets
		long dl1 = d1.getTime() + zoneoffset + dstoffset;
		long dl2 = d2.getTime() + zoneoffset + dstoffset;

		int intDaysFirst = (int) (dl1 / 60000); // 60 * 1000
		int intDaysSecond = (int) (dl2 / 60000);
		// 设置一个临时返回值为 0.
		int tmpValue = 0;
		if (intDaysFirst > intDaysSecond) {
			// 如果第一个日期大于第二个日期，则用第一个日期减去第二个日期得到相差天数.
			tmpValue = intDaysFirst - intDaysSecond;
		} else {
			// 相反 ,如果第二个日期大于第一个日期，则用第二个日期减去第一个日期得到相差天数.
			tmpValue = intDaysSecond - intDaysFirst;
		}
		return tmpValue;
	}

	/**
	 * 返回两个日期相差小时数.
	 * 
	 * @param d1
	 *            日期
	 * @param d2
	 *            日期
	 * @return 小时数
	 */
	public static int diffHour(Date d1, Date d2) {
		// 如果两个日期都为空，则返回.
		if ((d1 == null) || (d2 == null)) {
			// 0表示返回值为空
			return 0;
		}

		Calendar cal = Calendar.getInstance();
		// from Locale, has nothing to do with your input date format
		int zoneoffset = cal.get(Calendar.ZONE_OFFSET);
		int dstoffset = cal.get(Calendar.DST_OFFSET);

		// getTime() return absolute GMT time
		// compensate with the offsets
		long dl1 = d1.getTime() + zoneoffset + dstoffset;
		long dl2 = d2.getTime() + zoneoffset + dstoffset;

		int intDaysFirst = (int) (dl1 / 3600000); // 60 * 60 * 1000
		int intDaysSecond = (int) (dl2 / 3600000);
		// 设置一个临时返回值为 0.
		int tmpValue = 0;
		if (intDaysFirst > intDaysSecond) {
			// 如果第一个日期大于第二个日期，则用第一个日期减去第二个日期得到相差天数.
			tmpValue = intDaysFirst - intDaysSecond;
		} else {
			// 相反 ,如果第二个日期大于第一个日期，则用第二个日期减去第一个日期得到相差天数.
			tmpValue = intDaysSecond - intDaysFirst;
		}
		return tmpValue;
	}

	/**
	 * 返回两个日期相差天数.
	 * 
	 * @param d1
	 *            日期
	 * @param d2
	 *            日期
	 * @return 天数
	 */
	public static int diffDate(Date d1, Date d2) {
		// 如果两个日期都为空，则返回.
		if ((d1 == null) || (d2 == null)) {
			// 0表示返回值为空
			return 0;
		}

		Calendar cal = Calendar.getInstance();
		// from Locale, has nothing to do with your input date format
		int zoneoffset = cal.get(Calendar.ZONE_OFFSET);
		int dstoffset = cal.get(Calendar.DST_OFFSET);

		// getTime() return absolute GMT time
		// compensate with the offsets
		long dl1 = d1.getTime() + zoneoffset + dstoffset;
		long dl2 = d2.getTime() + zoneoffset + dstoffset;

		int intDaysFirst = (int) (dl1 / 86400000); // 60 * 60 * 1000 *24
		// 24
		int intDaysSecond = (int) (dl2 / 86400000);

		return intDaysSecond - intDaysFirst;
	}

	/**
	 * 按指定的格式将日期转换成字符串.
	 * 
	 * @param date
	 *            要转换的日期
	 * @param pattern
	 *            日期格式
	 * @return 转换后的日期字符串
	 */
	public static String formatDate(Date date) {
		// 加入空日期返回.
		if (date == null) {
			return "";
		}

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		return format.format(date);
	}

	/**
	 * 按指定的格式将日期转换成字符串.
	 * 
	 * @param date
	 *            要转换的日期
	 * @param pattern
	 *            日期格式
	 * @return 转换后的日期字符串
	 */
	public static String formatDate(Date date, String pattern) {
		// 加入空日期返回.
		if (date == null) {
			return "";
		}

		SimpleDateFormat format = new SimpleDateFormat(pattern);
		return format.format(date);
	}

	/**
	 * 
	 * @Title: getFormatDate
	 * @Description: 将指定的字符串转化成日期
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-5-25 下午4:12:21
	 * @param date
	 * @param datePattern
	 * @return
	 */
	public static java.util.Date getFormatDate(String date, String datePattern) {
		SimpleDateFormat sd = new SimpleDateFormat(datePattern);
		return sd.parse(date, new java.text.ParsePosition(0));
	}
}
