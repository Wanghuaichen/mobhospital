/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: RdpEvent.java
 * @Package com.tiantanhehe.yidongchafang.common
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年6月20日 下午4:23:17 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.common;

import java.io.Serializable;

/**
 * @ClassName: RdpEvent
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年6月20日 下午4:23:17
 * 
 */
public class RdpEvent implements Serializable {

	private static final long serialVersionUID = 1L;
	private String eventType;
	private int xPos;
	private int yPos;

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public int getxPos() {
		return xPos;
	}

	public void setxPos(int xPos) {
		this.xPos = xPos;
	}

	public int getyPos() {
		return yPos;
	}

	public void setyPos(int yPos) {
		this.yPos = yPos;
	}

	// public enum EventType {
	// MOUSE_LEFT_CLICK, MOUSE_LEFT_DOUBLECLICK, KEY_INPUT
	//
	// }

}
