package com.tiantanhehe.yidongchafang.utils;

import java.io.UnsupportedEncodingException;


public class PackageUtil {

	
	private PackageUtil mMathUtil;
	
	private PackageUtil(){
		mMathUtil=this;
	}
	
	public PackageUtil getNewInstance(){
		if(mMathUtil==null) new PackageUtil();
		return mMathUtil;
	}
	
//	
//	public byte[] CreatCommand(){
//		byte[] command=new byte[1024];
//		
//		
//		return command;
//	}
//	
	/**
	 * int 数据转为 指定长度的byte数组输出 （高位在前）。
	 * 
	 * @param data
	 *            int数字
	 * @param length
	 *            指定byte数组的长度�?�?
	 * @return
	 */
	public static byte[] int2Bytes(int data,int length){
		
		byte[] bytes =new byte[length];
		for(int i=0;i<length;i++){
//			bytes[i] = (byte)((data >> (8*i)) & 0xff );
			bytes[i] = (byte)((data >> (8*(length -i-1))) & 0xff );
			
		}
		return bytes;
	}
	

	/**
	 * byte 数组转换为int 输出。
	 * 
	 * @param bytes
	 *            数组长度4位以内，高位在前。
	 * @return
	 */
	public static int bytes2Int(byte[] bytes){
			int value= 0;
//			for (int i = bytes.length-1; i >= 0; i--) {
		    for (int i = 0; i < bytes.length; i++) {
				value=value<<8;
				value|=(bytes[i] & 0xff);
			}
			return value;

	}
//	
//	public static int bytes2Int222(byte[] bytes){
////		int data=0;
////		for(int i=0;i<bytes.length && i<4;i++){
////			Log.i("mmm","aaaaaa   "+data+"...."+Integer.toBinaryString((byte)bytes[i]));
////			data= (int)( (int)data | (int)((byte)bytes[i] << (i*8))>>>(i*8)<<(i*8));
//////			data = (int) (data | ((byte)bytes[i] << (bytes.length-i-1) * 8));
////		}
////		
//		  String ret = "";
//		  for (int i = 0; i < bytes.length; i++) {
//		   String hex = Integer.toHexString(bytes[i] & 0xFF);
//		   if (hex.length() == 1) {
//		    hex = '0' + hex;
//		   }
//		   Log.i("mmm","bbbbbbb....."+hex);
//		   ret += hex.toUpperCase();
//		  }
//		  return Integer.decode("0x"+ret);
//	}
	
	
	/**
	 * 字符串转�?GBK 编码数组输出。�?
	 * 
	 * @param str
	 *            字符�?
	 * @return GBK 编码�?
	 */
	public static byte[] String2Bytes(String str){
		byte[] bytes=null;
		try {
			bytes=str.getBytes("GB2312");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bytes;
	}
	
	/**
	 * 字符串转GB2312 编码数组输出。,仅用于短报文收发。转为全角模式。。
	 * 
	 * @param str
	 *            字符�?
	 * @return GBK 编码�?
	 */
	public static byte[] msgString2Bytes(String str){
		byte[] bytes=null;
		try {
			bytes=ToSBC(str).getBytes("GB2312");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bytes;
	}
	
	/**
	 * GB2312编码 数组 转为字符串，短报文收发时使用，转回半角模式。。
	 * 
	 * @param bytes
	 * @return
	 */
	public static String msgBytes2String(byte[] bytes){
		String str=null; 
		try {
			str=ToDBC(new String(bytes,"GB2312"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
	}
	
	/**
	 * GBK编码 数组 转为字符串�?�?
	 * 
	 * @param bytes
	 * @return
	 */
	public static String Bytes2String(byte[] bytes){
		String str=null; 
		try {
			str=new String(bytes,"GB2312");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
	}
	

	 /**
	 * 全角转半角
	 * 
	 * @param input
	 *            String. 发送时使用。。
	 * @return 半角字符串
	 */
	   private static String ToSBC(String input) {  
	       char c[] = input.toCharArray();  
	       for (int i = 0; i < c.length; i++) {  
	         if (c[i] == ' ') {  
				c[i] = '\u3000'; // 采用十六进制,相当于十进制的12288
			} else if (c[i] < '\177') { // 采用八进制,相当于十进制的127
	           c[i] = (char) (c[i] + 65248);  
	         }  
	       }  
	       return new String(c);  
	} 
	   
	/**
	 * 全角转半角
	 * 
	 * @param input
	 *            String. 接收时使用。
	 * @return 半角字符串
	 */  
	   private static String ToDBC(String input) {  
	            char c[] = input.toCharArray();  
	            for (int i = 0; i < c.length; i++) {  
	              if (c[i] == '\u3000') {  
	                c[i] = ' ';  
	              } else if (c[i] > '\uFF00' && c[i] < '\uFF5F') {  
	                c[i] = (char) (c[i] - 65248);  
	              }  
	            }  
	       String returnString = new String(c);  
	            return returnString;  
	   }  
	   
	/**
	 * BCD码转 ASCII 数组。�?
	 * 
	 * @param str
	 * @return
	 */
	public static byte[] BCD2Bytes(String str){
		byte[] bytes=null;
		try {
			bytes=str.getBytes("ascii");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bytes;

	}
	
	
	
	 /**
	 * 异或校验和，，�?字节异或校验。�?
	 * 
	 * @param request_Content
	 *            要校验的数组，不留空。�?
	 * @return
	 */
	public static byte CheckSum(byte[] request_Content){
//		byte[]aa=Arrays.copyOf(request_Content, request_Content.length+1);
		byte sum= request_Content[0];
		for(int i=1;i<request_Content.length;i++){
			sum=(byte) (sum ^ request_Content[i]);
//			Log.i("PackageUtil","CheckSum...data..."+request_Content[i]+"...sum...."+sum);
		}
//		request_Content[request_Content.length-1]= sum;
		return sum;
	}
	
	/**
	 * 截取byte[]
	 * 
	 * @param
	 * 
	 * @return
	 */
	public static byte[] subBytes(byte[] src, int begin, int count) {
		byte[] bs = new byte[count];
		for (int i = begin; i < begin + count; i++)
			bs[i - begin] = src[i];
		return bs;
	}

}
