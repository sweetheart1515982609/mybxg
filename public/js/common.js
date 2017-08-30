define(['jquery','template','cookie'], function($,template) {
  // NProgress.start();
  // NProgress.done();

  // 控制左侧导航菜单折叠展开
  $('.navs ul').prev('a').on('click', function() {
    $(this).next().slideToggle();
  });

  // 实现退出功能
  $('#logoutBtn').click(function() {
    $.ajax({
      type: 'post',
      url: '/api/logout',
      dataType: 'json',
      success: function(data) {
        if (data.code == 200) {
          // 退出成功
          location.href = '/main/login';
        }
      }
    });
    return false;
  });

  // 验证是否登录
  var seesionId = $.cookie('PHPSESSID');
  // console.log(seesionId);
  // console.log(location.pathname);
  if(!seesionId && location.pathname != '/main/login'){
    location.href = '/main/login';//sessionId不存在并且路径不是才跳转
  }
 
  // 获取用户登录信息,并填充页面（登录成功后侧边栏登录信息不应写死）
  var cookie = $.cookie('loginInfo');
  var loginInfo = cookie ? JSON.parse(cookie) : {};
  // console.log(loginInfo);
  // $('.profile img').attr('src',loginInfo.tc_avatar);
  // $('.profile h4').html(loginInfo.tc_name);
  var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"> </div><h4>{{tc_name}}</h4>';
  var html = template.render(tpl,loginInfo);
  $('#profileId').html(html);
});
