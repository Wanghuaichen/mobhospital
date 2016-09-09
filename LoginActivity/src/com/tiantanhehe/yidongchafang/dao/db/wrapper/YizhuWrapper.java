/**
 * Project Name:MobileEMR
 * File Name:YizhuWrapper.java
 * Package Name:com.tiantanhehe.mobileemr.db.wrapper
 * Date:2015-8-27下午12:57:32
 * Copyright (c) 2015, chenzhou1025@126.com All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.dao.db.wrapper;

import android.database.Cursor;

/**
 * ClassName:YizhuWrapper <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2015-8-27 下午12:57:32 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public class YizhuWrapper extends DaoWrapper {

	private String yizhu_id;
	private String zhuyuan_id;
	private String yizhu_type;
	private String content;
	private String start_time;
	private String stop_time;
	private String yongfa;
	private String yongliang;
	private String shiyong_danwei;
	private String pinlv;
	private String zuhao;
	private String zhixing_state;
	private String meiri_cishu;
	private String wancheng_cishu;
	private String yongfa_type;
	private String state;
	private String beizhu;
	private String kuatian;
	private String pishi_beizhu;
	private String chushi_state;
	private String auto_finish_saoma;
	private String auto_finish_dianji;
	private String finish_immediately;
	private String double_sign_flag;
//	private int stateSort;

	public YizhuWrapper(Cursor huanzheData) {
		this.setAttr(huanzheData);
	}

	public YizhuWrapper() {
	}

	public String getYizhu_id() {
		return yizhu_id;
	}

	public void setYizhu_id(String yizhu_id) {
		this.yizhu_id = yizhu_id;
	}

	public String getZhuyuan_id() {
		return zhuyuan_id;
	}

	public void setZhuyuan_id(String zhuyuan_id) {
		this.zhuyuan_id = zhuyuan_id;
	}

	public String getYizhu_type() {
		return yizhu_type;
	}

	public void setYizhu_type(String yizhu_type) {
		this.yizhu_type = yizhu_type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getStop_time() {
		return stop_time;
	}

	public void setStop_time(String stop_time) {
		this.stop_time = stop_time;
	}

	public String getYongfa() {
		return yongfa;
	}

	public void setYongfa(String yongfa) {
		this.yongfa = yongfa;
	}

	public String getYongliang() {
		return yongliang;
	}

	public void setYongliang(String yongliang) {
		this.yongliang = yongliang;
	}

	public String getShiyong_danwei() {
		return shiyong_danwei;
	}

	public void setShiyong_danwei(String shiyong_danwei) {
		this.shiyong_danwei = shiyong_danwei;
	}

	public String getPinlv() {
		return pinlv;
	}

	public void setPinlv(String pinlv) {
		this.pinlv = pinlv;
	}

	public String getZuhao() {
		return zuhao;
	}

	public void setZuhao(String zuhao) {
		this.zuhao = zuhao;
	}

	public String getZhixing_state() {
		return zhixing_state;
	}

	public void setZhixing_state(String zhixing_state) {
		this.zhixing_state = zhixing_state;
	}

	public String getMeiri_cishu() {
		return meiri_cishu;
	}

	public void setMeiri_cishu(String meiri_cishu) {
		this.meiri_cishu = meiri_cishu;
	}

	public String getWancheng_cishu() {
		return wancheng_cishu;
	}

	public void setWancheng_cishu(String wancheng_cishu) {
		this.wancheng_cishu = wancheng_cishu;
	}

	public String getYongfa_type() {
		return yongfa_type;
	}

	public void setYongfa_type(String yongfa_type) {
		this.yongfa_type = yongfa_type;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBeizhu() {
		return beizhu;
	}

	public void setBeizhu(String beizhu) {
		this.beizhu = beizhu;
	}

	public String getKuatian() {
		return kuatian;
	}

	public void setKuatian(String kuatian) {
		this.kuatian = kuatian;
	}

	public String getPishi_beizhu() {
		return pishi_beizhu;
	}

	public void setPishi_beizhu(String pishi_beizhu) {
		this.pishi_beizhu = pishi_beizhu;
	}

	public String getChushi_state() {
		return chushi_state;
	}

	public void setChushi_state(String chushi_state) {
		this.chushi_state = chushi_state;
	}

	public String getAuto_finish_saoma() {
		return auto_finish_saoma;
	}

	public void setAuto_finish_saoma(String auto_finish_saoma) {
		this.auto_finish_saoma = auto_finish_saoma;
	}

	public String getAuto_finish_dianji() {
		return auto_finish_dianji;
	}

	public void setAuto_finish_dianji(String auto_finish_dianji) {
		this.auto_finish_dianji = auto_finish_dianji;
	}

	public String getFinish_immediately() {
		return finish_immediately;
	}

	public void setFinish_immediately(String finish_immediately) {
		this.finish_immediately = finish_immediately;
	}

	public String getDouble_sign_flag() {
		return double_sign_flag;
	}

	public void setDouble_sign_flag(String double_sign_flag) {
		this.double_sign_flag = double_sign_flag;
	}

//	public int getStateSort() {
//		return stateSort;
//	}
//
//	public void setStateSort(int stateSort) {
//		this.stateSort = stateSort;
//	}

}
