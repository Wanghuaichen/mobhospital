package com.tiantanhehe.yidongchafang.utils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class TiwenJiluBean {
	// {
	// "final_search_result": [
	// {
	// "zhouci": "第1周",
	// "zhouciriqi": "2015-05-06至2015-05-12",
	// "beizhu": "入院 ",
	// "count": 1,
	// "week_begin": 1430841600,
	// "week_end": 1431360000
	// },
	private List<TiwenzhouBean> final_search_result;

	public List<TiwenzhouBean> getFinal_search_result() {
		return final_search_result;
	}

	public void setFinal_search_result(List<TiwenzhouBean> final_search_result) {
		this.final_search_result = final_search_result;
	}

	public static TiwenJiluBean objectFromData(String str) {

		return new Gson().fromJson(str, TiwenJiluBean.class);
	}

	public static class TiwenzhouBean {
		// "zhouci": "第1周",
		// "zhouciriqi": "2015-05-06至2015-05-12",
		// "beizhu": "入院 ",
		// "count": 1,
		// "week_begin": 1430841600,
		// "week_end": 1431360000
		private String zhouci;
		private String zhouciriqi;
		private String beizhu;
		private String count;
		private String week_begin;
		private String week_end;

		public String getZhouci() {
			return zhouci;
		}

		public void setZhouci(String zhouci) {
			this.zhouci = zhouci;
		}

		public String getZhouciriqi() {
			return zhouciriqi;
		}

		public void setZhouciriqi(String zhouciriqi) {
			this.zhouciriqi = zhouciriqi;
		}

		public String getBeizhu() {
			return beizhu;
		}

		public void setBeizhu(String beizhu) {
			this.beizhu = beizhu;
		}

		public String getCount() {
			return count;
		}

		public void setCount(String count) {
			this.count = count;
		}

		public String getWeek_begin() {
			return week_begin;
		}

		public void setWeek_begin(String week_begin) {
			this.week_begin = week_begin;
		}

		public String getWeek_end() {
			return week_end;
		}

		public void setWeek_end(String week_end) {
			this.week_end = week_end;
		}
	}

	public static ArrayList<TiwenJiluBean> getObject(String json) {
		if (json == null) {
			return null;
		}
		try {
			Gson gson = new Gson();
			ArrayList<TiwenJiluBean> br = gson.fromJson(json,
					new TypeToken<List<TiwenJiluBean>>() {
					}.getType());
			return br;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
