package com.tiantanhehe.yidongchafang.utils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class LinYizhuBean {
	// "page": 1,
	// "meiyetiaoshu": 10,
	// "zongtiaoshu": 59,
	// "zongyeshu": 6,
	// "data": [
	// {

	// },
	private String page;
	private String meiyetiaoshu;
	private String zongtiaoshu;
	private String zongyeshu;
	private List<YizhuData> data;

	public static LinYizhuBean objectFromData(String str) {

		return new Gson().fromJson(str, LinYizhuBean.class);
	}
	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getMeiyetiaoshu() {
		return meiyetiaoshu;
	}

	public void setMeiyetiaoshu(String meiyetiaoshu) {
		this.meiyetiaoshu = meiyetiaoshu;
	}

	public String getZongtiaoshu() {
		return zongtiaoshu;
	}

	public void setZongtiaoshu(String zongtiaoshu) {
		this.zongtiaoshu = zongtiaoshu;
	}

	public String getZongyeshu() {
		return zongyeshu;
	}

	public void setZongyeshu(String zongyeshu) {
		this.zongyeshu = zongyeshu;
	}

	public List<YizhuData> getData() {
		return data;
	}

	public void setData(List<YizhuData> data) {
		this.data = data;
	}

	public static class YizhuData {
		// "zhuyuan_id": "130446-9",
		// "xiada_time": "2015-05-13 10:43",
		// "content": "血常规",
		// "xiada_yishi_name": "耿医生",
		// "zhixing_time": null,
		// "zhixing_name": null,
		// "state": "已下达"
		private String zhuyuan_id;
		private String xiada_time;
		private String content;
		private String xiada_yishi_name;
		private String zhixing_time;
		private String zhixing_name;
		private String state;

		public String getZhuyuan_id() {
			return zhuyuan_id;
		}

		public void setZhuyuan_id(String zhuyuan_id) {
			this.zhuyuan_id = zhuyuan_id;
		}

		public String getXiada_time() {
			return xiada_time;
		}

		public void setXiada_time(String xiada_time) {
			this.xiada_time = xiada_time;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getXiada_yishi_name() {
			return xiada_yishi_name;
		}

		public void setXiada_yishi_name(String xiada_yishi_name) {
			this.xiada_yishi_name = xiada_yishi_name;
		}

		public String getZhixing_time() {
			return zhixing_time;
		}

		public void setZhixing_time(String zhixing_time) {
			this.zhixing_time = zhixing_time;
		}

		public String getZhixing_name() {
			return zhixing_name;
		}

		public void setZhixing_name(String zhixing_name) {
			this.zhixing_name = zhixing_name;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

	}

	public static ArrayList<LinYizhuBean> getObject(String json) {
		if (json == null) {
			return null;
		}
		try {
			Gson gson = new Gson();
			ArrayList<LinYizhuBean> br = gson.fromJson(json,
					new TypeToken<List<LinYizhuBean>>() {
					}.getType());
			return br;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
