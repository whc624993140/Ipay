//package com.aicyber.shiro.filter;
//
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//
//import org.apache.shiro.subject.Subject;
//import org.apache.shiro.web.filter.AccessControlFilter;
//
//import com.aicyber.aicyber.wx.helper.correspond.Correspond;
//import com.aicyber.aicyber.wx.helper.correspond.CorrespondThreadVariable;
//
//public class MultiAccessControlFilter extends AccessControlFilter {
//	@Override
//	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
//		Subject subject = this.getSubject(request, response);
//		Correspond correspond = CorrespondThreadVariable.get();
//		if(correspond==null){
//			return false;
//		}
//		if (subject.isPermitted(correspond.getAuth())) {
//			return true;
//		} else {
//			subject.logout();
//			this.saveRequestAndRedirectToLogin(request, response);
//			return false;
//		}
//	}
//
//	@Override
//	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
//		return false;
//	}
//	
//}
