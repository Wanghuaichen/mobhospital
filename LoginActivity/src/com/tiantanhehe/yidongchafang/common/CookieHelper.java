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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

import android.content.Context;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;

/**
 * @ClassName: CookieHelper
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 上午10:57:27
 * 
 */
public class CookieHelper {
	private CookieHelper(Context context) {
		cookies = new HashMap<String, ArrayList<String>>();
		ArrayList<String> defaultcookie = new ArrayList<String>();
		cookies.put("default", defaultcookie);
		this.context = context;
		cookieManager = CookieManager.getInstance();
	}

	private Context context;

	private CookieManager cookieManager;

	private Map<String, ArrayList<String>> cookies;

	public static CookieHelper cookieHelper;

	public static CookieHelper getInstance(Context context) {
		if(cookieHelper == null){
			cookieHelper = new CookieHelper(context);
		}

		return cookieHelper;
	}

	/**
	 * @Title: addCookie
	 * @Description: 增加单一Cookie,默认为pad访问cookie
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月6日 下午5:03:58
	 * @param context
	 * @param cookie
	 */ 
	public void addCookie(Context context, String cookie) {
		if (cookies != null) {
			ArrayList<String> defaultcookies = cookies.get("default");
			defaultcookies.add(cookie);

			// cookies.add(cookie);
		}
	}

	/**
	 * @Title: addCookie
	 * @Description: 增加单一Cookie
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月6日 下午5:03:58
	 * @param context
	 * @param cookie
	 */
	public void addCookie(Context context, String cookie, String type) {
		if (type == null || "".equals(type)) {
			addCookie(context, cookie);
			return;
		}

		if (cookies != null) {
			ArrayList<String> typecookies = cookies.get(type);
			if (typecookies == null) {
				typecookies = new ArrayList<String>();

			}
			typecookies.add(cookie);
			cookies.put(type, typecookies);
		}
	}

	/**
	 * @Title: addCookie
	 * @Description: 增加Cookie组
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月6日 下午5:04:14
	 * @param cookie
	 */ 
	public void addCookie(String cookie) {
		if (cookies != null) {
			ArrayList<String> defaultcookies = cookies.get("default");
			defaultcookies.add(cookie);
			// cookies.add(cookie);
		}
	}

	/**
	 * @Title: addCookie
	 * @Description: 增加Cookie组
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月6日 下午5:04:14
	 * @param cookie
	 */
	public void addCookie(String cookie, String type) {
		if (type == null || "".equals(type)) {
			addCookie(cookie);
			return;
		}

		if (cookies != null) {
			ArrayList<String> typecookies = cookies.get(type);
			if (typecookies == null) {
				typecookies = new ArrayList<String>();

			}
			typecookies.add(cookie);
			cookies.put(type, typecookies);
		}
	}

	public void clearCookie(Context context) {
		if (cookies != null) {
			for(Map.Entry<String, ArrayList<String>> entry : cookies.entrySet()){
				entry.getValue().clear();
			}
			// cookies.clear();
		}
	}

	public void clearCookie() {
		if (cookies != null) {
			for (Map.Entry<String, ArrayList<String>> entry : cookies.entrySet()) {
				entry.getValue().clear();
			}
		}
	}
	

	public void clearCookie(String string) {
		if (cookies != null) {
			ArrayList<String> typecookies = cookies.get(string);

			if (typecookies != null) {
				typecookies.clear();
			}
		}
	}
	
	/**
	 * @Title: getCookiesString
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月6日 下午5:04:40
	 * @param context
	 * @return
	 */
	public String getCookiesString(Context context, String type) {
		if (type == null || "".equals(type) || "default".equals(type)) {
			return getCookiesString(context);
		}

		String cookieString = "";

		ArrayList<String> defaultcookies = cookies.get(type);
		if (defaultcookies == null) {
			return cookieString;
		}

		for (String cookie : defaultcookies) {
			cookieString = cookieString + cookie;
		}
		return cookieString;
	}

	/**
	 * @Title: getCookiesString
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月6日 下午5:04:40
	 * @param context
	 * @return
	 */
	public String getCookiesString(Context context){
		String cookieString = "";

		ArrayList<String> defaultcookies = cookies.get("default");
		for (String cookie : defaultcookies) {
			cookieString = cookieString + cookie;
		}
		return cookieString;
	}
	
	public void syncUrlCookies(String url, String type) {

		CookieSyncManager.createInstance(context);
		// cookieManager.removeAllCookie();
		cookieManager.setCookie(url, getCookiesString(context, type));
		CookieSyncManager.getInstance().sync();

	}
	
	public void syncUrlCookies(String url) {

		CookieSyncManager.createInstance(context);
		// cookieManager.removeAllCookie();
		cookieManager.setCookie(url, getCookiesString(context));
		CookieSyncManager.getInstance().sync();

	}

	public void clearUrlCookie(String url) {
		CookieSyncManager.createInstance(context);
		cookieManager.removeAllCookie();
		CookieSyncManager.getInstance().sync();
	}


	public void setUrlCookies(String url) {
		if (url.indexOf("Common/Yizhuguanli") != -1
				&& GlobalInfoApplication.getInstance().featureConf.yizhu_conf == 1) {
			// CookieHelper.getInstance(context)
			// .syncUrlCookies(request_url +
			// current_application.appConf.current_patient_zhuyuan_id,
			// "desktop");
			syncUrlCookies(url, "desktop");
		} else if (url.indexOf("ZhuyuanYishi/BingchengJilu/showView/zhuyuan_id/") != -1) {
			// CookieHelper.getInstance(context)
			// .syncUrlCookies(request_url +
			// current_application.appConf.current_patient_zhuyuan_id,
			// "desktop");
			syncUrlCookies(url, "desktop");
		} else {
			// CookieHelper.getInstance(context)
			// .syncUrlCookies(request_url +
			// current_application.appConf.current_patient_zhuyuan_id);
			syncUrlCookies(url);
		}
	}


}
