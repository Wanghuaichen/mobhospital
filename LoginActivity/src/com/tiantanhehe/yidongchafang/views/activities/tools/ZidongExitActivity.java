package com.tiantanhehe.yidongchafang.views.activities.tools;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.TiantanLog;
import com.tiantanhehe.yidongchafang.services.DataManager;
import com.tiantanhehe.yidongchafang.services.DataTongbuService;
import com.tiantanhehe.yidongchafang.views.activities.LoginActivity;
import com.tiantanhehe.yidongchafang.views.activities.TiantanActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

/**************************************************
 * Created: 2015-03 Info:登录页面
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class ZidongExitActivity extends TiantanActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		current_application.data_manager = new DataManager(this);
		setContentView(R.layout.activity_zidong_exit);
		new AlertDialog.Builder(this)
.setTitle(getString(R.string.tuichutishi))// "退出提示"
				.setMessage(getString(R.string.saohouzaishi))// "您的帐号已经在别处登录，请稍后再试"
		.setIcon(R.drawable.ic_launcher)
		.setCancelable(false)
		.setPositiveButton(getString(R.string.queding), new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int whichButton) {
				tuichuDenglu();
				Intent serviceIntent = new Intent(ZidongExitActivity.this, DataTongbuService.class);
				stopService(serviceIntent);
			}
		}).show();
	}
	
	private void tuichuDenglu() {
		TiantanLog.error(getString(R.string.tuichu));// "退出登录"
		if (current_application.appConf.open_data_tongbu) {
			current_application.appConf.suoping_flag = false;
			current_application.appConf.sync_data_flag = false;
			shoudongChufaTongbu();
		}
		// 停止监听screen状态
		try {
			// mScreenObserver.stopScreenStateUpdate();
			current_application.qingkongApplication();
			for (int i = 0; i < activityNumber.activityList().size(); i++) {
				if (null != activityNumber.activityList().get(i)) {
					activityNumber.activityList().get(i).finish();
				}
			}
		} catch (Exception e) {

		}

		Intent intent = new Intent(ZidongExitActivity.this, LoginActivity.class);
		finish();
		startActivity(intent);
	}
	
	public void shoudongChufaTongbu() {
		current_application.appConf.sync_data_shoudong_chufa = true;

	}
	
	@Override
	public void onDestroy() {
		super.onDestroy();
	}
}
