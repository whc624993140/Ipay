package com.aicyber.shiro.credentials;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

	private Cache<String, Integer> passwordRetryCache;

	public RetryLimitHashedCredentialsMatcher(CacheManager cacheManager) {
		passwordRetryCache = cacheManager.getCache("passwordRetryCache");
	}

	@Override
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
		String username = (String) token.getPrincipal();
		// AtomicInteger 不再使用，如果换成第三方集群缓存，这里可能无法自动更新
		Integer retryCount = passwordRetryCache.get(username);
		if (retryCount == null) {
			retryCount = new Integer(1);
			passwordRetryCache.put(username, retryCount);
		}
		if (retryCount >= 5) {
			throw new ExcessiveAttemptsException();
		}
		boolean matches = false;
		if (new String((char[]) token.getCredentials()).equals(info.getCredentials())) {
			matches = true;
		} else {
			passwordRetryCache.put(username, ++retryCount);
			throw new IncorrectCredentialsException();
		}
		passwordRetryCache.remove(username);
		return matches;
	}
}
