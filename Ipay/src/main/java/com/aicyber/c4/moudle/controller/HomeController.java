package com.aicyber.c4.moudle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "maserati/admin")
public class HomeController {

	@RequestMapping("home.html")
	public String index(Model model) {
		return "v1/admin/home";
	}

}
