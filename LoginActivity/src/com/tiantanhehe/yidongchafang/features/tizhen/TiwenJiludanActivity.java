/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ChafangOverviewActivity.java
 * @Package com.tiantanhehe.yidongchafang.features.overview
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.features.tizhen;

import java.util.ArrayList;
import java.util.List;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.utils.HttpClientUtils;
import com.tiantanhehe.yidongchafang.utils.TiwenJiluBean;
import com.tiantanhehe.yidongchafang.utils.TiwenJiluBean.TiwenzhouBean;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuBrowserActivity;
import com.tiantanhehe.yidongchafang.views.adapters.TiwenjiluAdapter;
import com.tiantanhehe.yidongchafang.views.views.CustomListview;

/**
 * @ClassName: ChafangOverviewActivity
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50
 * 
 */
public class TiwenJiludanActivity extends YiDongYiHuBrowserActivity {
	private CustomListview listview;
	private TiwenJiluBean bean;
	private List<TiwenzhouBean> final_search_result=new ArrayList<TiwenzhouBean>();
	private Handler mhandler=new Handler(){
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case 0:
				bean=(TiwenJiluBean) msg.obj;
				final_search_result = bean.getFinal_search_result();
				/*TiwenjiluAdapter adapter = new TiwenjiluAdapter(
						final_search_result, context);
				adapter.notifyDataSetChanged();
				listview.setAdapter(adapter);*/
				break;

			default:
				break;
			}
		};
	};
	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_tiwenjilu_list);
		orientationInit();
		initView();
		getData();
	}

	private void initView() {
		// TODO Auto-generated method stub
		listview = (CustomListview) findViewById(R.id.tiwenlist);
	}

	public void getData() {
		final String url = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/ShowTiwenJiludanListJson/zhuyuan_id/"
				+ current_application.appConf.current_patient_zhuyuan_id;
		new Thread(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					String httpGet = HttpClientUtils.httpGet(url);
					Message message=new Message();
					message.obj= TiwenJiluBean.objectFromData(httpGet);
					message.what=0;
					mhandler.sendMessage(message);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}).start();
	}
}
