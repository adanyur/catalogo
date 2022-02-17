<?php
    define('__RUTA__', dirname(dirname(__FILE__)));
    require_once __RUTA__."/Controller/AuthController.php";
    $auths = new AuthController();
    $user = isset($_POST['user'])?$_POST['user']:'';
    $password = isset($_POST['password'])?$_POST['password']:'';
    die($auths->auth(array('user'=>$user,'password'=>$password)));
?>