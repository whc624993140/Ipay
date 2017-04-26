package com.aicyber.c4.admin.authuser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.aicyber.c4.admin.auth.user.Auth_UserEntity;
import com.aicyber.c4.base.db.dao.hibernate.HibernateBaseDao;

@Repository
public class AuthUserDaoNew extends HibernateBaseDao<Auth_UserEntity> {

	public void delByUserName(Auth_UserEntity user){
		String hql = "delete Auth_UserEntity user where account=:account";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("account", user.getAccount());
		this.executeHql(hql, map);
		
	}
	public void upodateByUserName(Auth_UserEntity user){
		
		final String hql = "update Auth_UserEntity set password=:password where account =:account";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("password", user.getPassword());
		map.put("account", user.getAccount());
		this.executeHql(hql, map);
	}

}
