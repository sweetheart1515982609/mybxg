define(['jquery','template','util','datepicker','language'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/teacher/list');
	//获取编辑讲师的ID
	var tcId = util.qs('tc_id');
	// console.log(tcId);
	//根据ID查询对应得讲师详细信息
	if(tcId){
		//编辑讲师
		$.ajax({
		type:'get',
		url:'/api/teacher/edit',
		data:{tc_id :tcId},
		dataType:'json',
		success:function(data){
			// console.log(data);
			//解析数据渲染页面
			data.result.operate = '讲师编辑';//修改讲师添加为讲师编辑
			var html = template('teacherTpl',data.result);
			$('#teacherInfo').html(html);
			//绑定编辑的提交事件
			submitForm('/api/teacher/update');
			}
		});
	}else{
		//添加讲师
		var html = template('teacherTpl',{operate:'讲师添加',tc_gender :'1'});
		$('#teacherInfo').html(html);
		//绑定添加的提交事件
		submitForm('/api/teacher/add');
	}
	//实现表单提交功能
	function submitForm(url){
		$('#formBtn').click(function(){
			$.ajax({
				type:'post',
				url:url,
				data:$('#formId').serialize(),
				dataType:'json',
				success:function(data){
					// console.log(data);
					if(data.code == 200){
						location.href='/teacher/list';
					}

				}
			});
		});
		
	}
});