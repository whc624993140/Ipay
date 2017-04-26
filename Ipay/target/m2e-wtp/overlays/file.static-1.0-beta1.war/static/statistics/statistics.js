var sendAccessRecordsUrl='/wanhao_access_statistics/simpleaccess/{0}/{1}/access'
function sendAccessRecords(type,_key) {
		var url = sendAccessRecordsUrl.replace("{0}", type);
		url = url.replace("{1}", _key);
        $.ajax({
         	type:'get',  
            url: url
        });        
}

function initAccessRecords(_url){
	sendAccessRecordsUrl=_url;
}


function asharePage(key){
	var date=(new Date()).Format("yyyyMMddhhmmss");
	var ip = returnCitySN.cip;
	sendAccessRecords('share',key+"_"+ip+"_"+date);
}
function apvuv(key){
	var date=(new Date()).Format("yyyyMMddhhmmss");
	var ip = returnCitySN.cip;
	sendAccessRecords('pvuv',key+"_"+ip+"_"+date);
}
function aclick(key){
	var date=(new Date()).Format("yyyyMMddhhmmss");
	var ip = returnCitySN.cip;
	sendAccessRecords('click',key+"_"+ip+"_"+date);
}