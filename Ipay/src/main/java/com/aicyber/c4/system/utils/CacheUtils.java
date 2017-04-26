package com.aicyber.c4.system.utils;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import com.aicyber.c4.base.utils.spring.SpringUtils;

public class CacheUtils {

	private static CacheManager cacheManager = ((CacheManager) SpringUtils
			.getBean("cacheManager"));

	public static Object get(String key) {
		Element element = getCache().get(key);
		return element == null ? null : element.getObjectValue();
	}

	public static void put(String key, Object value) {
		Element element = new Element(key, value);
		getCache().put(element);
	}

	public static void remove(String key) {
		getCache().remove(key);
	}

	private static Cache getCache() {
		Cache cache = cacheManager.getCache("system_default");
		if (cache == null) {
			cacheManager.addCache("system_default");
			cache = cacheManager.getCache("system_default");
			cache.getCacheConfiguration().setEternal(true);
		}
		return cache;
	}

}
