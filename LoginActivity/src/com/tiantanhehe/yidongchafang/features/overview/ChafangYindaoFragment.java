package com.tiantanhehe.yidongchafang.features.overview;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.R.string;
import com.tiantanhehe.yidongchafang.utils.GuideGson;
import com.tiantanhehe.yidongchafang.utils.HttpClientUtils;
import com.tiantanhehe.yidongchafang.views.adapters.ChaFangGuideAdapter;


public class ChafangYindaoFragment  extends Fragment{
	private ListView listView;
	private ArrayList<GuideGson> list = new ArrayList<GuideGson>();
	private ChaFangGuideAdapter adapter;
	boolean issuccess = false;
	private String server_url,current_patient_zhuyuan_id;
	ChafangYindaoActivity chafangActicity = new ChafangYindaoActivity();
	private Handler handler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case 1:
				/*adapter = new ChaFangGuideAdapter(getActivity(), list,
						ChafangYindaoFragment.this);
				adapter.notifyDataSetChanged();
				listView.setAdapter(adapter);*/
				break;
			case 0:
				issuccess = true;
				break;
			}
		};
	};
	
	public static ChafangYindaoFragment newInstance(){
		ChafangYindaoFragment fragment1 = new ChafangYindaoFragment();
		return fragment1;
	}
	
	@Override
	public void setMenuVisibility(boolean menuVisible) {
		super.setMenuVisibility(menuVisible);
		if (this.getView() != null)
			this.getView()
					.setVisibility(menuVisible ? View.VISIBLE : View.GONE);
	}
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
	
		View view = inflater.inflate(R.layout.operation_guide_layout,null);
		Bundle neirong = getArguments();
		server_url = neirong.getString("server_url");
		current_patient_zhuyuan_id = neirong.getString("current_patient_zhuyuan_id");
		
		listView = (ListView) view.findViewById(R.id.guide);
		getData();
		return view;
	}
	
	public void getData() {

		final String url = server_url
				+ "Mobile/YidongChafangClientCommunication/chafangYindao/zhuyuan_id/"
				+ current_patient_zhuyuan_id;
		list.clear();
		new Thread(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				HttpGet httpRequest = new HttpGet(url);
				try {
					HttpResponse httpResponse = new DefaultHttpClient()
							.execute(httpRequest);
					if (httpResponse.getStatusLine().getStatusCode() == 200) {
						String tempResult = EntityUtils.toString(httpResponse
								.getEntity());

						list = (GuideGson.getObject(tempResult));

						Message message = new Message();
						message.what = 1;
						handler.sendMessage(message);
					}
				} catch (ClientProtocolException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}).start();

	}
	
	public boolean upDataChafang(String result, String jibing_mingcheng,
			String xaingmu) {

		final Map<String, String> map = new HashMap<String, String>();
		final String urlString = server_url
				+ "Mobile/YidongChafangClientCommunication/updateChafangYindao/";
		map.put("result", result);
		map.put("zhuyuan_id",
				current_patient_zhuyuan_id);
		map.put("jibing_mingcheng", jibing_mingcheng);
		map.put("xiangmu", xaingmu);
		new AsyncTask<String, List<Map<String, string>>, String>() {
			protected void onPreExecute() {

			}

			@Override
			protected String doInBackground(String... params) {

				String postResult = null;
				try {
					postResult = HttpClientUtils.postData(urlString, map);
					if (!"".equals(postResult)) {
						issuccess = true;
						Message message = new Message();
						message.what = 0;

						handler.sendMessage(message);
					}
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

		}.execute(urlString);
		return issuccess;

	}
}
