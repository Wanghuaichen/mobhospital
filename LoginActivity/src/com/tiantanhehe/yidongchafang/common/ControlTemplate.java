package com.tiantanhehe.yidongchafang.common;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * 控制表的实例
 * 
 * @author servi
 * 
 */
public class ControlTemplate {

	/**
	 * 开关的id
	 */
	private String id;
	/**
	 * 开关名称
	 */
	private String controlName;
	/**
	 * 开关的值
	 */
	private String controlValue;
	/**
	 * 开关值类型
	 */
	private String controlType;
	/**
	 * 开关描述
	 */
	private String controlDiscription;

	/**
	 * 获得控制表所有开关的集合
	 * 
	 * @param jsonString
	 * @return 开关的集合
	 */
	public List<ControlTemplate> getControlTemplateList(String jsonString) {

		List<ControlTemplate> list = new ArrayList<ControlTemplate>();
		try {
			Gson gson = new Gson();
			list = gson.fromJson(jsonString,
					new TypeToken<List<ControlTemplate>>() {
					}.getType());

		} catch (Exception e) {
			// TODO: handle exception
		}

		return list;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getControlName() {
		return controlName;
	}

	public void setControlName(String controlName) {
		this.controlName = controlName;
	}

	public String getControlValue() {
		return controlValue;
	}

	public void setControlValue(String controlValue) {
		this.controlValue = controlValue;
	}

	public String getControlType() {
		return controlType;
	}

	public void setControlType(String controlType) {
		this.controlType = controlType;
	}

	public String getControlDiscription() {
		return controlDiscription;
	}

	public void setControlDiscription(String controlDiscription) {
		this.controlDiscription = controlDiscription;
	}
}
