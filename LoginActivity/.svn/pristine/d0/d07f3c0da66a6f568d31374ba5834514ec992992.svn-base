package com.tiantanhehe.yidongchafang.views.adapters;

import java.io.File;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.utils.DateUtil;
import com.tiantanhehe.yidongchafang.utils.MediaUtil;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuMultiMediaActivity;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.LayerDrawable;
import android.media.ThumbnailUtils;
import android.provider.MediaStore.Video;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
//import android.widget.LinearLayout.LayoutParams;
import android.view.ViewGroup.LayoutParams;
import android.view.WindowManager;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.VideoView;

/**************************************************
 * Created: 2015-12 Info:多媒体记录List Adapter
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Hooke <huke@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class MultiMediaAdapter extends BaseAdapter {

	private final List<Map<String, Object>> listData;
	private final LayoutInflater inflater;
	private final Context context;

	public MultiMediaAdapter(Context context, List<Map<String, Object>> data) {
		this.listData = data;
		this.context = context;
		inflater = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}

	@Override
	public int getCount() {
		return listData.size();
	}

	@Override
	public Object getItem(int position) {
		return listData.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	public void addPhoto(Bitmap loadImage, String photoTime){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("report_img", loadImage);
		map.put("report_time", photoTime);
		map.put("report_type", "photo");
		listData.add(0,map);
	    notifyDataSetChanged();  
	}  
	
	
	public void addVedioAudio(Object media, String collectTime,String Type){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("report_time", collectTime);
		map.put("report_type", Type);
		listData.add(0,map);
	    notifyDataSetChanged();  
	}  
	
	
	public void addlistData(List<Map<String, Object>> listData2 , boolean reflesh , int location) {
		// 过滤到本地已经存在的结果，并按照时间进行排序
		for(Map<String, Object> map : listData2){
			if(!isExist(map)){
				listData.add(map);
				if(map.get("report_type").equals("photo") &&  location == MediaUtil.NETWORK_MEDIA){
					((YiDongYiHuMultiMediaActivity) context).saveLocalPhoto(map);

				}
				
				if(map.get("report_type").equals("vedio") &&  location == MediaUtil.NETWORK_MEDIA){
					((YiDongYiHuMultiMediaActivity) context).saveLocalVedioAudio(map);
				}
				
				if(map.get("report_type").equals("audio") &&  location == MediaUtil.NETWORK_MEDIA){
					((YiDongYiHuMultiMediaActivity) context).saveLocalVedioAudio(map);
				}
			}
		}
		
		
		Collections.sort(listData, new Comparator<Map<String, Object>>() {
			@Override
			public int compare(Map<String, Object> object1, Map<String, Object> object2) {

				return ((String) object1.get("report_time")).compareTo((String) object2.get("report_time"));
			}
		}); 
		
		Collections.reverse(listData);
		
//		listData.addAll(listData2);
		if(reflesh){
			notifyDataSetChanged();
		}
	}
	
	public boolean isExist(Map<String, Object> map){
		for(Map<String, Object> existMap : this.listData){
			if(map.get("report_time").equals(existMap.get("report_time"))){
				return true;
			}
		}
		
		return false;
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public View getView(int position, View view, ViewGroup parent) {

		if(listData==null){
			return view;
		}
			view = inflater.inflate(R.layout.jiancha_report_list_item, null);
			ImageView jiancha_report_img = (ImageView) view.findViewById(R.id.jiancha_report_img);
			TextView jiancha_report_time = (TextView) view.findViewById(R.id.jiancha_report_time);
			TextView jiancha_report_vedio_audio = (TextView) view.findViewById(R.id.jiancha_report_vedio_audio);
			VideoView jiancha_report_vedio = (VideoView)view.findViewById(R.id.jiancha_report_vedio);
			String timeString = DateUtil.formatChange((String) listData.get(position).get("report_time"));
			if(listData.get(position).get("report_img")!=null){

				Bitmap bitmap = (Bitmap) listData.get(position).get("report_img");
				LayoutParams para;  
		        para = jiancha_report_img.getLayoutParams(); 
		        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
		        int screenwidth = wm.getDefaultDisplay().getWidth();
//		        para.height = (screenwidth) * bitmap.getHeight() / bitmap.getWidth();
		        para.height = 500;
		        para.width = 500;
		        jiancha_report_img.setLayoutParams(para);			
				jiancha_report_img.setImageBitmap(bitmap);
				jiancha_report_vedio_audio.setVisibility(View.GONE);
//				jiancha_report_vedio_audio.setText(timeString + ".jpg");
				
				jiancha_report_vedio.setVisibility(View.GONE);
			jiancha_report_time.setText("采集时间：" + timeString + "（图片）");
			}else{
//				jiancha_report_img.setVisibility(View.GONE);
				
				if(listData.get(position).get("report_type").equals("vedio")){
//				        MediaController mc = new MediaController(context); 
//				        MediaController mc = (MediaController) view.findViewById(R.id.jiancha_report_vedio_crl);
//				        mc.setAnchorView(jiancha_report_vedio);
//				        mc.setMediaPlayer(jiancha_report_vedio);
//				        mc.show();
//				        jiancha_report_vedio.setMediaController(mc);
				String jianyan_id = ((YiDongYiHuMultiMediaActivity) context).getIntent().getStringExtra("id");
						String report_time = (String) listData.get(position).get("report_time");
	                	String vedioPath = MediaUtil.VEDIO_PATH_PREFIX 
	                			+ jianyan_id + File.separator 
	                			+ report_time
	                			+ ".3gp";
	                	
	                	Bitmap  bitmap = MediaUtil.loadCachePhoto(jianyan_id, report_time);
	                	if(bitmap == null){
	                		bitmap = ThumbnailUtils.createVideoThumbnail(vedioPath,Video.Thumbnails.MINI_KIND);
	                		MediaUtil.saveCachePhoto(bitmap, jianyan_id, report_time);
	                	}
	                	
	                	Bitmap 	play = ((BitmapDrawable) context.getResources().getDrawable(R.drawable.videoplay)).getBitmap();
	                	try{
	                	Drawable[] array = new Drawable[2];  
	                    array[0] = new BitmapDrawable(bitmap);  
	                    array[1] = new BitmapDrawable(play);  
	//                    array[1].setBounds(0, 0, 10, 10);
	                    LayerDrawable la = new LayerDrawable(array);
	                    int x = (bitmap.getWidth() - play.getWidth())/2;
	                    int y = (bitmap.getHeight() - play.getHeight())/2;
	                    la.setLayerInset(0, 0, 0, 0, 0);
	                    la.setLayerInset(1, x, y, x, y);
	//                    la.setLayerInset(1, 100, 100, 10, 10);
	                    
	        			LayoutParams para;  
	    		        para = jiancha_report_img.getLayoutParams(); 
	    		        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
	    		        int screenwidth = wm.getDefaultDisplay().getWidth();
//	    		        para.height = (screenwidth - 10) * bitmap.getHeight() / bitmap.getWidth();
	    		        para.height = 500;
	    		        para.width = 500;
	    		        jiancha_report_img.setLayoutParams(para);			
	//    				jiancha_report_img.setImageBitmap(bitmap);
	    		        jiancha_report_img.setImageDrawable(la);
	    				jiancha_report_img.setVisibility(View.VISIBLE);
	//			        jiancha_report_vedio.setVideoURI(Uri.parse(vedioPath));
	//			        jiancha_report_vedio.requestFocus(); 
	                	}catch(Exception e){
	                		e.printStackTrace();
	                	}
			        jiancha_report_vedio.setVisibility(View.GONE);
			        jiancha_report_vedio_audio.setVisibility(View.GONE);
//					jiancha_report_vedio_audio.setText(timeString + ".3gp");
				jiancha_report_time.setText("采集时间：" + timeString + "（录像）");
				}else if(listData.get(position).get("report_type").equals("audio")){
//					jiancha_report_vedio_audio.setText(timeString + ".amr");
					jiancha_report_vedio_audio.setVisibility(View.GONE);
					jiancha_report_vedio.setVisibility(View.GONE);
					jiancha_report_img.setImageResource(R.drawable.luyin);
					LayoutParams params = jiancha_report_img.getLayoutParams(); ;
					params.width = LayoutParams.WRAP_CONTENT;
					params.height = LayoutParams.WRAP_CONTENT;
					jiancha_report_img.setLayoutParams(params);
//					jiancha_report_img.setBackgroundColor(Color.WHITE);

				jiancha_report_time.setText("采集时间：" + timeString + "（录音）");
				}else{
					jiancha_report_vedio_audio.setText(timeString + "");
					jiancha_report_vedio.setVisibility(View.GONE);
				jiancha_report_time.setText("采集时间：" + timeString + "（其他）");
				}
			}

		return view;
	}
	
    private static class ViewHolder
    {
    	ImageView jiancha_report_img;
		TextView jiancha_report_time;
		TextView jiancha_report_vedio_audio;
		VideoView jiancha_report_vedio ;
    }
	

	public List<Map<String, Object>> getListData() {
		return listData;
	}

}
