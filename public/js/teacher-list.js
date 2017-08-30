define(['jquery','template'],function($,template){
	// console.log(11111);
	// 请求后台接口，调后台数据
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		dataType: 'json',
		success :function(data){
			console.log(data);
			//解析数据并渲染页面
			var html = template('teacherTpl',{list : data.result});
			$('#teacherInfo').html(html);
			
		}
	})
});