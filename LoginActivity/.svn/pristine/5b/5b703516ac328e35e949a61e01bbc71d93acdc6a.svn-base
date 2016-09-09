package com.tiantanhehe.yidongchafang.common.jsevaluator;

import java.io.UnsupportedEncodingException;

import com.tiantanhehe.yidongchafang.common.jsevaluator.interfaces.CallJavaResultInterface;
import com.tiantanhehe.yidongchafang.common.jsevaluator.interfaces.WebViewWrapperInterface;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Base64;
import android.webkit.WebSettings;
import android.webkit.WebView;

@SuppressLint("SetJavaScriptEnabled")
public class WebViewWrapper implements WebViewWrapperInterface {
	protected WebView mWebView;

	public WebViewWrapper(Context context, CallJavaResultInterface callJavaResult) {
		mWebView = new WebView(context);

		// web view will not draw anything - turn on optimizations
		mWebView.setWillNotDraw(true);

		final WebSettings webSettings = mWebView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webSettings.setDefaultTextEncodingName("utf-8");
		final JavaScriptInterface jsInterface = new JavaScriptInterface(callJavaResult);
		mWebView.addJavascriptInterface(jsInterface, JsEvaluator.JS_NAMESPACE);
	}

	@Override
	public void loadJavaScript(String javascript) {
		byte[] data;
		try {
			javascript = "<script>" + javascript + "</script>";
			data = javascript.getBytes("UTF-8");
			final String base64 = Base64.encodeToString(data, Base64.DEFAULT);
			mWebView.loadUrl("data:text/html;charset=utf-8;base64," + base64);
		} catch (final UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
}
