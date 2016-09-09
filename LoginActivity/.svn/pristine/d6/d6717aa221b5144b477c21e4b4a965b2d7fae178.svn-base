/**
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: CustomListview.java
 * @Package com.tiantanhehe.mobileemr.view
 * @Description: TODO
 * @author Hu Ri Chang <tianran@tiantanhehe.com>
 * @date 2016-1-27 下午4:07:00
 * @version V4.0
 */
package com.tiantanhehe.yidongchafang.views.views;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.ListView;


/**
 * @ClassName: CustomListview
 * @Description: TODO
 * @author Tian Ran <tianran@tiantanhehe.com>
 * @date 2016-1-27 下午4:07:00
 * 
 */
public class CustomListview extends ListView {

	/**
	 * @Title:CustomListview
	 * @Description: 构造方法
	 * @param context
	 */
	public CustomListview( Context context ) {
		super(context);
		// TODO Auto-generated constructor stub
	}


	public CustomListview( Context context, AttributeSet attrs ) {
		super(context, attrs);
	}


	public CustomListview( Context context, AttributeSet attrs, int defStyle ) {
		super(context, attrs, defStyle);
	}


	/* (non-Javadoc)
	 * @see android.widget.ListView#onMeasure(int, int)
	 * 重写onMeasure方法，达到使ListView适应ScrollView的效果
	 */
	@Override
	protected void onMeasure( int widthMeasureSpec, int heightMeasureSpec ) {
		// TODO Auto-generated method stub

		int expandSpec = MeasureSpec.makeMeasureSpec(Integer.MAX_VALUE >> 2, MeasureSpec.AT_MOST);
		super.onMeasure(widthMeasureSpec, expandSpec);
	}
}
