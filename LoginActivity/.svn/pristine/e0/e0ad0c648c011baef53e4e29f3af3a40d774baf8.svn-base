/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ShowYizhuWrapper.java
 * @Package com.tiantanhehe.mobileemr.db.wrapper
 * @Description: TODO 
 * @author Gao ZhiDong <gaozhidong@tiantanhehe.com>
 * @date 2016-1-27 下午3:58:00 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.dao.db.wrapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import android.database.Cursor;

/**
 * @ClassName: ShowYizhuWrapper
 * @Description: TODO
 * @author Gao ZhiDong <gaozhidong@tiantanhehe.com>
 * @date 2016-1-27 下午3:58:00
 * 
 */
public class ShowYizhuWrapper extends YizhuWrapper {

	private ArrayList<Map<String, Object>> yizhu_content_info;
	private List<String> allyizhuLishi;
	private String check_state = "否";
	private String dangqian_zhixing_state;
	private boolean show_all_Lishi = false;

	public ShowYizhuWrapper(Cursor huanzheData) {
		this.setAttr(huanzheData);
	}

	public ArrayList<Map<String, Object>> getYizhu_content_info() {
		return yizhu_content_info;
	}

	public void setYizhu_content_info(
			ArrayList<Map<String, Object>> yizhu_content_info) {
		this.yizhu_content_info = yizhu_content_info;
	}

	public List<String> getAllyizhuLishi() {
		return allyizhuLishi;
	}

	public void setAllyizhuLishi(List<String> allyizhuLishi) {
		this.allyizhuLishi = allyizhuLishi;
	}

	public String getCheck_state() {
		return check_state;
	}

	public void setCheck_state(String check_state) {
		this.check_state = check_state;
	}

	public String getDangqian_zhixing_state() {
		return dangqian_zhixing_state;
	}

	public void setDangqian_zhixing_state(String dangqian_zhixing_state) {
		this.dangqian_zhixing_state = dangqian_zhixing_state;
	}

	public boolean isShow_all_Lishi() {
		return show_all_Lishi;
	}

	public void setShow_all_Lishi(boolean show_all_Lishi) {
		this.show_all_Lishi = show_all_Lishi;
	}

	/**
	 * 重写反射方法 调用父类的方法赋值
	 */
	public void setAttr(Cursor huanzheData) {
		this.setYizhu_id(huanzheData.getString(huanzheData
				.getColumnIndex("yizhu_id")));
		this.setZhuyuan_id(huanzheData.getString(huanzheData
				.getColumnIndex("zhuyuan_id")));
		this.setYizhu_type(huanzheData.getString(huanzheData
				.getColumnIndex("yizhu_type")));
		this.setContent(huanzheData.getString(huanzheData
				.getColumnIndex("content")));
		this.setStart_time(huanzheData.getString(huanzheData
				.getColumnIndex("start_time")));
		this.setStop_time(huanzheData.getString(huanzheData
				.getColumnIndex("stop_time")));
		this.setYongfa(huanzheData.getString(huanzheData
				.getColumnIndex("yongfa")));
		this.setYongliang(huanzheData.getString(huanzheData
				.getColumnIndex("yongliang")));
		this.setShiyong_danwei(huanzheData.getString(huanzheData
				.getColumnIndex("shiyong_danwei")));
		this.setPinlv(huanzheData.getString(huanzheData.getColumnIndex("pinlv")));
		this.setZuhao(huanzheData.getString(huanzheData.getColumnIndex("zuhao")));
		this.setZhixing_state(huanzheData.getString(huanzheData
				.getColumnIndex("zhixing_state")));
		this.setMeiri_cishu(huanzheData.getString(huanzheData
				.getColumnIndex("meiri_cishu")));
		this.setWancheng_cishu(huanzheData.getString(huanzheData
				.getColumnIndex("wancheng_cishu")));
		this.setYongfa_type(huanzheData.getString(huanzheData
				.getColumnIndex("yongfa_type")));
		this.setState(huanzheData.getString(huanzheData.getColumnIndex("state")));
		this.setBeizhu(huanzheData.getString(huanzheData
				.getColumnIndex("beizhu")));
		this.setKuatian(huanzheData.getString(huanzheData
				.getColumnIndex("kuatian")));
		this.setPishi_beizhu(huanzheData.getString(huanzheData
				.getColumnIndex("pishi_beizhu")));
		this.setChushi_state(huanzheData.getString(huanzheData
				.getColumnIndex("chushi_state")));
		this.setAuto_finish_saoma(huanzheData.getString(huanzheData
				.getColumnIndex("auto_finish_saoma")));
		this.setAuto_finish_dianji(huanzheData.getString(huanzheData
				.getColumnIndex("auto_finish_dianji")));
		this.setFinish_immediately(huanzheData.getString(huanzheData
				.getColumnIndex("finish_immediately")));
		this.setDouble_sign_flag(huanzheData.getString(huanzheData
				.getColumnIndex("double_sign_flag")));
//		this.setStateSort(Integer.parseInt(huanzheData.getString(huanzheData
//				.getColumnIndex("stateSort"))));

	}
}
