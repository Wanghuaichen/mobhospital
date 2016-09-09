package com.tiantanhehe.yidongchafang.bean;

import java.util.List;

public class JianyanJianchaBean {

	private String zhuyuan_id;
	private String total_amount;
	private int one_page_amount;
	private int page_number;
	private int page_amount;
	private String hospital_name;
	public String getHospital_name() {
		return hospital_name;
	}

	public void setHospital_name(String hospital_name) {
		this.hospital_name = hospital_name;
	}

	private String url_condition;
	private List<JianchaResultBean> jiancha_result;

	public String getZhuyuan_id() {
		return zhuyuan_id;
	}

	public void setZhuyuan_id(String zhuyuan_id) {
		this.zhuyuan_id = zhuyuan_id;
	}

	public String getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}

	public int getOne_page_amount() {
		return one_page_amount;
	}

	public void setOne_page_amount(int one_page_amount) {
		this.one_page_amount = one_page_amount;
	}

	public int getPage_number() {
		return page_number;
	}

	public void setPage_number(int page_number) {
		this.page_number = page_number;
	}

	public int getPage_amount() {
		return page_amount;
	}

	public void setPage_amount(int page_amount) {
		this.page_amount = page_amount;
	}

	public String getUrl_condition() {
		return url_condition;
	}

	public void setUrl_condition(String url_condition) {
		this.url_condition = url_condition;
	}

	public List<JianchaResultBean> getJiancha_result() {
		return jiancha_result;
	}

	public void setJiancha_result(List<JianchaResultBean> jiancha_result) {
		this.jiancha_result = jiancha_result;
	}

	public static class JianchaResultBean {
		private String id;
		private String jiancha_code;
		private String jiancha_leibie;
		private String jiancha_keshi_name;
		private String jiancha_time;
		private String songjian_wu;
		private String shenqing_zhe_name;
		private String shenqing_keshi_name;
		private String jiancha_mingcheng;
		private String jiancha_yichangjieguo;
		private String shenqing_time;
		private String jiancha_zhuangtai;
		private String jiancha_zhe_name;
		private String hedui_zhe_name;
		private String leixing;

		@Override
		public String toString() {
			return "JianchaResultBean [id=" + id + ", jiancha_code=" + jiancha_code + ", jiancha_leibie="
					+ jiancha_leibie + ", jiancha_keshi_name=" + jiancha_keshi_name + ", jiancha_time=" + jiancha_time
					+ ", songjian_wu=" + songjian_wu + ", shenqing_zhe_name=" + shenqing_zhe_name
					+ ", shenqing_keshi_name=" + shenqing_keshi_name + ", jiancha_mingcheng=" + jiancha_mingcheng
					+ ", jiancha_yichangjieguo=" + jiancha_yichangjieguo + ", shenqing_time=" + shenqing_time
					+ ", jiancha_zhuangtai=" + jiancha_zhuangtai + ", jiancha_zhe_name=" + jiancha_zhe_name
					+ ", hedui_zhe_name=" + hedui_zhe_name + ", leixing=" + leixing + "]";
		}

		public String getJiancha_code() {
			return jiancha_code;
		}

		public void setJiancha_code(String jiancha_code) {
			this.jiancha_code = jiancha_code;
		}

		public String getJiancha_leibie() {
			return jiancha_leibie;
		}

		public void setJiancha_leibie(String jiancha_leibie) {
			this.jiancha_leibie = jiancha_leibie;
		}

		public String getJiancha_time() {
			return jiancha_time;
		}

		public void setJiancha_time(String jiancha_time) {
			this.jiancha_time = jiancha_time;
		}

		public String getSongjian_wu() {
			return songjian_wu;
		}

		public void setSongjian_wu(String songjian_wu) {
			this.songjian_wu = songjian_wu;
		}

		public String getShenqing_keshi_name() {
			return shenqing_keshi_name;
		}

		public void setShenqing_keshi_name(String shenqing_keshi_name) {
			this.shenqing_keshi_name = shenqing_keshi_name;
		}

		public String getJiancha_zhe_name() {
			return jiancha_zhe_name;
		}

		public void setJiancha_zhe_name(String jiancha_zhe_name) {
			this.jiancha_zhe_name = jiancha_zhe_name;
		}

		public String getHedui_zhe_name() {
			return hedui_zhe_name;
		}

		public void setHedui_zhe_name(String hedui_zhe_name) {
			this.hedui_zhe_name = hedui_zhe_name;
		}

		public String getLeixing() {
			return leixing;
		}

		public void setLeixing(String leixing) {
			this.leixing = leixing;
		}

		public String getShenqing_time() {
			return shenqing_time;
		}

		public void setShenqing_time(String shenqing_time) {
			this.shenqing_time = shenqing_time;
		}

		public String getJiancha_yichangjieguo() {
			return jiancha_yichangjieguo;
		}

		public void setJiancha_yichangjieguo(String jiancha_yichangjieguo) {
			this.jiancha_yichangjieguo = jiancha_yichangjieguo;
		}

		public String getJiancha_mingcheng() {
			return jiancha_mingcheng;
		}

		public void setJiancha_mingcheng(String jiancha_mingcheng) {
			this.jiancha_mingcheng = jiancha_mingcheng;
		}

		public String getShenqing_zhe_name() {
			return shenqing_zhe_name;
		}

		public void setShenqing_zhe_name(String shenqing_zhe_name) {
			this.shenqing_zhe_name = shenqing_zhe_name;
		}

		public String getJiancha_keshi_name() {
			return jiancha_keshi_name;
		}

		public void setJiancha_keshi_name(String jiancha_keshi_name) {
			this.jiancha_keshi_name = jiancha_keshi_name;
		}

		public String getJiancha_zhuangtai() {
			return jiancha_zhuangtai;
		}

		public void setJiancha_zhuangtai(String jiancha_zhuangtai) {
			this.jiancha_zhuangtai = jiancha_zhuangtai;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}
	}
}
