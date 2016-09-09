package com.tiantanhehe.yidongchafang.common;
/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: SessionHelper.java
 * @Package 
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 下午6:42:26 
 * @version V4.0   
 */

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.AbstractHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

import android.content.Context;
import android.util.Log;

/**
 * @ClassName: SessionHelper
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 下午6:42:26
 * 
 */
public class SessionHelper {

	private SessionHelper(Context context) {
		this.context = context;
	}

	private Context context;

	private static SessionHelper sessionHelper;

	public static SessionHelper getInstance(Context context) {
		if (sessionHelper == null) {
			sessionHelper = new SessionHelper(context);
		}
		return sessionHelper;
	}

	/**
	 * @Title: setSession
	 * @Description: 设置服务器会话参数
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月19日 下午6:40:19
	 * @param string
	 */
	public void setSession(HttpClient httpClient, String url, String type) {
		// TODO Auto-generated method stub
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(
				new BasicNameValuePair("user_number", GlobalInfoApplication.getInstance().appConf.current_user_number));
		pairList.add(new BasicNameValuePair("login_password",
				GlobalInfoApplication.getInstance().appConf.current_user_password));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));

			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String strResult = EntityUtils.toString(httpResponse.getEntity());
				Log.d("tiantan", strResult);
				String cookie = "";
				Date sessionTime = new Date();
				CookieHelper.getInstance(context).clearCookie(type);
				List<Cookie> cookies = ((AbstractHttpClient) httpClient).getCookieStore().getCookies();
				if (!cookies.isEmpty()) {
					for (int i = 0; i < cookies.size(); i++) {
						cookie = cookies.get(i).getName() + "=" + cookies.get(i).getValue() + ";domain="
								+ cookies.get(i).getDomain() + ";";
						CookieHelper.getInstance(context).addCookie(cookie, type);

					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * @Title: setSession
	 * @Description: 设置服务器会话参数
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月19日 下午6:40:19
	 * @param string
	 */
	public void setSession(HttpClient httpClient, String url) {
		setSession(httpClient, url, "default");
	}

	/**
	 * @Title: setPadCookie
	 * @Description: 设置pad访问cookie
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月18日 下午9:54:47
	 */
	public void getCookie(HttpClient httpClient, String url, String type) {
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String strResult = EntityUtils.toString(httpResponse.getEntity());
				String cookie = "";
				Date sessionTime = new Date();
				CookieHelper.getInstance(context).clearCookie(type);
				List<Cookie> cookies = ((AbstractHttpClient) httpClient).getCookieStore().getCookies();
				if (!cookies.isEmpty()) {
					for (int i = 0; i < cookies.size(); i++) {
						cookie = cookies.get(i).getName() + "=" + cookies.get(i).getValue() + ";domain="
								+ cookies.get(i).getDomain() + ";";
						CookieHelper.getInstance(context).addCookie(cookie, type);

					}
					// PersistentConfig config = new PersistentConfig(context);
					// config.setCookie(cookie);
					//  
					//                             

				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @Title: setPadCookie
	 * @Description: 设置pad访问cookie
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月18日 下午9:54:47
	 */
	public void getCookie(HttpClient httpClient, String url) {
		getCookie(httpClient, url, "default");
	}

}
