define(["jquery"],function(){
    function Register(){
        
    }
    Register.prototype = {
        constructor:Register,
        init:function(url){
            this.url = url;
            this.formObj = {
                phone:{
                    reg:/^[1]\d{10}$/i,
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
                var check = $("#check").is(":checked");
                console.log(check);
                if(sub&&check){
                    _this.loading()
                    .then(function(res){
                        if(res=="1"){
                            if(confirm("注册成功！去登录")){
                                location.href="login.html";
                            }
                        }else if(res=="2"){
                            if(confirm("您已注册过，请直接登录")){
                                location.href="login.html";
                            }
                        }
                    });
                }
            }.bind(this));
            
            //用户名验证
            var phoneReg = this.formObj.phone.reg;
            $("#phone").change(function(){
                var string = $(this).val();
                //验证后的事，交由这个方法做，因为每一个验证做的事情相同
                _this.addOnlyState(this,phoneReg.test(string),_this.formObj.phone);
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
            var phone = $("#phone").val();
            var pwd = $("#pwd").val();
            this.opt={
                url:this.url,
                type:"POST",
                dataType:"json",
                data:{username:phone,password:pwd,type:"register"}
            }
            return $.ajax(this.opt);
        },
        //这是验证表单的方法
        sub:function(){
            var flag = true;
            for(var attr in this.formObj){
                if(!this.formObj[attr].flag){
                    //把表单验证未通过的做一个错误的提示
                    $(".error").show();
                    flag = false;
                    break;
                }
            }
            return flag;
        },
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

    return new Register();
});