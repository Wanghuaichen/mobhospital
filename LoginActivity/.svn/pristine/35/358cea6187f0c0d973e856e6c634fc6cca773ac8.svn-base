/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ColorCommandView.java
 * @Package com.tiantanhehe.yidongchafang.views.views
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月9日 下午7:13:38 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.views;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Paint.Style;
import android.util.AttributeSet;
import android.view.View;

/**
 * @ClassName: ColorCommandView
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月9日 下午7:13:38
 * 
 */
public class ColorCommandView extends View {
	private Paint paint;
	private float radius;
	private int width;
	private int height;
	private int circleColor = Color.RED;
	private int ringColor = Color.GRAY;

	/**
	 * @Title:ColorCommandView
	 * @Description: 构造方法
	 * @param context
	 * @param attrs
	 */
	public ColorCommandView(Context context, AttributeSet attrs) {
		this(context, attrs, 0);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @Title:ColorCommandView
	 * @Description: 构造方法
	 * @param context
	 */
	public ColorCommandView(Context context) {
		this(context, null);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @Title:ColorCommandView
	 * @Description: 构造方法
	 * @param context
	 * @param attrs
	 * @param defStyleAttr
	 */
	public ColorCommandView(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		// TODO Auto-generated constructor stub
		paint = new Paint();
		paint.setColor(circleColor);
		paint.setAntiAlias(true);

		radius = 10;

	}

	@Override
	protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
		super.onMeasure(widthMeasureSpec, heightMeasureSpec);
		width = MeasureSpec.getSize(widthMeasureSpec);
		height = MeasureSpec.getSize(heightMeasureSpec);

	}

	@Override
	protected void onDraw(Canvas canvas) {
		radius = (float) height * 0.3f;
		paint.setStyle(Style.FILL);
		paint.setColor(circleColor);
		canvas.drawCircle(width / 2, height / 2, radius, paint);
		paint.setStyle(Style.STROKE);
		paint.setStrokeWidth(radius * 0.22f);
		paint.setColor(ringColor);
		canvas.drawCircle(width / 2, height / 2, radius * 1.2f, paint);
		paint.setColor(circleColor);

	}

	public void setPaintColor(int color) {
		circleColor = color;
		paint.setColor(color);
		invalidate();
	}

	/**
	 * @Title: setRingColor
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月9日 下午8:14:04
	 * @param white
	 */
	public void setRingColor(int color) {
		ringColor = color;
		invalidate();

	}

}
