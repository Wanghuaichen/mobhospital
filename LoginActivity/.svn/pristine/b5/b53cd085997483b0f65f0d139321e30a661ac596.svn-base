package com.tiantanhehe.yidongchafang.dao.db.wrapper;

import java.io.Serializable;
import java.util.Calendar;

import android.database.Cursor;


public class TizhengWrapper extends DaoWrapper implements Serializable {
	// create table data_tizheng_template(id integer primary key,tizheng_id
	// integer
	// ,leibie,fangshi,max,min,danwei,edit_number,leibie_miaoshu,ztm,keshi,keyboardname,
	// xiangmu_value,default_value
	private String tizheng_id;
	private String leibie;
	private String leibie_miaoshu;
	private String fangshi;
	private String danwei;
	private String edit_number;
	private String default_value;

	private String max;

	private String min;
	private String keyboardname;

	private String xiangmu_value;
	private String patient_id;
	private String zhuyuan_id;
	private String jiancha_doctor_name;
	private String tizheng_value;

	private String jiancha_doctor_id;
	private String tizheng_value_2;
	private String beizhu;
	private String chongfu;
	private boolean saveState;
	private Calendar current_date;

	public String getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(String patient_id) {
		this.patient_id = patient_id;
	}

	public String getZhuyuan_id() {
		return zhuyuan_id;
	}

	public void setZhuyuan_id(String zhuyuan_id) {
		this.zhuyuan_id = zhuyuan_id;
	}

	public String getJiancha_doctor_name() {
		return jiancha_doctor_name;
	}

	public void setJiancha_doctor_name(String jiancha_doctor_name) {
		this.jiancha_doctor_name = jiancha_doctor_name;
	}

	public String getTizheng_value() {
		return tizheng_value;
	}

	public void setTizheng_value(String tizheng_value) {
		this.tizheng_value = tizheng_value;
	}

	public String getJiancha_doctor_id() {
		return jiancha_doctor_id;
	}

	public void setJiancha_doctor_id(String jiancha_doctor_id) {
		this.jiancha_doctor_id = jiancha_doctor_id;
	}

	public String getTizheng_value_2() {
		return tizheng_value_2;
	}

	public void setTizheng_value_2(String tizheng_value_2) {
		this.tizheng_value_2 = tizheng_value_2;
	}

	public String getBeizhu() {
		return beizhu;
	}

	public void setBeizhu(String beizhu) {
		this.beizhu = beizhu;
	}

	public String getChongfu() {
		return chongfu;
	}

	public void setChongfu(String chongfu) {
		this.chongfu = chongfu;
	}

	public boolean getSaveState() {
		return saveState;
	}

	public void setSaveState(boolean b) {
		this.saveState = b;
	}

	public Calendar getCurrent_date() {
		return current_date;
	}

	public void setCurrent_date(Calendar calendar) {
		this.current_date = calendar;
	}

	public TizhengWrapper() {
		// TODO Auto-generated constructor stub
	}


	public TizhengWrapper(Cursor huanzheData) {
		this.setAttr(huanzheData);
	}



	public String getLeibie() {
		return leibie;
	}

	public void setLeibie(String leibie) {
		this.leibie = leibie;
	}

	public String getFangshi() {
		return fangshi;
	}

	public void setFangshi(String fangshi) {
		this.fangshi = fangshi;
	}

	public String getMax() {
		return max;
	}

	public void setMax(String max) {
		this.max = max;
	}

	public String getMin() {
		return min;
	}

	public void setMin(String min) {
		this.min = min;
	}

	public String getDanwei() {
		return danwei;
	}

	public void setDanwei(String danwei) {
		this.danwei = danwei;
	}

	public String getEdit_number() {
		return edit_number;
	}

	public void setEdit_number(String edit_number) {
		this.edit_number = edit_number;
	}

	public String getLeibie_miaoshu() {
		return leibie_miaoshu;
	}

	public void setLeibie_miaoshu(String leibie_miaoshu) {
		this.leibie_miaoshu = leibie_miaoshu;
	}

	public String getTizheng_id() {
		return tizheng_id;
	}

	public void setTizheng_id(String tizheng_id) {
		this.tizheng_id = tizheng_id;
	}

	public String getDefault_value() {
		return default_value;
	}

	public void setDefault_value(String default_value) {
		this.default_value = default_value;
	}
	public String getKeyboardname() {
		return keyboardname;
	}

	public void setKeyboardname(String keyboardname) {
		this.keyboardname = keyboardname;
	}

	// public String getIsValidate() {
	// return isValidate;
	// }
	//
	// public void setIsValidate(String isValidate) {
	// this.isValidate = isValidate;
	// }

	public String getXiangmu_value() {
		return xiangmu_value;
	}

	public void setXiangmu_value(String xiangmu_value) {
		this.xiangmu_value = xiangmu_value;
	}

	@Override
	public String toString() {
		return "TizhengWrapper [tizheng_id=" + tizheng_id + ", leibie="
				+ leibie + ", leibie_miaoshu=" + leibie_miaoshu + ", fangshi="
				+ fangshi + ", danwei=" + danwei + ", edit_number="
				+ edit_number + ", default_value=" + default_value + ", max="
				+ max + ", min=" + min + ", keyboardname=" + keyboardname
				+ ", xiangmu_value=" + xiangmu_value + ", patient_id="
				+ patient_id + ", zhuyuan_id=" + zhuyuan_id
				+ ", jiancha_doctor_name=" + jiancha_doctor_name
				+ ", tizheng_value=" + tizheng_value + ", jiancha_doctor_id="
				+ jiancha_doctor_id + ", tizheng_value_2=" + tizheng_value_2
				+ ", beizhu=" + beizhu + ", chongfu=" + chongfu
				+ ", saveState=" + saveState + ", current_date=" + current_date
				+ "]";
	}

	public void setBean(TizhengWrapper bean) {
		this.leibie = bean.getLeibie();
		this.leibie_miaoshu = bean.getLeibie_miaoshu();
		this.tizheng_id = bean.getTizheng_id();
		this.fangshi = bean.getFangshi();
		this.danwei = bean.getDanwei();
		this.edit_number = bean.getEdit_number();
		this.default_value = bean.getDefault_value();
		this.max = bean.getMax();
		this.min = bean.getMin();
		this.keyboardname = bean.getKeyboardname();
		this.xiangmu_value = bean.getXiangmu_value();
		this.jiancha_doctor_name = bean.getJiancha_doctor_name();
		this.tizheng_value = bean.getTizheng_value();
		this.jiancha_doctor_id = bean.getJiancha_doctor_id();
		this.tizheng_value_2 = bean.getTizheng_value_2();
		this.beizhu = bean.getBeizhu();
		this.chongfu = bean.getChongfu();
		this.saveState = bean.getSaveState();
		this.current_date = bean.getCurrent_date();
	}
}
