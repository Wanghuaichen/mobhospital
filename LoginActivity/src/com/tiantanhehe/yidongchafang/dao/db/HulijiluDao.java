/**
 * Project Name:MobileEMR
 * File Name:HulijiluDao.java
 * Package Name:com.tiantanhehe.mobileemr.db
 * Date:2015-8-20上午10:58:37
 * Copyright (c) 2015, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.tiantanhehe.yidongchafang.dao.db;

import java.util.ArrayList;
import java.util.List;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

import android.content.Context;
import android.database.Cursor;

/**
 * ClassName:HulijiluDao <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2015-8-20 上午10:58:37 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public class HulijiluDao {
	public DatabaseHelper db;
	GlobalInfoApplication mCurrent_application;

	public HulijiluDao(Context context,
			GlobalInfoApplication current_application) {
		this.mCurrent_application = current_application;
		db = DatabaseHelper.getInstance(context,
 current_application.appConf.database_name);
	}

	public List<String> getBingqingGuanchaMuban() {
		// String sql =
		// "SELECT * FROM zhuyuan_block_template where suoshu_keshi ="
		// + mCurrent_application.current_user_department;
		String sql = "SELECT content FROM zhuyuan_block_template where keshi = '"
				+ mCurrent_application.appConf.current_user_department + "' or keshi='通用'";
		Cursor template_data = db.rawQuery(sql, new String[] {});
		List<String> result = new ArrayList<String>();
		while (template_data.moveToNext()) {
			result.add(template_data.getString(template_data
					.getColumnIndex("content")));
		}
		template_data.close();
		return result;
	}


}

