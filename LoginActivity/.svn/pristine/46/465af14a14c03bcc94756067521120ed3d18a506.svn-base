package com.tiantanhehe.yidongchafang.views.activities.tools;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.views.activities.LoginActivity;
import com.tiantanhehe.yidongchafang.views.activities.MainActivity;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuActivity;

import android.app.ActionBar;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class ResetPasswordActivity extends YiDongYiHuActivity {

	private ActionBar actionBar;
	private TextView tv_tishi;
	private EditText et_old;
	private EditText et_new1;
	private EditText et_new2;
	private List<Map<String, Object>> listdata = null;
	private Map<String, Object> resultMap = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_resetpassword);
		actionBar = getActionBar();
		actionBar.setCustomView(R.layout.resetpassword_header);
		actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
		actionBar.setDisplayShowCustomEnabled(false);
		
		super.tiaoZhuangActivity = MainActivity.class;
		super.activityNumber.addActivity(this);

		et_old = (EditText) findViewById(R.id.et_old);
		et_new1 = (EditText) findViewById(R.id.et_new1);
		et_new2 = (EditText) findViewById(R.id.et_new2);
		tv_tishi = (TextView) findViewById(R.id.tishi);
	}

	public void doReset(View v) {

		tv_tishi.setText("");

		// 旧密码不为空
		if (et_old.getText().toString().equals("")) {
			tv_tishi.setText("旧密码不能为空");
			return;
		}

		// 新密码相同 且不为空
		int result = CheckNewPassword();
		if (result == 0) {
			tv_tishi.setText("新密码不能为空");
			return;
		}
		if (result == 1) {
			tv_tishi.setText("两次新密码必须相同");
			return;
		}
		if (result == 2) {
			tv_tishi.setText("密码只能是英文或数字");
			return;
		}
		// 重置密码
		reset();
	}

	/**
	 * 检查两次新密码是否相同
	 * 
	 * @Title: CheckNewPassword
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2015-12-24 下午5:34:38
	 * @return
	 */
	private int CheckNewPassword() {

		if (et_new1.getText().toString().equals("")
				| et_new2.getText().toString().equals("")) {
			return 0;
		}

		if (!et_new1.getText().toString().equals(et_new2.getText().toString())) {
			return 1;
		}

		Pattern pattern = Pattern.compile("^[A-Za-z0-9]+$");
		Matcher matcher = pattern.matcher(et_new1.getText().toString());
		if (!matcher.matches()) {
			return 2;
		}
		return 3;
	}

	/**
	 * 重置密码
	 * 
	 * @Title: reset
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2015-12-24 下午6:51:36
	 */
	private void reset() {
		if (listdata == null) {
			listdata = new ArrayList<Map<String, Object>>();
		}
		if (resultMap == null) {
			resultMap = new HashMap<String, Object>();
		}

		Map<String, String> map = new HashMap<String, String>();
		String url = GlobalInfoApplication.getInstance().appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/doResetPassword";
		map.put("user_number", current_application.appConf.current_user_number);
		map.put("oldmima", et_old.getText().toString());
		map.put("newmima", et_new1.getText().toString());
		postResetData(url, map);
	}

	/**
	 * 上传数据
	 * 
	 * @Title: postResetData
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2015-12-24 下午6:54:41
	 * @param url
	 * @param map
	 */
	private void postResetData(final String url, final Map<String, String> map) {
		new AsyncTask<String, List<Map<String, Object>>, String>() {
			ProgressDialog proDialog = null;

			@Override
			protected void onPreExecute() {
				proDialog = new ProgressDialog(ResetPasswordActivity.this);
				proDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
				proDialog.setMessage("密码重置中...");
				proDialog.setIndeterminate(false);
				proDialog.setCancelable(true);
				proDialog.show();

			}

			@SuppressWarnings("unchecked")
			@Override
			protected String doInBackground(String... params) {
				// DataZhuanhuan shujuaZhuanhuan = new DataZhuanhuan();
				String result = "false";
				HttpHelper httpHelper = new HttpHelper(ResetPasswordActivity.this);
				String postResult = httpHelper.postData(url, map);
				if (!"".equals(postResult)) {
					try {
						JSONObject jsonObject = new JSONObject(postResult);
						resultMap.put("response_state",
								jsonObject.get("response_state").toString());
						resultMap.put("response_info",
								jsonObject.get("response_info").toString());
						if (jsonObject.get("response_info").toString().contains("成功")) {
							result = "true";
						}
						listdata.add(resultMap);

					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				publishProgress(listdata);
				proDialog.dismiss();
				return result;
			}

			@Override
			protected void onProgressUpdate(List<Map<String, Object>>... values) {

				for (int i = 0; i < values[0].size(); i++) {
					Map<String, Object> map = new HashMap<String, Object>();
					map = values[0].get(i);
					if (map.get("response_state").toString().equals("true")) {
						tuichuDenglu();
					} else {
						tv_tishi.setText(""
								+ map.get("response_info").toString());
					}
				}
			}

			@Override
			protected void onPostExecute(String result) {
				try {
					proDialog.dismiss();
					if ("true".equals(result)) {
						Toast.makeText(context, "密码修改成功，请重新登录!", Toast.LENGTH_SHORT).show();
					}
				} catch (Exception e) {

				}
			}

		}.execute(url);
	}

	private void tuichuDenglu() {
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

		Intent intent = new Intent(this, LoginActivity.class);
		finish();
		startActivity(intent);
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			View v = null;
			super.goMain(v);
			return true;
		}
		return false;
	}
	
	public void shoudongChufaTongbu() {
		current_application.appConf.sync_data_shoudong_chufa = true;

	}
}
