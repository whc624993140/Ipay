package com.aicyber.c4.admin.auth;

import java.net.MalformedURLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.aicyber.c4.admin.auth.AuthException;
import com.aicyber.c4.base.web.controller.BaseController;
import com.aicyber.shiro.utils.AuthUtils;

@Controller
public class LoginController extends BaseController {

	/**
	 * 管理登录
	 */
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String toLogin(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "v1/admin/sysLogin";
	}

	/**
	 * 登录失败，真正登录的POST请求由Filter完成
	 * 
	 * @throws MalformedURLException
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(String username, String password, HttpServletRequest request, HttpServletResponse response, Model model) throws MalformedURLException {
		try {
			if(AuthUtils.isLogin()){
				return "redirect:/";
			}else{
				return "v1/admin/sysLogin";
			}
		} catch (AuthException e) {
			return "v1/admin/sysLogin";
		}
	}

	/**
	 * 登录成功，进入管理首页
	 * 
	 * @throws MalformedURLException
	 */
	@RequiresUser
	@RequestMapping(value = "")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws MalformedURLException {
		return "v1/admin/index";
	}

	@RequestMapping(value = "logout")
	public String logout(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "v1/admin/sysLogin";
	}

}
