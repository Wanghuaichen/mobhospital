package com.tiantanhehe.yidongchafang.views.dialogs;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.views.views.DrawView;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;


/**
 * @ClassName: ColorPickerDialog
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月12日 上午11:00:37
 * 
 */
public class PenSelectorDialog extends Dialog implements android.view.View.OnClickListener {
	private final boolean debug = true;
	private final String TAG = "PenSelector";

	Context context;
	private String title;// 标题
	private int mInitialColor;// 初始颜色
	private OnPenChangedListener mListener;
	private float scale = 0.8f;

	/**
	 * 初始颜色黑色
	 * 
	 * @param context
	 * @param title
	 *            对话框标题
	 * @param listener
	 *            回调
	 */
	public PenSelectorDialog(Context context, String title, OnPenChangedListener listener) {
		this(context, Color.BLACK, title, listener);
	}

	/**
	 * 
	 * @param context
	 * @param initialColor
	 *            初始颜色
	 * @param title
	 *            标题
	 * @param listener
	 *            回调
	 */
	public PenSelectorDialog(Context context, int initialColor, String title, OnPenChangedListener listener) {
		super(context);
		this.context = context;
		mListener = listener;
		mInitialColor = initialColor;
		this.title = title;
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		WindowManager manager = getWindow().getWindowManager();
		int height = (int) (manager.getDefaultDisplay().getWidth() * 0.25f * scale);

		int width = (int) (manager.getDefaultDisplay().getHeight() * 0.7f * scale);

		// ColorPickerView myView = new ColorPickerView(context, height, width);

		setContentView(R.layout.dialog_penselector);
		LinearLayout ll_dialog_penselector = (LinearLayout) findViewById(R.id.ll_dialog_penselector);

		LayoutParams params = ll_dialog_penselector.getLayoutParams();
		params.width = width;
		params.height = height;

		ll_dialog_penselector.setLayoutParams(params);

		setTitle(title);

		TextView tv_pen_size_small = (TextView) findViewById(R.id.pen_size_small);
		TextView tv_pen_size_normal = (TextView) findViewById(R.id.pen_size_normal);
		TextView tv_pen_size_large = (TextView) findViewById(R.id.pen_size_large);
		TextView tv_pen_eraser = (TextView) findViewById(R.id.pen_eraser);

		tv_pen_size_small.setOnClickListener(this);
		tv_pen_size_normal.setOnClickListener(this);
		tv_pen_size_large.setOnClickListener(this);
		tv_pen_eraser.setOnClickListener(this);

	}



	/**
	 * 回调接口
	 * 
	 * @author <a href="clarkamx@gmail.com">LynK</a>
	 * 
	 *         Create on 2012-1-6 上午8:21:05
	 *
	 */
	public interface OnPenChangedListener {
		/**
		 * 回调函数
		 * 
		 * @param color
		 *            选中的颜色
		 */
		void penChanged(int penSize, int penType);
	}

	// public String getTitle() {
	// return title;
	// }
	//
	// public void setTitle(String title) {
	// this.title = title;
	// }

	public int getmInitialColor() {
		return mInitialColor;
	}

	public void setmInitialColor(int mInitialColor) {
		this.mInitialColor = mInitialColor;
	}

	public OnPenChangedListener getmListener() {
		return mListener;
	}

	public void setmListener(OnPenChangedListener mListener) {
		this.mListener = mListener;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see android.view.View.OnClickListener#onClick(android.view.View)
	 */
	@Override
	public void onClick(View v) {
		// TODO Auto-generated method stub
		switch (v.getId()) {
		case R.id.pen_size_small:
			mListener.penChanged(DrawView.SMALL_PEN_WIDTH, DrawView.STROKE_PEN);
			PenSelectorDialog.this.dismiss();
			break;
		case R.id.pen_size_normal:
			mListener.penChanged(DrawView.MIDDLE_PEN_WIDTH, DrawView.STROKE_PEN);
			PenSelectorDialog.this.dismiss();
			break;
		case R.id.pen_size_large:
			mListener.penChanged(DrawView.LARGE_PEN_WIDTH, DrawView.STROKE_PEN);
			PenSelectorDialog.this.dismiss();
			break;
		case R.id.pen_eraser:
			mListener.penChanged(DrawView.MIDDLE_ERASER_WIDTH, DrawView.STROKE_ERASER);
			PenSelectorDialog.this.dismiss();
			break;
		default:
			mListener.penChanged(DrawView.MIDDLE_PEN_WIDTH, DrawView.STROKE_PEN);

		}

	}
}
