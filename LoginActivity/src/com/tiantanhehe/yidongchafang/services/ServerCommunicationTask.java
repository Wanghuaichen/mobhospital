package com.tiantanhehe.yidongchafang.services;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.cordova.LOG;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.TiantanLog;
import com.tiantanhehe.yidongchafang.common.compression.GlibCompression;
import com.tiantanhehe.yidongchafang.common.compression.ICompression;
import com.tiantanhehe.yidongchafang.views.activities.TiantanActivity;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

/**************************************************
 * Created: 2015-03 Info:服务器数据交互类
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class ServerCommunicationTask extends
		AsyncTask<ArrayList<NameValuePair>, Integer, JSONObject> {
	AlertDialog dialog;
	DataFinishListener dataFinishListener;
	Context context;
	View loading_dialoag;
	ICompression mCompress = new GlibCompression();
	private final int chaoshiTime = 60000;
	boolean chaoshiState = false;
	GlobalInfoApplication mCurrent_application;

	public void setFinishListener(DataFinishListener dataFinishListener) {
		this.dataFinishListener = dataFinishListener;
	}

	public ServerCommunicationTask(Context context,
			GlobalInfoApplication current_application) {
		this.mCurrent_application = current_application;
		this.context = context;
		LayoutInflater inflater = ((TiantanActivity) context)
				.getLayoutInflater();
		loading_dialoag = inflater.inflate(R.layout.jiazai_dialog,
				(ViewGroup) ((TiantanActivity) context)
						.findViewById(R.id.dialog));
	}

	@SuppressLint("HandlerLeak")
	final Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case 1:
				ImageView cuowu = (ImageView) loading_dialoag
						.findViewById(R.id.cuowu);
				cuowu.setVisibility(View.VISIBLE);
				ProgressBar progressBar = (ProgressBar) loading_dialoag
						.findViewById(R.id.progressBar);
				progressBar.setVisibility(View.GONE);
				TextView jiazai_text = (TextView) loading_dialoag
						.findViewById(R.id.jiazai_text);
				jiazai_text.setText(context.getResources().getString(R.string.chaoshi_chongxincangshi));// "服务器请求超时，请稍后重新尝试。"
				chaoshiState = true;
				break;
			}
			super.handleMessage(msg);
		}
	};

	public class MyThread implements Runnable {
		@Override
		public void run() {
			while (true) {
				try {
					Thread.sleep(chaoshiTime);
					Message message = new Message();
					message.what = 1;
					handler.sendMessage(message);
				} catch (Exception e) {
				}
			}
		}
	}

	@Override
	protected void onPreExecute() {
		try {
			AlertDialog.Builder builder = new AlertDialog.Builder(context);
			builder.setTitle(context.getResources().getString(
R.string.jianyan_tishi));// "提示"
			builder.setIcon(R.drawable.ic_launcher);
			builder.setView(loading_dialoag);
			dialog = builder.show();
		} catch (Exception e) {
			// TODO: handle exception
		}
	
		new Thread(new MyThread()).start();
	}

	@Override
	protected JSONObject doInBackground(
			ArrayList<NameValuePair>... request_info) {
		// InputStream is = null;
		JSONObject response_result = null;
		HttpPost request = new HttpPost(request_info[0].get(0).getValue()
				.toString());
		try {
			ArrayList<NameValuePair> post_info = new ArrayList<NameValuePair>();
			int param_count = 1;
			do {
				post_info.add(request_info[0].get(param_count));
				param_count = param_count + 1;
			} while (request_info[0].size() > param_count);
			request.setEntity(new UrlEncodedFormEntity(post_info, HTTP.UTF_8));
			HttpResponse httpResponse = new DefaultHttpClient()
					.execute(request);
			String retSrc = "";
			byte[] result = null;
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				if (mCurrent_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					TiantanLog.error("wwl",
							context.getResources().getString(R.string.kaishijieya_yaqianshujudaxiao) + result.length);// "开始解压数据,解压前数据大小:
																														// "
					retSrc = mCompress.decompress(result);
					TiantanLog.error("wwl",
							context.getResources().getString(
									R.string.kaishijieya_yaqianshujudaxiao)
							+ retSrc.getBytes().length);// "开始解压数据,解压后数据大小: "
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}
				response_result = new JSONObject(retSrc);
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return response_result;
	}

	@Override
	protected void onPostExecute(JSONObject result) {
		try {
			if (result == null) {
				result = new JSONObject();
				ImageView cuowu = (ImageView) loading_dialoag
						.findViewById(R.id.cuowu);
				cuowu.setVisibility(View.VISIBLE);
				ProgressBar progressBar = (ProgressBar) loading_dialoag
						.findViewById(R.id.progressBar);
				progressBar.setVisibility(View.GONE);
				TextView jiazai_text = (TextView) loading_dialoag
						.findViewById(R.id.jiazai_text);
				jiazai_text.setText(context.getResources().getString(
R.string.chaoshi_chongxincangshi));// "服务器请求超时，请稍后重新尝试。"
			} else if (result.get("response_state").toString() == "false") {
				ImageView cuowu = (ImageView) loading_dialoag
						.findViewById(R.id.cuowu);
				cuowu.setVisibility(View.VISIBLE);
				ProgressBar progressBar = (ProgressBar) loading_dialoag
						.findViewById(R.id.progressBar);
				progressBar.setVisibility(View.GONE);
				TextView jiazai_text = (TextView) loading_dialoag
						.findViewById(R.id.jiazai_text);
				jiazai_text.setText(result.get("response_info").toString());
			} else {
				TextView jiazai_text = (TextView) loading_dialoag
						.findViewById(R.id.jiazai_text);
				jiazai_text.setText(result.get("response_info").toString());
				try {
					dialog.dismiss();
				} catch (Exception e) {
					// TODO: handle exception
				}
				
			}
			if (chaoshiState) {
				return;
			}
			dataFinishListener.dataFinishSuccessfully(result);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void onProgressUpdate(Integer... values) {

	}
}
