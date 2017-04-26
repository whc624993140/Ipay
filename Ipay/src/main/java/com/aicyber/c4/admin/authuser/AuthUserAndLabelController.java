package com.aicyber.c4.admin.authuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aicyber.c4.admin.auth.user.userandlabel.AuthUserAndLabelEntity;
import com.aicyber.c4.admin.auth.user.userandlabel.AuthUserAndLabelService;
import com.aicyber.c4.base.web.controller.BaseController;
import com.aicyber.c4.base.web.model.AjaxObj;

@Controller
@RequestMapping(value = "auth/admin/userandlabel")
public class AuthUserAndLabelController extends BaseController {
	@Autowired
	private AuthUserAndLabelService authUserAndLabelService;

	@ExceptionHandler(value = Exception.class)
	@ResponseBody
	public AjaxObj exception(Exception e) {
		logger.error(e.getMessage(), e);
		return new AjaxObj(false, e.getMessage(), null);
	}

	@RequestMapping("all.json")
	@ResponseBody
	public AjaxObj list() {
		List<AuthUserAndLabelEntity> findAll = authUserAndLabelService
				.findAll();
		return new AjaxObj(findAll);
	}

	@RequestMapping("save.json")
	@ResponseBody
	public AjaxObj create(String userOID, String labelKey) {
		authUserAndLabelService.save(userOID, labelKey);
		return new AjaxObj();
	}

	@RequestMapping("delete.json")
	@ResponseBody
	public AjaxObj delete(String userOID, String labelKey) {
		authUserAndLabelService.delete(userOID, labelKey);
		return new AjaxObj();
	}

}
