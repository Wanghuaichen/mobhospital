package com.tiantanhehe.yidongchafang.common.note;

import com.tiantanhehe.yidongchafang.views.views.IDraw;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.Log;

/**
 * @ClassName: OvaluCtl
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月10日 下午12:26:50
 * 
 */
public class OvaluCtl implements IDraw{
	private Paint mPaint=new Paint();
    private boolean m_hasDrawn = false; 
    private RectF rectf=new RectF();  
    public OvaluCtl(int penSize, int penColor)
    {
    	mPaint.setAntiAlias(true);
        mPaint.setDither(true);
        mPaint.setColor(penColor);
        mPaint.setStyle(Paint.Style.STROKE);
        mPaint.setStrokeJoin(Paint.Join.ROUND);
        mPaint.setStrokeCap(Paint.Cap.ROUND);
		mPaint.setStrokeWidth(penSize);// ���û��ʴ�ϸ
    }
	
	public void draw(Canvas canvas) {
		// TODO Auto-generated method stub
		if (null != canvas)
        {
			canvas.drawOval(rectf, mPaint); 
			Log.i("sada022", "Ovalʵ����");
        }
	}
	public boolean hasDraw() {
		// TODO Auto-generated method stub
		return m_hasDrawn;
		//return false;
	}	
	public void cleanAll() {
		// TODO Auto-generated method stub	
	}	
	public void touchDown(float x, float y) {
		// TODO Auto-generated method stub
		rectf.left=x;
		rectf.top=y;
		rectf.right=x;
		rectf.bottom=y;
	}
	public void touchMove(float x, float y) {
		// TODO Auto-generated method stub
		rectf.right=x;
		rectf.bottom=y;
		m_hasDrawn = true;// ��ʾ�Ѿ�������
	}	
	public void touchUp(float x, float y) {
		// TODO Auto-generated method stub
		rectf.right=x;
		rectf.bottom=y;
	}

}
