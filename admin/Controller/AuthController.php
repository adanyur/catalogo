<?php
define('__RUTA__model', dirname(dirname(__FILE__)));
require_once __RUTA__model."/Model/AuthModel.php";


class AuthController extends AuthModel{

    function auth( array $params){
        $auth = new AuthModel();
        $data = $auth->Login($params);
        if($data ==='null'){
            return json_encode(array('status'=>false,'message'=> 'usuario o contraseña es incorrecto'));
        }

        return json_encode(array('status'=>true,'data'=>$data));

    }


}


?>