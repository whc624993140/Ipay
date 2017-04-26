package com.aicyber.shiro.realm;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.BeanUtils;

import com.aicyber.c4.admin.auth.role.AuthRoleService;
import com.aicyber.c4.admin.auth.user.AuthUserService;
import com.aicyber.c4.admin.auth.user.Auth_UserEntity;
import com.aicyber.shiro.bean.User;

public class UserRealm extends AuthorizingRealm implements Realm{

	private AuthUserService authUserService;
	private AuthRoleService authRoleService;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		User user = (User) principals.getPrimaryPrincipal();

		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		authorizationInfo.setRoles(null);

		String[] pers =user.getPermissions();
		Set<String> perSet = new HashSet<String>();
		CollectionUtils.addAll(perSet, pers);
		authorizationInfo.setStringPermissions(perSet);
		return authorizationInfo;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

		String username = (String) token.getPrincipal();

		Auth_UserEntity usere = authUserService.findByAccount(username);

		if (usere == null) {
			throw new UnknownAccountException();// 没找到帐号
		}

		// if(Boolean.TRUE.equals(user.getLocked())) {
		// throw new LockedAccountException(); //帐号锁定
		// }
		User user = new User();
		BeanUtils.copyProperties(usere, user);
		
		String[] pers = authRoleService.findRolesByUserOID(user.getOID());
		user.setPermissions(pers);
		
		
		// 交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(user, // 用户名
				usere.getPassword(), // 密码
				getName() // realm name
		);
		return authenticationInfo;
	}
	

	@Override
	public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
		super.clearCachedAuthorizationInfo(principals);
	}

	@Override
	public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
		super.clearCachedAuthenticationInfo(principals);
	}

	@Override
	public void clearCache(PrincipalCollection principals) {
		super.clearCache(principals);
	}

	public void clearAllCachedAuthorizationInfo() {
		getAuthorizationCache().clear();
	}

	public void clearAllCachedAuthenticationInfo() {
		getAuthenticationCache().clear();
	}

	public void clearAllCache() {
		clearAllCachedAuthenticationInfo();
		clearAllCachedAuthorizationInfo();
	}

	public AuthUserService getAuthUserService() {
		return authUserService;
	}

	public void setAuthUserService(AuthUserService authUserService) {
		this.authUserService = authUserService;
	}

	public AuthRoleService getAuthRoleService() {
		return authRoleService;
	}

	public void setAuthRoleService(AuthRoleService authRoleService) {
		this.authRoleService = authRoleService;
	}

}
