package com.tiantanhehe.yidongchafang.views.activities;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.json.JSONObject;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.common.CookieHelper;
import com.tiantanhehe.yidongchafang.dao.db.wrapper.HuanzheWrapper;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.tools.WebviewActivity;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnLongClickListener;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebSettings.LayoutAlgorithm;
import android.webkit.WebSettings.RenderPriority;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.Toast;

/**************************************************
 * Created: 2015-03 Info:Activity基类
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class YiDongYiHuBrowserActivity extends YiDongYiHuMultiMediaActivity implements CordovaInterface {
	// ActionBar actionBar;
	ProgressDialog progDlg;
	ProgressDialog tabQiehuanDlg;

	public WebSettings wbSettings;
	public WebSettings xbqSettings;
	public String request_arg;
	public String request_url;

	private boolean page_start_loading = true;// 页面是否是第一次执行加载
	private CookieManager cookieManager;
	Thread activityThread = null; // 用于控制主线程与各种回调线程的同步
	Thread currThread = null;

	public Handler browserHandler;
	public Runnable runnable;
	public final static int MSG_REFLESH_CONTENT = 1;
	public final static int MSG_OPEN_XIAOBIANQUE = 2;
	public final static int MSG_REFLESH_XIAOBIANQUE = 3;
	public final static int MSG_LOAD_XIAOBIANQUE_CONTENT = 4;
	public final static int MSG_YANSHI_RUNNING = 5;
	public final static int MSG_YANSHI_IDLE = 6;
	public final static int MSG_SWITCH_PATIENT = 7;
	private int mRunning = 0;
	private long lastRefleshTime = 0;

	public final static int TYPE_NORMAL = 1;
	public final static int TYPE_CONTROL = 2;

	protected int activityResultRequestCode;
	protected CordovaPlugin activityResultCallback;
	protected int webviewViewWidth;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.tiaoZhuangActivity = YiDongYiHuBrowserActivity.class;

		dataInit();
		viewInit(); // 界面相关初始化

		if (this.getClass().isAssignableFrom(YiDongYiHuBrowserActivity.class)) {
		settingsInit();
		loadConent();
		}

	}

	public void loadConent() {
		if (contentWebView != null) {
			contentWebView.setVisibility(View.GONE);
			contentView.setVisibility(View.VISIBLE);
			setNewFragment(getString(R.string.chakanhuanzhe));
		}
	}

	public void loadConent(String loadurl) {
		if (loadurl == null) {
			return;
		}
		// CookieHelper.getInstance(context).syncUrlCookies(loadurl);

		CookieHelper.getInstance(context).setUrlCookies(loadurl);
		Log.e("tiantan", loadurl);
		contentWebView.loadUrl(loadurl);
		current_application.featureConf.now_url = loadurl;
		// tabQiehuanDlg = new ProgressDialog(YiDongYiHuBrowserActivity.this);
		// tabQiehuanDlg.setMessage(getString(R.string.jiazai_qingsaohou));
	}

	public void reloadConent() {

		Log.e("tiantan", "reload:" + request_url);
		// CookieHelper.getInstance(context).syncUrlCookies(request_url);

		CookieHelper.getInstance(context).setUrlCookies(request_url);
		contentWebView.reload();
		tabQiehuanDlg = new ProgressDialog(YiDongYiHuBrowserActivity.this);
		tabQiehuanDlg.setMessage(getString(R.string.jiazai_qingsaohou));
	}

	/**
	 * @Title: dataInit
	 * @Description: 相关数据处理初始话，包括应用数据、缓存数据等
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月28日 下午8:22:10
	 */
	private void dataInit() {

		// Intent intent = getIntent();
		request_url = mIntent.getStringExtra("loadUrl");
		if (request_url == null) {
			SharedPreferences preferences = getSharedPreferences("yidongyihubrowser", Activity.MODE_PRIVATE);
			request_url = preferences.getString("request_url",
					current_application.appConf.server_url + "ZhuyuanYishi/Patient/showPatientListPad/");
		}
		if (this.current_application.appConf.current_patient_id == "") {
			HuanzheWrapper huanzhe = mZhuyuanHuanzheDao.getFirstHuanzhe();
			if (huanzhe != null) {
				huanzhe.setGlobalData(current_application);
			}
		}


		// Cookie
		// cookieManager = CookieManager.getInstance();
		// CookieSyncManager.createInstance(context);
		// cookieManager.setCookie(request_url +
		// current_application.appConf.current_patient_zhuyuan_id,
		// CookieHelper.getInstance(context).getCookiesString(context));
		// CookieSyncManager.getInstance().sync();

		// CookieHelper.getInstance(context)
		// .syncUrlCookies(request_url +
		// current_application.appConf.current_patient_zhuyuan_id);

		// setUrlCookie(request_url);
		CookieHelper.getInstance(context).setUrlCookies(request_url);

		// 小扁鹊于主界面webview交互相关
		activityThread = Thread.currentThread();
		Log.d("tiantan", "activityThread is : " + activityThread.getId());

		mRunning = 1;

		//
		browserHandler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				Switch chafangtongbu = ((Switch) findViewById(R.id.chafangtongbuSwitch));
				switch (msg.what) {
				case MSG_REFLESH_CONTENT:
					if (reflesh) {
						long currentTime = System.currentTimeMillis();
						String gensuiUrl = msg.getData().getString("gensuiUrl");
						if ((gensuiUrl != null) && (!"".equals(gensuiUrl))
								&& (!current_application.featureConf.now_url.equals(gensuiUrl))) {

							loadConent(msg.getData().getString("gensuiUrl"));
							lastRefleshTime = currentTime;
						}
						
						if (currentTime
								- lastRefleshTime > (current_application.featureConf.chafanggensui_reflesh_period
										* 1000)) {
							loadConent(msg.getData().getString("gensuiUrl"));
							lastRefleshTime = currentTime;
						}
					}
					break;

				case MSG_OPEN_XIAOBIANQUE:
					doSearch(contentWebView);
					String keyword = msg.getData().getString("keyword");

					if ((keyword != null) && (!"".equals(keyword))) {
						// xiaobianqueWebView.loadUrl("javascript:sendKeyword('"
						// + keyword + "')");
						
						String cmd = "javascript:wenYiWen('" + keyword + "','"
								+ current_application.appConf.current_patient_zhuyuan_id + "','"
								+ current_application.appConf.server_ip
								+ "')";
						Log.e("aa", cmd);
						xiaobianqueWebView.loadUrl(cmd);
						
					}

					break;
				case MSG_REFLESH_XIAOBIANQUE:
					if (xiaobianqueWebView != null) {
						xiaobianqueWebView.reload();
					}
					break;
				case MSG_LOAD_XIAOBIANQUE_CONTENT:
					if ("dlgWebView".equals(msg.getData().getString("whichWebView"))) {
						Intent intent = new Intent(YiDongYiHuBrowserActivity.this, WebviewActivity.class);
						intent.putExtra("xiaobianqueUrl", msg.getData().getString("xiaobianqueUrl"));
						startActivity(intent);

					}
					
					
					if (contentWebView != null && "contentWebView".equals(msg.getData().getString("whichWebView"))) {
						String xiaobianqueUrl = msg.getData().getString("xiaobianqueUrl");
						if (xiaobianqueUrl != null) {

							loadConent(xiaobianqueUrl);
							menu.showContent();
						}
					}
					break;
				case MSG_YANSHI_RUNNING:

					if (chafangtongbu != null) {
						chafangtongbu.setChecked(false);
						current_application.featureConf.chafangtongbu_switch = false;
						Toast.makeText(YiDongYiHuBrowserActivity.this, "目前已有医生进行查房演示，请稍后再试", Toast.LENGTH_LONG).show();
					}
					break;
				case MSG_YANSHI_IDLE:
					if (chafangtongbu != null) {
						chafangtongbu.setChecked(true);
						current_application.featureConf.chafangtongbu_switch = true;
						Toast.makeText(YiDongYiHuBrowserActivity.this, "查房同步已打开", Toast.LENGTH_LONG).show();
					}
					break;
				case MSG_SWITCH_PATIENT:
					setDingbuHuanZheXinXi();
					break;
				default:
				}
				super.handleMessage(msg);
			}
		};
		runnable = new Runnable() {
			@Override
			public void run() {
				while (mRunning == 1) {
					getRefleshUrl(TYPE_NORMAL);
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		};
		Thread refleshThread = new Thread(runnable);
		refleshThread.start();

	}

	/**
	 * @Title: viewInit
	 * @Description: 界面相关初始化，包括侧滑菜单，弹出菜单，标题栏，主框架等
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月28日 下午8:22:06
	 */
	private void viewInit() {
		setContentView(R.layout.activity_web_content);
		actionBar = getActionBar();
		actionBar.setCustomView(R.layout.common_header);
		actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
		actionBar.setDisplayShowCustomEnabled(true);
		ll_main_window = (LinearLayout) findViewById(R.id.main_window);
		contentWebView = (WebView) findViewById(R.id.webview);
		contentView = (LinearLayout) findViewById(R.id.contentView);

		super.initSlidingMenu();
		super.initArcMenu();
		super.initRayMenu();
		super.setDingbuHuanZheXinXi();
		super.initRenShuView();
		super.loadXiaobianque();
	}

	@SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
	protected void settingsInit() {
		Config.init(this);// Cordova init

		getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
				| WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);


		// setContentInitialScale(request_url);

		wbSettings = contentWebView.getSettings();
		wbSettings.setSupportZoom(true);
		wbSettings.setBuiltInZoomControls(true);
		// wbSettings.setTextSize(WebSettings.TextSize.NORMAL);
		wbSettings.setTextZoom(120);
		wbSettings.setUseWideViewPort(true);
		wbSettings.setLayoutAlgorithm(LayoutAlgorithm.SINGLE_COLUMN);
		wbSettings.setLoadWithOverviewMode(true);
		wbSettings.setRenderPriority(RenderPriority.HIGH);
		contentWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
		contentWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

		// 缓存
		wbSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
		wbSettings.setDomStorageEnabled(true);

		// 根据分辨率设置字体
		// DisplayMetrics metrics = new DisplayMetrics();
		// getWindowManager().getDefaultDisplay().getMetrics(metrics);
		// int mDensity = metrics.densityDpi;
		// Log.d("tiantan", "densityDpi = " + mDensity);
		// if (mDensity == 240) {
		// wbSettings.setDefaultZoom(ZoomDensity.FAR);
		// } else if (mDensity == 160) {
		// wbSettings.setDefaultZoom(ZoomDensity.MEDIUM);
		// } else if (mDensity == 120) {
		// wbSettings.setDefaultZoom(ZoomDensity.CLOSE);
		// } else if (mDensity == DisplayMetrics.DENSITY_XHIGH) {
		// wbSettings.setDefaultZoom(ZoomDensity.FAR);
		// } else if (mDensity == DisplayMetrics.DENSITY_TV) {
		// wbSettings.setDefaultZoom(ZoomDensity.FAR);
		// } else {
		// wbSettings.setDefaultZoom(ZoomDensity.MEDIUM);
		// }
		// wbSettings.setMinimumFontSize(20);



		contentWebView.setOnLongClickListener(new OnLongClickListener() {
			@Override
			public boolean onLongClick(View arg0) {
				// TODO Auto-generated method stub
				return true;
			}
		});
		contentWebView.setWebChromeClient(new WebChromeClient() {
			@Override
			public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
				final AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());

				builder.setTitle(getString(R.string.jianyan_tishi)).setIcon(R.drawable.ic_launcher).setMessage(message)
						.setPositiveButton(getString(R.string.queding), null);// "确定"
				builder.setCancelable(false);
				AlertDialog dialog = builder.create();
				dialog.show();
				result.confirm();
				return true;
			}

			@Override
			public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
				Builder builder = new Builder(view.getContext());
				builder.setTitle(getString(R.string.jianyan_tishi));
				builder.setIcon(R.drawable.ic_launcher);
				builder.setMessage(message);
				builder.setPositiveButton(android.R.string.ok, new AlertDialog.OnClickListener() {

					@Override
					public void onClick(DialogInterface dialog, int which) {
						result.confirm();
					}

				});
				builder.setNeutralButton(android.R.string.cancel, new AlertDialog.OnClickListener() {

					@Override
					public void onClick(DialogInterface dialog, int which) {
						result.cancel();
					}

				});
				builder.setCancelable(false);
				builder.create();
				builder.show();
				return true;
			}

			@Override
			public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
				Log.d("tiantanwebview", "contentWebview : " + consoleMessage.message() + " -- From line "
						+ consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
				return super.onConsoleMessage(consoleMessage);
			}

		});
		this.contentWebView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				if (url.indexOf("System/showMobileSystem.html") != -1) {
					Intent intent = new Intent(YiDongYiHuBrowserActivity.this, MainActivity.class);
					YiDongYiHuBrowserActivity.this.finish();
					startActivity(intent);
				} else {
					// 因为此时患者参数可能已经发生变化所以重新组装患者参数：
					request_arg = buildRequestArg("");
					if (url.indexOf("ZhuyuanYishi/Patient/showPatientZongheChafang/") != -1) {
						url = current_application.appConf.server_url
								+ "ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/"
								+ current_application.appConf.current_patient_zhuyuan_id;
					}

					if (url.indexOf(current_application.appConf.server_ip_lan) != -1) {
						url = url.replaceAll(current_application.appConf.server_ip_lan,
								current_application.appConf.server_ip);
					}

					//
					// if (url.indexOf("tiantan_emr") != -1) {
					// url.replaceAll("tiantan_emr", "tiantan_emr_bk");
					// }
					// cookieManager.setCookie(url,
					// CookieHelper.getInstance().getCookiesString(context));
					// CookieSyncManager.getInstance().sync();

					// CookieHelper.getInstance(context)
					// .syncUrlCookies(request_url +
					// current_application.appConf.current_patient_zhuyuan_id);
					// CookieHelper.getInstance(context).syncUrlCookies(url);

					CookieHelper.getInstance(context)
							.setUrlCookies(request_url + current_application.appConf.current_patient_zhuyuan_id);
					CookieHelper.getInstance(context).setUrlCookies(url);

					Log.e("tiantan", url);
					view.loadUrl(url);
					current_application.featureConf.now_url = url;
				}
				return true;
			}

			// @Override
			// public WebResourceResponse shouldInterceptRequest(WebView view,
			// String url) {
			// WebResourceResponse response = super.shouldInterceptRequest(view,
			// url);
			// Log.d("tiantan", "url is:" + url);
				// if (url != null &&
			// url.contains(current_application.appConf.server_url_default_port
			// + "Public/css"))
				// {
				// Log.d("tiantan", "url contains /tiantan_emr/Public/css");
			// String INJECTION_TOKEN =
			// current_application.appConf.server_url_default_port +
				// "Public";
				// String assetPath = "www"
				// + url.substring(url.indexOf(INJECTION_TOKEN) +
				// INJECTION_TOKEN.length(), url.length());
				// Log.d("tiantan", "url assetPath:" + assetPath);
				// try {
				// response = new WebResourceResponse("application/javascript",
				// "UTF8",
				// context.getAssets().open(assetPath));
				// } catch (IOException e) {
				// e.printStackTrace(); // Failed to load asset file
				// }
				// }
			// if (url != null &&
			// url.contains(current_application.appConf.server_url_default_port
			// +
			// "Public/js")) {
			// Log.d("tiantan", "url contains /tiantan_emr/Public/js");
			// String INJECTION_TOKEN =
			// current_application.appConf.server_url_default_port +
			// "Public";
			// String assetPath = "www"
			// + url.substring(url.indexOf(INJECTION_TOKEN) +
			// INJECTION_TOKEN.length(), url.length());
			// Log.d("tiantan", "url assetPath:" + assetPath);
			// try {
			// response = new WebResourceResponse("application/javascript",
			// "UTF8",
			// context.getAssets().open(assetPath));
			// } catch (IOException e) {
			// e.printStackTrace(); // Failed to load asset file
			// }
			// }
			// return response;
			// }
			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				// TODO Auto-generated method stub
				super.onPageStarted(view, url, favicon);
				if (progDlg == null || !progDlg.isShowing()) {
					progDlg = new ProgressDialog(YiDongYiHuBrowserActivity.this);
					progDlg.setMessage(getString(R.string.jiazai_qingsaohou));
					progDlg.show();
				}

				page_start_loading = true;
				// currThread = Thread.currentThread();
				// Log.d("tiantan", "currThread is : " + currThread.getId());

				// cookieManager.setCookie(url,
				// CookieHelper.getInstance().getCookiesString(context));
				// CookieSyncManager.getInstance().sync();
				CookieHelper.getInstance(context).setUrlCookies(url);

				Log.e("tiantan", url);

				if (current_application.jsEnable(isBelongTo(url))) {
					wbSettings.setJavaScriptEnabled(true);
				} else {
					wbSettings.setJavaScriptEnabled(false);
				}

				webviewViewWidth = contentWebView.getWidth();
				contentWebViewScale = webviewViewWidth * 100 / 980;
				// contentWebView.loadUrl(
				// "javascript:window.HTMLOUT.getContentWidth(document.getElementsByTagName('html')[0].scrollWidth);");

				// 点击时间轴
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				request_url = url;
				if (progDlg != null && progDlg.isShowing()) {
					progDlg.dismiss();
				}
				// 只有第一次页面执行完毕加载，才调用此函数
				// if (page_start_loading == true) {
				// // request_arg = buildRequestArg(huli_wenshu_type);
				// view.loadUrl("javascript:getCurrentUserInfo('" + "?" +
				// request_arg + "')");
				// }
				page_start_loading = false;
				setContentInitialScale(url);
				// wbSettings.setJavaScriptEnabled(true);
			}
		});
		contentWebView.getSettings().setJavaScriptEnabled(true);
		contentWebView.addJavascriptInterface(new JavaScriptInterfaceInner(), "HTMLOUT");
		// contentWebView.addJavascriptInterface(this, "jszhixingstate");


		// xiaobbianque
		xbqSettings = xiaobianqueWebView.getSettings();
		// xbqSettings.setSupportZoom(true);
		// xbqSettings.setBuiltInZoomControls(true);
		// wbSettings.setTextSize(WebSettings.TextSize.NORMAL);
		// xbqSettings.setTextZoom(150);
		xbqSettings.setUseWideViewPort(true);
		xbqSettings.setLayoutAlgorithm(LayoutAlgorithm.SINGLE_COLUMN);
		xbqSettings.setLoadWithOverviewMode(true);
		xbqSettings.setJavaScriptEnabled(true);
		xbqSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
		xbqSettings.setDomStorageEnabled(true);

		xiaobianqueWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
		xiaobianqueWebView.addJavascriptInterface(new JavaScriptInterfaceInner(), "HTMLOUT");

		xiaobianqueWebView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				return true;
			}

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				// TODO Auto-generated method stub
				super.onPageStarted(view, url, favicon);
				// String setkeyword = "javascript:" +
				// "$('input[name=\"content\"]').val('test');";
				// xiaobianqueWebView.loadUrl("javascript:$(\".send\").val(\"test\");");
				// xiaobianqueWebView.loadUrl("javascript:$('.send').trigger('click');");

			}

			@Override
			public void onPageFinished(WebView view, String url) {

			}
		});

		xiaobianqueWebView.setWebChromeClient(new WebChromeClient() {
			@Override
			public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
				Log.d("tiantanwebview", "xiaobianqueWebview : " + consoleMessage.message() + " -- From line "
						+ consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
				return super.onConsoleMessage(consoleMessage);
			}
		});

	}



	/**
	 * @Title: buildRequestArg
	 * @Description: 根据不同的模块封装请求参数
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月8日 上午11:10:37
	 * @param initial_arg
	 * @return
	 */
	public String buildRequestArg(String initial_arg) {
		String request_arg = "";
		return request_arg;
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		outState.putString("request_url", request_url);
	}

	/*
	 * 
	 * 
	 * @不退出activity而是返回上一浏览页面
	 */
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if ((keyCode == KeyEvent.KEYCODE_BACK) && contentWebView.canGoBack()) {
			contentWebView.goBack();
			current_application.featureConf.now_url = contentWebView.getUrl();
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}

	class JavaScriptInterfaceInner {
		@JavascriptInterface
		public void getContentWidth(String value) {
			Log.d("tiantan", "call getContentWidth" + value);
			Log.d("tiantan", "JavaScriptInterface Thread is : " + Thread.currentThread().getId());
			if (value != null) {
				int webviewContentWidth = Integer.parseInt(value);
				Log.d("tiantan", "Result from javascript: " + webviewContentWidth);
				int webviewViewWidth = contentWebView.getWidth();
				Log.d("tiantan", "webviewViewWidth： " + webviewViewWidth);
				contentWebViewScale = webviewViewWidth * 100 / webviewContentWidth;
			}

			// if (currThread != null) {
			// currThread.resume();
			// }
		}

		@JavascriptInterface
		public void openXiaoBianque(String keyword) {
			Log.d("tiantan", "call openXiaoBianque" + keyword);

			Message message = new Message();
			message.what = MSG_OPEN_XIAOBIANQUE;
			Bundle bundle = new Bundle();
			bundle.putString("keyword", keyword);
			message.setData(bundle);
			YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
		}

		@JavascriptInterface
		public String getAppInfo() {
			Map<String, String> currentAppInfoMap = new HashMap<String, String>();
			currentAppInfoMap.put("patient_id", current_application.appConf.current_patient_id);
			currentAppInfoMap.put("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id);
			currentAppInfoMap.put("server_url", current_application.appConf.server_ip);
			return (new JSONObject(currentAppInfoMap).toString());
		}

		@JavascriptInterface
		public void refleshXiaoBianque() {
			Message message = new Message();
			message.what = MSG_REFLESH_XIAOBIANQUE;
			YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
		}

		/**
		 * @Title: loadXiaoBianqueContent
		 * @Description: 加载小扁鹊点击url
		 * @author: Huke <Huke@tiantanhehe.com>
		 * @date: 2016年5月13日 下午3:18:29
		 * @param url
		 */
		@JavascriptInterface
		public void loadXiaoBianqueContent(String url, String type, String where) {
			Log.e("aa", url);
			if(type.equals("bendi"))
			{
				String keshi_name = "";
				String table_name = "";
				String zhuyuan_id = "";
				String jiancha_id = "";
				String[] canshu = url.split("\\/");
				for(int i = 0;i < canshu.length;i++)
				{
					if(canshu[i].equals("keshi"))
					{
						keshi_name = canshu[i+1];
					}
					else if(canshu[i].equals("table"))
					{
						table_name = canshu[i+1];
					}
					else if(canshu[i].equals("zhuyuan_id"))
					{
						zhuyuan_id = canshu[i+1];
					}
					else if(canshu[i].equals("id"))
					{
						jiancha_id = canshu[i+1];
					}
				}
				
				Intent intent = new Intent(YiDongYiHuBrowserActivity.this, YiDongYiHuTankuangActivity.class);
				intent.putExtra("keshi_name", keshi_name);
				intent.putExtra("table_name", table_name);
				intent.putExtra("zhuyuan_id", zhuyuan_id);
				intent.putExtra("jiancha_id", jiancha_id);
				startActivity(intent);
			}
			else
			{
				Message message = new Message();
				message.what = MSG_LOAD_XIAOBIANQUE_CONTENT;
				String xiaobianqueUrl;
				if ("noIP".equals(type)) {
					xiaobianqueUrl = "http://" + current_application.appConf.server_ip + url;
				} else {
					xiaobianqueUrl = url;
				}
				Log.d("tiantan", "xiaobianqueUrl" + xiaobianqueUrl);
				Bundle bundle = new Bundle();
				bundle.putString("xiaobianqueUrl", xiaobianqueUrl);
				bundle.putString("whichWebView", where);
				message.setData(bundle);
				YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
			}
		}

		@JavascriptInterface
		public String getAPPCookie() {
			String cookieString = CookieHelper.getInstance(context).getCookiesString(context);
			return cookieString;

		}

		@JavascriptInterface
		public void switchPatient(String zhuyuanhao) {
			Log.d("tiantan", "switchPatient() zhuyuanhao" + zhuyuanhao);
			HuanzheWrapper huanzhe = mZhuyuanHuanzheDao.getHuanzheByZhuyuanID(zhuyuanhao);
			if (huanzhe != null) {
				huanzhe.setGlobalData(current_application);
				Message message = new Message();
				message.what = MSG_SWITCH_PATIENT;
				YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
			}


		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.cordova.api.CordovaInterface#getActivity()
	 */
	@Override
	public Activity getActivity() {
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.cordova.api.CordovaInterface#getThreadPool()
	 */
	@Override
	public ExecutorService getThreadPool() {
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.cordova.api.CordovaInterface#onMessage(java.lang.String,
	 * java.lang.Object)
	 */
	@Override
	public Object onMessage(String id, Object data) {
		if ("exit".equals(id)) {
			super.finish();
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.cordova.api.CordovaInterface#setActivityResultCallback(org.
	 * apache.cordova.api.CordovaPlugin)
	 */
	@Override
	public void setActivityResultCallback(CordovaPlugin plugin) {
		if (activityResultCallback != null) {
			activityResultCallback.onActivityResult(activityResultRequestCode, Activity.RESULT_CANCELED, null);
		}
		this.activityResultCallback = plugin;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.cordova.api.CordovaInterface#startActivityForResult(org.apache
	 * .cordova.api.CordovaPlugin, android.content.Intent, int)
	 */
	@Override
	public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {
        setActivityResultCallback(command);  
        try {  
            startActivityForResult(intent, requestCode);  
        } catch (RuntimeException e) {  
            activityResultCallback = null;  
            throw e;  
        }  
    }

	/**
	 * @Title: getGensuiUrl
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月11日 下午1:06:33
	 */
	public void getRefleshUrl(final int type) {
		if (!reflesh && type != TYPE_CONTROL) {
			return;
		}

		Log.d("tiantan", "获取查房跟随Url");
		String url = current_application.appConf.server_url + "Mobile/YidongChafangClientCommunication/getXiezuoUrl";

		Map<String, String> map = new HashMap<String, String>();
		map.put("xiezuo_type", "chafang");
		new HttpHelper(null, new IHandleHttpHelperResult() {
			@SuppressWarnings("unchecked")
			@Override
			public void handleResult(List<Map<String, Object>> httpData) {
				// 设置报告单属性
				String gensuiUrl = "";
				if (httpData == null || httpData.size() == 0) {
					gensuiUrl = current_application.appConf.server_url
							+ "ZhuyuanYishi/ZhuyuanXiezuo/showXiezuoDefault/";

					if (type == TYPE_CONTROL) {
						xiezuoBinder.getService().setChafangTongbuRuning(1);
						Message message = new Message();
						message.what = MSG_YANSHI_IDLE;
						YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
					}
				} else {
					gensuiUrl = (String) httpData.get(0).get("tongbu_url");
					Log.d("tiantan", "chafanggensui:" + gensuiUrl);

					if (type == TYPE_CONTROL) {
						xiezuoBinder.getService().setChafangTongbuRuning(0);
						Message message = new Message();
						message.what = MSG_YANSHI_RUNNING;
						YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
					}
				}


				if (type == TYPE_NORMAL) {
					Message message = new Message();
					Bundle bundle = new Bundle();
					message.what = MSG_REFLESH_CONTENT;
					bundle.putString("gensuiUrl", gensuiUrl);
					message.setData(bundle);
					YiDongYiHuBrowserActivity.this.browserHandler.sendMessage(message);
				}



			}
		}).getDataFromServerNoTip(url, map);
	}

	@Override
	public void onDestroy() {

		mRunning = 0;
		if (progDlg != null) {
			progDlg.dismiss();
		}
		super.onDestroy();
	}



}
