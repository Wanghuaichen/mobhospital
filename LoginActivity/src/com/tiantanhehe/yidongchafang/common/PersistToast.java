/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: PersistToast.java
 * @Package com.tiantanhehe.yidongchafang.common
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月11日 下午9:36:48 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.common;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import android.content.Context;
import android.view.Gravity;
import android.widget.Toast;

/**
 * @ClassName: PersistToast
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月11日 下午9:36:48
 * 
 */
public class PersistToast {

	public static Toast build(Context context, String content) {
		return Toast.makeText(context, content, Toast.LENGTH_SHORT);
	}

	public static void show(Toast toast) {
//		toast.setGravity(Gravity.TOP | Gravity.CENTER_HORIZONTAL, 0, 0);
		try {
			// 从Toast对象中获得mTN变量
			Field field = toast.getClass().getDeclaredField("mTN");
			field.setAccessible(true);
			Object obj = field.get(toast);
			// TN对象中获得了show方法
			Method method = obj.getClass().getDeclaredMethod("show", null);
			// 调用show方法来显示Toast信息提示框
			method.invoke(obj, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void hide(Toast toast) {
		try {
			Field field = toast.getClass().getDeclaredField("mTN");
			field.setAccessible(true);
			Object obj = field.get(toast);
			// 需要将前面代码中的obj变量变成类变量。这样在多个地方就都可以访问了
			Method method = obj.getClass().getDeclaredMethod("hide", null);
			method.invoke(obj, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
