/**
 * Created by zhangchan on 15/9/24.
 */
$(function(){
	var date = new Date();
	var stocks = "sh600843,sz002460,sz002162,sz002130,sh000001";
	var arg = {
		showapi_timestamp : dateFormat(date, "yyyyMMddHHmmss"),
		showapi_sign : "53f5576257cb49a1805888168d213599",
		showapi_appid : "10022",
		stocks: stocks,
		needIndex : 1
	};
	// var settime = setInterval(function(){
		$.ajax({
			type: "GET",
			url: "http://route.showapi.com/131-46",
			data: $.param(arg),
			dataType: "json",
			success: function(data){
//				console.log(data);
				var showmsg = $.map(data.showapi_res_body.list,function(row){
					return {"name":row.name,"price":row.nowPrice,"closePrice":row.closePrice,}
				});
				$('#table').bootstrapTable({
					showColumns: false,
					clickToSelect: true,
					height:299
				}).bootstrapTable("load",showmsg);
				console.table(showmsg);
			}
		});
	// },20000);
	function dateFormat(date, pattern){
		if (Object.prototype.toString.call(date) != "[object Date]") {
			return date;
		}
		pattern = pattern || "yyyy-MM-dd";
		/*初始化返回值字符串*/
		var returnValue = pattern;
		/*正则式pattern类型对象定义*/
		var format = {
			"y+": date.getFullYear(),
			"M+": date.getMonth()+1,
			"d+": date.getDate(),
			"H+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds(),
			"S" : date.getMilliseconds(),
			"h+": (date.getHours()%12),
			"a" : (date.getHours()/12) <= 1? "AM":"PM"
		};
		/*遍历正则式pattern类型对象构建returnValue对象*/
		for(var key in format) {
			var regExp = new RegExp("("+key+")");
			if(regExp.test(returnValue)) {
				var zero = "";
				for(var i = 0; i < RegExp.$1.length; i++) { zero += "0"; }
				var replacement = RegExp.$1.length == 1? format[key]:(zero+format[key]).substring(((""+format[key]).length));
				returnValue = returnValue.replace(RegExp.$1, replacement);
			}
		}
		return returnValue;
	};
});