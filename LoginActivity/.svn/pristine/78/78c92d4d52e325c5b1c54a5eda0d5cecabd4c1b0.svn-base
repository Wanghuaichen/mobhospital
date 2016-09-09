package com.tiantanhehe.yidongchafang;

import java.net.SocketTimeoutException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;

import com.baidu.tts.loopj.HttpGet;

import android.util.Log;

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
}
