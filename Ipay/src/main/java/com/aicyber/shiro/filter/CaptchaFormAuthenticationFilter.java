package com.aicyber.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;

import com.aicyber.shiro.token.UsernamePasswordCaptchaToken;
import com.aicyber.tools.log.LogFactory;
import com.aicyber.tools.log.Logger;

public class CaptchaFormAuthenticationFilter extends org.apache.shiro.web.filter.authc.FormAuthenticationFilter {

	protected Logger logger = LogFactory.getLogger(this.getClass());

	private Boolean issueSuccessRedirect = true;

	public static final String DEFAULT_CAPTCHA_PARAM = "validateCode";

	private String captchaParam = DEFAULT_CAPTCHA_PARAM;

	public String getCaptchaParam() {
		return captchaParam;
	}

	protected String getCaptcha(ServletRequest request) {
		return WebUtils.getCleanParam(request, getCaptchaParam());
	}

	protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
		String username = getUsername(request);
		String password = getPassword(request);
		if (password == null) {
			password = "";
		}
		boolean rememberMe = isRememberMe(request);
		String host = getHost(request);
		String captcha = getCaptcha(request);
		return new UsernamePasswordCaptchaToken(username, password.toCharArray(), rememberMe, host, captcha);
	}

	@Override
	protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
		if (issueSuccessRedirect) {
			issueSuccessRedirect(request, response);
			return false;
		} else {
			return true;
		}
	}

	@Override
	protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request, ServletResponse response) {
		request.setAttribute("exception", e);
		if (e instanceof ExcessiveAttemptsException) {
			request.setAttribute("shiroErrMsg", "密码错误5次，请稍后再试！~");
		} else if (e instanceof IncorrectCredentialsException) {
			request.setAttribute("shiroErrMsg", "密码错误！~");
		} else if (e instanceof UnknownAccountException) {
			request.setAttribute("shiroErrMsg", "帐号不存在！~");
		} else {
			request.setAttribute("shiroErrMsg", e.getMessage());
		}
		logger.error(e);
		return super.onLoginFailure(token, e, request, response);
	}

	public Boolean getIssueSuccessRedirect() {
		return issueSuccessRedirect;
	}

	public void setIssueSuccessRedirect(Boolean issueSuccessRedirect) {
		this.issueSuccessRedirect = issueSuccessRedirect;
	}

}