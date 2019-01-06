<?php
/**
 * Created by PhpStorm.
 * User: MD
 * Date: 2018/10/23
 * Time: 11:55
 */




if(!empty($_GET)){
    $dataUpdate = require_once ("./dataUpdate.class.php");
    $dataUpdate = new dataUpdate;
    $func = $_GET['func'];
    //动态调用方法
    call_user_func(array($dataUpdate,$func),$_GET,$_POST,$_FILES);
}
