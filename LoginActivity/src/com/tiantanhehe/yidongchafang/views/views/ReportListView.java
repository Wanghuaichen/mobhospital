package com.tiantanhehe.yidongchafang.views.views;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.ListView;

public class ReportListView extends ListView {

	 public ReportListView(Context paramContext) {
	        super(paramContext);
	    }

	    public ReportListView(Context paramContext, AttributeSet paramAttributeSet) {
	        super(paramContext, paramAttributeSet);
	    }

	    public ReportListView(Context paramContext, AttributeSet paramAttributeSet,
	            int paramInt) {
	        super(paramContext, paramAttributeSet, paramInt);
	    }
	    
	    @Override
	    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
	        heightMeasureSpec = MeasureSpec.makeMeasureSpec(Integer.MAX_VALUE >> 2, MeasureSpec.AT_MOST);
	        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
	    }

}
