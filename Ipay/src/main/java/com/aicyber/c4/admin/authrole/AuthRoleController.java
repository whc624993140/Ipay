package com.aicyber.c4.admin.authrole;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aicyber.c4.admin.auth.role.AuthRoleService;
import com.aicyber.c4.admin.auth.role.Auth_RoleAndUserEntity;
import com.aicyber.c4.admin.auth.role.Auth_RoleEntity;
import com.aicyber.c4.base.utils.web.RequestUtils;
import com.aicyber.c4.base.web.controller.BaseController;
import com.aicyber.c4.base.web.model.AjaxObj;
import com.aicyber.tools.page.PaginationSupport;

/**
 * 权限管理控制器
 */
@Controller
@RequestMapping(value = "wx/admin/authrole")
public class AuthRoleController extends BaseController {
	@Autowired
	private AuthRoleService roleService;

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
		ps.setPageSize(pageSize == null ? 5 : pageSize);
		roleService.findByPage(ps, null);
		model.addAttribute("ps", ps);
		return "v1/admin/authrole/roleManage";
	}

	/**
	 * @DESC:保存用户信息
	 * @param request
	 * @param response
	 * @param model
	 * @param user
	 * @return
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "saverole.json", method = RequestMethod.POST)
	@ResponseBody
	public Map saveRole(Auth_RoleEntity role) {
		Map map = new HashMap();
		try {
			roleService.saveOrUpdate(role);
			map.put("success", true);
			map.put("data", role);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("errmsg", "更新信息出现异常");
		}
		return map;
	}

	/**
	 * @DESC:获取用户信息，以JSON返回
	 * @param oid
	 * @param response
	 * @AUTH:TongLZ
	 */
	@RequestMapping(value = "/getRole.json", method = RequestMethod.POST)
	@ResponseBody
	public Map getRole(String name) {
		Map map = new HashMap();
		Auth_RoleEntity role = roleService.getRoleEntiy(name);
		map.put("success", true);
		map.put("data", role);
		if (role == null) {
			map.put("success", false);
			map.put("errmsg", "未获取到数据");
		}
		return map;
	}

	@RequestMapping(value = "/delRole.json", method = RequestMethod.POST)
	@ResponseBody
	public AjaxObj delAuthRole(String role_id) {
		AjaxObj obj = new AjaxObj();
		logger.debug("role_name : " + role_id);
		List<Auth_RoleAndUserEntity> list = roleService.findByRoleName(role_id);
		if (list.size() > 0) {// list > 0 说明有用户关联了这个角色权限
			obj.setErrmsg(" the role is haved");
			obj.setSuccess(false);
		} else {
			roleService.delete(role_id);
			obj.setSuccess(true);
		}
		return obj;
	}
}
