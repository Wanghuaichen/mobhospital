package com.tiantanhehe.yidongchafang.common;

import java.util.HashMap;

/**************************************************
 * Created: 2015-03 Info:程序运行时状态
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class RunTimeState {

	private static RunTimeState runTimeState;
	private int xuanzhongFenzu = -1;
	private int fenzhuGroup = -1;
	private int fenzhuChild = -1;
	
	public HashMap<String, Integer> leftmenuRes = new HashMap<String, Integer>();

	private RunTimeState(){
		
	}
	
	public static synchronized RunTimeState getInstance(){
		if(runTimeState == null){
			runTimeState = new RunTimeState();
		}
		
		return runTimeState;
	}

	public int getXuanzhongFenzu() {
		return xuanzhongFenzu;
	}

	public void setXuanzhongFenzu(int xuanzhongFenzu) {
		this.xuanzhongFenzu = xuanzhongFenzu;
	}

	public int getFenzhuGroup() {
		return fenzhuGroup;
	}

	public void setFenzhuGroup(int fenzhuGroup) {
		this.fenzhuGroup = fenzhuGroup;
	}

	public int getFenzhuChild() {
		return fenzhuChild;
	}

	public void setFenzhuChild(int fenzhuChild) {
		this.fenzhuChild = fenzhuChild;
	}
}
