<?php
session_start();
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once RUTA_CLASS."/class/User-class.php";

$_user = new User();
$user = isset($_POST['user']) ? $_POST['user'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$data = $_user->Login($user,$password);

if(isset($data)){
    die(json_encode(array('status'=>true,
                    'message'=>'Ingreso correctamente',
                    'id'=>$data[0]['id'],
                    'email'=>$data[0]['email'],
                    'nombre'=>$data[0]['firstname']
                    )));
}else{
    die(json_encode(array('status'=>false , 'message'=>'Usted no tiene acceso!')));
}
?>