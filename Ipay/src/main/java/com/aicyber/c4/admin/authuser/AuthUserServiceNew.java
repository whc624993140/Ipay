package com.aicyber.c4.admin.authuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aicyber.c4.admin.auth.user.AuthUserDao;
import com.aicyber.c4.admin.auth.user.Auth_UserEntity;
import com.aicyber.c4.base.service.BaseService;

@Service
public class AuthUserServiceNew extends BaseService {

	@Autowired
	private AuthUserDao authUserDao;
	
	@Autowired
	private AuthUserDaoNew authUserDaoNew;

	@Transactional
	public void deleteUser(String oid) {
		authUserDao.delete(oid);
	}
	@Transactional
	public void delByUserName( Auth_UserEntity user){
		logger.info("................"+user.getAccount());
		authUserDaoNew.delByUserName(user);
	}
	@Transactional
	public void updateByUserName(Auth_UserEntity user){
		authUserDaoNew.upodateByUserName(user);
		
	}
	
}
