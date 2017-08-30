define(['jquery','cookie'], function($) {
  // 实现登录功能
  $('#loginBtn').click(function() {
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $('#loginForm').serialize(),
      dataType: 'json',
      success: function(data) {
        if (data.code == 200) {
          // 存储用户信息到cookie（只能存字符串）
          $.cookie('loginInfo',JSON.stringify(data.result),{path : '/'});//存到根路径，确保都能获取到
          // 登录成功
          location.href = '/main/index';
        } else {
          alert('用户名或者密码错误');
        }
      }
    });
    return false;
  });
});
