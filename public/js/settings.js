define(['jquery','template','util'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/main/index');
	//调后台接口获取所有个人信息
	$.ajax({
		type :'get',
		url : '/api/teacher/profile',
		dataType :'json',
		success :function(data){
			console.log(data);
			//解析数据，渲染页面
			var html = template('settingsTpl',data.result);
			$('#settingsInfo').html(html);

		}
	})
});