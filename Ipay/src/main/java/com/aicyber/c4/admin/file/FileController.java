package com.aicyber.c4.admin.file;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.entity.mime.content.InputStreamBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.aicyber.c4.base.web.controller.BaseController;
import com.aicyber.tools.HttpClientHelper;
import com.aicyber.tools.httpclient.JsonResponseHandler;

@Controller
public class FileController extends BaseController {
	@Value("${file.uploadUrl}")
	private String uploadUrl;

	@Autowired
	private HttpClientHelper httpClientHelper;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Map<String, Object>> handleFileUpload(
			@RequestParam("file") MultipartFile file) {
		HttpPost httpPost = new HttpPost(uploadUrl);
		try {
			ByteArrayBody isb = new ByteArrayBody(file.getBytes(),
					file.getOriginalFilename());
			// InputStreamBody isb = new InputStreamBody(file.getInputStream(),
			// file.getOriginalFilename());
			HttpEntity reqEntity = MultipartEntityBuilder.create()
					.addPart("file", isb).build();
			httpPost.setEntity(reqEntity);
			HttpResponse execute = httpClientHelper.execute(httpPost);
			HashMap res = JsonResponseHandler
					.createIgnoreStatusResponseHandler(HashMap.class)
					.handleResponse(execute);
			return new ResponseEntity<Map<String, Object>>(res,
					HttpStatus.valueOf(execute.getStatusLine().getStatusCode()));
		} catch (Exception e) {
			logger.error(e);
			Map<String, Object> res = new HashMap<String, Object>();
			res.put("success", false);
			res.put("errmsg", e.getMessage());
			return new ResponseEntity<Map<String, Object>>(res,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/ckEditorUpload", method = RequestMethod.POST, produces = "text/html")
	@ResponseBody
	public ResponseEntity<String> ckEditorUpload(
			@RequestParam("upload") MultipartFile file, String CKEditorFuncNum,
			HttpServletResponse response) {
		HttpPost httpPost = new HttpPost(uploadUrl);

		try {
			ByteArrayBody isb = new ByteArrayBody(file.getBytes(),
					file.getOriginalFilename());
			// InputStreamBody isb = new InputStreamBody(file.getInputStream(),
			// file.getOriginalFilename());
			HttpEntity reqEntity = MultipartEntityBuilder.create()
					.addPart("file", isb).build();
			httpPost.setEntity(reqEntity);
			HttpResponse execute = httpClientHelper.execute(httpPost);
			HashMap res = JsonResponseHandler
					.createIgnoreStatusResponseHandler(HashMap.class)
					.handleResponse(execute);
			if ((boolean) res.get("success")) {
				StringBuilder sb = new StringBuilder();
				sb.append("<script type=\"text/javascript\">");
				sb.append("window.parent.CKEDITOR.tools.callFunction("
						+ CKEditorFuncNum + ",'" + res.get("uri") + "','');");
				sb.append("</script>");
				return new ResponseEntity<String>(sb.toString(), HttpStatus.OK);
			}
			StringBuilder sb = new StringBuilder();
			sb.append("<script type=\"text/javascript\">");
			sb.append("alert('" + res.get("errmsg") + "')");
			sb.append("</script>");
			return new ResponseEntity<String>(sb.toString(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			logger.error(e);
			StringBuilder sb = new StringBuilder();
			sb.append("<script type=\"text/javascript\">");
			sb.append("alert('" + e.getMessage() + "')");
			sb.append("</script>");
			return new ResponseEntity<String>(sb.toString(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
