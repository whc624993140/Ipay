package com.aicyber.c4.system.utils;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

public class singleLoginUtil {
	
	/**
	 * 获取token 
	 */
	public static Map<String, String> getHeaderInfo(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		Enumeration<?> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);
			map.put(key, value);
		}
		return map;
	}
	/**
	 * 判断http post、get  返回结果是否为true
	 * @return
	 */
	public static boolean getResultFlg(String jsonResult){
		Map classMap = new HashMap();
		classMap.put("data", Map.class);
		JSONObject obj = new JSONObject().fromObject(jsonResult);
		ResultObject bean = (ResultObject) JSONObject.toBean(obj, ResultObject.class,classMap);
		if("true".equals(bean.getSuccess())){
			return true;
		}else{
			return false;
		}
	}

}
