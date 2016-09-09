package com.tiantanhehe.yidongchafang.utils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class BingchengBean {
//	{
//	    "result": [
//	        {
//	            "record_time": "2016-01-22 18:54",
//	            "chafang_doctor": "\t\t\t\t\t",
	// "bingcheng_sub_leibie": "日常病程记录\t\t\t\t\t\t"
	// , "bianjiquanxian": "不可编辑"
//	        },
//	       
//	    ],
//	    "page_tiaoshu": 15,
//	    "page": 1,
//	    "zongtiaoshu": "11",
//	    "yeshu": 1,
//	    "bingcheng_sub_leibie_option": [
	// "日常病程记录",
	// "主任医师查房记录",
	// "副主任医师查房记录"
//	       
//	    ]
//	}
	private List<BingChengCont>result;
	private String page_tiaoshu;
	private String page;
	private String zongtiaoshu;
	private String yeshu;
	private List<String>bingcheng_sub_leibie_option;

	public static BingchengBean objectFromData(String str) {

		return new Gson().fromJson(str, BingchengBean.class);
	}
	public static class BingChengCont {
		// "result": [
		// {
		// "record_time": "2016-01-22 18:54",
		// "chafang_doctor": "\t\t\t\t\t",
		// "bingcheng_sub_leibie": "日常病程记录\t\t\t\t\t\t",
		// "bianjiquanxian": "不可编辑"
		// },
		private String id;
		private String record_time;
		private String chafang_doctor;
		private String bingcheng_sub_leibie;
		private String bianjiquanxian;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getBianjiquanxian() {
			return bianjiquanxian;
		}

		public void setBianjiquanxian(String bianjiquanxian) {
			this.bianjiquanxian = bianjiquanxian;
		}

		public String getRecord_time() {
			return record_time;
		}

		public void setRecord_time(String record_time) {
			this.record_time = record_time;
		}

		public String getChafang_doctor() {
			return chafang_doctor;
		}

		public void setChafang_doctor(String chafang_doctor) {
			this.chafang_doctor = chafang_doctor;
		}

		public String getBingcheng_sub_leibie() {
			return bingcheng_sub_leibie;
		}

		public void setBingcheng_sub_leibie(String bingcheng_sub_leibie) {
			this.bingcheng_sub_leibie = bingcheng_sub_leibie;
		}
		
	}

	public List<BingChengCont> getResult() {
		return result;
	}

	public void setResult(List<BingChengCont> result) {
		this.result = result;
	}

	public String getPage_tiaoshu() {
		return page_tiaoshu;
	}

	public void setPage_tiaoshu(String page_tiaoshu) {
		this.page_tiaoshu = page_tiaoshu;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getZongtiaoshu() {
		return zongtiaoshu;
	}

	public void setZongtiaoshu(String zongtiaoshu) {
		this.zongtiaoshu = zongtiaoshu;
	}

	public String getYeshu() {
		return yeshu;
	}

	public void setYeshu(String yeshu) {
		this.yeshu = yeshu;
	}

	public List<String> getBingcheng_sub_leibie_option() {
		return bingcheng_sub_leibie_option;
	}

	public void setBingcheng_sub_leibie_option(
			List<String> bingcheng_sub_leibie_option) {
		this.bingcheng_sub_leibie_option = bingcheng_sub_leibie_option;
	}

	public static ArrayList<BingchengBean> getObject(String json) {
		if (json == null) {
			return null;
		}
		try {
			Gson gson = new Gson();
			ArrayList<BingchengBean> br = gson.fromJson(json,
					new TypeToken<List<BingchengBean>>() {
					}.getType());
			return br;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	}
