<?php
define('RUTA', dirname(dirname(dirname(__FILE__))));
require_once RUTA."/config/DBController.php";


class AuthModel extends DBController{

    function Login(array $params){      
        $query = "SELECT id,email,firstname FROM tbluser_admin WHERE email=? AND password=?";
        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $params['user']
            ),
            array(
                "param_type" => "s",
                "param_value" => $params['password']
            )
        );

        return json_encode($this->getDBResult($query, $params));

    }




 
 }