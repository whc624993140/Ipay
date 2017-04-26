package com.aicyber.c4.interceptor;

import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.impl.client.StandardHttpRequestRetryHandler;

import com.aicyber.c4.system.utils.HttpClientHolder;
import com.aicyber.tools.HttpClientHelper;
import com.aicyber.tools.httpclient.HttpClientConfigure;
import com.aicyber.tools.httpclient.StringResponseHandler;

public class testHttpClient {
	
private static HttpClientHelper hch;
	
	static{
		HttpClientConfigure conf = new HttpClientConfigure();
		conf.setMaxTotal(100);
		conf.setMaxPerRoute(50);
		conf.setConnectionRequestTimeout(30000);
		conf.setConnectTimeout(30000);
		conf.setSocketTimeout(30000);
		// conf.setHttpRequestRetryHandler(new
		// StandardHttpRequestRetryHandler(5, true));
		conf.setHttpRequestRetryHandler(new StandardHttpRequestRetryHandler(5, true));
		hch=HttpClientHolder.getHttpClientHelper().getNewInstance(conf);
	}
	
	public String getParams(String token){
		
		String url="http://api.aicyber.com/robotmanage/getUser/"+"4866ede308814d69a8214807e333f322";
		HttpUriRequest get = RequestBuilder.get().setUri(url).build();
		String res = hch.execute(get, StringResponseHandler.createResponseHandler());
		
		System.out.println("........"+res);
		return null;
		
	}
	public static void main(String[] args) {
		testHttpClient tc = new testHttpClient();
		tc.getParams("");
	}

}
