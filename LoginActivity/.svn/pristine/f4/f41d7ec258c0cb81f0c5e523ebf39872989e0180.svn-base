/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ServiceHelper.java
 * @Package com.tiantanhehe.yidongchafang.common
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月18日 下午6:32:11 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.common;

import java.util.List;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningServiceInfo;
import android.content.Context;

/**
 * @ClassName: ServiceHelper
 * @Description: Service帮助类，用来处理Service相关内容
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月18日 下午6:32:11
 * 
 */
public class ServiceHelper {
	private Context context;
	private ServiceHelper serviceHelper;

	private ServiceHelper(Context context) {
		this.context = context;
	}

	public ServiceHelper getInstance(Context context) {
		if (serviceHelper == null) {
			serviceHelper = new ServiceHelper(context);
		}
		return serviceHelper;
	}

	/**
	 * @Title: isServiceWork
	 * @Description: 判断某个服务是否正在运行
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月18日 下午6:41:59
	 * @param serviceName
	 * @return
	 */
	public boolean isServiceWork(String serviceName) {
		boolean isWork = false;
		ActivityManager myAM = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
		List<RunningServiceInfo> myList = myAM.getRunningServices(40);
		if (myList.size() <= 0) {
			return false;
		}
		for (int i = 0; i < myList.size(); i++) {
			String mName = myList.get(i).service.getClassName().toString();
			if (mName.equals(serviceName)) {
				isWork = true;
				break;
			}
		}
		return isWork;
	}

}
