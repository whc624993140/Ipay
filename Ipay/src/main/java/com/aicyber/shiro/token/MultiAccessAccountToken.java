package com.aicyber.shiro.token;

public class MultiAccessAccountToken extends org.apache.shiro.authc.UsernamePasswordToken {

	private static final long serialVersionUID = -4190713257332106065L;
	private String serverName;

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public MultiAccessAccountToken() {
		super();
	}

	public MultiAccessAccountToken(String username, char[] password, boolean rememberMe, String host, String serverName) {
		super(username, password, rememberMe, host);
		this.serverName = serverName;
	}

}