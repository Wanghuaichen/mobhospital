package com.tiantanhehe.yidongchafang.bean;

/**
 * 该Bean用于时间视图中的病例记录
 * 
 * @since 2016-09-10
 * @author Administrator
 */

public class BingliRecordBean {

	private String id;
	private String bingcheng_sub_leibie;
	private String record_time;
	private String leixing;

	public BingliRecordBean() {
		super();
	}

	public BingliRecordBean(String id, String bingcheng_sub_leibie, String record_time, String leixing) {
		super();
		this.id = id;
		this.bingcheng_sub_leibie = bingcheng_sub_leibie;
		this.record_time = record_time;
		this.leixing = leixing;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getBingcheng_sub_leibie() {
		return bingcheng_sub_leibie;
	}

	public void setBingcheng_sub_leibie(String bingcheng_sub_leibie) {
		this.bingcheng_sub_leibie = bingcheng_sub_leibie;
	}

	public String getRecord_time() {
		return record_time;
	}

	public void setRecord_time(String record_time) {
		this.record_time = record_time;
	}

	public String getLeixing() {
		return leixing;
	}

	public void setLeixing(String leixing) {
		this.leixing = leixing;
	}

	@Override
	public String toString() {
		return "BingliRecordBean [id=" + id + ", bingcheng_sub_leibie=" + bingcheng_sub_leibie + ", record_time="
				+ record_time + ", leixing=" + leixing + "]";
	}
}