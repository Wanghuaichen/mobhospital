package com.tiantanhehe.tiantanrdp;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.gesture.Gesture;
import android.gesture.GestureLibraries;
import android.gesture.GestureLibrary;
import android.gesture.GestureOverlayView;
import android.gesture.GestureOverlayView.OnGesturePerformedListener;
import android.gesture.Prediction;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.Point;
import android.graphics.Rect;
import android.graphics.drawable.BitmapDrawable;
import android.inputmethodservice.Keyboard;
import android.inputmethodservice.KeyboardView;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ScaleGestureDetector;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnKeyListener;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ZoomControls;

import com.freerdp.afreerdp.services.LibFreeRDP;
import com.tiantanhehe.tiantanrdp.utils.BookmarkBase;
import com.tiantanhehe.tiantanrdp.utils.KeyboardMapper;
import com.tiantanhehe.tiantanrdp.utils.Mouse;
import com.tiantanhehe.tiantanrdp.view.ScrollView2D;
import com.tiantanhehe.tiantanrdp.view.SessionView;
import com.tiantanhehe.tiantanrdp.view.TouchPointerView;
import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;

public class RdpMainActivity extends Activity implements
		LibFreeRDP.UIEventListener, KeyboardView.OnKeyboardActionListener,
		ScrollView2D.ScrollView2DListener,
		KeyboardMapper.KeyProcessingListener, SessionView.SessionViewListener,
		TouchPointerView.TouchPointerListener {
	public static final String PARAM_CONNECTION_REFERENCE = "conRef";
	public static final String PARAM_INSTANCE = "instance";

	private static final float ZOOMING_STEP = 0.5f;
	private static final int ZOOMCONTROLS_AUTOHIDE_TIMEOUT = 4000;

	// timeout between subsequent scrolling requests when the touch-pointer is
	// at the edge of the session view
	private static final int SCROLLING_TIMEOUT = 50;
	private static final int SCROLLING_DISTANCE = 20;
	private static final int KEYBOARD_HEIGHT = 500;

	private Bitmap bitmap;
	private SessionState session;
	private SessionView sessionView;
	private TouchPointerView touchPointerView;
	private ProgressDialog progressDialog;
	private KeyboardView keyboardView;
	private KeyboardView modifiersKeyboardView;
	private ZoomControls zoomControls;
	private KeyboardMapper keyboardMapper;

	private ImageView login_image;
	private ProgressBar login_progressbar;
	private LinearLayout login_progressbar_bg;
	private ImageView login_joke_image;
	private TextView login_joke_txt;
	// 增加一个开关来控制是否要显示图片和进度条
	private boolean mask_switch = true;
	private int[] progressbar_step = { 0, 0 };
	// 是否键盘触发滚动视图
	private boolean scrollByKeyboard = false;
	private int lastDiffHeight = 0;
	private long lastGlobalLayoutTime = 0;
	private int originDiffHight = 50;
	private int scrollDiffHight = 639;

	private Keyboard specialkeysKeyboard;
	private Keyboard numpadKeyboard;
	private Keyboard cursorKeyboard;
	private Keyboard modifiersKeyboard;

	private AlertDialog dlgVerifyCertificate;
	private AlertDialog dlgUserCredentials;
	private View userCredView;

	private UIHandler uiHandler;

	private int screen_width;
	private int screen_height;
	private float initScale = 1.0f;
	private PinchZoomListener pinchZoomListener;

	private boolean autoScrollTouchPointer = GlobalInfoApplication.pref_ui_autoscrolltouchpointer;
	private boolean connectCancelledByUser = false;
	private boolean sessionRunning = false;
	private boolean toggleMouseButtons = false;

	private LibFreeRDPBroadcastReceiver libFreeRDPBroadcastReceiver;

	private static final String TAG = "FreeRDP.SessionActivity";

	private ScrollView2D scrollView;

	// keyboard visibility flags
	private boolean sysKeyboardVisible = false;
	private boolean extKeyboardVisible = false;

	// variables for delayed move event sending
	private static final int MAX_DISCARDED_MOVE_EVENTS = 3;
	private static final int SEND_MOVE_EVENT_TIMEOUT = 150;
	private int discardedMoveEvents = 0;

	private List<Map<String, Object>> macros_list;
	private int counter = 0;
	// 手势识别参数
	private GestureOverlayView gestureOverlayView1;
	private GestureLibrary library;
	private boolean keyboardState = false;
	private ImageButton shuangji_btn;
	private int dangqian_x_zuobiao = 0;
	private int dangqian_y_zuobiao = 0;
	int screenWidth;
	int screenHeight;
	int lastX;
	int lastY;
	int height1, height2, SoftKeybardHeight;
	private SharedPreferences mySharedPreferences;
	private SharedPreferences.Editor editor;

	private OnKeyListener onKeyListener = new OnKeyListener() {

		@Override
		public boolean onKey(View v, int keyCode, KeyEvent event) {
			/*
			 * if (keyCode == KeyEvent.KEYCODE_ENTER && event.getAction() ==
			 * KeyEvent.ACTION_DOWN) { Log.e("aa", "回车键值："+keyCode); return
			 * true; } Log.e("aa", "正常键值："+keyCode);
			 */
			return false;
		}
	};

	private class UIHandler extends Handler {

		public static final int REFRESH_SESSIONVIEW = 1;
		public static final int DISPLAY_TOAST = 2;
		public static final int HIDE_ZOOMCONTROLS = 3;
		public static final int SEND_MOVE_EVENT = 4;
		public static final int SHOW_DIALOG = 5;
		public static final int GRAPHICS_CHANGED = 6;
		public static final int SCROLLING_REQUESTED = 7;
		// 新增事件
		public static final int AUTO_EVENT = 8;
		public static final int SCROLL_KEYBOARD = 9;
		public static final int GLOBAL_LAYOUT = 10;

		UIHandler() {
			super();
		}

		@Override
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case GRAPHICS_CHANGED: {
				sessionView.onSurfaceChange(session);
				scrollView.requestLayout();
				break;
			}
			case REFRESH_SESSIONVIEW: {
				sessionView.invalidateRegion();
				break;
			}
			case DISPLAY_TOAST: {
				Toast errorToast = Toast.makeText(getApplicationContext(),
						msg.obj.toString(), Toast.LENGTH_LONG);
				errorToast.show();
				break;
			}
			case HIDE_ZOOMCONTROLS: {
				zoomControls.hide();
				break;
			}
			case SEND_MOVE_EVENT: {
				LibFreeRDP.sendCursorEvent(session.getInstance(), msg.arg1,
						msg.arg2, Mouse.getMoveEvent());
				break;
			}
			case SHOW_DIALOG: {
				// create and show the dialog
				((Dialog) msg.obj).show();
				break;
			}
			case SCROLLING_REQUESTED: {
				int scrollX = 0;
				int scrollY = 0;
				float[] pointerPos = touchPointerView.getPointerPosition();

				if (pointerPos[0] > (screen_width - touchPointerView
						.getPointerWidth()))
					scrollX = SCROLLING_DISTANCE;
				else if (pointerPos[0] < 0)
					scrollX = -SCROLLING_DISTANCE;

				if (pointerPos[1] > (screen_height - touchPointerView
						.getPointerHeight()))
					scrollY = SCROLLING_DISTANCE;
				else if (pointerPos[1] < 0)
					scrollY = -SCROLLING_DISTANCE;

				scrollView.scrollBy(scrollX, scrollY);

				// see if we reached the min/max scroll positions
				if (scrollView.getScrollX() == 0
						|| scrollView.getScrollX() == (sessionView.getWidth() - scrollView
								.getWidth()))
					scrollX = 0;
				if (scrollView.getScrollY() == 0
						|| scrollView.getScrollY() == (sessionView.getHeight() - scrollView
								.getHeight()))
					scrollY = 0;

				if (scrollX != 0 || scrollY != 0)
					uiHandler.sendEmptyMessageDelayed(SCROLLING_REQUESTED,
							SCROLLING_TIMEOUT);
				else
					Log.v(TAG, "Stopping auto-scroll");
				break;
			}
			case AUTO_EVENT: {
				if (counter < macros_list.size()) {
					Map<String, Object> orderMap = macros_list.get(counter);
					if ("dbclick".equals(orderMap.get("type"))) {
						Point p = new Point(Integer.parseInt(orderMap.get(
								"x_pos").toString()), Integer.parseInt(orderMap
								.get("y_pos").toString()));
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getLeftButtonEvent(true));
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getLeftButtonEvent(false));
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getLeftButtonEvent(true));
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getLeftButtonEvent(false));
					} else if ("click".equals(orderMap.get("type"))) {
						Point p = new Point(Integer.parseInt(orderMap.get(
								"x_pos").toString()), Integer.parseInt(orderMap
								.get("y_pos").toString()));
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getLeftButtonEvent(true));
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getLeftButtonEvent(false));
					} else if ("input".equals(orderMap.get("type"))) {
						String input_str = orderMap.get("key_str").toString();
						if ("key_mode".equals(orderMap.get("upper"))) {
							input_str = input_str.toUpperCase();
						}
						for (int i = 0; i < input_str.length(); i++) {
							char c = input_str.charAt(i);
							int unicode = c;
							LibFreeRDP.sendUnicodeKeyEvent(
									session.getInstance(), unicode);
						}
					} else if ("fk".equals(orderMap.get("type"))) {
						String[] function_keys = orderMap.get("key_str")
								.toString().split("\\+");
						for (int i = 0; i < function_keys.length; i++) {
							int keys_value = Integer.parseInt(function_keys[i]);
							LibFreeRDP.sendKeyEvent(session.getInstance(),
									keys_value, true);
						}
						for (int i = 0; i < function_keys.length; i++) {
							int keys_value = Integer.parseInt(function_keys[i]);
							LibFreeRDP.sendKeyEvent(session.getInstance(),
									keys_value, false);
						}
					}
					if (counter == (macros_list.size() - 1)) {
						login_progressbar
								.incrementProgressBy(progressbar_step[1]);
					} else {
						login_progressbar
								.incrementProgressBy(progressbar_step[0]);
					}
					counter++;
					if (counter < macros_list.size()) {
						uiHandler.sendEmptyMessageDelayed(
								uiHandler.AUTO_EVENT,
								Integer.parseInt(macros_list.get(counter)
										.get("delay_time").toString()));
					} else {
						login_image.setVisibility(View.GONE);
						login_progressbar.setVisibility(View.GONE);
						login_progressbar_bg.setVisibility(View.GONE);
						login_joke_image.setVisibility(View.GONE);
						login_joke_txt.setVisibility(View.GONE);
					}
				}
				break;

			}
			case SCROLL_KEYBOARD: {
				if (msg.arg1 == 1) {
					scrollView.scrollBy(0, KEYBOARD_HEIGHT);
					// touchPointerView.movePointer(0, KEYBOARD_HEIGHT);
					scrollByKeyboard = true;
					uiHandler.sendMessageDelayed(
							Message.obtain(null, SCROLL_KEYBOARD, 3, 0), 200);

				} else if (msg.arg1 == 0) {
					scrollView.scrollBy(0, 0 - KEYBOARD_HEIGHT);
					// scrollByKeyboard = false;
					// touchPointerView.movePointer(0, 0 - KEYBOARD_HEIGHT);
				} else if (msg.arg1 == 3) {
					scrollByKeyboard = false;
				}

				// else if (msg.arg1 == 3) {
				// lastDiffHeight = msg.arg2;
				// if (sysKeyboardVisible &&
				// sessionView.getTouchPointerPaddingHeight() == KEYBOARD_HEIGHT
				// && lastDiffHeight == 398 && msg.arg2 == 38) {
				// showKeyboard(!sysKeyboardVisible, false);
				// scrollSessionView(0, KEYBOARD_HEIGHT);
				// }
				// } else if (msg.arg1 == 4) {
				// lastDiffHeight = 0;
				// }

				break;
			}
			case GLOBAL_LAYOUT: {

				// InputMethodManager imm = (InputMethodManager)
				// getSystemService(Activity.INPUT_METHOD_SERVICE);
				// if (imm.hideSoftInputFromWindow(sessionView.getWindowToken(),
				// 0)) {
				//
				// }
				if (msg.getData().getInt("diffHight") == originDiffHight
						&& !scrollByKeyboard && sysKeyboardVisible) {
					Log.d(TAG, "softinput by self");
					scrollSessionView(0, KEYBOARD_HEIGHT);
					showKeyboard(!sysKeyboardVisible, false);

				}

				lastDiffHeight = msg.getData().getInt("diffHight");
				lastGlobalLayoutTime = msg.getData()
						.getLong("globalLayoutTime");

				break;
			}

			}
		}
	}

	private class LibFreeRDPBroadcastReceiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			// still got a valid session?
			if (session == null)
				return;

			// is this event for the current session?
			if (session.getInstance() != intent.getExtras().getInt(
					GlobalInfoApplication.EVENT_PARAM, -1))
				return;

			switch (intent.getExtras().getInt(GlobalInfoApplication.EVENT_TYPE,
					-1)) {
			case GlobalInfoApplication.FREERDP_EVENT_CONNECTION_SUCCESS:
				OnConnectionSuccess(context);
				break;

			case GlobalInfoApplication.FREERDP_EVENT_CONNECTION_FAILURE:
				OnConnectionFailure(context);
				break;
			case GlobalInfoApplication.FREERDP_EVENT_DISCONNECTED:
				OnDisconnected(context);
				break;
			}
		}

		// 连接成功
		private void OnConnectionSuccess(Context context) {
			Log.v(TAG, "OnConnectionSuccess");

			// bind session
			bindSession();

			if (progressDialog != null) {
				progressDialog.dismiss();
				progressDialog = null;
			}
			if (null != macros_list && macros_list.size() > 0) {
				progressbar_step[0] = 100 / macros_list.size();
				progressbar_step[1] = 100 - progressbar_step[0]
						* (macros_list.size() - 1);
				Map<String, Object> orderMap = macros_list.get(counter);
				uiHandler
						.sendEmptyMessageDelayed(uiHandler.AUTO_EVENT,
								Integer.parseInt(orderMap.get("delay_time")
										.toString()));
			} else {
				login_image.setVisibility(View.GONE);
				login_progressbar.setVisibility(View.GONE);
				login_progressbar_bg.setVisibility(View.GONE);
				login_joke_image.setVisibility(View.GONE);
				login_joke_txt.setVisibility(View.GONE);
			}
		}

		private void OnConnectionFailure(Context context) {
			Log.v(TAG, "OnConnectionFailure");

			if (progressDialog != null) {
				progressDialog.dismiss();
				progressDialog = null;
			}

			// post error message on UI thread
			if (!connectCancelledByUser)
				uiHandler.sendMessage(Message.obtain(
						null,
						UIHandler.DISPLAY_TOAST,
						getResources().getText(
								R.string.error_connection_failure)));

			session = null;
			closeSessionActivity(RESULT_CANCELED);
		}

		private void OnDisconnected(Context context) {
			Log.v(TAG, "OnDisconnected");

			if (progressDialog != null) {
				progressDialog.dismiss();
				progressDialog = null;
			}

			session.setUIEventListener(null);
			session = null;
			closeSessionActivity(RESULT_OK);
		}
	}

	private class PinchZoomListener extends
			ScaleGestureDetector.SimpleOnScaleGestureListener {
		private float scaleFactor = 1.0f;

		public float getScaleFactor() {
			return scaleFactor;
		}

		public void setScaleFactor(float scaleFactor) {
			this.scaleFactor = scaleFactor;
		}

		@Override
		public boolean onScaleBegin(ScaleGestureDetector detector) {
			scrollView.setScrollEnabled(false);
			return true;
		}

		@Override
		public boolean onScale(ScaleGestureDetector detector) {

			// calc scale factor
			scaleFactor *= detector.getScaleFactor();
			scaleFactor = Math.max(SessionView.MIN_SCALE_FACTOR,
					Math.min(scaleFactor, SessionView.MAX_SCALE_FACTOR));
			sessionView.setZoom(scaleFactor);

			if (!sessionView.isAtMinZoom() && !sessionView.isAtMaxZoom()) {
				// transform scroll origin to the new zoom space
				float transOriginX = scrollView.getScrollX()
						* detector.getScaleFactor();
				float transOriginY = scrollView.getScrollY()
						* detector.getScaleFactor();

				// transform center point to the zoomed space
				float transCenterX = (scrollView.getScrollX() + detector
						.getFocusX()) * detector.getScaleFactor();
				float transCenterY = (scrollView.getScrollY() + detector
						.getFocusY()) * detector.getScaleFactor();

				// scroll by the difference between the distance of the
				// transformed center/origin point and their old distance
				// (focusX/Y)
				scrollView.scrollBy(
						(int) ((transCenterX - transOriginX) - detector
								.getFocusX()),
						(int) ((transCenterY - transOriginY) - detector
								.getFocusY()));
			}

			return true;
		}

		@Override
		public void onScaleEnd(ScaleGestureDetector de) {
			scrollView.setScrollEnabled(true);
		}
	}

	private void createDialogs() {
		// build verify certificate dialog
		dlgVerifyCertificate = new AlertDialog.Builder(this)
				.setTitle(R.string.dlg_title_verify_certificate)
				.setPositiveButton(android.R.string.yes,
						new DialogInterface.OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								callbackDialogResult = true;
								synchronized (dialog) {
									dialog.notify();
								}
							}
						})
				.setNegativeButton(android.R.string.no,
						new DialogInterface.OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								callbackDialogResult = false;
								connectCancelledByUser = true;
								synchronized (dialog) {
									dialog.notify();
								}
							}
						}).setCancelable(false).create();

		// build the dialog
		userCredView = getLayoutInflater().inflate(R.layout.credentials, null,
				true);
		dlgUserCredentials = new AlertDialog.Builder(this)
				.setView(userCredView)
				.setTitle(R.string.dlg_title_credentials)
				.setPositiveButton(android.R.string.ok,
						new DialogInterface.OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								callbackDialogResult = true;
								synchronized (dialog) {
									dialog.notify();
								}
							}
						})
				.setNegativeButton(android.R.string.cancel,
						new DialogInterface.OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								callbackDialogResult = false;
								connectCancelledByUser = true;
								synchronized (dialog) {
									dialog.notify();
								}
							}
						}).setCancelable(false).create();
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// show status bar or make fullscreen?
		if (GlobalInfoApplication.pref_ui_hidestatusbar)
			getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
					WindowManager.LayoutParams.FLAG_FULLSCREEN);
		this.setContentView(R.layout.session);
		getWindow().setSoftInputMode(
				WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);

		mySharedPreferences = getSharedPreferences("jianpan_height",
				Activity.MODE_PRIVATE);
		// 实例化SharedPreferences.Editor对象（第二步）
		editor = mySharedPreferences.edit();

		gestureOverlayView1 = (GestureOverlayView) findViewById(R.id.gestureOverlayView1);
		// gestureOverlayView1.setGestureColor(getResources().getColor(R.color.baise));
		// 加载手势文件
		library = GestureLibraries.fromRawResource(this, R.raw.gestures);
		library.load();
		// 添加
		gestureOverlayView1
				.addOnGesturePerformedListener(new gestureOverlayListener());
		// 00.初始化 GestureDetector 对象
		// gestureDetector = new GestureDetector(this,new
		// GestureDelectorSimlpeListener());

		login_image = (ImageView) findViewById(R.id.login_image);
		login_progressbar = (ProgressBar) findViewById(R.id.my_progress_bar);
		login_progressbar_bg = (LinearLayout) findViewById(R.id.login_progressbar_bg);
		login_joke_image = (ImageView) findViewById(R.id.login_joke_image);
		login_joke_txt = (TextView) findViewById(R.id.login_joke_txt);

		shuangji_btn = (ImageButton) findViewById(R.id.shuangji_btn);
		shuangji_btn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				LibFreeRDP.sendCursorEvent(session.getInstance(),
						dangqian_x_zuobiao, dangqian_y_zuobiao,
						Mouse.getLeftButtonEvent(true));
				LibFreeRDP.sendCursorEvent(session.getInstance(),
						dangqian_x_zuobiao, dangqian_y_zuobiao,
						Mouse.getLeftButtonEvent(false));
				LibFreeRDP.sendCursorEvent(session.getInstance(),
						dangqian_x_zuobiao, dangqian_y_zuobiao,
						Mouse.getLeftButtonEvent(true));
				LibFreeRDP.sendCursorEvent(session.getInstance(),
						dangqian_x_zuobiao, dangqian_y_zuobiao,
						Mouse.getLeftButtonEvent(false));
				dangqian_x_zuobiao = 0;
				dangqian_x_zuobiao = 0;
				shuangji_btn.setVisibility(View.GONE);
			}
		});

		// ATTENTION: We use the onGlobalLayout notification to start our
		// session.
		// This is because only then we can know the exact size of our session
		// when using fit screen
		// accounting for any status bars etc. that Android might throws on us.
		// A bit weird looking
		// but this is the only way ...
		final View activityRootView = findViewById(R.id.session_root_view);
		activityRootView.getViewTreeObserver().addOnGlobalLayoutListener(
				new OnGlobalLayoutListener() {
					@Override
					public void onGlobalLayout() {
						screen_width = activityRootView.getWidth();
						screen_height = activityRootView.getHeight();

						// start session
						if (!sessionRunning && getIntent() != null) {
							processIntent(getIntent());
							sessionRunning = true;
						}
					}
				});

		sessionView = (SessionView) findViewById(R.id.sessionView);
		pinchZoomListener = new PinchZoomListener();
		sessionView.setScaleGestureDetector(new ScaleGestureDetector(this,
				pinchZoomListener));
		sessionView.setSessionViewListener(this);
		sessionView.requestFocus();
		touchPointerView = (TouchPointerView) findViewById(R.id.touchPointerView);
		touchPointerView.setTouchPointerListener(this);

		keyboardMapper = new KeyboardMapper();
		keyboardMapper.init(this);

		modifiersKeyboard = new Keyboard(getApplicationContext(),
				R.xml.modifiers_keyboard);
		specialkeysKeyboard = new Keyboard(getApplicationContext(),
				R.xml.specialkeys_keyboard);
		numpadKeyboard = new Keyboard(getApplicationContext(),
				R.xml.numpad_keyboard);
		cursorKeyboard = new Keyboard(getApplicationContext(),
				R.xml.cursor_keyboard);

		// hide keyboard below the sessionView
		keyboardView = (KeyboardView) findViewById(R.id.extended_keyboard);
		keyboardView.setKeyboard(specialkeysKeyboard);
		keyboardView.setOnKeyboardActionListener(this);

		modifiersKeyboardView = (KeyboardView) findViewById(R.id.extended_keyboard_header);
		modifiersKeyboardView.setKeyboard(modifiersKeyboard);
		modifiersKeyboardView.setOnKeyboardActionListener(this);

		scrollView = (ScrollView2D) findViewById(R.id.sessionScrollView);
		scrollView.setScrollViewListener(this);
		uiHandler = new UIHandler();
		libFreeRDPBroadcastReceiver = new LibFreeRDPBroadcastReceiver();

		zoomControls = (ZoomControls) findViewById(R.id.zoomControls);
		zoomControls.hide();
		zoomControls.setOnZoomInClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				resetZoomControlsAutoHideTimeout();
				zoomControls.setIsZoomInEnabled(sessionView
						.zoomIn(ZOOMING_STEP));
				zoomControls.setIsZoomOutEnabled(true);
			}
		});
		zoomControls.setOnZoomOutClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				resetZoomControlsAutoHideTimeout();
				zoomControls.setIsZoomOutEnabled(sessionView
						.zoomOut(ZOOMING_STEP));
				zoomControls.setIsZoomInEnabled(true);
			}
		});

		toggleMouseButtons = false;

		createDialogs();

		//
		sessionView.setOnKeyListener(onKeyListener);
		activityRootView.getViewTreeObserver().addOnGlobalLayoutListener(
				new OnGlobalLayoutListener() {
					@Override
					public void onGlobalLayout() {
						Rect r = new Rect();
						// r will be populated with the coordinates of your view
						// that
						// area still visible.
						activityRootView.getWindowVisibleDisplayFrame(r);

						int heightDiff = activityRootView.getRootView()
								.getHeight() - (r.bottom - r.top);
						Log.d(TAG, "heightDiff = " + heightDiff);
						if (heightDiff == originDiffHight
								|| heightDiff == scrollDiffHight) { // if
																	// more
																	// than
																	// 100
							// pixels, its
							// probably
							Message message = new Message();
							message.what = UIHandler.GLOBAL_LAYOUT;
							Bundle bundle = new Bundle();
							bundle.putInt("diffHight", heightDiff);
							bundle.putLong("globalLayoutTime",
									System.currentTimeMillis());
							message.setData(bundle);
							uiHandler.sendMessage(message);
						}
					}
				});

		// activityRootView.getViewTreeObserver().addOnPreDrawListener(new
		// OnPreDrawListener() {
		//
		// @Override
		// public boolean onPreDraw() {
		// // TODO Auto-generated method stub
		// return true;
		// }
		// });

		// register freerdp events broadcast receiver
		IntentFilter filter = new IntentFilter();
		filter.addAction(GlobalInfoApplication.ACTION_EVENT_FREERDP);
		registerReceiver(libFreeRDPBroadcastReceiver, filter);
	}

	@Override
	protected void onStart() {
		super.onStart();
	}

	@Override
	protected void onRestart() {
		super.onRestart();
	}

	@Override
	protected void onResume() {
		super.onResume();
	}

	@Override
	protected void onPause() {
		super.onPause();
		showKeyboard(false, false);
	}

	@Override
	protected void onStop() {
		super.onStop();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		unregisterReceiver(libFreeRDPBroadcastReceiver);
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		modifiersKeyboard = new Keyboard(getApplicationContext(),
				R.xml.modifiers_keyboard);
		specialkeysKeyboard = new Keyboard(getApplicationContext(),
				R.xml.specialkeys_keyboard);
		numpadKeyboard = new Keyboard(getApplicationContext(),
				R.xml.numpad_keyboard);
		cursorKeyboard = new Keyboard(getApplicationContext(),
				R.xml.cursor_keyboard);
		keyboardView.setKeyboard(specialkeysKeyboard);
		modifiersKeyboardView.setKeyboard(modifiersKeyboard);
	}

	private void processIntent(Intent intent) {
		// get either session instance or create one from a bookmark
		Bundle bundle = intent.getExtras();
		// if(bundle.containsKey(PARAM_INSTANCE))
		// {
		// int inst = bundle.getInt(PARAM_INSTANCE);
		// session = GlobalApp.getSession(inst);
		// bitmap = session.getSurface().getBitmap();
		// bindSession();
		// }
		// else if(bundle.containsKey(PARAM_CONNECTION_REFERENCE))
		// {
		BookmarkBase bookmark = new BookmarkBase();
		// String refStr = bundle.getString(PARAM_CONNECTION_REFERENCE);
		/*
		 * if(ConnectionReference.isHostnameReference(refStr)) { bookmark = new
		 * ManualBookmark();
		 * bookmark.<ManualBookmark>get().setHostname(ConnectionReference.
		 * getHostname(refStr)); } else
		 * if(ConnectionReference.isBookmarkReference(refStr)) {
		 * if(ConnectionReference.isManualBookmarkReference(refStr)) bookmark =
		 * GlobalApp.getManualBookmarkGateway().findById(ConnectionReference.
		 * getManualBookmarkId(refStr)); else assert false; }
		 */

		/********* 传递过来的宏命令begin **************/
		// macros_list = new ArrayList<Map<String, Object>>();
		// Map<String, Object> orderMap = new HashMap<String, Object>();
		// orderMap.put("type", "dbclick");
		// orderMap.put("delay_time", "2000");
		// orderMap.put("x_pos", "120");
		// orderMap.put("y_pos", "25");
		// macros_list.add(orderMap);
		// orderMap = new HashMap<String, Object>();
		// orderMap.put("type", "click");
		// orderMap.put("delay_time", "2000");
		// orderMap.put("x_pos", "163");
		// orderMap.put("y_pos", "34");
		// macros_list.add(orderMap);
		// orderMap = new HashMap<String, Object>();
		// orderMap.put("type", "input");
		// orderMap.put("delay_time", "100");
		// orderMap.put("key_mode", "lower");
		// //注：字符串一次不能超过13位，否则会崩溃
		// orderMap.put("key_str", "42.120.41.126");
		// macros_list.add(orderMap);
		// orderMap = new HashMap<String, Object>();
		// orderMap.put("type", "input");
		// orderMap.put("delay_time", "100");
		// orderMap.put("key_mode", "lower");
		// orderMap.put("key_str", "/tiantan_emr");
		// macros_list.add(orderMap);
		// orderMap = new HashMap<String, Object>();
		// orderMap.put("type", "fk");
		// orderMap.put("delay_time", "100");
		// orderMap.put("key_str", "13");//164+115
		// macros_list.add(orderMap);
		/********* 传递过来的宏命令end ****************/

		if (null != bundle && bundle.containsKey("rdp_macro_command")) {
			macros_list = (List<Map<String, Object>>) bundle
					.getSerializable("rdp_macro_command");
			Log.d(TAG, "rdp_macro_command: " + macros_list.get(0).get("type"));
		}

		mask_switch = (null != bundle && bundle.containsKey("mask_switch")) ? bundle
				.getBoolean("mask_switch") : true;// 遮罩图片开关，true为开启，false为关闭
		String welcome_info = (null != bundle && bundle
				.containsKey("welcome_info")) ? bundle
				.getString("welcome_info") : "默认笑话";// 欢迎小笑话
		login_joke_txt.setText(welcome_info);
		if (!mask_switch) {
			login_image.setVisibility(View.GONE);
			login_progressbar.setVisibility(View.GONE);
			login_progressbar_bg.setVisibility(View.GONE);
			login_joke_image.setVisibility(View.GONE);
			login_joke_txt.setVisibility(View.GONE);
		}

		String host = (null != bundle && bundle.containsKey("host")) ? bundle
				.getString("host") : "10.200.3.54";
		String port = (null != bundle && bundle.containsKey("port")) ? bundle
				.getString("port") : "13569";
		String user_number = (null != bundle && bundle
				.containsKey("user_number")) ? bundle.getString("user_number")
				: "administrator";
		String user_password = (null != bundle && bundle
				.containsKey("user_password")) ? bundle
				.getString("user_password") : "bcA.@!DSA#";
		int resolution_width = (null != bundle && bundle
				.containsKey("resolution_width")) ? bundle
				.getInt("resolution_width") : 1000;
		int resolution_height = resolution_width * screen_height / screen_width;
		String remoteapp_name = (null != bundle && bundle
				.containsKey("remoteapp_name")) ? bundle
				.getString("remoteapp_name") : "";
		String remote_work_dir = (null != bundle && bundle
				.containsKey("remote_work_dir")) ? bundle
				.getString("remote_work_dir") : "";

		bookmark.setId(2);
		bookmark.setLabel("移动医生");
		bookmark.setUsername(user_number);
		bookmark.setPassword(user_password);
		bookmark.setDomain("");

		BookmarkBase.ScreenSettings screenSettings = bookmark
				.getScreenSettings();
		screenSettings.setColors(16);
		screenSettings.setResolution(1);
		screenSettings.setWidth(resolution_width);
		screenSettings.setHeight(resolution_height);

		BookmarkBase.PerformanceFlags perfFlags = bookmark
				.getPerformanceFlags();
		perfFlags.setRemoteFX(false);
		perfFlags.setWallpaper(false);
		perfFlags.setTheming(false);
		perfFlags.setFullWindowDrag(false);
		perfFlags.setMenuAnimations(false);
		perfFlags.setFontSmoothing(false);
		perfFlags.setDesktopComposition(false);

		// advanced settings
		bookmark.getAdvancedSettings().setEnable3GSettings(false);
		BookmarkBase.ScreenSettings screenSettings3G = bookmark
				.getAdvancedSettings().getScreen3G();
		screenSettings3G.setColors(16);
		screenSettings3G.setResolution(-1);
		screenSettings3G.setWidth(0);
		screenSettings3G.setHeight(0);

		BookmarkBase.PerformanceFlags perfFlags3G = bookmark
				.getAdvancedSettings().getPerformance3G();
		perfFlags3G.setRemoteFX(false);
		perfFlags3G.setWallpaper(false);
		perfFlags3G.setTheming(false);
		perfFlags3G.setFullWindowDrag(false);
		perfFlags3G.setMenuAnimations(false);
		perfFlags3G.setFontSmoothing(false);
		perfFlags3G.setDesktopComposition(false);

		bookmark.getAdvancedSettings().setSecurity(0);
		bookmark.getAdvancedSettings().setConsoleMode(false);
		bookmark.getAdvancedSettings().setRemoteProgram(remoteapp_name);
		bookmark.getAdvancedSettings().setWorkDir(remote_work_dir);

		bookmark.setHostname(host);
		bookmark.setPort(Integer.parseInt(port));

		if (bookmark != null)
			connect(bookmark);
		else
			closeSessionActivity(RESULT_CANCELED);
		// }
		// else
		// {
		// closeSessionActivity(RESULT_CANCELED);
		// }
		//
		initScale = (float) screen_width / (float) resolution_width;
		sessionView.setZoom(initScale);
		pinchZoomListener.setScaleFactor(initScale);
	}

	private void connect(BookmarkBase bookmark) {
		session = GlobalInfoApplication.createSession(bookmark);
		session.setUIEventListener(this);

		// set writeable data directory
		LibFreeRDP.setDataDirectory(session.getInstance(), getFilesDir()
				.toString());

		BookmarkBase.ScreenSettings screenSettings = session.getBookmark()
				.getActiveScreenSettings();
		Log.v(TAG, "Screen Resolution: " + screenSettings.getResolutionString());
		if (screenSettings.isAutomatic()) {
			if ((getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE) {
				// large screen device i.e. tablet: simply use screen info
				screenSettings.setHeight(screen_height);
				screenSettings.setWidth(screen_width);
			} else {
				// small screen device i.e. phone:
				// Automatic uses the largest side length of the screen and
				// makes a 16:10 resolution setting out of it
				int screenMax = (screen_width > screen_height) ? screen_width
						: screen_height;
				screenSettings.setHeight(screenMax);
				screenSettings.setWidth((int) ((float) screenMax * 1.6f));
			}
		}

		progressDialog = new ProgressDialog(this);
		progressDialog.setTitle(bookmark.getLabel());
		progressDialog.setMessage(getResources().getText(
				R.string.dlg_msg_connecting));
		progressDialog.setButton(ProgressDialog.BUTTON_NEGATIVE, "Cancel",
				new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						connectCancelledByUser = true;
						LibFreeRDP.cancelConnection(session.getInstance());
					}
				});
		progressDialog.setCancelable(false);
		progressDialog.show();

		Thread thread = new Thread(new Runnable() {
			public void run() {
				session.connect();
			}
		});
		thread.start();
	}

	// binds the current session to the activity by wiring it up with the
	// sessionView and updating all internal objects accordingly
	private void bindSession() {
		Log.v("SessionActivity", "bindSession called");
		session.setUIEventListener(this);
		sessionView.onSurfaceChange(session);
		scrollView.requestLayout();
		keyboardMapper.reset(this);
	}

	private void scrollSessionView(int oriention, int distance) {
		if (oriention == 0) {
			sessionView.setTouchPointerPadding(0, 0);
			// scrollByKeyboard = false;
			return;
		}

		if (oriention == -1) {
			scrollByKeyboard = true;
			uiHandler.sendMessageDelayed(
					Message.obtain(null, UIHandler.SCROLL_KEYBOARD, 3, 0), 200);
		}

		if (oriention == 1) {
			// 滑动view键盘高度
			// sessionView.setTouchPointerPadding(0, KEYBOARD_HEIGHT);
			sessionView.setTouchPointerPadding(0, distance);
			uiHandler.sendMessage(Message.obtain(null,
					UIHandler.SCROLL_KEYBOARD, 1, 0));

		} else if (oriention == 2) {
			sessionView.setTouchPointerPadding(0, 0);
			uiHandler.sendMessage(Message.obtain(null,
					UIHandler.SCROLL_KEYBOARD, 0, 0));
		}
	}

	// displays either the system or the extended keyboard or non of them
	@SuppressLint("NewApi")
	private void showKeyboard(boolean showSystemKeyboard,
			boolean showExtendedKeyboard) {
		// no matter what we are doing ... hide the zoom controls
		// TODO: this is not working correctly as hiding the keyboard issues a
		// onScrollChange notification showing the control again ...
		uiHandler.removeMessages(UIHandler.HIDE_ZOOMCONTROLS);
		if (zoomControls.getVisibility() == View.VISIBLE)
			zoomControls.hide();
		InputMethodManager mgr;
		if (showSystemKeyboard) {
			// hide extended keyboard
			keyboardView.setVisibility(View.GONE);
			// show system keyboard
			mgr = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
			if (!mgr.isActive(sessionView))
				Log.e(TAG,
						"Failed to show system keyboard: SessionView is not the active view!");
			mgr.showSoftInput(sessionView, 0);
			keyboardState = true;
			// show modifiers keyboard
			// modifiersKeyboardView.setVisibility(View.VISIBLE);
		} else if (showExtendedKeyboard) {
			// hide system keyboard
			mgr = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
			mgr.hideSoftInputFromWindow(sessionView.getWindowToken(), 0);
			// show extended keyboard
			keyboardView.setKeyboard(specialkeysKeyboard);
			keyboardView.setVisibility(View.VISIBLE);
			modifiersKeyboardView.setVisibility(View.VISIBLE);
		} else {
			// hide both
			mgr = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
			mgr.hideSoftInputFromWindow(sessionView.getWindowToken(), 0);
			keyboardView.setVisibility(View.GONE);
			modifiersKeyboardView.setVisibility(View.GONE);
			// clear any active key modifiers)
			keyboardMapper.clearlAllModifiers();
			keyboardState = false;
			sessionView.setTouchPointerPadding(0, 0);
		}

		sysKeyboardVisible = showSystemKeyboard;
		extKeyboardVisible = showExtendedKeyboard;
	}

	private void closeSessionActivity(int resultCode) {
		// Go back to home activity (and send intent data back to home)
		setResult(resultCode, getIntent());
		finish();
	}

	// update the state of our modifier keys
	private void updateModifierKeyStates() {
		// check if any key is in the keycodes list

		List<Keyboard.Key> keys = modifiersKeyboard.getKeys();
		for (Iterator<Keyboard.Key> it = keys.iterator(); it.hasNext();) {
			// if the key is a sticky key - just set it to off
			Keyboard.Key curKey = it.next();
			if (curKey.sticky) {
				switch (keyboardMapper.getModifierState(curKey.codes[0])) {
				case KeyboardMapper.KEYSTATE_ON:
					curKey.on = true;
					curKey.pressed = false;
					break;

				case KeyboardMapper.KEYSTATE_OFF:
					curKey.on = false;
					curKey.pressed = false;
					break;

				case KeyboardMapper.KEYSTATE_LOCKED:
					curKey.on = true;
					curKey.pressed = true;
					break;
				}
			}
		}

		// refresh image
		modifiersKeyboardView.invalidateAllKeys();
	}

	private void sendDelayedMoveEvent(int x, int y) {
		if (uiHandler.hasMessages(UIHandler.SEND_MOVE_EVENT)) {
			uiHandler.removeMessages(UIHandler.SEND_MOVE_EVENT);
			discardedMoveEvents++;
		} else
			discardedMoveEvents = 0;

		if (discardedMoveEvents > MAX_DISCARDED_MOVE_EVENTS) {
			LibFreeRDP.sendCursorEvent(session.getInstance(), x, y,
					Mouse.getMoveEvent());
		} else {
			uiHandler.sendMessageDelayed(
					Message.obtain(null, UIHandler.SEND_MOVE_EVENT, x, y),
					SEND_MOVE_EVENT_TIMEOUT);
		}
	}

	private void cancelDelayedMoveEvent() {
		uiHandler.removeMessages(UIHandler.SEND_MOVE_EVENT);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.session_menu, menu);
		return true;
	}

	@SuppressLint("NewApi")
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.session_touch_pointer: {
			// toggle touch pointer
			if (touchPointerView.getVisibility() == View.VISIBLE) {
				touchPointerView.setVisibility(View.INVISIBLE);
				sessionView.setTouchPointerPadding(0, 0);
			} else {
				touchPointerView.movePointer(
						screen_width - touchPointerView.getPointerWidth()
								- touchPointerView.getPointerPosition()[0],
						100 - touchPointerView.getPointerPosition()[1]);
				touchPointerView.setVisibility(View.VISIBLE);

				Point p = mapScreenCoordToSessionCoord(screen_width
						- touchPointerView.getPointerWidth(), 0);
				LibFreeRDP.sendCursorEvent(session.getInstance(), p.x, p.y,
						Mouse.getMoveEvent());
			}
			break;
		}

		case R.id.session_sys_keyboard: {
			if (!sysKeyboardVisible) {
				uiHandler.sendMessage(Message.obtain(null,
						UIHandler.SCROLL_KEYBOARD, 1, 0));
			}
			showKeyboard(!sysKeyboardVisible, false);

			break;
		}

		case R.id.session_ext_keyboard: {
			showKeyboard(false, !extKeyboardVisible);
			break;
		}

		case R.id.session_disconnect: {
			showKeyboard(false, false);
			LibFreeRDP.disconnect(session.getInstance());
			break;
		}
		}

		return true;
	}

	@Override
	public void onBackPressed() {
		// hide keyboards (if any visible) or send alt+f4 to the session
		if (sysKeyboardVisible || extKeyboardVisible) {

			scrollSessionView(0, KEYBOARD_HEIGHT);
			showKeyboard(false, false);

		} else {
			AlertDialog.Builder builder = new AlertDialog.Builder(this);
			builder.setTitle(R.string.dlg_title_exit)
					.setMessage(R.string.dlg_msg_exit)
					.setPositiveButton(R.string.yes,
							new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog,
										int which) {
									showKeyboard(false, false);
									LibFreeRDP.disconnect(session.getInstance());
								}
							})
					.setNegativeButton(R.string.no,
							new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog,
										int which) {
									dialog.dismiss();
								}
							}).create().show();
		}
		// keyboardMapper.sendAltF4();
	}

	// android keyboard input handling
	// We always use the unicode value to process input from the android
	// keyboard except if key modifiers
	// (like Win, Alt, Ctrl) are activated. In this case we will send the
	// virtual key code to allow key
	// combinations (like Win + E to open the explorer).
	@Override
	public boolean onKeyDown(int keycode, KeyEvent event) {
		return keyboardMapper.processAndroidKeyEvent(event);
	}

	@Override
	public boolean onKeyUp(int keycode, KeyEvent event) {
		return keyboardMapper.processAndroidKeyEvent(event);
	}

	// onKeyMultiple is called for input of some special characters like umlauts
	// and some symbol characters
	@Override
	public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
		return keyboardMapper.processAndroidKeyEvent(event);
	}

	// ****************************************************************************
	// KeyboardView.KeyboardActionEventListener
	@Override
	public void onKey(int primaryCode, int[] keyCodes) {
		keyboardMapper.processCustomKeyEvent(primaryCode);
	}

	@Override
	public void onText(CharSequence text) {
	}

	@Override
	public void swipeRight() {
	}

	@Override
	public void swipeLeft() {
	}

	@Override
	public void swipeDown() {
	}

	@Override
	public void swipeUp() {
	}

	@Override
	public void onPress(int primaryCode) {
	}

	@Override
	public void onRelease(int primaryCode) {
	}

	// ****************************************************************************
	// KeyboardMapper.KeyProcessingListener implementation
	@Override
	public void processVirtualKey(int virtualKeyCode, boolean down) {
		// System.out.println("guojin:VirtualKey=>"+virtualKeyCode+"|"+down);
		Log.d(TAG, "guojin:VirtualKey : " + virtualKeyCode + "|" + down);
		LibFreeRDP.sendKeyEvent(session.getInstance(), virtualKeyCode, down);
	}

	@Override
	public void processUnicodeKey(int unicodeKey) {
		// System.out.println("guojin:UnicodeKey=>"+unicodeKey);
		Log.d(TAG, "UnicodeKey : " + unicodeKey);
		LibFreeRDP.sendUnicodeKeyEvent(session.getInstance(), unicodeKey);
	}

	@Override
	public void switchKeyboard(int keyboardType) {
		switch (keyboardType) {
		case KeyboardMapper.KEYBOARD_TYPE_FUNCTIONKEYS:
			keyboardView.setKeyboard(specialkeysKeyboard);
			break;

		case KeyboardMapper.KEYBOARD_TYPE_NUMPAD:
			keyboardView.setKeyboard(numpadKeyboard);
			break;

		case KeyboardMapper.KEYBOARD_TYPE_CURSOR:
			keyboardView.setKeyboard(cursorKeyboard);
			break;

		default:
			break;
		}
	}

	@Override
	public void modifiersChanged() {
		updateModifierKeyStates();
	}

	// ****************************************************************************
	// LibFreeRDP UI event listener implementation
	@Override
	public void OnSettingsChanged(int width, int height, int bpp) {

		if (bpp > 16)
			bitmap = Bitmap.createBitmap(width, height, Config.ARGB_8888);
		else
			bitmap = Bitmap.createBitmap(width, height, Config.RGB_565);

		session.setSurface(new BitmapDrawable(bitmap));

		// check this settings and initial settings - if they are not equal the
		// server doesn't support our settings
		// FIXME: the additional check (settings.getWidth() != width + 1) is for
		// the RDVH bug fix to avoid accidental notifications
		// (refer to android_freerdp.c for more info on this problem)
		BookmarkBase.ScreenSettings settings = session.getBookmark()
				.getActiveScreenSettings();
		if ((settings.getWidth() != width && settings.getWidth() != width + 1)
				|| settings.getHeight() != height
				|| settings.getColors() != bpp)
			uiHandler
					.sendMessage(Message.obtain(
							null,
							UIHandler.DISPLAY_TOAST,
							getResources().getText(
									R.string.info_capabilities_changed)));
	}

	@Override
	public void OnGraphicsUpdate(int x, int y, int width, int height) {
		LibFreeRDP.updateGraphics(session.getInstance(), bitmap, x, y, width,
				height);

		sessionView.addInvalidRegion(new Rect(x, y, x + width, y + height));

		/*
		 * since sessionView can only be modified from the UI thread any
		 * modifications to it need to be scheduled
		 */

		uiHandler.sendEmptyMessage(UIHandler.REFRESH_SESSIONVIEW);
	}

	@Override
	public void OnGraphicsResize(int width, int height) {
		// replace bitmap
		bitmap = Bitmap.createBitmap(width, height, bitmap.getConfig());
		session.setSurface(new BitmapDrawable(bitmap));

		/*
		 * since sessionView can only be modified from the UI thread any
		 * modifications to it need to be scheduled
		 */
		uiHandler.sendEmptyMessage(UIHandler.GRAPHICS_CHANGED);
	}

	private boolean callbackDialogResult;

	@Override
	public boolean OnAuthenticate(StringBuilder username, StringBuilder domain,
			StringBuilder password) {
		// this is where the return code of our dialog will be stored
		callbackDialogResult = false;

		// set text fields
		((EditText) userCredView.findViewById(R.id.editTextUsername))
				.setText(username);
		((EditText) userCredView.findViewById(R.id.editTextDomain))
				.setText(domain);
		((EditText) userCredView.findViewById(R.id.editTextPassword))
				.setText(password);

		// start dialog in UI thread
		uiHandler.sendMessage(Message.obtain(null, UIHandler.SHOW_DIALOG,
				dlgUserCredentials));

		// wait for result
		try {
			synchronized (dlgUserCredentials) {
				dlgUserCredentials.wait();
			}
		} catch (InterruptedException e) {
		}

		// clear buffers
		username.setLength(0);
		domain.setLength(0);
		password.setLength(0);

		// read back user credentials
		username.append(((EditText) userCredView
				.findViewById(R.id.editTextUsername)).getText().toString());
		domain.append(((EditText) userCredView
				.findViewById(R.id.editTextDomain)).getText().toString());
		password.append(((EditText) userCredView
				.findViewById(R.id.editTextPassword)).getText().toString());

		return callbackDialogResult;
	}

	@Override
	public boolean OnVerifiyCertificate(String subject, String issuer,
			String fingerprint) {

		// see if global settings says accept all
		if (GlobalInfoApplication.pref_security_acceptallcertificates)
			return true;

		// this is where the return code of our dialog will be stored
		callbackDialogResult = false;

		// set message
		String msg = getResources().getString(
				R.string.dlg_msg_verify_certificate);
		msg = msg + "\n\nSubject: " + subject + "\nIssuer: " + issuer
				+ "\nFingerprint: " + fingerprint;
		dlgVerifyCertificate.setMessage(msg);

		// start dialog in UI thread
		uiHandler.sendMessage(Message.obtain(null, UIHandler.SHOW_DIALOG,
				dlgVerifyCertificate));

		// wait for result
		try {
			synchronized (dlgVerifyCertificate) {
				dlgVerifyCertificate.wait();
			}
		} catch (InterruptedException e) {
		}

		return callbackDialogResult;
	}

	// ****************************************************************************
	// ScrollView2DListener implementation
	private void resetZoomControlsAutoHideTimeout() {
		uiHandler.removeMessages(UIHandler.HIDE_ZOOMCONTROLS);
		uiHandler.sendEmptyMessageDelayed(UIHandler.HIDE_ZOOMCONTROLS,
				ZOOMCONTROLS_AUTOHIDE_TIMEOUT);
	}

	@Override
	public void onScrollChanged(ScrollView2D scrollView, int x, int y,
			int oldx, int oldy) {
		zoomControls.setIsZoomInEnabled(!sessionView.isAtMaxZoom());
		zoomControls.setIsZoomOutEnabled(!sessionView.isAtMinZoom());
		if (!GlobalInfoApplication.pref_ui_hidezoomcontrols
				&& zoomControls.getVisibility() != View.VISIBLE)
			zoomControls.show();
		resetZoomControlsAutoHideTimeout();
	}

	// ****************************************************************************
	// SessionView.SessionViewListener
	@Override
	public void onSessionViewBeginTouch() {
		scrollView.setScrollEnabled(false);
	}

	@Override
	public void onSessionViewEndTouch() {
		scrollView.setScrollEnabled(true);
	}

	@Override
	public void onSessionViewLongClick(int x, int y) {
		Log.d(TAG, "longclick position: x=" + x + ",y=;" + y);

		/*
		 * if (!sysKeyboardVisible) { if (y > screen_height - KEYBOARD_HEIGHT) {
		 * scrollSessionView(1, KEYBOARD_HEIGHT); } else { scrollSessionView(-1,
		 * KEYBOARD_HEIGHT); } } else { scrollSessionView(0, KEYBOARD_HEIGHT); }
		 * 
		 * showKeyboard(!sysKeyboardVisible, false);
		 */
		onTouchPointerRightClick(x, y, true);
		onTouchPointerRightClick(x, y, false);
		/*
		 * LibFreeRDP.sendCursorEvent(session.getInstance(), x, y,
		 * Mouse.getLeftButtonEvent(true));
		 * LibFreeRDP.sendCursorEvent(session.getInstance(), x, y,
		 * Mouse.getLeftButtonEvent(false));
		 * LibFreeRDP.sendCursorEvent(session.getInstance(), x, y,
		 * Mouse.getLeftButtonEvent(true));
		 * LibFreeRDP.sendCursorEvent(session.getInstance(), x, y,
		 * Mouse.getLeftButtonEvent(false));
		 */
	}

	@Override
	public void onSessionViewLeftTouch(int x, int y, boolean down) {
		if (!down)
			cancelDelayedMoveEvent();
		dangqian_x_zuobiao = x;
		dangqian_y_zuobiao = y;
		shuangji_btn.setVisibility(View.VISIBLE);
		LibFreeRDP.sendCursorEvent(
				session.getInstance(),
				x,
				y,
				toggleMouseButtons ? Mouse.getRightButtonEvent(down) : Mouse
						.getLeftButtonEvent(down));

		if (!down)
			toggleMouseButtons = false;
	}

	public void onSessionViewRightTouch(int x, int y, boolean down) {
		if (!down)
			toggleMouseButtons = !toggleMouseButtons;
	}

	@Override
	public void onSessionViewMove(int x, int y) {
		sendDelayedMoveEvent(x, y);
	}

	@Override
	public void onSessionViewScroll(boolean down) {
		LibFreeRDP.sendCursorEvent(session.getInstance(), 0, 0,
				Mouse.getScrollEvent(down));
	}

	// ****************************************************************************
	// TouchPointerView.TouchPointerListener
	@Override
	public void onTouchPointerClose() {
		touchPointerView.setVisibility(View.INVISIBLE);
		sessionView.setTouchPointerPadding(0, 0);
	}

	private Point mapScreenCoordToSessionCoord(int x, int y) {
		int mappedX = (int) ((float) (x + scrollView.getScrollX()) / sessionView
				.getZoom());
		int mappedY = (int) ((float) (y + scrollView.getScrollY()) / sessionView
				.getZoom());
		if (mappedX > bitmap.getWidth())
			mappedX = bitmap.getWidth();
		if (mappedY > bitmap.getHeight())
			mappedY = bitmap.getHeight();
		return new Point(mappedX, mappedY);
	}

	@Override
	public void onTouchPointerLeftClick(int x, int y, boolean down) {
		Point p = mapScreenCoordToSessionCoord(x, y);
		LibFreeRDP.sendCursorEvent(session.getInstance(), p.x, p.y,
				Mouse.getLeftButtonEvent(down));
	}

	@Override
	public void onTouchPointerRightClick(int x, int y, boolean down) {
		Point p = mapScreenCoordToSessionCoord(x, y);
		LibFreeRDP.sendCursorEvent(session.getInstance(), p.x, p.y,
				Mouse.getRightButtonEvent(down));
	}

	@Override
	public void onTouchPointerMove(int x, int y) {
		Point p = mapScreenCoordToSessionCoord(x, y);
		LibFreeRDP.sendCursorEvent(session.getInstance(), p.x, p.y,
				Mouse.getMoveEvent());

		if (autoScrollTouchPointer
				&& !uiHandler.hasMessages(UIHandler.SCROLLING_REQUESTED)) {
			Log.v(TAG, "Starting auto-scroll");
			uiHandler.sendEmptyMessageDelayed(UIHandler.SCROLLING_REQUESTED,
					SCROLLING_TIMEOUT);
		}
	}

	@Override
	public void onTouchPointerScroll(boolean down) {
		LibFreeRDP.sendCursorEvent(session.getInstance(), 0, 0,
				Mouse.getScrollEvent(down));
	}

	@Override
	public void onTouchPointerToggleKeyboard() {
		showKeyboard(!sysKeyboardVisible, false);
	}

	@Override
	public void onTouchPointerToggleExtKeyboard() {
		showKeyboard(false, !extKeyboardVisible);
	}

	@Override
	public void onTouchPointerResetScrollZoom() {
		sessionView.setZoom(1.0f);
		scrollView.scrollTo(0, 0);
	}

	// 设置监听
	class gestureOverlayListener implements OnGesturePerformedListener {

		@Override
		public void onGesturePerformed(GestureOverlayView overlay,
				Gesture gesture) {
			// 识别手势: 通过 library 读取手势文件 ，在这里读取
			ArrayList<Prediction> predictions = library.recognize(gesture);
			// 去第一个就 是 取到的第一个
			Prediction prediction = predictions.get(0);
			// 提示值
			String str = "没有改手势";
			// 更加相似度 来 取得 区间（0.0~10.0 大致区间）
			if (prediction.score >= 3.0) {
				// 通过 name 来判断 值
				if (prediction.name.equals("error")) {
					str = "预留";
				} else if (prediction.name.equals("light")) {
					str = "预留";
				} else if (prediction.name.equals("none")) {
					if (touchPointerView.getVisibility() == View.VISIBLE) {
						touchPointerView.setVisibility(View.INVISIBLE);
						sessionView.setTouchPointerPadding(0, 0);
					} else {
						touchPointerView.movePointer(screen_width
								- touchPointerView.getPointerWidth()
								- touchPointerView.getPointerPosition()[0],
								100 - touchPointerView.getPointerPosition()[1]);
						touchPointerView.setVisibility(View.VISIBLE);

						Point p = mapScreenCoordToSessionCoord(screen_width
								- touchPointerView.getPointerWidth(), 0);
						LibFreeRDP.sendCursorEvent(session.getInstance(), p.x,
								p.y, Mouse.getMoveEvent());
					}

				} else if (prediction.name.equals("right")) {
					// 获取虚拟键盘高度
					SoftKeyboardUtil
							.observeSoftKeyboard(
									RdpMainActivity.this,
									new SoftKeyboardUtil.OnSoftKeyboardChangeListener() {
										@Override
										public void onSoftKeyBoardChange(
												int softKeyboardHeight,
												boolean visible) {
											if (!visible) {
												height1 = softKeyboardHeight;
											} else {
												height2 = softKeyboardHeight;
											}
											SoftKeybardHeight = height2
													- height1;
											// 用putString的方法保存数据
											editor.putInt("gaodu",
													SoftKeybardHeight);
											// 提交当前数据
											editor.commit();
										}
									});

					if (!keyboardState) {

					}
					int keyHeight = mySharedPreferences.getInt("gaodu", 0);
					if (keyHeight < 50) {
						keyHeight = KEYBOARD_HEIGHT;
					}
					scrollSessionView(1, keyHeight);
					showKeyboard(!sysKeyboardVisible, false);
				}
			}
		}
	}
}
