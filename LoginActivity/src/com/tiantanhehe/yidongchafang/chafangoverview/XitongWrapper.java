package com.tiantanhehe.yidongchafang.chafangoverview;

import java.util.ArrayList;

public class XitongWrapper {
	private ArrayList<Xitong> xitongList;
	private ArrayList<YongyaoXitong> yongyaoXitongList=null;
	
	public ArrayList<YongyaoXitong> getYongyaoXitongList() {
		return yongyaoXitongList;
	}
	public void setYongyaoXitongList(ArrayList<YongyaoXitong> yongyaoXitongList) {
		this.yongyaoXitongList = yongyaoXitongList;
	}
	int drawable;
	String iconName;

	public ArrayList<Xitong> getXitongList() {
		return xitongList;
	}
	public void setXitongList(ArrayList<Xitong> xitongList) {
		this.xitongList = xitongList;
	}
	public int getDrawable() {
		return drawable;
	}
	public void setDrawable(int drawable) {
		this.drawable = drawable;
	}
	public String getIconName() {
		return iconName;
	}
	public void setIconName(String iconName) {
		this.iconName = iconName;
	}
	
}
