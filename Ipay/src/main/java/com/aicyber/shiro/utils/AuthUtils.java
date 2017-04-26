package com.aicyber.shiro.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import com.aicyber.shiro.bean.User;

public class AuthUtils {

	public static User getUser() {
		return (User) SecurityUtils.getSubject().getPrincipal();
	}

	public static boolean isLogin() {
		if(getUser()==null){
			return false;
		}
		Subject subject = SecurityUtils.getSubject();
		if (!subject.isAuthenticated()) {
			return false;
		}
		return true;
	}

	public static String[] getRoles() {
		Subject subject = SecurityUtils.getSubject();
		if (!subject.isAuthenticated()) {
			throw new RuntimeException("请重新登录！~");
		}
		return ((User) subject.getPrincipal()).getPermissions();
	}

	public static Boolean isHaveRole(String role) {
		Subject subject = SecurityUtils.getSubject();
		return subject.isPermitted(role);
	}

}
