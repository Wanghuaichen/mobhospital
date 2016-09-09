/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: TipNoteActivity.java
 * @Package com.tiantanhehe.yidongchafang.views.activities.tools
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月11日 上午11:17:50 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.activities.tools;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.utils.BitmapUtil;
import com.tiantanhehe.yidongchafang.utils.DateUtil;
import com.tiantanhehe.yidongchafang.utils.MediaUtil;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuMultiMediaActivity;
import com.tiantanhehe.yidongchafang.views.dialogs.ColorPickerDialog;
import com.tiantanhehe.yidongchafang.views.dialogs.PenSelectorDialog;
import com.tiantanhehe.yidongchafang.views.views.ColorCommandView;
import com.tiantanhehe.yidongchafang.views.views.DrawView;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.view.ViewGroup.LayoutParams;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Toast;

/**
 * @ClassName: TipNoteActivity
 * @Description: 便签界面
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月11日 上午11:17:50
 * 
 */
public class TipNoteActivity extends YiDongYiHuMultiMediaActivity implements View.OnClickListener {

	private LinearLayout ll_note_draw;
	// private LinearLayout ll_note_cmd;
	private RelativeLayout rl_note_cmd;
	private DrawView m_drawview;
	private EditText m_editview;
	private ColorPickerDialog colorPickerDialog;
	private PenSelectorDialog penSelectorDialog;
	private ColorCommandView colorCommandView;

	public static String BLANK_NOTE = "blank";
	public static String SCREENSNOT_NOTE = "screensnot";
	public static String PHOTO_NOTE = "photo";
	public static String TEXT_NOTE = "text";
	public final static int NOTE_SIZE_CMD = 1;
	public final static int NOTE_ERASER_CMMD = 2;
	public static final int LOAD_BITMAP = 1;
	public float scale = 0.8f;
	public static int NOT_CMD_OFFSET = 0;




	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.activity_tip_note);
		ll_note_draw = (LinearLayout) this.findViewById(R.id.ll_tip_note_draw);
		m_drawview = (DrawView) this.findViewById(R.id.drawview);
		m_editview = (EditText) this.findViewById(R.id.editview);
		colorCommandView = (ColorCommandView) this.findViewById(R.id.view_tip_note_color);

		// ll_note_cmd = (LinearLayout) this.findViewById(R.id.ll_tip_note_cmd);
		rl_note_cmd = (RelativeLayout) this.findViewById(R.id.rl_tip_note_cmd);

		int disPlayWidth = getWindowManager().getDefaultDisplay().getWidth();
		int disPlayHeight = getWindowManager().getDefaultDisplay().getHeight();

		disPlayWidth = (int) (disPlayWidth * scale);
		disPlayHeight = (int) (disPlayHeight * scale);

		// m_drawview
		Intent intent = getIntent();
		String note_type = intent.getStringExtra("note_type");

		Log.d("tiantan", "[UI]" + "[tipnoteactivity]" + "onCreate note_type:" + note_type);
		if (note_type.equals(TEXT_NOTE)) {
			m_drawview.setVisibility(View.GONE);
			m_editview.setVisibility(View.VISIBLE);
			LayoutParams params = (LayoutParams) rl_note_cmd.getLayoutParams();
			params.width = disPlayWidth - NOT_CMD_OFFSET;
			rl_note_cmd.setLayoutParams(params);

			params = (LayoutParams) m_drawview.getLayoutParams();
			params.width = (int) (disPlayWidth * scale);
			params.height = (int) (disPlayHeight * scale / 2);
			m_editview.setLayoutParams(params);

		} else {

			m_drawview.setVisibility(View.VISIBLE);
			m_editview.setVisibility(View.GONE);

			// 动态设置底部菜单长度

			LayoutParams params = (LayoutParams) rl_note_cmd.getLayoutParams();
			params.width = disPlayWidth - NOT_CMD_OFFSET;
			rl_note_cmd.setLayoutParams(params);

			// 动态设置画布长宽
			params = (LayoutParams) m_drawview.getLayoutParams();
			params.width = disPlayWidth;
			params.height = disPlayHeight;
			m_drawview.setLayoutParams(params);
			myHandler.postDelayed(runnable, 0);

		}
		
		setCmdSelect(NOTE_SIZE_CMD);

		colorCommandView.setOnTouchListener(new OnTouchListener() {

			@Override
			public boolean onTouch(View v, MotionEvent event) {
				// TODO Auto-generated method stub

				if (event.getAction() == MotionEvent.ACTION_UP) {

					colorCommandView.setRingColor(Color.GRAY);
				} else {
					colorCommandView.setRingColor(Color.WHITE);
				}

				return false;
			}
		});

	}


	Handler myHandler = new Handler() {

		@Override
		public void handleMessage(Message msg) {

			switch (msg.what) {
			case LOAD_BITMAP:
				Intent intent = getIntent();
				String note_type = intent.getStringExtra("note_type");
				if (note_type.equals(SCREENSNOT_NOTE)) {
					String bitmapPath = intent.getStringExtra("bitmap");
					if (bitmapPath == null) {
						return;
					}
					Bitmap bitmap = BitmapUtil.loadBitmapFromSDCard(bitmapPath);
					if (bitmap != null) {
						m_drawview.setForeBitmap(bitmap);
					}
				} else if (note_type.equals(PHOTO_NOTE)) {
					String bitmapPath = intent.getStringExtra("bitmap");
					Log.d("tiantan", "[UI]" + "[tipnoteactivity]" + "handleMessage bitmapPath:" + bitmapPath);
					if (bitmapPath == null) {
						return;
					}
					Bitmap bitmap = BitmapUtil.loadBitmapFromSDCard(bitmapPath, 3);
					if (bitmap != null) {
						m_drawview.setForeBitmap(bitmap);
					}
				}
				break;
			default:

			}
			super.handleMessage(msg);
		}
	};

	Runnable runnable = new Runnable() {

		@Override
		public void run() {
			Message message = new Message();
			message.what = TipNoteActivity.LOAD_BITMAP;

			TipNoteActivity.this.myHandler.sendMessage(message);

		}
	};

	@Override
	public void onResume() {
		super.onResume();
		DrawView.setStrokeColor(Color.RED);

	}


	@Override
	public void onClick(View v) {
		// m_drawview.getCanvasSnapshot();

	}

	public void pickColor(View v) {
		colorPickerDialog = new ColorPickerDialog(context, DrawView.getStrokeColor(), "画笔颜色选择",
				new ColorPickerDialog.OnColorChangedListener() {
			
			@Override
			public void colorChanged(int color) {
						DrawView.setStrokeColor(color);
						colorCommandView.setPaintColor(color);
			}
		});
		colorPickerDialog.show();
		// (findViewById(R.id.button_tip_note_color)).requestFocus();
	}

	public void selectPen(View v) {
		penSelectorDialog = new PenSelectorDialog(context, "画笔大小种类选择", new PenSelectorDialog.OnPenChangedListener() {

			@Override
			public void penChanged(int penSize, int penType) {
				DrawView.setStrokeSize(penSize, penType);
				m_drawview.setStrokeType(penType);
			}
		});
		penSelectorDialog.show();
		(findViewById(R.id.button_tip_note_size)).requestFocus();
		setCmdSelect(NOTE_SIZE_CMD);
	}

	public void selectEraser(View v) {
		DrawView.setStrokeSize(DrawView.MIDDLE_ERASER_WIDTH, DrawView.STROKE_ERASER);
		m_drawview.setStrokeType(DrawView.STROKE_ERASER);
		(findViewById(R.id.button_tip_note_eraser)).requestFocus();
		setCmdSelect(NOTE_ERASER_CMMD);
	}

	/**
	 * @Title: setCmdSelect
	 * @Description: 设置某个菜单选中状态
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月9日 下午6:46:03
	 */
	private void setCmdSelect(int cmd) {
		// TODO Auto-generated method stub
		(findViewById(R.id.button_tip_note_size)).setSelected(false);
		(findViewById(R.id.button_tip_note_eraser)).setSelected(false);
		
		switch(cmd){
		case NOTE_SIZE_CMD:
			(findViewById(R.id.button_tip_note_size)).setSelected(true);
			break;
		case NOTE_ERASER_CMMD:
			(findViewById(R.id.button_tip_note_eraser)).setSelected(true);
			break;
		default:

		}

	}

	public void saveTipNote(View v) {

		// Bitmap bitmap = m_drawview.getCanvasSnapshot();
		Bitmap bitmap = this.getNoteTipSnapshot();
		String noteTime = DateUtil.getCurrentTime("-");
		// String savedNotePath = BitmapUtil.saveBitmapToSDCard(bitmap,
		// MediaUtil.NOTE_PATH_PREFIX +
		// current_application.appConf.current_patient_zhuyuan_id,
		// 1);

		String savedNotePath = MediaUtil.savePhotoToSDCard(bitmap,
				current_application.appConf.current_patient_zhuyuan_id, noteTime);
		Toast.makeText(this, "便签已保存", Toast.LENGTH_SHORT).show();

		// 上传便签

		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("jianyan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("media_type", "photo"));
		pairList.add(new BasicNameValuePair("label", item_type));
		pairList.add(new BasicNameValuePair("time", noteTime));

		String url = current_application.appConf.server_url + "Common/Data/uploadVAAndroid";
		Log.d("tiantan", "封装上传参数");
		upLoadVedioAudio(savedNotePath, url, pairList);

		this.finish();
	}

	/**
	 * @Title: getNoteTipSnapshot
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月15日 下午5:46:32
	 * @return
	 */
	private Bitmap getNoteTipSnapshot() {
		Bitmap bitmap = null;
		if (ll_note_draw != null) {
			ll_note_draw.setDrawingCacheEnabled(true);
			ll_note_draw.buildDrawingCache();
			bitmap = ll_note_draw.getDrawingCache(true);
		}

		return bitmap;
	}

	public void clearTipNote(View v) {
		m_drawview.clearAllStrokes();
		myHandler.postDelayed(runnable, 0);

	}

	public void cancelTipNote(View v) {
		this.finish();
	}

}
