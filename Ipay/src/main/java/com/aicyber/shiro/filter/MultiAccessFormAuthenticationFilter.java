package com.aicyber.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.authc.AuthenticationToken;

import com.aicyber.shiro.token.MultiAccessAccountToken;

public class MultiAccessFormAuthenticationFilter extends org.apache.shiro.web.filter.authc.FormAuthenticationFilter {


	protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
		String username = getUsername(request);
		String password = getPassword(request);
		if (password==null){
			password = "";
		}
		boolean rememberMe = isRememberMe(request);
		String host = getHost(request);
		return new MultiAccessAccountToken(username, password.toCharArray(), rememberMe, host, request.getServerName());
	}


}