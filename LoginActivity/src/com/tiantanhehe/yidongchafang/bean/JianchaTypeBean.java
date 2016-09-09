package com.tiantanhehe.yidongchafang.bean;

public class JianchaTypeBean {

	private String id;
	private String jiancha_value;
	private String jiancha_time;
	private String leixing;

	public JianchaTypeBean(String id, String jiancha_value, String jiancha_time, String leixing) {
		super();
		this.id = id;
		this.jiancha_value = jiancha_value;
		this.jiancha_time = jiancha_time;
		this.leixing = leixing;
	}

	public JianchaTypeBean() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getJiancha_value() {
		return jiancha_value;
	}

	public void setJiancha_value(String jiancha_value) {
		this.jiancha_value = jiancha_value;
	}

	public String getJiancha_time() {
		return jiancha_time;
	}

	public void setJiancha_time(String jiancha_time) {
		this.jiancha_time = jiancha_time;
	}

	public String getLeixing() {
		return leixing;
	}

	public void setLeixing(String leixing) {
		this.leixing = leixing;
	}

	@Override
	public String toString() {
		return "JianchaTypeBean [id=" + id + ", jiancha_value=" + jiancha_value + ", jiancha_time=" + jiancha_time
				+ ", leixing=" + leixing + "]";
	}
}