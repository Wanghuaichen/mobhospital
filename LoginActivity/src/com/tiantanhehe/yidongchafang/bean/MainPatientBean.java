package com.tiantanhehe.yidongchafang.bean;

import java.util.ArrayList;

public class MainPatientBean {
	private String first_zhuyuan_id;
	private ArrayList<ListEntiy> search_result;
	private String zhuangtai;

	@Override
	public String toString() {
		return "MainPatientBean{" + "first_zhuyuan_id='" + first_zhuyuan_id + '\'' + ", search_result=" + search_result
				+ ", zhuangtai='" + zhuangtai + '\'' + '}';
	}

	public String getFirst_zhuyuan_id() {
		return first_zhuyuan_id;
	}

	public void setFirst_zhuyuan_id(String first_zhuyuan_id) {
		this.first_zhuyuan_id = first_zhuyuan_id;
	}

	public ArrayList<ListEntiy> getSearch_result() {
		return search_result;
	}

	public void setSearch_result(ArrayList<ListEntiy> search_result) {
		this.search_result = search_result;
	}

	public String getZhuangtai() {
		return zhuangtai;
	}

	public void setZhuangtai(String zhuangtai) {
		this.zhuangtai = zhuangtai;
	}

	public class ListEntiy {
		private String bingchuang_hao;
		private String content;
		private String hulijibie;
		private String nianling;
		private String patient_id;
		private String ruyuan_qingkuang;
		private String ruyuan_riqi_time;
		private String ruyuan_tianshu;
		private String state;
		private String type;
		private String xingbie;
		private String xingming;
		private String zhuangtai;
		private String zhuyuan_id;

		@Override
		public String toString() {
			return "ListEntiy{" + "bingchuang_hao='" + bingchuang_hao + '\'' + ", content='" + content + '\''
					+ ", hulijibie='" + hulijibie + '\'' + ", nianling='" + nianling + '\'' + ", patient_id='"
					+ patient_id + '\'' + ", ruyuan_qingkuang='" + ruyuan_qingkuang + '\'' + ", ruyuan_riqi_time='"
					+ ruyuan_riqi_time + '\'' + ", ruyuan_tianshu='" + ruyuan_tianshu + '\'' + ", state='" + state
					+ '\'' + ", type='" + type + '\'' + ", xingbie='" + xingbie + '\'' + ", xingming='" + xingming
					+ '\'' + ", zhuangtai='" + zhuangtai + '\'' + ", zhuyuan_id='" + zhuyuan_id + '\'' + '}';
		}

		public String getBingchuang_hao() {
			return bingchuang_hao;
		}

		public void setBingchuang_hao(String bingchuang_hao) {
			this.bingchuang_hao = bingchuang_hao;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getHulijibie() {
			return hulijibie;
		}

		public void setHulijibie(String hulijibie) {
			this.hulijibie = hulijibie;
		}

		public String getNianling() {
			return nianling;
		}

		public void setNianling(String nianling) {
			this.nianling = nianling;
		}

		public String getPatient_id() {
			return patient_id;
		}

		public void setPatient_id(String patient_id) {
			this.patient_id = patient_id;
		}

		public String getRuyuan_qingkuang() {
			return ruyuan_qingkuang;
		}

		public void setRuyuan_qingkuang(String ruyuan_qingkuang) {
			this.ruyuan_qingkuang = ruyuan_qingkuang;
		}

		public String getRuyuan_riqi_time() {
			return ruyuan_riqi_time;
		}

		public void setRuyuan_riqi_time(String ruyuan_riqi_time) {
			this.ruyuan_riqi_time = ruyuan_riqi_time;
		}

		public String getRuyuan_tianshu() {
			return ruyuan_tianshu;
		}

		public void setRuyuan_tianshu(String ruyuan_tianshu) {
			this.ruyuan_tianshu = ruyuan_tianshu;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getXingbie() {
			return xingbie;
		}

		public void setXingbie(String xingbie) {
			this.xingbie = xingbie;
		}

		public String getXingming() {
			return xingming;
		}

		public void setXingming(String xingming) {
			this.xingming = xingming;
		}

		public String getZhuangtai() {
			return zhuangtai;
		}

		public void setZhuangtai(String zhuangtai) {
			this.zhuangtai = zhuangtai;
		}

		public String getZhuyuan_id() {
			return zhuyuan_id;
		}

		public void setZhuyuan_id(String zhuyuan_id) {
			this.zhuyuan_id = zhuyuan_id;
		}
	}

}
