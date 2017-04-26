package com.aicyber.shiro.realm;


public interface Realm {
	public void clearAllCachedAuthorizationInfo();

	public void clearAllCachedAuthenticationInfo();

	public void clearAllCache();

}