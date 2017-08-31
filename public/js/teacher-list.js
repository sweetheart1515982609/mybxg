define(['jquery','template','util','bootstrap'],function($,template,util){
	// $('.navs a[href="'+location.pathname+'"]').addClass('active');
	// 设置导航菜单选中
	util.setMenu(location.pathname);
	//获取URL参数
	// var ret = util.qs('abc');
	// console.log(ret);
	// 请求后台接口，调后台数据
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		dataType: 'json',
		success :function(data){
			// console.log(data);
			//解析数据并渲染页面
			var html = template('teacherTpl',{list : data.result});
			$('#teacherInfo').html(html);
			//绑定预览事件，查看点击
			$('.preview').click(function(){
				 // 通过接口获取数据
				 var tcId = $(this).closest('td').attr('data-tcId');//this是点的a,得到a最近的父元素
				 // console.log(tcId);
				 $.ajax({
				 	url: '/api/teacher/view',
				 	type: 'get',
				 	dataType: 'json',
				 	data: {tc_id : tcId},
				 	success :function(data){
				 		console.log(data);
				 		//解析数据并渲染页面
				 		var html = template('modalTpl',data.result);
				 		$('#modalInfo').html(html);
				 		//显示弹窗
				 		$('#teacherModal').modal();
				 	}
				});
			});
			// 处理启用注销功能
			$('.eod').click(function(){
	        var td = $(this).closest('td');
	        var tcId = td.attr('data-tcId');
	        var tcStatus = td.attr('data-status');
	        var that = this;// 点击的按钮
		        $.ajax({
		          	type : 'post',
		          	url : '/api/teacher/handle',
		          	data : {tc_id : tcId,tc_status : tcStatus},
		          	dataType : 'json',
		          	success : function(data){
		            td.attr('data-status',data.result.tc_status);
		            if(data.result.tc_status == 0){
		              	$(that).html('注 销');
		            }else{
		              	$(that).html('启 用');
		            	}
		          	}
		        });
	      	});
		}
	});	
});