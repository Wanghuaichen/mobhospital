package com.tiantanhehe.yidongchafang.common.compression;

/**
 * @title ICompression
 * @description 该接口的作用是对查询到的数据进行压缩，压缩格式按照用户的查询参数指定
 * @author wuwenlong (wuwenlong@tiantanhehe.com)
 * @date 2015年9月14日
 * @version 1.0
 */
public interface ICompression {
	byte[] compress(byte[] data);

	String decompress(byte[] data);
}
