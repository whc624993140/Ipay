package com.aicyber.c4.moudle.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aicyber.c4.base.web.controller.BaseController;
import com.aicyber.c4.base.web.model.AjaxObj;
import com.aicyber.c4.label.Label;
import com.aicyber.c4.label.LabelService;

//import com.aicyber.wx.module.label.UserAndLabelService;

@Controller
@RequestMapping(value = "wx/admin/label")
public class LabelControllers extends BaseController {

	@Autowired
	private LabelService labelService;

	// @Autowired
	// private UserAndLabelService userAndLabelService;
	// @Autowired
	// private PersonAndWxUserSyncLabelService personAndWxUserSyncLabelService;

	@RequestMapping(value = "manage.html")
	public String list() {
		return "v1/admin/label/manage";
	}

	@RequestMapping(value = "tree.json")
	@ResponseBody
	public Map load(Model model) {
		try {
			Label tree = labelService.findTree();
			Map res = new HashMap();
			res.put("success", true);
			res.put("data", tree);
			return res;
		} catch (Exception e) {
			logger.error(e);
			Map res = new HashMap();
			res.put("success", false);
			res.put("errmsg", e.getMessage());
			return res;
		}
	}

	@RequestMapping(value = "{key}/tree.json")
	@ResponseBody
	public AjaxObj load(@PathVariable String key) {
		try {
			Label tree = labelService.findTree(key);
			return new AjaxObj(tree);
		} catch (Exception e) {
			logger.error(e);
			return new AjaxObj(false, e.getMessage(), null);
		}
	}

	@RequestMapping(value = "save.json")
	@ResponseBody
	public Map save(String name, String key, Long parentId) {
		Label findByKey = labelService.findByKey(key);
		Map res = new HashMap();
		if (findByKey != null) {
			res.put("success", false);
			res.put("errmsg", "标签key值已经存在！清更换其他key值。");
			return res;
		}

		Label data = labelService.save(name, key, parentId);
		res.put("success", true);
		res.put("data", data);
		return res;
	}

	@RequestMapping(value = "update.json")
	@ResponseBody
	public Map update(Label label) {
		Label findByKey = labelService.findByKey(label.getKey());
		Map res = new HashMap();
		if (findByKey != null && findByKey.getId() != label.getId()) {
			res.put("success", false);
			res.put("errmsg", "标签key值已经存在！清更换其他key值。");
			return res;
		}
		Label data = labelService.update(label);
		res.put("success", true);
		res.put("data", data);
		return res;
	}

	@RequestMapping(value = "delete.json")
	@ResponseBody
	public Map delete(Long id) {
		int delete = labelService.delete(id);
		Map res = new HashMap();
		res.put("success", true);
		res.put("delNum", delete);
		return res;
	}

	// @RequestMapping(value = "user/save.json")
	// @ResponseBody
	// public AjaxObj userSave(String userid, String labelKey) {
	// userAndLabelService.save(userid, labelKey);
	// personAndWxUserSyncLabelService.sync(userid);
	// return new AjaxObj();
	// }

}
