/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.language = 'zh-cn';
	config.toolbar = 'Basic'; 
	config.toolbarCanCollapse = true;
	config.pasteFromWordIgnoreFontFace = false; //默认为忽略格式
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;
	config.forcePasteAsPlainText = false;
	//是否使用完整的html编辑模式 如使用，其源码将包含：<html><body></body></html>等标签
	config.fullPage= false;
	config.allowedContent= true;
	config.filebrowserUploadUrl="ckEditorUpload";
	//config.docType = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd>' ; 
	//config.enterMode = CKEDITOR.ENTER_BR; //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_DIV ,CKEDITOR.ENTER_P
	//config.entities = true; 
};
