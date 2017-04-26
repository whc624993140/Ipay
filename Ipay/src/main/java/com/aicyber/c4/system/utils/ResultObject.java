package com.aicyber.c4.system.utils;

public class ResultObject {
	
	private String msg;
	private Object data;
	private String success;
	public ResultObject() {
		// TODO Auto-generated constructor stub
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public String getSuccess() {
		return success;
	}
	public void setSuccess(String success) {
		this.success = success;
	}
	@Override
	public String toString() {
		return "ResultObject [msg=" + msg + ", data=" + data + ", success="
				+ success + "]";
	}
}
