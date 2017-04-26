package com.aicyber.c4.system.utils;

import com.aicyber.tools.HttpClientHelper;

public class HttpClientHolder {

	private static HttpClientHelper httpClientHelper;

	public static HttpClientHelper getHttpClientHelper() {
		if (httpClientHelper != null) {
			return httpClientHelper;
		} else {
			HttpClientHolder.httpClientHelper = HttpClientHelper
					.getNewInstance();
			return httpClientHelper;
		}
	}

}
