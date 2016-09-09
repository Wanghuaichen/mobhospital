package com.tiantanhehe.yidongchafang.dao.network;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import com.tiantanhehe.yidongchafang.utils.DataZhuanhuan;

import android.R.string;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.StrictMode;
import android.widget.Toast;

public class HttpHelper {
	private final Context mContext;
	IHandleHttpHelperResult mHandler;

	public HttpHelper(Context ctx, IHandleHttpHelperResult handler) {
		this.mContext = ctx;
		this.mHandler = handler;
	}

	public HttpHelper(Context ctx) {
		this.mContext = ctx;
	}

	public void getDataFromServer(final String url, final Map<String, String> map) {
		// List<Map<String, Object>> listdata = new ArrayList<Map<String,
		// Object>>();

		new AsyncTask<String, List<Map<String, Object>>, String>() {
			ProgressDialog proDialog = null;
			List<Map<String, Object>> listdata = new ArrayList<Map<String, Object>>();

			@Override
			protected void onPreExecute() {
				if (proDialog != null && proDialog.isShowing()) {
					proDialog.dismiss();
				}
				proDialog = new ProgressDialog(mContext);
				proDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
				proDialog.setMessage("正在努力加载数据...");
				proDialog.setIndeterminate(false);
				proDialog.setCancelable(true);
				proDialog.show();
			}

			@SuppressWarnings("unchecked")
			@Override
			protected String doInBackground(String... params) {
				// DataZhuanhuan shujuaZhuanhuan = new DataZhuanhuan();
				String postResult = HttpHelper.this.postData(url, map);
				if (!postResult.equals("")) {
					listdata = DataZhuanhuan.getList(postResult);

				}
				publishProgress(listdata);
				return null;
			}

			@Override
			protected void onProgressUpdate(List<Map<String, Object>>... values) {
				if (listdata != null && listdata.size() <= 0) {
					Toast.makeText(mContext, "没有找到您要的数据", Toast.LENGTH_SHORT).show();
					// return;
				}
				mHandler.handleResult(listdata);
			}

			@Override
			protected void onPostExecute(String result) {
				try {
					proDialog.dismiss();
				} catch (Exception e) {

				}
			}

		}.execute(url);
	}

	public void setHujiaoDataToServer(final String url, final Map<String, String> map) {
		// List<Map<String, Object>> listdata = new ArrayList<Map<String,
		// Object>>();

		new AsyncTask<String, List<Map<String, Object>>, String>() {
			ProgressDialog proDialog = null;
			List<Map<String, Object>> listdata = new ArrayList<Map<String, Object>>();

			@Override
			protected void onPreExecute() {
				if (proDialog != null && proDialog.isShowing()) {
					proDialog.dismiss();
				}
				proDialog = new ProgressDialog(mContext);
				proDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
				proDialog.setMessage("呼叫...");
				proDialog.setIndeterminate(false);
				proDialog.setCancelable(true);
				proDialog.show();
			}

			@SuppressWarnings("unchecked")
			@Override
			protected String doInBackground(String... params) {
				// DataZhuanhuan shujuaZhuanhuan = new DataZhuanhuan();
				String postResult = HttpHelper.this.postData(url, map);
				if (!"".equals(postResult)) {
					listdata = DataZhuanhuan.getList(postResult);
				}
				publishProgress(listdata);
				return null;
			}

			@Override
			protected void onProgressUpdate(List<Map<String, Object>>... values) {
				if (listdata != null && listdata.size() <= 0) {
					Toast.makeText(mContext, "呼叫失败", Toast.LENGTH_SHORT).show();
					// return;
				} else {
					Toast.makeText(mContext, "呼叫完成", Toast.LENGTH_SHORT).show();
				}
				mHandler.handleResult(listdata);
			}

			@Override
			protected void onPostExecute(String result) {
				try {
					proDialog.dismiss();
				} catch (Exception e) {

				}
			}

		}.execute(url);
	}

	// 网络存储数据。
	public void putDataFromServer(final String url, final Map<String, String> map) {

		new AsyncTask<String, List<Map<String, string>>, String>() {
			// ProgressDialog dialog = null;
			protected void onPreExecute() {
				// if (dialog != null && dialog.isShowing()) {
				// dialog.dismiss();
				// }
				// dialog = new ProgressDialog(mContext);
				// dialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
				// dialog.setMessage("正在努力加载数据...");
				// dialog.setIndeterminate(false);
				// dialog.setCancelable(true);
				// dialog.show();
			}

			@Override
			protected String doInBackground(String... params) {
				// DataZhuanhuan shujuaZhuanhuan = new DataZhuanhuan();

				String postResult = null;
				try {
					postResult = HttpHelper.this.httpPost(url, map);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return null;
			}

			protected void onProgressUpdate(List<Map<String, Object>>... values) {

			}

			protected void onPostExecute(String result) {
				try {
					// dialog.dismiss();
				} catch (Exception e) {

				}
			}

		}.execute(url);
	}

	public void getDataFromServerNoTip(final String url, final Map<String, String> map) {

		new AsyncTask<String, List<Map<String, Object>>, String>() {
			List<Map<String, Object>> listdata = new ArrayList<Map<String, Object>>();

			@Override
			protected void onPreExecute() {
			}

			@SuppressWarnings("unchecked")
			@Override
			protected String doInBackground(String... params) {
				// DataZhuanhuan shujuaZhuanhuan = new DataZhuanhuan();
				String postResult = HttpHelper.this.postData(url, map);
				if (!"".equals(postResult)) {
					listdata = DataZhuanhuan.getList(postResult);
				}
				publishProgress(listdata);
				return null;
			}

			@Override
			protected void onProgressUpdate(List<Map<String, Object>>... values) {
				mHandler.handleResult(listdata);
			}

			@Override
			protected void onPostExecute(String result) {
			}

		}.execute(url);
	}

	public void setDataToServerNoTip(final String url, final Map<String, String> map) {

		new AsyncTask<String, List<Map<String, Object>>, String>() {
			List<Map<String, Object>> listdata = new ArrayList<Map<String, Object>>();

			@Override
			protected void onPreExecute() {
			}

			@SuppressWarnings("unchecked")
			@Override
			protected String doInBackground(String... params) {
				// DataZhuanhuan shujuaZhuanhuan = new DataZhuanhuan();
				String postResult = HttpHelper.this.postData(url, map);
				return null;
			}

			@Override
			protected void onProgressUpdate(List<Map<String, Object>>... values) {
				mHandler.handleResult(listdata);
			}

			@Override
			protected void onPostExecute(String result) {
			}

		}.execute(url);
	}

	public String postData(String url, Map<String, String> map) {
		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().detectDiskReads().detectDiskWrites()
				.detectAll().penaltyLog().build());
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder().detectLeakedSqlLiteObjects()
				.detectLeakedClosableObjects().penaltyLog().penaltyDeath().build());

		String result = "";
		HttpPost post = new HttpPost(url);
		List<NameValuePair> paramList = new ArrayList<NameValuePair>();
		for (String key : map.keySet()) {
			BasicNameValuePair addValue = new BasicNameValuePair(key, map.get(key));
			paramList.add(addValue);
		}
		try {
			HttpResponse httpResponse = null;
			HttpClient httpClient = new DefaultHttpClient();
			post.setEntity(new UrlEncodedFormEntity(paramList, HTTP.UTF_8));
			httpResponse = httpClient.execute(post);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String tempResult = EntityUtils.toString(httpResponse.getEntity());
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

	public String httpPost(String url, Map<String, String> params) throws Exception {
		HttpClient client = new DefaultHttpClient();
		ArrayList<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		for (Map.Entry<String, String> entry : params.entrySet()) {
			NameValuePair nameValuePair = new BasicNameValuePair(entry.getKey(), entry.getValue());
			nameValuePairs.add(nameValuePair);
		}

		UrlEncodedFormEntity encodedFormEntity = new UrlEncodedFormEntity(nameValuePairs, HTTP.UTF_8);
		HttpPost post = new HttpPost(url);
		post.setEntity(encodedFormEntity);
		HttpResponse response = client.execute(post);
		if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			HttpEntity entity = response.getEntity();
			return EntityUtils.toString(entity);
		}
		return null;

	}

}
