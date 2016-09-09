/**
 * Project Name:MobileEMR
 * File Name:ZhuyuanHuanzheDao.java
 * Package Name:com.tiantanhehe.mobileemr.db
 * Date:2015-8-25下午5:59:15
 * Copyright (c) 2015, tiantan All Rights Reserved.
 */

package com.tiantanhehe.yidongchafang.dao.db;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import android.content.Context;
import android.database.Cursor;
import android.util.Log;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.dao.db.wrapper.HuanzheWrapper;

/**
 * ClassName:ZhuyuanHuanzheDao <br/>
 * Desc: TODO 该接口主要是从zhuyuan_basic_info和patient表中获取患者住院信息. <br/>
 * Date: 2015-8-25 下午5:59:15 <br/>
 * 
 * @author wuwenlong
 * @since JDK 1.6
 * @see
 */
public class ZhuyuanHuanzheDao {
	public DatabaseHelper db;
	GlobalInfoApplication mCurrent_application;

	public ZhuyuanHuanzheDao(Context context,
			GlobalInfoApplication current_application) {
		this.mCurrent_application = current_application;
		db = DatabaseHelper.getInstance(context,
				current_application.appConf.database_name);
	}

	public HuanzheWrapper getHuanzheByZhuyuanID(String zhuyuanhao) {
		HuanzheWrapper huanzhe = null;
		String sql = "SELECT * FROM zhuyuan_basic_info where zhuyuan_id = '"
				+ zhuyuanhao + "' ";
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return null;
		}

		while (huanzheData.moveToNext()) {
			huanzhe = new HuanzheWrapper(huanzheData);
		}
		huanzheData.close();
		return huanzhe;
	}

	public HuanzheWrapper getFirstHuanzhe() {
		HuanzheWrapper huanzhe = null;
		String sql = "";
		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql = "SELECT * FROM zhuyuan_basic_info ORDER BY bingchuang_hao ASC limit 1 ";
		} else {
			sql = "SELECT * FROM zhuyuan_basic_info ORDER BY (bingchuang_hao+0) ASC limit 1 ";
		}
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return null;
		}

		while (huanzheData.moveToNext()) {
			huanzhe = new HuanzheWrapper(huanzheData);
		}
		huanzheData.close();
		return huanzhe;
	}

	public List<HuanzheWrapper> getAllHuanzheList() {
		List<HuanzheWrapper> rest = new ArrayList<HuanzheWrapper>();
		String sql = "";
		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql = "SELECT * FROM zhuyuan_basic_info where (huanzhe_zhuangtai = '' or huanzhe_zhuangtai is null) ORDER BY (bingchuang_hao+0) ASC ";
		} else {
			sql = "SELECT * FROM zhuyuan_basic_info where (huanzhe_zhuangtai = '' or huanzhe_zhuangtai is null) ORDER BY (bingchuang_hao+0) ASC ";
		}
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return rest;
		}
		while (huanzheData.moveToNext()) {
			HuanzheWrapper huanzhe = new HuanzheWrapper(huanzheData);
			rest.add(huanzhe);
		}
		huanzheData.close();
		return rest;
	}

	public List<HuanzheWrapper> getHuanzheListByKeyWord(String keyWord) {
		List<HuanzheWrapper> rest = new ArrayList<HuanzheWrapper>();
		if (keyWord == "" || keyWord == null) {
			return rest;
		}
		String sql = "SELECT * FROM zhuyuan_basic_info WHERE (zhuyuan_id_show like '%"
				+ keyWord
				+ "%' OR xingming like '%"
				+ keyWord
				+ "%' OR bingchuang_hao like '%"
				+ keyWord
				+ "%' or zeren_yishi like '%,"
				+ keyWord
				+ ",%' or bingqing = '" + keyWord + "') ";
		if (keyWord.equals("康复治疗")) {
			sql += "OR (huanzhe_zhuangtai != '' and huanzhe_zhuangtai is not null) ";
		}

		/*
		 * else { sql +=
		 * "and (huanzhe_zhuangtai = '' or huanzhe_zhuangtai is null) "; }
		 */

		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql += " ORDER BY bingchuang_hao ASC ";
		} else {
			sql += " ORDER BY (bingchuang_hao+0) ASC ";
		}
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return rest;
		}
		while (huanzheData.moveToNext()) {
			HuanzheWrapper huanzhe = new HuanzheWrapper(huanzheData);
			rest.add(huanzhe);
		}
		huanzheData.close();
		return rest;
	}

	public List<HuanzheWrapper> getHuanzheListByKeyWord(
			Map<String, String> keyWord) {
		List<HuanzheWrapper> rest = new ArrayList<HuanzheWrapper>();
		if (keyWord.size() <= 0) {
			return rest;
		}
		String sql = "SELECT * FROM zhuyuan_basic_info WHERE (zhuyuan_id_show != '') ";
		
		for (String key : keyWord.keySet()) {
			if(key.equals("guanjianci"))
			{
				sql += "and (zhuyuan_id_show like '" + keyWord.get(key) + "%' or zhuyuan_id like '"+keyWord.get(key)+"' or xingming like '"+keyWord.get(key)+"%' or bingchuang_hao like '"+keyWord.get(key)+"%') ";
			}
			else if(key.equals("zeren_yishi"))
			{
				sql += "and " + key + " like '%," + keyWord.get(key) + ",%'";
			}
			else
			{
				sql += "and " + key + "= '" + keyWord.get(key) + "'";
			}
		}
		
		if (mCurrent_application.appConf.current_user_suoshu_group.equals("基层康复诊疗组")) {
			sql += "and (huanzhe_zhuangtai != '' and huanzhe_zhuangtai is not null) ";
		}

		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql += " ORDER BY bingchuang_hao ASC ";
		} else {
			sql += " ORDER BY (bingchuang_hao+0) ASC ";
		}
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return rest;
		}
		while (huanzheData.moveToNext()) {
			HuanzheWrapper huanzhe = new HuanzheWrapper(huanzheData);
			rest.add(huanzhe);
		}
		huanzheData.close();
		return rest;
	}

	public List<HuanzheWrapper> getHuanzheListByChuanghao(
			List<String> chuanghao_list) {

		List<HuanzheWrapper> rest = new ArrayList<HuanzheWrapper>();
		if (chuanghao_list == null || chuanghao_list.isEmpty()) {
			return rest;
		}
		String chuangwei_in = "";
		for (String chuang : chuanghao_list) {
			chuangwei_in += "'" + chuang + "',";
		}
		chuangwei_in = chuangwei_in.substring(0, chuangwei_in.length() - 1);
		String sql = "";
		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql = "SELECT * FROM zhuyuan_basic_info where bingchuang_hao in ("
					+ chuangwei_in + ") ORDER BY bingchuang_hao ASC ";
		} else {
			sql = "SELECT * FROM zhuyuan_basic_info where bingchuang_hao in ("
					+ chuangwei_in + ") ORDER BY (bingchuang_hao+0) ASC ";
		}
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return rest;
		}
		while (huanzheData.moveToNext()) {
			HuanzheWrapper huanzhe = new HuanzheWrapper(huanzheData);
			rest.add(huanzhe);
		}
		huanzheData.close();
		return rest;
	}

	public List<HuanzheWrapper> getHuanzheByChuanghao(String chuanghao) {
		List<HuanzheWrapper> rest = new ArrayList<HuanzheWrapper>();
		// HuanzheWrapper rest = null;
		if (chuanghao == null || chuanghao == "") {
			return rest;
		}
		String sql = "";
		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql = "SELECT * FROM zhuyuan_basic_info WHERE bingchuang_hao like '%"
					+ chuanghao + "%' ORDER BY bingchuang_hao ASC ";
		} else {
			sql = "SELECT * FROM zhuyuan_basic_info WHERE bingchuang_hao like '%"
					+ chuanghao + "%' ORDER BY (bingchuang_hao+0) ASC ";
		}

		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return rest;
		}
		while (huanzheData.moveToNext()) {
			// rest = new HuanzheWrapper(huanzheData);
			HuanzheWrapper huanzhe = new HuanzheWrapper(huanzheData);
			rest.add(huanzhe);
		}
		huanzheData.close();
		return rest;
	}

	public List<HuanzheWrapper> getOneHuanzheByChuanghao(String chuanghao) {
		List<HuanzheWrapper> rest = new ArrayList<HuanzheWrapper>();
		// HuanzheWrapper rest = null;
		if (chuanghao == null || chuanghao == "") {
			return rest;
		}
		String sql = "SELECT * FROM zhuyuan_basic_info WHERE bingchuang_hao = '"
				+ chuanghao + "'";

		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});
		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return rest;
		}
		if (huanzheData.moveToNext()) {
			// rest = new HuanzheWrapper(huanzheData);
			HuanzheWrapper huanzhe = new HuanzheWrapper(huanzheData);
			rest.add(huanzhe);
		}
		huanzheData.close();
		return rest;
	}

	public List<HuanzheWrapper> getYizhuBySqlCondition(String condition) {
		List<HuanzheWrapper> allHuanzheWrappers = new ArrayList<HuanzheWrapper>();

		String sql = "";

		if (mCurrent_application.appConf.patient_sort_mode == 0) {
			sql = "SELECT * FROM zhuyuan_basic_info  WHERE(huanzhe_zhuangtai = '' or huanzhe_zhuangtai is null) "
					+ condition
					+ "GROUP BY zhuyuan_id ORDER BY bingchuang_hao  ASC ";
		} else {
			sql = "SELECT *  FROM zhuyuan_basic_info  WHERE (huanzhe_zhuangtai = '' or huanzhe_zhuangtai is null) "
					+ condition
					+ "GROUP BY zhuyuan_id ORDER BY bingchuang_hao + 0 ASC ";
		}
		Log.e("123", sql);
		Cursor huanzheData = this.db.rawQuery(sql, new String[] {});

		if (null == huanzheData || huanzheData.getCount() <= 0) {
			huanzheData.close();
			return allHuanzheWrappers;
		}
		while (huanzheData.moveToNext()) {
			allHuanzheWrappers.add(new HuanzheWrapper(huanzheData));
		}
		huanzheData.close();
		return allHuanzheWrappers;

	}
	
	public String getAllUserDepartmentList() {
		String rest = "科室患者|我的患者";
		String sql;
		sql = "SELECT user_department FROM yiyuan_user GROUP BY user_department ORDER BY (user_department+0) ASC ";
		Cursor departmentData = this.db.rawQuery(sql, new String[] {});
		if (null == departmentData || departmentData.getCount() <= 0) {
			departmentData.close();
			return rest;
		}
		while (departmentData.moveToNext()) {
			if(!departmentData.getString(departmentData.getColumnIndex("user_department")).equals(mCurrent_application.appConf.current_user_department))
			{
				rest += "|"+departmentData.getString(departmentData.getColumnIndex("user_department"));
			}
		}
		departmentData.close();
		return rest;
	}
}
