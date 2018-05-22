define(['jquery2',"cookie2"],function(){
    function Login(){
        
    }
    Login.prototype = {
        constructor:Login,
        init:function(url){
            this.url = url;
            this.formObj = {
                user:{
                    reg:/^[\u4e00-\u9fa5aa-z0-9_\-]{4,20}$/i,
                    flag:false
                },
                pwd:{
                    reg:/^[a-z0-9\u0021-\u002f]{6,20}$/i,
                    flag:false
                }
            }

            var _this = this;
            //当点击提交按钮时，验证是否都通过了，然后ajax做登录操作
            $("#sub").on("click",function(){
                var sub = _this.sub();
                if(sub){
                    _this.loading()
                    .then(function(res){
                        if(res){
                            location.href="../index.html";
                            console.log(res.username);
                            $.cookie("user",res.username);
                        }else{
                            $(".error_zong").show();
                        }
                    });
                }
            });
            
            //用户名验证
            var usrReg = this.formObj.user.reg;
            $("#user").change(function(){
                console.log(this);
                var string = $(this).val();
                //验证后的事，交由这个方法做，因为每一个验证做的事情相同
                _this.addOnlyState(this,usrReg.test(string),_this.formObj.user);
            });
            //密码验证
            var pwdReg = this.formObj.pwd.reg;
            $("#pwd").change(function(){
                var string = $(this).val();
                //验证后的事，交由这个方法做，因为每一个验证做的事情相同
                _this.addOnlyState(this,pwdReg.test(string),_this.formObj.pwd);
            });
        },
        //ajax加载
        loading:function(){
            var user = $("#user").val();
            var pwd = $("#pwd").val();
            this.opt={
                url:this.url,
                type:"POST",
                dataType:"json",
                data:{username:user,password:pwd,type:"login"}
            }
            return $.ajax(this.opt);
        },
        //这是验证表单的方法
        sub:function(){
            var flag = true;
            for(var attr in this.formObj){
                if(!this.formObj[attr].flag){
                    //把表单验证未通过的做一个错误的提示
                    $(".error_zong").show();
                    flag = false;
                    break;
                }
            }
            return flag;
        }.bind(this),
        //输入时验证表单
        addOnlyState:function(el,bool,flag){
            var $span = $(el).next();
            if(bool){
                //通过
                $span.hide();
                flag.flag = true;
            }else{
                //未通过
                $span.show();
                flag.flag = false;
            }
        }
    }

    return new Login();
});