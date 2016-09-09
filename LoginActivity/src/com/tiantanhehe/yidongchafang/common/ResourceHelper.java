/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: CookieHelper.java
 * @Package com.tiantanhehe.yidongchafang.common
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 上午10:57:27 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.common;

import android.content.Context;

/**
 * @ClassName: CookieHelper
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 上午10:57:27
 * 
 */
public class ResourceHelper {
	private ResourceHelper() {
	}


	public static ResourceHelper resourceHelper;

	public static ResourceHelper getInstance() {
		if(resourceHelper == null){
			resourceHelper = new ResourceHelper();
		}

		return resourceHelper;
	}

	public int getResourceIdByName(Context context, String resName) {

		int resId = context.getResources().getIdentifier(resName, "drawable", context.getPackageName());
		return resId;

	}


}
