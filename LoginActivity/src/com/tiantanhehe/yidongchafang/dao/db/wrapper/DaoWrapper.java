/**
 * Project Name:MobileEMR
 * File Name:DaoWrapper.java
 * Package Name:com.tiantanhehe.mobileemr.db.wrapper
 * Date:2015-8-27下午7:10:58
 * Copyright (c) 2015, chenzhou1025@126.com All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.dao.db.wrapper;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import android.database.Cursor;

/**
 * ClassName:DaoWrapper <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2015-8-27 下午7:10:58 <br/>
 * 
 * @author wuwenlong
 * @version
 * @since JDK 1.6
 * @see
 */
public class DaoWrapper {

	public void setAttr(Cursor huanzheData) {
		Field[] fieldList = this.getClass().getDeclaredFields();
		for (Field f : fieldList) {
			String name = f.getName();
			String methodName = "set" + name.substring(0, 1).toUpperCase()
					+ name.substring(1);
			Method method;
			try {
				method = this.getClass().getDeclaredMethod(methodName,
						String.class);
				method.invoke(this,
						huanzheData.getString(huanzheData.getColumnIndex(name)));
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
	}

	public Map<String, Object> transToMap() {
		Map<String, Object> valueMap = new HashMap<String, Object>();
		Field[] fieldList = this.getClass().getDeclaredFields();// 返回Class中所有的字段，包括私有字段
		for (Field f : fieldList) {
			String name = f.getName();// 去字段。
			String methodName = "get" + name.substring(0, 1).toUpperCase()// 是将所有的英文字符转换为大写字母
					+ name.substring(1);
			try {
				Method method = this.getClass().getDeclaredMethod(methodName);// 反映此Class对象所表示的类或接口的指定已声明方法，参数方法名。
				String value = (String) method.invoke(this);// 就是调用类中的方法，最简单的用法是可以把方法参数化
				valueMap.put(name, value);
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
		return valueMap;
	}

	public String getStringdata(Cursor data, String columnName) {
		String result = "";

		int colIndex = data.getColumnIndex(columnName);
		if (colIndex >= 0) {
			result = data.getString(colIndex);
		}

		if ("null".equals(result)) {
			result = "";
		}
		return result;
	}
}

