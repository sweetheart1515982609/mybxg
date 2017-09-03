define(['jquery','template','util','ckeditor','datepicker','language','uploadify','region','validate','form','state'],function($,template,util,CKEDITOR){
	//设置导航菜单选中
	util.setMenu('/main/index');
	//调后台接口获取所有个人信息
	$.ajax({
		type :'get',
		url : '/api/teacher/profile',
		dataType :'json',
		success :function(data){
			// console.log(data);
			//解析数据，渲染页面
			var html = template('settingsTpl',data.result);
			$('#settingsInfo').html(html);
			//处理头像上传
			$('#upfile').uploadify({
				width:120,
				height:120,
				buttonText:'',
				itemTemplate : '<span></span>',//进度条不显示
				fileObjName:'tc_avatar',//后台根据这个名称获取信息
				swf:'/public/assets/uploadify/uploadify.swf',//flash一个工具
				uploader:'/api/uploader/avatar',// 接收上传文件的后台接口				
				onUploadSuccess:function(f,data){
					console.log(data);
					var data=JSON.parse(data);
					console.log(data.result.path);
					//修改图片的URL地址
					$('.preview img').attr('src',data.result.path);
				}
			});
			// 省市县三级联动
		    $('#pcd').region({
		        url : '/public/assets/jquery-region/region.json'
		    });
		    // 处理富文本
      		CKEDITOR.replace('editor',{
        	toolbarGroups : [
	          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
	          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
	        ]
	      });
      		//处理表单提交
      		$('#settingForm').validate({
      			sendForm :false,
      			valid : function(){
      				//同步富文本信息到textarea中
      				for (var instance in CKEDITOR.instances){
      					CKEDITOR.instances[instance].updateElement();
      				}
      				//获取省市县名称
      				var p = $("#p").find('option:selected').text();
      				var c= $("#c").find('option:selected').text();
      				var d = $("#d").find('option:selected').text();
      				var hometown = p + "|" + c + "|" + d;
      				//验证通过，提交表单
      				$(this).ajaxSubmit({
			            type : 'post',
			            url : '/api/teacher/modify',
			            data : {tc_hometown:hometown},
			            dataType : 'json',
			            success : function(data){
			              if(data.code == 200){
			              	console.log(data);
			                // location.reload();
			              }
			            }  
			        });
      			}
      		});
		}
	});
});