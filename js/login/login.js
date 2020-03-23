  function btnclean() {
      var username = $("#username").val("");
      var password = $("#password").val("");
      //点击查询清除cookie
      $('#submit_btn').on('click', function () {
        //   $.cookie("username", $('#username').val(), {
        //       expires: -1
        //   });
        //$.cookie('username',null);
         alert("1"+$.cookie('username'))
        $.cookie("username", "", {
            expires: -1
        });
         $.cookie("pwd", "", {
             expires: -1
         });
      });
     
      alert("cookie已清除")
  }

  function login() {
      var username = $("#username").val();
      var password = $("#password").val();
      alert(username);
      alert(password);
      if (username == '') {
          alert("请输入用户名。");
          return;
      }

      if (password == '') {
          alert("请输入密码。");
          return;
          
      }

      //判断是否选中复选框，如果选中，添加cookie
      if ($("[name='checkbox']").prop("checked", true)) {
          //添加cookie
          setCookie();
          alert("记住密码登录。");
          $.ajax({
              url: "http://localhost:9000/web/CustomerController/findCustomerById",
              data: {
                  phone: username,
                  pCode: password
              },
              type: "post",
              dataType: "json",
              success: function (data) {
                  alert(data)
                  if (data) {
                      alert("登录成功");
                      window.location.href = "index.html";
                  } else {
                      alert("账号密码错误");
                  }
              }
          });
      } else {
          alert("不记密码登录。");
          $.ajax({
              url: "http://localhost:9000/web/CustomerController/findCustomerById",
              data: {
                  phone: username,
                  pCode: password
              },
              type: "post",
              dataType: "json",
              success: function (data) {
                  alert(data)
                  if (data) {
                      alert("登录成功");
                      window.location.href = "index.html";
                  } else {
                      alert("账号密码错误");
                  }
              }
          });
      }


  }

  function request() {
      $.ajax({
          url: "http://localhost:9000/web/CustomerController/findCustomerById",
          data: {
              phone: username,
              pCode: password
          },
          type: "post",
          dataType: "json",
          success: function (data) {
              alert(data)
              if (data) {
                  alert("登录成功");
                  window.location.href = "index.html";
              } else {
                  alert("账号密码错误");
              }
          }
      });
  }

  function setCookie() { //设置cookie
      var loginCode = $("#username").val(); //获取用户名信息
      var pwd = $("#password").val(); //获取登陆密码信息
      var checked = $("[name='checkbox']:checked"); //获取“是否记住密码”复选框

      if (checked) { //判断是否选中了“记住密码”复选框
          $.cookie("username", loginCode, {
              expires: 0.1
          }); //调用jquery.cookie.js中的方法设置cookie中的用户名
          $.cookie("pwd", $.base64.encode(pwd), {
              expires: 0.1
          }); //调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密
          //下面的是储存七天
          // $.cookie("username", loginCode,{expires:7}); //调用jquery.cookie.js中的方法设置cookie中的用户名
          // $.cookie("pwd", $.base64.encode(pwd),{expires:7});
          // //调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密
      } else {
          $.cookie("pwd", null);
      }
  }

  function getCookie() { //获取cookie
      var loginCode = $.cookie("username"); //获取cookie中的用户名
      var pwd = $.cookie("pwd"); //获取cookie中的登陆密码
      if (pwd) { //密码存在的话把“记住用户名和密码”复选框勾选住
          $("[name='checkbox']").prop("checked", true);
      }
      if (loginCode) { //用户名存在的话把用户名填充到用户名文本框
          $("#username").val(loginCode);
      }
      if (pwd) { //密码存在的话把密码填充到密码文本框
          $("#password").val($.base64.decode(pwd));
      }
  }