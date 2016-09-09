package com.tiantanhehe.yidongchafang.views.fragments;

import java.util.ArrayList;
import java.util.List;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.utils.HttpClientUtils;
import com.tiantanhehe.yidongchafang.utils.TiwenJiluBean;
import com.tiantanhehe.yidongchafang.utils.TiwenJiluBean.TiwenzhouBean;
import com.tiantanhehe.yidongchafang.views.adapters.TiwenjiluAdapter;
import com.tiantanhehe.yidongchafang.views.views.CustomListview;

public class TiwenJiluFragment extends Fragment {
	private CustomListview listview;
	private TiwenJiluBean bean;
	private List<TiwenzhouBean> final_search_result = new ArrayList<TiwenzhouBean>();
	private View view;
	private String server_url, current_patient_zhuyuan_id;
	private Handler mhandler = new Handler() {
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case 0:
				bean = (TiwenJiluBean) msg.obj;
				final_search_result = bean.getFinal_search_result();
				/*TiwenjiluAdapter adapter = new TiwenjiluAdapter(
						final_search_result, getActivity());
				adapter.notifyDataSetChanged();
				listview.setAdapter(adapter);*/
				break;

			default:
				break;
			}
		};
	};

	public static TiwenJiluFragment newInstance() {
		TiwenJiluFragment fragment1 = new TiwenJiluFragment();
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
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		view = inflater.inflate(R.layout.activity_tiwenjilu_layout, container,
				false);
		listview = (CustomListview) view.findViewById(R.id.tiwenlist);
		Bundle bundle = getArguments();
		server_url = bundle.getString("server_url");
		current_patient_zhuyuan_id = bundle
				.getString("current_patient_zhuyuan_id");
		getData();
		return view;
	}

	public void getData() {
		final String url = server_url
				+ "Mobile/YidongChafangClientCommunication/ShowTiwenJiludanListJson/zhuyuan_id/"
				+ current_patient_zhuyuan_id;
		new Thread(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					String httpGet = HttpClientUtils.httpGet(url);
					Message message = new Message();
					message.obj = TiwenJiluBean.objectFromData(httpGet);
					message.what = 0;
					mhandler.sendMessage(message);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}).start();
	}
}
