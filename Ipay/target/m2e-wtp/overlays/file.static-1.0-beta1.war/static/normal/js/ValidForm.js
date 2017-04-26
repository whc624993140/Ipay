/**
 * 验证电话号码（手机号码+电话号码）
 * @param obj
 * @returns {Boolean}
 */
function checkPhoneNum(obj){
	if(/^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(obj)){
		return true;
	}
}

/**
 * 验证企业地址（中文、英文、数字）
 * @param obj
 */
function checkAddress(obj){
	if(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(obj)){
		return true;
	}
}

/**
 * 验证用户名输入格式
 * @param obj
 * @returns {Boolean}
 */
function checkUserName(obj){
	if(/^[a-zA-Z0-9_-]{3,16}$/.test(obj)){
		return true;
	}
}

/**
 * 验证密码输入格式
 * @param obj
 * @returns {Boolean}
 */
function verifyPassword(obj){
	if(/^[a-z0-9_-]{5,18}$/.test(obj)){
		return true;
	}
}

/**
 * 验证税号
 * 15或者17或者18或者20位字母、数字组成
 * @param obj
 * @returns {Boolean}
 */
function checkTax(obj){
	if(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(obj)){
		return true;
	}
}

/**
 * 验证金额（可验证 大于等于零，小于等于99999999.99 的数字）
 * @param obj
 * @returns {Boolean}
 */
function checkMoney(obj){
	if(/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(obj)){
		return true;
	}
}
/**
 * 验证大陆的身份证号
 * 验证身份证号
 * 身份证号码为15位或18位的全数字，或者18位时前17位是数字，最后一位是校验位，可能是数字或字符X或x
 * @param obj
 */
function checkIdCard(obj){
	if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(obj)){
		return true;
	}
}

/**
 * 验证港澳台身份证
 * @param obj
 */
function checkGATIdCard(obj){
	var reg1 = /^[A-Z]{1,2}[0-9]{6}[\(|\（]?[0-9A-Z][\)|\）]?$/;//香港格式1 (香港身份证号码结构：XYabcdef(z))
	var reg2 = /^[A-Z][0-9]{8,12}$/;//香港格式2 (H60152555)
	
	var reg3 = /^[1|5|7][0-9]{6}[\(|\（]?[0-9A-Z][\)|\）]?$/;//澳门,8位数,不包含出生年月 格式为 xxxxxxx(x) 注:x全为数字,无英文字母 首位数只有1、5、7字开头的
	var reg4 = /^[a-zA-Z][0-9]{9}$/;//台湾:10位字母和数字
	
	if(reg1.test(obj) || reg2.test(obj) || reg3.test(obj) || reg4.test(obj)){
		return true;
	}
}

function checkUrl(obj){
	var regexp = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
	if(regexp.test(obj) ){
		return true;
	}
}






