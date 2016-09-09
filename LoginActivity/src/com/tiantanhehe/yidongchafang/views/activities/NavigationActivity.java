/**
 * 
 */
package com.tiantanhehe.yidongchafang.views.activities;

import com.tiantanhehe.yidongchafang.dao.db.DatabaseHelper;

import android.database.Cursor;

/**
 * @description 情景导航
 * @author Tian Ran TODO 整体效率优化
 */
public class NavigationActivity extends YiDongYiHuActivity {

	/**
	 * 根据项目名称获取不同护理级别录入频率
	 * 
	 * @param itemName
	 * @param huliJibie
	 * @param sqLiteDatabase
	 * @return
	 */
	public String getInputFrequencyByItemName(String itemName,
			String huliJibie, DatabaseHelper sqLiteDatabase) {
		String result = "0";

		String sql = "select * from data_input_frequency where item_name = '"
				+ itemName + "' and hulijibie = '" + huliJibie + "'";
		Cursor inputFrequencyCursor = sqLiteDatabase.rawQuery(sql,
				new String[] {});
		if (inputFrequencyCursor.getCount() <= 0) {
			inputFrequencyCursor.close();
			return result;
		}

		while (inputFrequencyCursor.moveToNext()) {
			result = inputFrequencyCursor.getString(inputFrequencyCursor
							.getColumnIndex("daily_need"));
		}
		inputFrequencyCursor.close();

		return result;
	}
	
	/***
	 * 根据方式来获取不同护理级别录入频率
	 * 
	 * @param itemName
	 * @param huliJibie
	 * @param sqLiteDatabase
	 * @return
	 */
	public String getInputFrequencyByType(String type, String huliJibie,
			DatabaseHelper sqLiteDatabase) {
		String result = "0";

		String sql = "select * from data_input_frequency where type = '" + type
				+ "' and hulijibie = '" + huliJibie + "'";
		Cursor inputFrequencyCursor = sqLiteDatabase.rawQuery(sql,
				new String[] {});
		if (inputFrequencyCursor.getCount() <= 0) {
			inputFrequencyCursor.close();
			return result;
		}

		while (inputFrequencyCursor.moveToNext()) {
			result = inputFrequencyCursor.getString(inputFrequencyCursor
					.getColumnIndex("daily_need"));
		}
		inputFrequencyCursor.close();

		return result;
	}
	
	/**
	 * 根据类型获取不同护理级别录入频率
	 * 
	 * @param itemType
	 * @param huliJibie
	 * @param sqLiteDatabase
	 * @return
	 */
	public Cursor getInputFrequencyByItemType(String itemType,
			String huliJibie, DatabaseHelper sqLiteDatabase) {
		String sql = "select * from data_input_frequency where item_type = '"
				+ itemType + "' and hulijibie = '" + huliJibie + "'";
		Cursor inputFrequencyCursor = sqLiteDatabase.rawQuery(sql,
				new String[] {});
		inputFrequencyCursor.close();
		return inputFrequencyCursor;
	}

	/**
	 * TODO 获取医嘱次数
	 * 
	 * @param zhuyuanId
	 * @param sqLiteDatabase
	 * @param zhixingState
	 * @return
	 */
	public int getYizhuDataCount(String zhuyuanId,
			DatabaseHelper sqLiteDatabase, String zhixingState) {
		String sql = "SELECT * FROM yizhu_info WHERE zhuyuan_id = '"
 + zhuyuanId + "' and zhixing_state = '"
				+ zhixingState + "' and yongfa_type = '输液' ";
		Cursor yizhuData = sqLiteDatabase.rawQuery(sql, new String[] {});
		int number = yizhuData.getCount();
		yizhuData.close();
		return number;
	}

	/**
	 * TODO 获取医嘱每日所需执行次数
	 * 
	 * @param zhuyuanId
	 * @param sqLiteDatabase
	 * @return
	 */
	public int getYizhuDailyNeedCount(String zhuyuanId,
			DatabaseHelper sqLiteDatabase) {
		String sql = "SELECT SUM(meiri_cishu) AS total FROM yizhu_info WHERE zhuyuan_id = '"
				+ zhuyuanId + "'";
		Cursor cursor = sqLiteDatabase.rawQuery(sql, new String[] {});
		int dailyNeedCount = 0;
		if (cursor.moveToFirst()) {
			dailyNeedCount = cursor.getInt(cursor.getColumnIndex("total"));
		}
		cursor.close();
		return dailyNeedCount;
	}

	/**
	 * 获取未核对标本数
	 * 
	 * @param zhuyuanId
	 * @param sqLiteDatabase
	 * @return
	 */
	public int getWeiheduiDataCount(String zhuyuanId,
			DatabaseHelper sqLiteDatabase) {
		String sql = "SELECT * FROM zhuyuan_fuzhujiancha WHERE zhuyuan_id = '"
 + zhuyuanId
				+ "' and jiancha_zhuangtai = '未核对' group by tiaoma";
		Cursor biaobenData = sqLiteDatabase.rawQuery(sql, new String[] {});
		int number = biaobenData.getCount();
		biaobenData.close();
		return number;
	}
	
	/**
	 * 获取当日录入体征情况
	 * 
	 * @param jianchaType
	 * @param zhuyuanId
	 * @param sqLiteDatabase
	 *            select jiancha_value from 【 table name】 where jiancha_time<【
	 *            给定时间】 or select jiancha_value from 【 table name】 where
	 *            jiancha_time >=【 给定时间】 初值==0.0 0/1 初值！=0.0 1/1
	 * @return
	 */
	public int getTizhengDailyTime(String jianchaTime, String zhuyuanId,
			DatabaseHelper sqLiteDatabase) {
		String start="";
		String end="";
		/**
		 * 时间截取（2015-10-29）
		 */
		String currentDate = jianchaTime.substring(0, 10);
		
//		Log.i("INF","lzn----111"+currentDate);
		
		/**
		 * jiachaTime 等于某一时间点是，获取到时间范围 jiachaTime.contains(""); 一个字符串中是否包含另一个字符串
		 */
		if(jianchaTime.contains("02:00")){
			start = currentDate+ " 00:00:00";
			end = currentDate+ " 04:00:00";
		}else if(jianchaTime.contains("06:00")){
			start = currentDate+ " 04:00:00";
			end = currentDate+ " 08:00:00";
		}else if(jianchaTime.contains("10:00")){
			start = currentDate+ " 08:00:00";
			end = currentDate+ " 12:00:00";
		}else if(jianchaTime.contains("14:00")){
			start = currentDate+ " 12:00:00";
			end = currentDate+ " 16:00:00";
		}else if(jianchaTime.contains("18:00")){
			start = currentDate+ " 16:00:00";
			end = currentDate+ " 20:00:00";
		}else{
			start = currentDate+ " 20:00:00";
			end = currentDate+ " 23:59:59";
		}
		/**
		 * String sql查询语句 cursor 数据库的查找
		 */
		String sql="SELECT jiancha_value FROM zhuyuan_tizheng WHERE zhuyuan_id='"+zhuyuanId+"' AND   (jiancha_time>='"+start+"' AND jiancha_time<='"+end+"')";
//		Log.i("INF","lzn------"+sql);
		Cursor cursor = sqLiteDatabase.rawQuery(sql, new String[] {});
		int number = cursor.getCount();
//		Log.i("INF","number---"+number);
		
		cursor.close();
		/**
		 * 当number得到的数小于1时，查询另一张表
		 */
		if(number == 0){
			String sql1="SELECT jiancha_value FROM zhuyuan_tizheng_lishi WHERE zhuyuan_id='"+zhuyuanId+"' AND   (jiancha_time>='"+start+"' AND jiancha_time<='"+end+"')";
//			Log.i("INF","lzn------"+sql);
			Cursor cursor2 = sqLiteDatabase.rawQuery(sql1, new String[] {});
			number = cursor2.getCount();
			cursor2.close();
		}
		return number;

	}
	
	/**
	 * 获取当日已录入体征次数
	 * 
	 * @param jianchaType
	 * @param zhuyuanId
	 * @param sqLiteDatabase
	 * @return
	 */
	public int getTizhengFinishCount(String jianchaType, String zhuyuanId,
			DatabaseHelper sqLiteDatabase) {
		int number = 0;
		String sql = "SELECT * FROM zhuyuan_tizheng_lishi WHERE zhuyuan_id = '"
				+ zhuyuanId + "' and jiancha_type = '" + jianchaType
				+ "' and jiancha_time like '%'||date()||'%'";
		Cursor cursor = sqLiteDatabase.rawQuery(sql, new String[] {});
		int tizheng_lishi_number = cursor.getCount();
		cursor.close();
		String sql2 = "SELECT * FROM zhuyuan_tizheng WHERE zhuyuan_id = '"
				+ zhuyuanId + "' and jiancha_type = '" + jianchaType
				+ "' and jiancha_time like '%'||date()||'%'";
		Cursor tizheng_cursor = sqLiteDatabase.rawQuery(sql2, new String[] {});
		int tizheng_number = tizheng_cursor.getCount();
		tizheng_cursor.close();
		number = tizheng_lishi_number + tizheng_number;
		return number;
	}

	/**
	 * 获取当日已录入巡视次数
	 * 
	 * @param zhuyuanId
	 * @param sqLiteDatabase
	 * @return
	 */
	public int getXunshiFinishCount(String zhuyuanId,
			DatabaseHelper sqLiteDatabase) {
		int number = 0;
		String sql = "SELECT * FROM zhuyuan_xuncha_jilu_lishi WHERE zhuyuan_id = '"
				+ zhuyuanId + "' and xuncha_time like '%'||date()||'%'";
		Cursor cursor = sqLiteDatabase.rawQuery(sql, new String[] {});
		int xuncha_lishi_number = cursor.getCount();
		cursor.close();
		String sql2 = "SELECT * FROM zhuyuan_xuncha_jilu WHERE zhuyuan_id = '"
				+ zhuyuanId + "' and xuncha_time like '%'||date()||'%'";
		Cursor zhuyuan_xuncha_jilu = sqLiteDatabase.rawQuery(sql2, new String[] {});
		int xuncha_number = zhuyuan_xuncha_jilu.getCount();
		zhuyuan_xuncha_jilu.close();
		number = xuncha_lishi_number + xuncha_number;
		return number;
	}

	/**
	 * 获取指定患者所有待办事项总数
	 * 
	 * @param currentApplication
	 * @param sqLiteDatabase
	 * @return
	 */
	public int getToDoCountForPatient(String zhuyuanId, String huliJibie,
			DatabaseHelper sqLiteDatabase) {
		// 医嘱
		int yizhuNeedCount = getYizhuDailyNeedCount(zhuyuanId, db);
		int yizhuFinishiCount = getYizhuDataCount(zhuyuanId, db, "执行完毕");
		int yizhuCount = yizhuNeedCount - yizhuFinishiCount;
		// 标本
		int biaobenCount = getWeiheduiDataCount(zhuyuanId, sqLiteDatabase);
		// 体征
		Cursor tizhengNeedCursor = getInputFrequencyByItemType("体征", huliJibie,
				sqLiteDatabase);
		int tizhengNeedCount = tizhengNeedCursor.getCount();
		int tizhengFinishCount = getTizhengFinishCount("", zhuyuanId,
				sqLiteDatabase);
		int tizhengCount = tizhengNeedCount - tizhengFinishCount;
		// 巡视
		Cursor xunshiNeedCursor = getInputFrequencyByItemType("患者巡视",
				huliJibie, sqLiteDatabase);
		int xunshiNeedCount = xunshiNeedCursor.getCount();
		int xunshiFinishCount = getXunshiFinishCount(zhuyuanId, sqLiteDatabase);
		int xunshiCount = xunshiNeedCount - xunshiFinishCount;
		// TODO 护理文书
		int huliWenshuCount = 0;
		return yizhuCount + biaobenCount + tizhengCount + xunshiCount
				+ huliWenshuCount;
	}
}
