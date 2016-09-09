package com.tiantanhehe.yidongchafang.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.StrictMode;
import android.util.Log;

import com.baidu.tts.loopj.HttpGet;

public class HttpClientUtils {
	public static String httpGet(String url) throws Exception {
		HttpClient client = new DefaultHttpClient();
		HttpParams params = client.getParams();
		HttpConnectionParams.setConnectionTimeout(params, 20000);
		HttpConnectionParams.setSoTimeout(params, 30000);
		HttpGet get = new HttpGet(url);
		HttpResponse response = null;
		try {
			response = client.execute(get);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity();
				return EntityUtils.toString(entity);
			}
		} catch (SocketTimeoutException e) {
			// TODO: handle exception
			Log.i("tag", "wangluochashi");
		}
		return null;

	}

	public static String postData(String url, Map<String, String> map) {
		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
				.detectDiskReads().detectDiskWrites().detectAll().penaltyLog()
				.build());
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
				.detectLeakedSqlLiteObjects().detectLeakedClosableObjects()
				.penaltyLog().penaltyDeath().build());

		String result = "";
		HttpPost post = new HttpPost(url);
		List<NameValuePair> paramList = new ArrayList<NameValuePair>();
		for (String key : map.keySet()) {
			BasicNameValuePair addValue = new BasicNameValuePair(key,
					map.get(key));
			paramList.add(addValue);
		}
		try {
			HttpResponse httpResponse = null;
			HttpClient httpClient = new DefaultHttpClient();
			post.setEntity(new UrlEncodedFormEntity(paramList, HTTP.UTF_8));
			httpResponse = httpClient.execute(post);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String tempResult = EntityUtils.toString(httpResponse
						.getEntity());
				JSONObject jsonObject = new JSONObject(tempResult);
				int json_type = jsonObject.getInt("staus");
				if (json_type == 1) {
					result = jsonObject.get("result").toString();
				}
				result = jsonObject.get("result").toString();
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

}
