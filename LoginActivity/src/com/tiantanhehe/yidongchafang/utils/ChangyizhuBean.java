package com.tiantanhehe.yidongchafang.utils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class ChangyizhuBean {
	// "page": 1,
	// "meiyetiaoshu": 10,
	// "zongtiaoshu": 18,
	// "zongyeshu": 2,
	// "data": [
	// {
	// "zhuyuan_id": "130446-9",
	// "start_time": "2016-05-13 10:53",
	// "start_yishi_name": "耿医生",
	// "start_hushi_name": "陈护士",
	// "content": "0.9%氯化钠注射液,注射用多索茶碱",
	// "stop_time": null,
	// "stop_yishi_name": null,
	// "stop_hushi_name": null,
	// "state": "开始执行"
	// },

	public static ChangyizhuBean objectFromData(String str) {

		return new Gson().fromJson(str, ChangyizhuBean.class);
	}
	private String page;

	private String meiyetiaoshu;
	private String zongtiaoshu;
	private String zongyeshu;
	private ArrayList<YizhuBean> data;

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

	public List<YizhuBean> getYizhu() {
		return data;
	}

	public void setYizhu(ArrayList<YizhuBean> data) {
		this.data = data;
	}

	public static class YizhuBean {
		// "zhuyuan_id": "130446-9",
		// "start_time": "2016-05-13 10:53",
		// "start_yishi_name": "耿医生",
		// "start_hushi_name": "陈护士",
		// "content": "0.9%氯化钠注射液,注射用多索茶碱",
		// "stop_time": null,
		// "stop_yishi_name": null,
		// "stop_hushi_name": null,
		// "state": "开始执行"
		private String zhuyuan_id;
		private String start_time;
		private String start_yishi_name;
		private String start_hushi_name;
		private String content;
		private String stop_time;
		private String stop_yishi_name;
		private String stop_hushi_name;
		private String state;

		public String getZhuyuan_id() {
			return zhuyuan_id;
		}

		public void setZhuyuan_id(String zhuyuan_id) {
			this.zhuyuan_id = zhuyuan_id;
		}

		public String getStart_time() {
			return start_time;
		}

		public void setStart_time(String start_time) {
			this.start_time = start_time;
		}

		public String getStart_yishi_name() {
			return start_yishi_name;
		}

		public void setStart_yishi_name(String start_yishi_name) {
			this.start_yishi_name = start_yishi_name;
		}

		public String getStart_hushi_name() {
			return start_hushi_name;
		}

		public void setStart_hushi_name(String start_hushi_name) {
			this.start_hushi_name = start_hushi_name;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getStop_time() {
			return stop_time;
		}

		public void setStop_time(String stop_time) {
			this.stop_time = stop_time;
		}

		public String getStop_yishi_name() {
			return stop_yishi_name;
		}

		public void setStop_yishi_name(String stop_yishi_name) {
			this.stop_yishi_name = stop_yishi_name;
		}

		public String getStop_hushi_name() {
			return stop_hushi_name;
		}

		public void setStop_hushi_name(String stop_hushi_name) {
			this.stop_hushi_name = stop_hushi_name;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

	}

	@Override
	public String toString() {
		return "ChangyizhuBean [page=" + page + ", meiyetiaoshu="
				+ meiyetiaoshu + ", zongtiaoshu=" + zongtiaoshu
				+ ", zongyeshu=" + zongyeshu + ", data=" + data + "]";
	}

	public static ArrayList<ChangyizhuBean> getObject(String json) {
		if (json == null) {
			return null;
		}
		try {
			Gson gson = new Gson();
			ArrayList<ChangyizhuBean> br = gson.fromJson(json,
					new TypeToken<ArrayList<ChangyizhuBean>>() {
					}.getType());
			return br;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
