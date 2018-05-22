<?php
    header("Access-Control-Allow-Origin:*");
    /*
        username => 字段涵义 ; 前端发送给我的用户名信息;
    */
    //1.登陆;
    //2.注册;
    $usr = $_POST["username"];
    $pwd = $_POST["password"];
    $type = $_POST["type"];  //判断是登录还是注册
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what are u doing!");
        die(json_encode($res));
    }
    //和数据库建立连接
    require("./_connect.php");
    //把传过来的密码使用md5加密
    $pwd = md5($pwd);
    //根据不同情况进行不同判断;然后执行不同sql语句
    $sql_login = "SELECT username,pwd FROM user_list";
   
    $sql_register = "INSERT user_list(
        username,pwd
    )
        VALUES 
    ('{$usr}','{$pwd}')
    ";
    //执行query语句
    $result_login = $conn->query($sql_login);
    
    $hasuser = false; //用户名是否存在;
    $select_res = false;//储存用户信息;
    $haspwd = false;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){
        //array("username"=>yanghuaizhi,"pwd":"123456")
        if($row["username"] == $usr){
            $hasuser = true;
            //如果是注册，没必要判断密码;
            if($type == "register"){
                break;
            }
            if($row["pwd"] == $pwd){
                $select_res = json_encode($row);
                $haspwd = true;
                break;
            }
        }
    }

    //查询以后，这是登录的信息
    if($type == "login" &&  $haspwd == true){
        //用户名密码都对，登录成功
        die($select_res);
    }else if($type == "login"){
        //登录失败
        die("0");
    }

    if($type == "register" && $hasuser == true){
        //用户名重名; => 2;
        echo 2;
    }else if($hasuser == false){
        //注册成功;
        if($type == "register"){
            $result_register = $conn->query($sql_register);
        }
        echo 1;
    }

    // echo $hasuser;

    //返回结果判定是那种操作在执行;
    // echo $hasuser;
    // echo $select_res;
?>