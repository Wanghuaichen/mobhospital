package com.tiantanhehe.yidongchafang.views.activities;

import java.util.HashMap;
import java.util.Map;
import android.content.Intent;
import android.os.Bundle;
import android.view.Display;
import android.view.Gravity;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import com.tiantanhehe.yidongchafang.R;

public class YiDongYiHuTankuangActivity extends YiDongYiHuActivity {
	private String type_name = "";
	private String keshi_name,table_name,jiancha_id;
	private Map<String, String> map;

	@SuppressWarnings("deprecation")
	@Override
	public void onCreate(Bundle savedInstanceState) {
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_tankuang_content);
		super.orientationInit();
		contentViewDialog = (LinearLayout) findViewById(R.id.contentViewDialog);
		
		WindowManager m = getWindowManager();
		Display d = m.getDefaultDisplay(); // 为获取屏幕宽、高
		android.view.WindowManager.LayoutParams p = getWindow().getAttributes(); // 获取对话框当前的参值
		p.height = (int) (d.getHeight() * 0.85); // 高度设置为屏幕的1.0
		p.width = (int) (d.getWidth() * 0.85); // 宽度设置为屏幕的0.8
		p.alpha = 1.0f; // 设置本身透明度
		p.dimAmount = 0.0f; // 设置黑暗度
		getWindow().setAttributes(p); // 设置生效
		getWindow().setGravity(Gravity.CENTER); // 设置靠右对齐


		
		Intent intent = getIntent();
		keshi_name = intent.getStringExtra("keshi_name");
		table_name = intent.getStringExtra("table_name");
		jiancha_id = intent.getStringExtra("jiancha_id");

		map = new HashMap<String, String>();

		if (table_name.equals("lis_jiancha_info")) {
			type_name = getString(R.string.type_jianyanjilu);
			map.put("baogao_id", jiancha_id);
		} else if (table_name.equals("pacs_jiancha_info")) {
			type_name = getString(R.string.type_jianchajilu);
			map.put("jiancha_keshi_name", keshi_name);
			map.put("baogao_id", jiancha_id);
		} else if (table_name.equals("BingchengJilu")) {
			type_name = getString(R.string.type_bingchengjilu);
			//map.put("bingcheng_id", bingcheng_id);
		} else if (table_name.equals("RuyuanJilu")) {
			type_name = getString(R.string.type_ruyuanjilu);
		}
		super.setOneFragment(type_name, map);
	}
}
