package com.aicyber.c4.interceptor;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.aicyber.common.JsonUtil;
import com.aicyber.c4.system.utils.CacheUtils;
import com.aicyber.c4.system.utils.HttpClientUtilNew;
import com.aicyber.c4.system.utils.ResultObject;
import com.aicyber.shiro.utils.AuthUtils;
import com.aicyber.tools.log.LogFactory;
import com.aicyber.tools.log.Logger;

public class TokenInterceptor extends HandlerInterceptorAdapter {

	private static Logger logger = LogFactory.getLogger(TokenInterceptor.class);
	private static Map<String, String> viewUrls = new HashMap<String, String>();
	private static final String GET_USER_URL = "http://api.aicyber.com/robotmanage/getUser/";
	private Object clock = new Object();
	static {
		viewUrls.put("/platform/robot/survey/index.html", "GET");
	}
	@Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		CacheUtils.put("A", "11");
		CacheUtils.put("B", "22");
		CacheUtils.put("A", "33");
		CacheUtils.put("C", "44");
		String path = request.getServletPath();
		logger.info("...path1..."+path);
		System.out.println("........path: "+request.getServletPath());
        String method = request.getMethod();  
        //跳转调研页面 验证token是否合法
//        if(viewUrls.keySet().contains(path) && ((viewUrls.get(path)) == null || viewUrls.get(path).equals(method))){  
//            String token = request.getParameter("token");
//            logger.info("......."+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+".........viewsUrl:"+path);
//            logger.info("......."+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+".........token: "+token);
//            String url = GET_USER_URL+token;
//            String jsonstr = HttpClientUtilNew.sendGetRequest(url, null);
//            logger.info("......."+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+jsonstr);
//    		if(getAccountId(jsonstr)!=null){
//    			CacheUtils.put(token, getAccountId(jsonstr));
//    			return true;
//    		}else{
//    			CacheUtils.remove(token);
//    			return handleInvalidToken(request, response, handler);
//    		}
//        }else
        if (request.getServletPath().contains("/platform/")) {
			logger.info("Intercepting invocation to check for valid transaction token.");
			if(request.getServletPath().contains("/survey/index.html")){
				 return true;
			}
			if(request.getServletPath().contains(".html") || request.getServletPath().contains(".xls")){
				return true;
			}
			return handleToken(request, response, handler);
		}
		return true;
	}
	
	protected boolean handleToken(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		synchronized (clock) {
			Map<String, String> map = getHeaderInfo(request);
			logger.info("......... map is :"+map);
			if(map.get("authorization") == null){
				logger.info(".............Authorization is not exit;.........");
				return handleInvalidToken(request, response, handler);
			}
			String token = map.get("authorization").toString();
            String jsonstr = HttpClientUtilNew.sendGetRequest(GET_USER_URL+token, null);
            logger.info("......."+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+jsonstr);
			if ( getAccountId(jsonstr) == null) {
				logger.info("-------未通过验证-------");
				CacheUtils.remove(token);
				return handleInvalidToken(request, response, handler);
			}else{
				CacheUtils.put(token, getAccountId(jsonstr));
				logger.info(".......通过验证........");
				return handleValidToken(request, response, handler);
			}
		}
		
	}

	/**
	 * 当出现一个非法令牌时调用
	 */
	protected boolean handleInvalidToken(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("success", false);
		data.put("msg", "token不合法");
		data.put("data", "");
		writeMessageUtf8(response, data);
		return false;
	}

	/**
	 * 当发现一个合法令牌时调用.
	 */
	protected boolean handleValidToken(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		return true;
	}

	private void writeMessageUtf8(HttpServletResponse response,Map<String, Object> json) throws IOException {
		try {
			response.setHeader("Content-type", "text/html;charset=UTF-8");  
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(JsonUtil.object2JsonString(json));
		} finally {
			response.getWriter().close();
		}
	}
	/**
	 * 获取token 
	 */
	public Map<String, String> getHeaderInfo(HttpServletRequest request) {
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
	 * 获取accountId
	 * @return
	 */
	private String getAccountId(String jsonResult){
		Map classMap = new HashMap();
		classMap.put("data", Map.class);
		JSONObject obj = new JSONObject().fromObject(jsonResult);
		ResultObject bean = (ResultObject) JSONObject.toBean(obj, ResultObject.class,classMap);
		if("true".equals(bean.getSuccess())){
			Map map  = (Map) bean.getData();
			logger.info(".....bean....."+map);
			logger.info(".....account_id....."+map.get("account_id"));
			return map.get("account_id").toString();
		}else{
			return null;
		}
	}
	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex)throws Exception {
		// TODO Auto-generated method stub
		super.afterCompletion(request, response, handler, ex);
	}
	
	
	
	

}
