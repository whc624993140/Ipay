$(function() {
	$("body").append("<div name=\"card_choose_div\" class=\"layer fade\"><div class=\"modal_layer\"><div class=\"layer-content\"><div class=\"layer-header\">" +
		"<h4 class=\"modal-title text-left\" style=\"margin:0\"> <img src=\"static/v2/img/xiaoLogo.png\" alt=\"\" style=\"margin-right: 12px; margin-top: 0px;\">请选择卡券</h4> <a class=\"close\" href=\"javascript:void(0)\">×</a></div><div class=\"layer-body layer_minH\"><div class=\"padTop\" ><table name=\"card_choose_table\" class=\"table\"><thead><tr>" +
					"<th>卡券ID</th><th>卡券类型</th><th>标题</th><th>库存</th><th>有效期</th><th>操作</th></tr></thead><tbody></tbody></table></div>" +
					"<div class=\"padTop\" style='text-align:center;' name=\"card_choose_div_page\"></div></div><div class=\"layer-footer\"><a name=\"close\" class=\"btn btn-primary\" href=\"javascript:void(0)\">关闭</a>" +
							"</div></div></div></div>");
});



var card_choose={
		callback:null,
		condition : {pageSize:20,pageNum:1},
		init:function(callback){
			$("[name='card_choose_div']").on("click","[click='choose']",function(){
				var cardid=$(this).parent().parent().data('cardid');
				card_choose.callback(card.get(cardid));
			});
			//点击小×关闭分组框
			$("[name='card_choose_div']").on('click','.close',function(){
				layerAction.close("[name='card_choose_div']");
			});
			//点击关闭按钮
			$("[name='card_choose_div']").on('click','[name=\'close\']',function(){
				layerAction.close("[name='card_choose_div']");
			});
			card_choose.loadData(); 
			card_choose.callback=callback;
		},
		show:function(key){
			layerAction.open("[name='card_choose_div']");
		},hide:function(){
			layerAction.close("[name='card_choose_div']");
		},
		loadData:function(){
			card.page(card_choose.condition,function(data){
//				alert(JSON.stringify(data));
				if (!data.success) {
					alert(data.errmsg);
					return;
				}
				for (var int = 0; int < data.data.items.length; int++) {
					card_choose.addNode(data.data.items[int]); 
				}
				$("[name='card_choose_div_page']").createPage({
					pageCount : data. data.pageCount,
					current : data.data.currentPage,
					backFn : function(p) {
						card_choose.conditions.pageNum = p;
						card_choose.clear();
						card_choose.loadData();
					}
				});
			});
		},addNode : function(node) {
			var str = '<tr data-id="{98}" data-cardid="{99}"><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td><a class="" href="javascript:void(0);" click="choose"><i class="icon-edit"></i>选择</a></td></tr>';
			str = str.replace("{1}", node.card_id);
			str = str.replace("{99}", node.card_id);
			str = str.replace("{98}", node.OID);
			str = str.replace("{2}", node.card_type); 
			str = str.replace("{3}", node.baseInfo.title);
			str = str.replace("{4}", node.baseInfo.sku.quantity);
			str = str.replace("{5}", "");
			$("[name='card_choose_table'] > tbody").append(str);
		},clear : function(level) {
			$("[name='card_choose_table'] > tbody").empty(str);
		}
		
		
}








