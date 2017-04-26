
$(function() {
	$("body").append("");
});

var dictionary_choose = {
	clear : function() {
		
	},
	fillSelect : function(selector, key, emptyStr) {
		dictionary.treeByKey(key, function(data) {
			if (!data.success) {
				alert(data.errmsg);
				return;
			}
			$(selector).empty();
			if (emptyStr) {
				$(selector).append("<option value=''>" + emptyStr + "</option>");
			}
			$(data.data.children).each(function(i) {
				var node = data.data.children[i];
				$(selector).append(
						"<option value='" + node.key + "'>" + node.name
								+ "</option>");
			});
		});
	}

}
