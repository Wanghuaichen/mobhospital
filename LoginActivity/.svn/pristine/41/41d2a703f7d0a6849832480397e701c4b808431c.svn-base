/**
 * Project Name:MobileEMR
 * File Name:DBManager.java
 * Package Name:com.tiantanhehe.mobileemr.db
 * Date:2015-8-13上午10:16:47
 * Copyright (c) 2015, Tiantan All Rights Reserved.
 */

package com.tiantanhehe.yidongchafang.dao.db;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * ClassName:DBManager <br/>
 * Desc: 封装数据库操作 <br/>
 * Date: 2015-8-13 上午10:16:47 <br/>
 * 
 * @author wuwenlong
 * @since JDK 1.6
 * @see
 */
public class DatabaseHelper extends SQLiteOpenHelper {
	public GlobalInfoApplication current_application;
	public static final String TAG = "--DatabaseHelper";
	private static final int DB_VERSION = 1;
	private static DatabaseHelper mInstance;
	private final Object writeLock = new Object();
	private final Object readLock = new Object();

	private DatabaseHelper(Context context, String name) {
		super(context, name, null, DB_VERSION);
		current_application = (GlobalInfoApplication) context
				.getApplicationContext();
	}

	public synchronized static DatabaseHelper getInstance(Context context,
			String name) {
		if (mInstance == null) {
			mInstance = new DatabaseHelper(context, name);
		}
		return mInstance;
	}

	public synchronized static void destoryInstance() {
		if (mInstance != null) {
			mInstance.close();
		}
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

	}

	public void execSQL(String sql) {
		try {
			synchronized (writeLock) {
				if (sql.contains("UPDATE yizhu_info")
						&& sql.contains("UPDATE yizhu_info SET state = 'last_udpate'") == false) {
					current_application.featureConf.yizhu_local_update = true;
				}
				if (sql.contains("INSERT INTO zhuyuan_tizheng")) {
					current_application.featureConf.tizheng_local_update = true;
				}
				this.getWritableDatabase().execSQL(sql);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	public Cursor rawQuery(String sql, String[] selectionArgs) {
		synchronized (readLock) {
			return this.getReadableDatabase().rawQuery(sql, selectionArgs);
		}
	}

}
