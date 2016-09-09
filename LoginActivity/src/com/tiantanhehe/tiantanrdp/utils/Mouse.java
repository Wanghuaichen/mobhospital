package com.tiantanhehe.tiantanrdp.utils;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

public class Mouse {

	private final static int PTRFLAGS_LBUTTON = 0x1000;
	private final static int PTRFLAGS_RBUTTON = 0x2000;

	private final static int PTRFLAGS_DOWN = 0x8000;
	private final static int PTRFLAGS_MOVE = 0x0800;

	private final static int PTRFLAGS_WHEEL = 0x0200;
	private final static int PTRFLAGS_WHEEL_NEGATIVE = 0x0100;

	public static int getLeftButtonEvent(boolean down) {
		if(GlobalInfoApplication.pref_ui_swapmousebuttons)
			return (PTRFLAGS_RBUTTON | (down ? PTRFLAGS_DOWN : 0));
		else
			return (PTRFLAGS_LBUTTON | (down ? PTRFLAGS_DOWN : 0));
	}
	
	public static int getRightButtonEvent(boolean down) {
		if(GlobalInfoApplication.pref_ui_swapmousebuttons)
			return (PTRFLAGS_LBUTTON | (down ? PTRFLAGS_DOWN : 0));
		else
			return (PTRFLAGS_RBUTTON | (down ? PTRFLAGS_DOWN : 0));
	}
	
	public static int getMoveEvent() {
		return PTRFLAGS_MOVE;
	}
	
	public static int getScrollEvent(boolean down) {
		int flags = PTRFLAGS_WHEEL;
		
		// invert scrolling?
		if(GlobalInfoApplication.pref_ui_invertscrolling)
			down = !down;
		
		if(down)
			flags |= (PTRFLAGS_WHEEL_NEGATIVE | 0x0088);
		else
			flags |= 0x0078;				
		return flags;
	}

}
