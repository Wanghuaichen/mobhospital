/**
 * Project Name:MobileEMR
 * File Name:a.java
 * Package Name:com.tiantanhehe.mobileemr.compression
 * Date:2015-9-14上午10:42:16
 * Copyright (c) 2015, tiantanhehe.com All Rights Reserved.
 *
 */

package com.tiantanhehe.yidongchafang.common.compression;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


/**
 * @title GzipCompression
 * @description 对数据进行glib压缩
 * @author wuwenlong (wuwenlong@titantanhehe.com)
 * @date 2015-9-14 上午10:42:16
 * @version 1.0
 */
public class GlibCompression implements ICompression {

	// @Override
	// public byte[] compress(String data) {
	// return null;
	// }

	@Override
	public byte[] compress(byte[] data) {
		byte[] output = new byte[0];

		Deflater compresser = new Deflater();

		compresser.reset();
		compresser.setInput(data);
		compresser.finish();
		ByteArrayOutputStream bos = new ByteArrayOutputStream(data.length);
		try {
			byte[] buf = new byte[1024];
			while (!compresser.finished()) {
				int i = compresser.deflate(buf);
				bos.write(buf, 0, i);
			}
			output = bos.toByteArray();
		} catch (Exception e) {
			output = data;
			e.printStackTrace();
		} finally {
			try {
				bos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		compresser.end();
		return output;
	}

	@Override
	public String decompress(byte[] data) {
		byte[] output = new byte[0];

		Inflater decompresser = new Inflater();
		decompresser.reset();
		decompresser.setInput(data);

		ByteArrayOutputStream o = new ByteArrayOutputStream(data.length);
		try {
			byte[] buf = new byte[1024];
			while (!decompresser.finished()) {
				int i = decompresser.inflate(buf);
				o.write(buf, 0, i);
			}
			output = o.toByteArray();
		} catch (Exception e) {
			output = data;
			e.printStackTrace();
		} finally {
			try {
				o.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		decompresser.end();

		return new String(output);
	}
}


