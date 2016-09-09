package com.tiantanhehe.yidongchafang.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.tiantanhehe.yidongchafang.views.views.DrawView;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.PorterDuff.Mode;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.Drawable;

public class BitmapUtil
{
	@SuppressWarnings("unused")
	private DrawView canvasView;
    
	/* 对图片生成一备份 */
	public static Bitmap duplicateBitmap(Bitmap bmpSrc) {
		if (null == bmpSrc) {
			return null;
		}

		int bmpSrcWidth = bmpSrc.getWidth();
		int bmpSrcHeight = bmpSrc.getHeight();

		// Bitmap bmpDest = Bitmap.createBitmap(bmpSrc, 0, 0, bmpSrcWidth,
		// bmpSrcHeight);
		Bitmap bmpDest = Bitmap.createBitmap(bmpSrcWidth, bmpSrcHeight, Bitmap.Config.ARGB_8888);
		if (null != bmpDest) {
			Canvas canvas = new Canvas(bmpDest);
			final Rect rect = new Rect(0, 0, bmpSrcWidth, bmpSrcHeight);
			canvas.drawColor(Color.TRANSPARENT);
			canvas.drawBitmap(bmpSrc, rect, rect, null);
		}

		return bmpDest;
	}

	/* 对图片按照比例生成一备份 */
	public static Bitmap duplicateBitmap(Bitmap bmpSrc, float scale)
    {
		if (null == bmpSrc)
        {
            return null;
        }
        
		int bmpSrcWidth = bmpSrc.getWidth();
		int bmpSrcHeight = bmpSrc.getHeight();


		// Bitmap bmpDest = Bitmap.createBitmap(bmpSrc, 0, 0, bmpSrcWidth,
		// bmpSrcHeight);
		Matrix matrix = new Matrix();
		matrix.postScale(scale, scale);

		Bitmap bmpDest = Bitmap.createBitmap(bmpSrc, 0, 0, bmpSrcWidth, bmpSrcHeight, matrix, true);
		if (null != bmpDest) {
			Canvas canvas = new Canvas(bmpDest);
			int rectWidth = (int) (bmpSrcWidth * scale);
			int rectHeight = (int) (bmpSrcHeight * scale);

			final Rect rect = new Rect(0, 0, rectWidth, rectHeight);
			canvas.drawColor(Color.TRANSPARENT);
			canvas.drawBitmap(bmpDest, null, rect, null);
		}
        
		return bmpDest;
    }
    
	/* 位图和字节数组的相互转换，便于存储于读取 */
    public static Bitmap byteArrayToBitmap(byte[] array)
    {
        if (null == array)
        {
            return null;
        }
        
        return BitmapFactory.decodeByteArray(array, 0, array.length);
    }
    public static byte[] bitampToByteArray(Bitmap bitmap)
    {
        byte[] array = null;
        try 
        {
            if (null != bitmap)
            {
                ByteArrayOutputStream os = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, os);
                array = os.toByteArray();
                os.close();
            }
        } 
        catch (IOException e) 
        {
            e.printStackTrace();
        }
        
        return array;
    }

	/* 将图片保存到SDCard */
    public static void saveBitmapToSDCard(Bitmap bmp, String strPath)
    {
        if (null != bmp && null != strPath && !strPath.equalsIgnoreCase(""))
        {
            try
            {
                File file = new File(strPath);
                FileOutputStream fos = new FileOutputStream(file);
            	byte[] buffer = BitmapUtil.bitampToByteArray(bmp);
                fos.write(buffer);
                fos.close();
            }
            catch (FileNotFoundException e)
            {
                e.printStackTrace();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
    }

	/* 将图片保存到SDCard */
	public static String saveBitmapToSDCard(Bitmap bmp, String strPath, int flag) {
		String result = null;
		if (null != bmp && null != strPath && !strPath.equalsIgnoreCase("")) {
			File path = new File(strPath);
			if (!path.exists()) {
				path.mkdir();
			}

			try {
				result = strPath + File.separator + DateUtil.getCurrentTime("-") + ".jpeg";
				File file = new File(result);

				if (!file.exists()) {
					file.createNewFile();
				}

				FileOutputStream fos = new FileOutputStream(file);
				// byte[] buffer = BitmapUtil.bitampToByteArray(bmp);
				bmp.compress(Bitmap.CompressFormat.JPEG, 100, fos);
				fos.flush();
				fos.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			

		}
		return result;

	}

	/**
	 * @Title: loadBitmapFromSDCard
	 * @Description: 从SD卡读取原图
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月10日 下午4:15:33
	 * @param strPath
	 * @return
	 */
    public static Bitmap loadBitmapFromSDCard(String strPath)
    {
		File file = new File(strPath);
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			BitmapFactory.Options options = new BitmapFactory.Options();
			options.inJustDecodeBounds = false;
			// options.inSampleSize = 2; // width，hight设为原来的二分一
			Bitmap btp = BitmapFactory.decodeStream(fis, null, options);
			return btp;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return null;
	}

	/**
	 * @Title: loadBitmapFromSDCard
	 * @Description: 根据采样率从SD卡读取相关图
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年5月10日 下午4:15:26
	 * @param strPath
	 * @param sample
	 * @return
	 */
	public static Bitmap loadBitmapFromSDCard(String strPath, int sample) {
		File file = new File(strPath);
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			BitmapFactory.Options options = new BitmapFactory.Options();
			options.inJustDecodeBounds = false;
			options.inSampleSize = sample;
			Bitmap btp = BitmapFactory.decodeStream(fis, null, options);
			return btp;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}

		return null;
    }

	public static Bitmap getRoundedCornerBitmap(Bitmap bmpSrc, float rx, float ry) {
		if (null == bmpSrc) {
			return null;
		}

		int bmpSrcWidth = bmpSrc.getWidth();
		int bmpSrcHeight = bmpSrc.getHeight();

		Bitmap bmpDest = Bitmap.createBitmap(bmpSrcWidth, bmpSrcHeight, Config.ARGB_8888);
		if (null != bmpDest) {
			Canvas canvas = new Canvas(bmpDest);
			final int color = 0xff424242;
			final Paint paint = new Paint();
			final Rect rect = new Rect(0, 0, bmpSrcWidth, bmpSrcHeight);
			final RectF rectF = new RectF(rect);

			// Setting or clearing the ANTI_ALIAS_FLAG bit AntiAliasing smooth
			// out
			// the edges of what is being drawn, but is has no impact on the
			// interior of the shape.
			paint.setAntiAlias(true);
			canvas.drawColor(Color.TRANSPARENT);
			// canvas.drawARGB(0, 0, 0, 0);
			paint.setColor(color);
			canvas.drawRoundRect(rectF, rx, ry, paint);
			paint.setXfermode(new PorterDuffXfermode(Mode.SRC_IN));
			canvas.drawBitmap(bmpSrc, rect, rect, paint);
		}

		return bmpDest;
	}


	public static Bitmap getScaleBitmap(Bitmap bitmap, float wScale, float hScale) {
		Matrix matrix = new Matrix();
		matrix.postScale(wScale, hScale);
		Bitmap bmp = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);

		return bmp;
	}

	public static Bitmap getSizedBitmap(Bitmap bitmap, int dstWidth, int dstHeight) {
		if (null != bitmap) {
			Bitmap result = Bitmap.createScaledBitmap(bitmap, dstWidth, dstHeight, false);
			return result;
		}

		return null;
	}

	public static Bitmap getFullScreenBitmap(Bitmap bitmap, int wScale, int hScale) {
		int dstWidth = bitmap.getWidth() * wScale;
		int dstHeight = bitmap.getHeight() * hScale;
		Bitmap result = Bitmap.createScaledBitmap(bitmap, dstWidth, dstHeight, false);
		return result;
	}


	public static void saveBitmapToFile(Context context, Bitmap bmp, String name) {
		if (null != context && null != bmp && null != name && name.length() > 0) {
			try {
				FileOutputStream fos = context.openFileOutput(name, Context.MODE_WORLD_WRITEABLE);
				bmp.compress(Bitmap.CompressFormat.PNG, 100, fos);
				fos.flush();
				fos.close();
				fos = null;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static Bitmap loadBitmapFromFile(Context context, String name) {
		Bitmap bmp = null;

		try {
			if (null != context && null != name && name.length() > 0) {
				FileInputStream fis = context.openFileInput(name);
				bmp = BitmapFactory.decodeStream(fis);
				fis.close();
				fis = null;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return bmp;
	}

	public static Bitmap drawableToBitmap(Drawable drawable) {
		if (null == drawable) {
			return null;
		}

		int width = drawable.getIntrinsicWidth();
		int height = drawable.getIntrinsicHeight();
		Config config = (drawable.getOpacity() != PixelFormat.OPAQUE) ? Config.ARGB_8888 : Config.RGB_565;

		Bitmap bitmap = Bitmap.createBitmap(width, height, config);

		if (null != bitmap) {
			Canvas canvas = new Canvas(bitmap);
			drawable.setBounds(0, 0, width, height);
			canvas.drawColor(Color.TRANSPARENT);
			drawable.draw(canvas);
		}

		return bitmap;
	}

}
