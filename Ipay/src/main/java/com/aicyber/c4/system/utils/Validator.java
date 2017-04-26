package com.aicyber.c4.system.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

/**
 * 常用的表达式验证
 * 
 * @author wanfei
 * 
 */
public class Validator {

	private static final String REGEX_WEB_SITE_HTTP = "[http|https]+[://]+[0-9A-Za-z:/[-]_#[?][=][.][&]]*";

	private static final String NUMBER_REGEX = "^[-\\+]?[\\d]*$";

	private static final String REGEX_TELEPHONE = "^((0\\d{2,3})-)(\\d{7,8})(-(\\d{3,}))?$";
	/** 手机号码的正则表达式 */
	private static final String REGEX_PHONE = "^[1-9][0-9]{10}$";

	private static final String SPECIAL_CHARS = "\\p{Cntrl}\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]";
	private static final String VALID_CHARS = "[^\\s" + SPECIAL_CHARS + "]";
	private static final String QUOTED_USER = "(\"[^\"]*\")";
	private static final String WORD = "((" + VALID_CHARS + "|')+|"
			+ QUOTED_USER + ")";

	private static final String LEGAL_ASCII_REGEX = "^\\p{ASCII}+$";
	// private static final String EMAIL_REGEX =
	// "\\w+([-+.\\w+]+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"; //会出现死循环
	private static final String EMAIL_REGEX = "^\\s*?(.+)@(.+?)\\s*$";
	private static final String USER_REGEX = "^\\s*" + WORD + "(\\." + WORD
			+ ")*$";
	private static final String DOMAIN_REGEX = "^([a-z0-9A-Z][a-z0-9A-Z\\-]{0,46}[a-z0-9A-Z]{0,1}\\.)+([a-z0-9A-Z]+)$";

	private static final Pattern MATCH_ASCII_PATTERN = Pattern
			.compile(LEGAL_ASCII_REGEX);
	private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
	private static final Pattern USER_PATTERN = Pattern.compile(USER_REGEX);

	private static final Pattern NUMBER_PATTERN = Pattern.compile(NUMBER_REGEX);

	public static boolean isIdCard(String idCard) {
		if (StringUtils.isBlank(idCard)) {
			return false;
		}
		Pattern idNumPattern = Pattern
				.compile("(\\d{14}[0-9a-zA-Z])|(\\d{17}[0-9a-zA-Z])");
		// 通过Pattern获得Matcher
		Matcher idNumMatcher = idNumPattern.matcher(idCard);
		// 判断用户输入是否为身份证号
		if (idNumMatcher.matches()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断是否含有中文字符
	 * 
	 * @param s
	 * @return
	 */
	public static boolean isMatcherChinese(String s) {
		String str = new String(s.getBytes());// 用GBK编码
		String pattern = "[\u4e00-\u9fa5]+";
		Pattern p = Pattern.compile(pattern);
		Matcher result = p.matcher(str);
		return result.find(); // 是否含有中文字符
	}

	/**
	 * @param 待验证的email
	 * @return 如果是符合邮箱格式的字符串,返回<b>true</b>,否则为<b>false</b>
	 */
	public static boolean isEmail(String email) {
		if (email == null) {
			return false;
		}

		Matcher asciiMatcher = MATCH_ASCII_PATTERN.matcher(email);
		if (!asciiMatcher.matches()) {
			return false;
		}

		if (email.contains("\"") || email.contains("'")) {
			return false;
		}

		// Check the whole email address structure
		Matcher emailMatcher = EMAIL_PATTERN.matcher(email);
		if (!emailMatcher.matches()) {
			return false;
		}

		if (email.endsWith(".")) {
			return false;
		}

		Matcher userMatcher = USER_PATTERN.matcher(emailMatcher.group(1));
		if (!userMatcher.matches()) {
			return false;
		}

		if (!isDomain(emailMatcher.group(2))) {
			return false;
		}

		return true;
	}

	/**
	 * 验证域名是否合法
	 * 
	 * @param domain
	 * @return
	 */
	public static boolean isDomain(String domain) {
		if (StringUtils.isBlank(domain)) {
			return false;
		}
		return match(DOMAIN_REGEX, domain);
	}

	/*
	 * 判断是否为数字
	 * 
	 * @param str 传入的字符串
	 * 
	 * @return 是整数返回true,否则返回false
	 */
	public static boolean isNumeric(String str) {
		if (StringUtils.isBlank(str)) {
			return false;
		}
		return NUMBER_PATTERN.matcher(str).matches();
	}

	/**
	 * 验证是否为手机号码
	 * 
	 * @param telephone
	 *            待验证的telephone
	 * @return 如果是符合固定电话格式的字符串,返回<b>true</b>,否则为<b>false</b>
	 */
	public static boolean isTelephone(String telephone) {
		if (StringUtils.isBlank(telephone)) {
			return false;
		}
		return match(REGEX_PHONE, telephone);
	}

	/**
	 * 验证是否为固定电话
	 * 
	 * @param phone
	 *            待验证的telephone
	 * @return 如果是符合固定电话格式的字符串,返回<b>true</b>,否则为<b>false</b>
	 */
	public static boolean isPhone(String phone) {
		if (StringUtils.isBlank(phone)) {
			return false;
		}
		return match(REGEX_TELEPHONE, phone);
	}

	/**
	 * @param 待验证的webSite
	 * @return 如果是符合网址格式的字符串,返回<b>true</b>,否则为<b>false</b>
	 */
	public static boolean isWebSite(String webSite) {
		if (StringUtils.isBlank(webSite)) {
			return false;
		}
		if (!webSite.startsWith("http") && !webSite.startsWith("https")) {
			webSite = "http://" + webSite;
		}
		return match(REGEX_WEB_SITE_HTTP, webSite);
	}

	/**
	 * @param regex
	 *            正则表达式字符串
	 * @param str
	 *            要匹配的字符串
	 * @return 如果str 符合 regex的正则表达式格式,返回true, 否则返回 false;
	 */
	private static boolean match(String regex, String str) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

}
