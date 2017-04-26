$(function(){

	//所有标签效果点击事件
	$(document).on("click",'.address',function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	
	$(document).on("click",".label",function(){
		label.load($(this).attr("id"));
		$(".label").each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	
	//点击加入分组的按钮
	$(document).on('click','.addGroup',function(){
		label_choose.show();
		var id=$(this).parent().attr("id");
		$("#label_choose_userid").val(id);
	});

	$("#address_distributed>div").click(function(){
		address.load($(this).text().toLowerCase().split(""));
	});
	
	$("#search").click(function(){
		changeCondition();
		user.loadPage(1);
	});
	
	
	$(".user_fir").click(function(){
		user.page("first");
	});
	$(".user_next").click(function(){
		user.page("next");
	});
	$(".user_previous").click(function(){
		user.page("previous");
	});
	$(".user_end").click(function(){
		user.page("end");
	});
	
	user.loadPage();
	address.loadData();
	label.loadData();
	label_choose.init(saveUserAndLabel);
});


function changeCondition(){
	var address=$('.address').filter(".active").html()==null?"":$('.address').filter(".active").html();
	var label=$(".label").filter(".active").attr("key")==null?"":$(".label").filter(".active").attr("key");
	var nickname=$("#nickname").val();
	var params={address:address,label:label,nickname:nickname};
	//alert(JSON.stringify(params));
	user.condition=params;
}


var user={
		data : null,
		condition : {pageSize:12},
		loadPage : function() {
			var initUrl = "wx/admin/user/page.json";
			$.post(initUrl, user.condition, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				user.data = json.data;
				user.clear();
				// alert(JSON.stringify(user.data));
				user.load();
			}, "json");
		},
		load : function() {
			//user.condition=user.data.conditions;
			user.condition.pageNum=user.data.currentPage;
			user.condition.pageSize=user.data.pageSize;
			if (typeof (user.data.items) == "undefined") {
				$("#userCount").html("共0条");
				return;
			}
			for (var int = 0; int < user.data.items.length; int++) {
				var item = user.data.items[int];
				user.addNode(item);
			}
			$("#userCount").html("共" + user.data.totalCount + "条");
		},addNode:function(item){
			var str='<div class="userInfo_list fl" id="{0}"><div class="userPhoto fl"><img src="{1}" ></div>';
			str+='<div class="userOper fl"><a>{2}</a><p>{3}</p></div><div class="lastMesTime fl">{4}</div>';
			str+='<div class="addGroup">加入分组</div>';
			str+='</div>';
			str = str.replace("{0}", item.openid);
			str = str.replace("{1}", item.headimgurl);
			str = str.replace("{2}", item.nickname);
			str = str.replace("{3}", item.lastActionStr);
			str = str.replace("{4}", timeStamp2String(item.lastActionTime));
			$("#userItems").append(str);
		},clear:function(){
			$("#userItems").html("");
		},page:function(type){
			if(user.condition==null){
				return ;
			}
			if("first"==type){
				if(user.condition.pageNum==1){
					return ;
				}
				user.condition.pageNum=1;
			}
			if("next"==type){
				if(user.condition.pageNum== Math.ceil(user.data.totalCount/user.condition.pageSize)){
					return ;
				}
				user.condition.pageNum=user.data.currentPage+1;
			}
			if("previous"==type){
				if(user.condition.pageNum==1){
					return ;
				}
				user.condition.pageNum=user.data.currentPage-1;
			}
			if("end"==type){
				if(user.condition.pageNum== Math.ceil(user.data.totalCount/user.condition.pageSize)){
					return ;
				}
				user.condition.pageNum= Math.ceil(user.data.totalCount/user.condition.pageSize);
			}
			user.loadPage();
		}
}


var address={
		addresses:null,
		loadData:function(){
			var initUrl = "wx/admin/address/list.json";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				address.addresses=json.data;
				//alert(JSON.stringify(json.data));
				address.load(new Array('a','b','c','d'));
			}, "json");
		},load:function(letters){
			address.clear();
			if (typeof (address.addresses) == "undefined") {
				return;
			}
			for (var int = 0; int < address.addresses.length; int++) {
				var item =  address.addresses[int];
				for(var y = 0;y <letters.length; y++) {
					var char = letters[y];
					if(item.pinyin.toLowerCase().charAt(0)==char.toLowerCase()){
						address.addNode(item);
					}
				}
			}
		},addNode:function(node){
			var str="<div class='tagName fl address' >{1}</div>";
			str = str.replace("{1}", node.name);
			$("#addressDiv").append(str);
		},clear:function(){
			$("#addressDiv").html("");
		}
}



var label={
		labels:null,
		loadData:function(){
			var initUrl = "wx/admin/label/tree.json";
			$.post(initUrl, null, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				label.labels=json.data;
				//alert(JSON.stringify(json.data));
				label.load(label.labels.id);
			}, "json");
		},load : function(nodeid) {
			var parentNode = label.findNode(label.labels, nodeid);
			label.clear(parentNode.level + 1);
			label.clear(parentNode.level + 2);
			if (parentNode == null || typeof (parentNode) == "undefined") {
				return;
			}
			$(parentNode.children).each(function(index) {
				var node = parentNode.children[index];
				label.addNode(node);
			});
			label.changeShow();
		},addNode : function(node) {
			var str = '<div class="tagName fl label" key=\'{0}\' id=\'{2}\'>{1}</div>';
			str = str.replace("{0}", node.key);
			str = str.replace("{1}", node.name);
			str = str.replace("{2}", node.id);
			$("#label_" + node.level).append(str);
		},findNode : function(tree, nodeid) {
			if (tree.id == nodeid) {
				return tree;
			}
			if (typeof (tree.children) == "undefined") {
				return null;
			}
			for (var int = 0; int < tree.children.length; int++) {
				var node = tree.children[int];
				var leaf = label.findNode(node, nodeid);
				if (leaf != null) {
					return leaf;
				}
			}
		},clear : function(level) {
			$("#label_" + level).html("");
		},changeShow:function(){
			if($("#label_2").text()!="" ){
				$("#label_2").show();
			}else{
				$("#label_2").hide();
			}
			if($("#label_3").text()!="" ){
				$("#label_3").show();
			}else{
				$("#label_3").hide();
			}
		}
}

function saveUserAndLabel(label){
	var userid=$("#label_choose_userid").val();
	label_user.save(userid,label);
	$("#label_choose_userid").val("");
}

var label_user={
		save:function(userid,labelKey){
			var url = "wx/admin/label/user/save.json";
			$.post(url, {userid:userid,labelKey:labelKey}, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				alert("保存成功！~");
			}, "json");
		}
}



