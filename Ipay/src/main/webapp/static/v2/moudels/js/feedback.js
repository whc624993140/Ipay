$(function(){
    feedback.loadDatas();
});


var feedback={
		datas:null,
		conditions:{pageSize:10},
		loadDatas:function(){
			$.post("maserati/feedback/admin/page.json", feedback.conditions, function(json) {
				if (!json.success) {
					alert(json.errmsg);
					return;
				}
				feedback.datas=json.data;
				//alert(JSON.stringify(json.data));
				feedback.clear();
				feedback.load(feedback.datas.items);
			}, "json");
		},load:function(datas){
			if(!datas){
				return;
			}
			$(datas).each(function(index) {
				var node = datas[index];
				feedback.addNode(node);
			});
			$("#data_page").createPage({
		        pageCount:feedback.datas.pageCount,
		        current:feedback.datas.currentPage,
		        backFn:function(p){
		        	feedback.conditions.pageNum=p;
		        	feedback.clear();
		        	feedback.loadDatas();
		        }
			});
		},addNode:function(node){
			if(!node){
				return;
			}
			var str = '<tr  id=\'{9}\'>'
                +'<td>{0}</td>'
                +'<td>{1}</td>'
                +'<td>{2}</td>'
                +'</tr>';
			str = str.replace("{0}",node.fullName?node.fullName:"" );
			str = str.replace("{1}", (new Date(node.createTime)).Format("yyyy-MM-dd hh:mm:ss"));
			str = str.replace("{2}", node.content);
			str = str.replace("{9}", node.OID);
			$("#data_datas_body").append(str);
		},clear:function(){
			$("#data_datas_body").html("");
		}
}




















