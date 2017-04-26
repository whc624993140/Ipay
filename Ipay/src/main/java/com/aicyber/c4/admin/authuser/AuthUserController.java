package com.aicyber.c4.admin.authuser;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aicyber.c4.admin.auth.role.AuthRoleService;
import com.aicyber.c4.admin.auth.role.Auth_RoleAndUserEntity;
import com.aicyber.c4.admin.auth.user.AuthUserService;
import com.aicyber.c4.admin.auth.user.Auth_UserEntity;
import com.aicyber.c4.base.utils.web.RequestUtils;
import com.aicyber.c4.base.web.controller.BaseController;
import com.aicyber.c4.base.web.model.AjaxObj;
import com.aicyber.shiro.realm.Realm;
import com.aicyber.tools.NumberUtil;
import com.aicyber.tools.page.PaginationSupport;
import com.alibaba.fastjson.JSON;

/**
 * 权限管理控制器
 */
@Controller
@RequestMapping(value = "wx/admin/authuser")
public class AuthUserController extends BaseController {
	@Autowired
	private AuthUserService userService;
	@Autowired
	private AuthUserServiceNew userSer2;
	@Autowired
	private AuthRoleService roleService;
	@Autowired
	private Realm userRealm;

	/**
	 * @DESC: 列表
	 * @param request
	 * @param response
	 * @param model
	 * @param pageNo
	 * @param pageSize
	 * @return
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "index.html")
	public String index(HttpServletRequest request,
			HttpServletResponse response, Model model, Integer pageNo,
			Integer pageSize) {
		HashMap<String, String> allParameter = RequestUtils
				.getAllParameter(request);
		PaginationSupport ps = new PaginationSupport();
		ps.getConditions().putAll(allParameter);
		ps.setCurrentPage(pageNo == null ? 1 : pageNo);
		ps.setPageSize(pageSize == null ? 20 : pageSize);
		userService.findByPage(ps, null);
		model.addAttribute("ps", ps);
		return "v1/admin/authuser/userManage";
	}

	@RequestMapping(value = "page.json")
	@ResponseBody
	public AjaxObj getUser(HttpServletRequest request) {
		HashMap<String, String> params = RequestUtils.getAllParameter(request);
		Map<String, Object> conditions = new HashMap<String, Object>(params);

		PaginationSupport ps = new PaginationSupport();
		Integer currentPage = NumberUtil.String2Integer(params.get("pageNum"),
				1);
		Integer pageSize = NumberUtil
				.String2Integer(params.get("pageSize"), 20);
		conditions.put("pageSize", pageSize);
		conditions.put("pageNum", currentPage);

		ps.setCurrentPage(currentPage);
		ps.setPageSize(pageSize);
		ps.setConditions(conditions);
		userService.findByPage(ps, null);
		return new AjaxObj(ps);
	}

	/**
	 * 获取用户列表
	 * 
	 * @DESC:
	 * @param pageNo
	 * @param pageSize
	 * @return
	 * @AUTH:TongLZ
	 */
	// @RequestMapping(value = "getUser.json", method = RequestMethod.POST)
	// public Map getUser(Integer pageNo, Integer pageSize) {
	// Map map = new HashMap();
	// map.put("success", true);
	// try {
	// PaginationSupport ps = new PaginationSupport();
	// ps.setCurrentPage(pageNo == null ? 1 : pageNo);
	// ps.setPageSize(pageSize == null ? 1 : pageSize);
	// userService.findByPage(ps, null);
	// List userList = ps.getItems();
	// map.put("data", userList);
	// map.put("currentPage", ps.getCurrentPage());
	// map.put("pageCount", ps.getPageCount());
	// } catch (Exception e) {
	// map.put("success", false);
	// map.put("errmsg", "获取用户信息异常");
	// }
	// return map;
	// }

	/**
	 * @DESC:保存用户信息
	 * @param request
	 * @param response
	 * @param model
	 * @param user
	 * @return
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "saveUser.json", method = RequestMethod.POST)
	@ResponseBody
	public Map saveUser(Auth_UserEntity user) {
		Map map = new HashMap();
		try {
			userService.saveOrUpdate(user);
			map.put("success", true);
			map.put("data", user);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("errmsg", "该帐号已经存在");
		}
		return map;
	}

	@RequestMapping(value = "updatePwd", method = RequestMethod.POST)
	@ResponseBody
	public Map updatePwd(String oid, String oldpwd, String newpwd1,
			String newpwd2) {
		Map map = new HashMap();
		try {
			Auth_UserEntity user = userService.findById(oid);
			if (user == null) {
				map.put("success", false);
				map.put("errmsg", "该用户不存在");
				return map;
			}
			user.setPassword(newpwd2);
			userService.saveOrUpdate(user);
			map.put("success", true);
			map.put("data", user);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("errmsg", "修改密码失败");
		}
		return map;
	}

	/**
	 * @DESC:获取用户信息，以JSON返回
	 * @param oid
	 * @param response
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "/getUser.json", method = RequestMethod.POST)
	public @ResponseBody void getUser(String oid, HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		Auth_UserEntity user = userService.findById(oid);
		String json = JSON.toJSONString(user);
		try {
			response.getWriter().print(json);
		} catch (Exception e) {
		}
	}

	@RequestMapping(value = "/checkUserExits.json", method = RequestMethod.POST)
	@ResponseBody
	public Map checkUserExits(String account) {
		Auth_UserEntity user = userService.findByAccount(account);
		Map map = new HashMap();
		map.put("success", true);
		if (user != null) {
			map.put("success", false);
		}
		return map;
	}

	/**
	 * @DESC:获取关系
	 * @param oid
	 * @return
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "/getUserRole.json", method = RequestMethod.POST)
	@ResponseBody
	public Map getUserRole(String oid) {
		Map map = new HashMap();
		map.put("success", true);
		try {
			List userroleList = roleService.findByUserOID(oid);
			List allroleList = roleService.findAllRole();
			map.put("userrole", userroleList);
			map.put("role", allroleList);
		} catch (Exception e) {
			map.put("success", false);
		}
		return map;
	}

	/**
	 * @DESC:获取关系
	 * @param oid
	 * @return
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "/saveUserAndRole.json", method = RequestMethod.POST)
	@ResponseBody
	public Map saveuserAndRole(@RequestBody String info,
			HttpServletRequest request) {
		Map map = new HashMap();
		map.put("success", true);
		String[] oids = request.getParameterValues("userOID[]");
		if (oids.length == 0) {
			map.put("success", false);
			map.put("errmsg", "请求数据错误");
			return map;
		}
		String oid = oids[0];
		roleService.deleteRoleAndUserByUserID(oid);
		String[] roles = request.getParameterValues("roleName[]");
		for (String role : roles) {
			roleService.put(oid, role);
		}
		userRealm.clearAllCache();
		return map;
	}

	@RequestMapping(value = "/deluser.json", method = RequestMethod.POST)
	@ResponseBody
	public AjaxObj delUserEntity(String oid) {
		AjaxObj obj = new AjaxObj();
		try {
			userSer2.deleteUser(oid);
			roleService.deleteRoleAndUserByUserID(oid);
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("error message:" + e.getMessage());
			obj.setSuccess(false);
			obj.setErrmsg(e.getMessage());
			return obj;
		}
	}

}
