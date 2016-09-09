/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: WebviewActivity.java
 * @Package com.tiantanhehe.yidongchafang.views.activities.tools
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月13日 下午7:51:05 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.activities.tools;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.CookieHelper;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuMultiMediaActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup.LayoutParams;
import android.webkit.WebSettings;
import android.webkit.WebSettings.LayoutAlgorithm;
import android.webkit.WebSettings.RenderPriority;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

/**
 * @ClassName: WebviewActivity
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月13日 下午7:51:05
 * 
 */
public class WebviewActivity extends YiDongYiHuMultiMediaActivity {

	private LinearLayout ll_activity_webview;
	private WebView dlgWebview;
	private WebSettings dlgWebSetting;

	public float dlgScale = 0.8f;
	public int pageSacle = 120;
	public static int PAGE_WIDTH = 980;
	public static int SCROLL_Y = 60;
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.activity_webview);

		ll_activity_webview = (LinearLayout) findViewById(R.id.ll_activity_webview);

		int disPlayWidth = getWindowManager().getDefaultDisplay().getWidth();
		int disPlayHeight = getWindowManager().getDefaultDisplay().getHeight();

		disPlayWidth = (int) (disPlayWidth * dlgScale);
		disPlayHeight = (int) (disPlayHeight * dlgScale);

		LayoutParams params = ll_activity_webview.getLayoutParams();
		params.width = disPlayWidth;
		params.height = disPlayHeight;
		ll_activity_webview.setLayoutParams(params);

		dlgWebview = (WebView) findViewById(R.id.dlgwebview);
		
		dlgWebSetting = dlgWebview.getSettings();
		dlgWebSetting.setSupportZoom(true);
		dlgWebSetting.setBuiltInZoomControls(true);
		// dlgWebSetting.setTextSize(WebSettings.TextSize.NORMAL);
		dlgWebSetting.setTextZoom(120);
		dlgWebSetting.setUseWideViewPort(true);
		dlgWebSetting.setLayoutAlgorithm(LayoutAlgorithm.SINGLE_COLUMN);
		dlgWebSetting.setLoadWithOverviewMode(true);
		dlgWebSetting.setRenderPriority(RenderPriority.HIGH);
		dlgWebSetting.setJavaScriptEnabled(false);

		dlgWebview.setWebViewClient(new WebViewClient() {

			@Override
			public void onPageFinished(WebView view, String url) {
				super.onPageFinished(view, url);
				int scrollX = (int) (dlgWebview.getScale() * PAGE_WIDTH
						- getWindowManager().getDefaultDisplay().getWidth() * dlgScale) / 2;
				dlgWebview.scrollTo(scrollX, SCROLL_Y);

			}

		});

		int initSacle = (disPlayWidth * pageSacle / PAGE_WIDTH);

		dlgWebview.setInitialScale(initSacle);

		dataInit();

	}
	
	private void dataInit() {
		Intent intent = getIntent();
		String url = intent.getStringExtra("xiaobianqueUrl");
		if (url != null) {
			Log.d("tiantan", "dlgwebviewload:" + url);
			CookieHelper.getInstance(context).setUrlCookies(url);
			dlgWebview.loadUrl(url);

		}

	}

}
