
package com.tiantanhehe.yidongchafang.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.widget.DatePicker;
import android.widget.DatePicker.OnDateChangedListener;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.TimePicker.OnTimeChangedListener;

/**
 * 日期时间选择控件 使用方法： private EditText inputDate;//需要设置的日期时间文本编辑框 private String
 * initDateTime="2012年9月3日 14:44",//初始日期时间值 在点击事件中使用：
 * inputDate.setOnClickListener(new OnClickListener() {
 * 
 * @Override public void onClick(View v) { DateTimePickDialogUtil
 * dateTimePicKDialog=new
 * DateTimePickDialogUtil(SinvestigateActivity.this,initDateTime);
 * dateTimePicKDialog.dateTimePicKDialog(inputDate); } });
 * @author
 */
public class DateTimePickDialogUtil implements OnDateChangedListener, OnTimeChangedListener
{
    private DatePicker datePicker;
    private TimePicker timePicker;
    private AlertDialog ad;
    private String dateTime;
    private String initDateTime;
    private final Activity activity;
    private Map<String, Object> map = null;

    /**
     * 日期时间弹出选择框构造函数
     * 
     * @param activity ：调用的父activity
     * @param initDateTime 初始日期时间值，作为弹出窗口的标题和日期时间初始值
     */
    public DateTimePickDialogUtil(Activity activity, String initDateTime)
    {
        this.activity = activity;
        this.initDateTime = initDateTime;

    }

    /**
     * @param activity 调用的父activity
     * @param initDateTime 初始日期时间值，作为弹出窗口的标题和日期时间初始值
     * @param map 当前日期格式
     */
    public DateTimePickDialogUtil(Activity activity, String initDateTime, Map<String, Object> map)
    {
        this.activity = activity;
        this.initDateTime = initDateTime;
        this.map = map;
    }

    public void init(DatePicker datePicker, TimePicker timePicker)
    {
        Calendar calendar = Calendar.getInstance();
        if (!(null == initDateTime || "".equals(initDateTime)))
        {
            calendar = this.getCalendarByInintData(initDateTime);
        }
        else
        {
            initDateTime = calendar.get(Calendar.YEAR) + "-" + calendar.get(Calendar.MONTH) + "-"
                + calendar.get(Calendar.DAY_OF_MONTH);
        }

        datePicker.init(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH),
            this);
        timePicker.setIs24HourView(true);
        timePicker.setCurrentHour(calendar.get(Calendar.HOUR_OF_DAY));

        timePicker.setCurrentMinute(calendar.get(Calendar.MINUTE));

        if (map != null)
        {
            // 设置日期格式
            setPickerStyle(datePicker, timePicker);
        }
    }


    /**
     * 设置日期格式
     * 
     * @param datePicker 日期控件
     * @param timePicker 时间控件
     */
    private void setPickerStyle(DatePicker datePicker, TimePicker timePicker)
    {
        // 查看格式是否为空
        if (map == null)
        {
            return;
        }

        // 设置日期格式

    }

    /**
     * 弹出日期时间选择框方法
     * 
     * @param inputDate :为需要设置的日期时间文本编辑框
     * @return
     */
    public AlertDialog dateTimePicKDialog(final EditText inputDate)
    {
        LinearLayout dateTimeLayout = (LinearLayout) activity.getLayoutInflater().inflate(R.layout.common_datetime,
            null);
        datePicker = (DatePicker) dateTimeLayout.findViewById(R.id.datepicker);
        timePicker = (TimePicker) dateTimeLayout.findViewById(R.id.timepicker);
        init(datePicker, timePicker);
        timePicker.setIs24HourView(true);
        timePicker.setOnTimeChangedListener(this);

        ad = new AlertDialog.Builder(activity).setTitle(initDateTime).setView(dateTimeLayout)
            .setPositiveButton("设置", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int whichButton)
                {
                    inputDate.setText(dateTime);
                }
            }).setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int whichButton)
                {
                    inputDate.setText("");
                }
            }).show();

        onDateChanged(null, 0, 0, 0);
        return ad;
    }
    
    /**
	 * 
	 * @Title: dateTimePicKDialog
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-3-31 下午9:40:50
	 * @param inputDate
	 * @param xiangmu_value
	 * @return
	 */
	public AlertDialog dateTimePicKDialog(final EditText inputDate,
			final String xiangmu_value) {
		LinearLayout dateTimeLayout = (LinearLayout) activity
				.getLayoutInflater().inflate(R.layout.common_datetime, null);
		datePicker = (DatePicker) dateTimeLayout.findViewById(R.id.datepicker);
		timePicker = (TimePicker) dateTimeLayout.findViewById(R.id.timepicker);
		init(datePicker, timePicker);
		timePicker.setIs24HourView(true);
		timePicker.setOnTimeChangedListener(this);

		ad = new AlertDialog.Builder(activity)
				.setTitle(initDateTime)
				.setView(dateTimeLayout)
				.setPositiveButton("设置", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int whichButton) {
						try {
							Date date = new SimpleDateFormat(xiangmu_value)
									.parse(dateTime);
							inputDate.setText(MyDateFomatUtils.formatDate(date,
									xiangmu_value));
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				})
				.setNegativeButton("取消", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int whichButton) {
						// inputDate.setText("");
					}
				}).show();

		onDateChanged(null, 0, 0, 0);
		return ad;
	}

	/**
	 * 弹出日期时间选择框方法
	 * 
	 * @param inputDate
	 *            :为需要设置的日期时间文本编辑框
	 * @return
	 */
	public AlertDialog dateTimePicKDialog(final TextView inputDate) {
		LinearLayout dateTimeLayout = (LinearLayout) activity
				.getLayoutInflater().inflate(R.layout.common_datetime, null);
		datePicker = (DatePicker) dateTimeLayout.findViewById(R.id.datepicker);
		timePicker = (TimePicker) dateTimeLayout.findViewById(R.id.timepicker);
		init(datePicker, timePicker);
		timePicker.setIs24HourView(true);
		timePicker.setOnTimeChangedListener(this);

		ad = new AlertDialog.Builder(activity)
				.setTitle(initDateTime)
				.setView(dateTimeLayout)
				.setPositiveButton("设置", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int whichButton) {
						inputDate.setText(dateTime);
					}
				})
				.setNegativeButton("取消", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int whichButton) {
						// inputDate.setText("");
					}
				}).show();

		onDateChanged(null, 0, 0, 0);
		return ad;
	}
    @Override
    public void onTimeChanged(TimePicker view, int hourOfDay, int minute)
    {
        onDateChanged(null, 0, 0, 0);
    }

    @Override
    public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth)
    {
        // 获得日历实例
        Calendar calendar = Calendar.getInstance();

        calendar.set(datePicker.getYear(), datePicker.getMonth(), datePicker.getDayOfMonth(),
            timePicker.getCurrentHour(), timePicker.getCurrentMinute());
        SimpleDateFormat sdf;
        if (map != null)
        {
            sdf = new SimpleDateFormat(map.get("xiangmu_value").toString());      
            map.put("current_date", calendar);
        }
        else
        {
            sdf = new SimpleDateFormat("yyyy-MM-dd");
        }

        dateTime = sdf.format(calendar.getTime());
        ad.setTitle(dateTime);
    }

    /**
     * 实现将初始日期时间2012年07月02日 16:45 拆分成年 月 日 时 分 秒,并赋值给calendar
     * 
     * @param initDateTime 初始日期时间值 字符串型
     * @return Calendar
     */
    private Calendar getCalendarByInintData(String initDateTime)
    {   
		if (map != null) {
			return (Calendar) map.get("current_date");
		} else {
			Calendar calendar = Calendar.getInstance();

			// 将初始日期时间2012年07月02日 16:45 拆分成年 月 日 时 分 秒
			/*String date = spliteString(initDateTime, "日", "index", "front"); // 日期
			String time = spliteString(initDateTime, "日", "index", "back"); // 时间

			String yearStr = spliteString(date, "年", "index", "front"); // 年份
			String monthAndDay = spliteString(date, "年", "index", "back"); // 月日

			String monthStr = spliteString(monthAndDay, "月", "index", "front"); // 月
			String dayStr = spliteString(monthAndDay, "月", "index", "back"); // 日

			//String hourStr = spliteString(time, ":", "index", "front"); // 时
			//String minuteStr = spliteString(time, ":", "index", "back"); // 分*/

			String[] shijian = initDateTime.split("-");
			int currentYear = Integer.valueOf(shijian[0].trim()).intValue();
			int currentMonth = Integer.valueOf(shijian[1].trim()).intValue() - 1;
			int currentDay = Integer.valueOf(shijian[2].trim()).intValue();
			//int currentHour = Integer.valueOf(hourStr.trim()).intValue();
			//int currentMinute = Integer.valueOf(minuteStr.trim()).intValue();

			calendar.set(currentYear, currentMonth, currentDay);
			return calendar;
		}
    }

    /**
     * 截取子串
     * 
     * @param srcStr 源串
     * @param pattern 匹配模式
     * @param indexOrLast
     * @param frontOrBack
     * @return
     */
    public static String spliteString(String srcStr, String pattern, String indexOrLast, String frontOrBack)
    {
        String result = "";
        int loc = -1;
        if (indexOrLast.equalsIgnoreCase("index"))
        {
            loc = srcStr.indexOf(pattern); // 取得字符串第一次出现的位置
        }
        else
        {
            loc = srcStr.lastIndexOf(pattern); // 最后一个匹配串的位置
        }
        if (frontOrBack.equalsIgnoreCase("front"))
        {
            if (loc != -1)
                result = srcStr.substring(0, loc); // 截取子串
        }
        else
        {
            if (loc != -1)
                result = srcStr.substring(loc + 1, srcStr.length()); // 截取子串
        }
        return result;
    }

}
