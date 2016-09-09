package com.tiantanhehe.yidongchafang.services;

import com.tiantanhehe.yidongchafang.conf.AppConf;
import com.tiantanhehe.yidongchafang.dao.db.DatabaseHelper;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

public class PatientInfoProvider extends ContentProvider {
	private DatabaseHelper db = null;
	UriMatcher um;
	static final String AUTHORITY = "com.tiantanhehe.yidongchafang";

	@Override
	public boolean onCreate() {
		// TODO Auto-generated method stub

		db = DatabaseHelper.getInstance(getContext(), AppConf.database_name);
		um = new UriMatcher(UriMatcher.NO_MATCH);
		um.addURI(AUTHORITY, "all", 1);
		um.addURI(AUTHORITY, "keyword/*", 2);
		return true;
	}

	@Override
	public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
		// TODO Auto-generated method stub
		if (db == null) {
			return null;
		}
		Cursor cs = null;
		int code = um.match(uri);

		switch (code) {
		case 1:
			cs = db.rawQuery("SELECT * FROM zhuyuan_basic_info ORDER BY ruyuan_riqi_time ASC", null);
			break;

		case 2:
			String path = uri.getPath();

			Log.d("tiantan", "PatientInfoProvider received uri path is " + path);
			String keyWord = path.substring(path.lastIndexOf("/") + 1);
			//
			String sql = "SELECT * FROM zhuyuan_basic_info WHERE zhuyuan_id like '%" + keyWord
					+ "%' OR xingming like '%" + keyWord + "%' ORDER BY ruyuan_riqi_time ASC ";

			Log.d("tiantan", "PatientInfoProvider search sql is " + sql);

			cs = db.rawQuery(sql, null);

		default:

		}

		return cs;
	}

	@Override
	public String getType(Uri uri) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Uri insert(Uri uri, ContentValues values) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int delete(Uri uri, String selection, String[] selectionArgs) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
		// TODO Auto-generated method stub
		return 0;
	}

}
