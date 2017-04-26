package com.aicyber.c4.system.utils;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.Region;

public class ExportUtil {

	public String Createxecl(String head, List<String> listStr, List listData,
			OutputStream os, HttpServletResponse response) {
		// 第一步，创建一个webbook，对应一个Excel文件
		HSSFWorkbook wb = new HSSFWorkbook();
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
		HSSFSheet sheet = wb.createSheet("表一");
		for (int i = 0; i < 11; i++) {
			sheet.setColumnWidth(i, 3766);
		}
		sheet.setDefaultRowHeight((short) 300);
		// 第三步，创建单元格，并设置值表头 设置表头居中
		// 样式一
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		// 设置字体
		HSSFFont font = wb.createFont();
		font.setFontName("宋体_GB2312");
		font.setFontHeightInPoints((short) 13);// 设置字体大小

		HSSFFont font2 = wb.createFont();
		font2.setFontName("宋体_GB2312");
		// font2.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//粗体显示
		font2.setFontHeightInPoints((short) 11);

		style.setFont(font);// 选择需要用到的字体格式
		// 样式二
		HSSFCellStyle style1 = wb.createCellStyle();
		style1.setAlignment(HSSFCellStyle.ALIGN_LEFT); // 创建一个居左格式
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		style1.setFont(font2);// 选择需要用到的字体格式
		// 样式三
		HSSFCellStyle style2 = wb.createCellStyle();
		style2.setAlignment(HSSFCellStyle.ALIGN_LEFT); // 创建一个居左格式
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		HSSFFont font3 = wb.createFont();
		font3.setFontName("宋体_GB2312");
		font3.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 粗体显示
		font3.setFontHeightInPoints((short) 16);
		style2.setFont(font3);// 选择需要用到的字体格式
		// 第四步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
		HSSFRow row = sheet.createRow((int) 0);
		row.setHeight((short) 550);
		HSSFCell cel = row.createCell((int) 0);
		// 合并单元格
		HSSFCell cell = row.createCell((short) 0);
		row = sheet.createRow((int) 0);
		// 创建表头
		cell = row.createCell((short) 0);
		cell.setCellValue("序号");
		for (int i = 0; i < listStr.size(); i++) {
			cell = row.createCell((short) i + 1);
			cell.setCellValue(listStr.get(i));
		}
		// execl content
		for (int i = 0; i < listData.size(); i++) {
			List<String> listValue = (List<String>) listData.get(i);
			row = sheet.createRow((int) (i + 1));
			cell = row.createCell((short) 0);
			cell.setCellValue(i + 1);
			for (int j = 0; j < listValue.size(); j++) {
				cell = row.createCell((short) j + 1);
				cell.setCellValue(listValue.get(j));
			}
		}
		// cell.setCellStyle(style2);
		// 第六步，将文件存到指定位置
		try {
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename="
					+ new String((head + ".xls").getBytes(), "iso-8859-1"));
			wb.write(os);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

}
