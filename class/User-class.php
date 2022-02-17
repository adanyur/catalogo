<?php
define('RUTA_PRODUCTO', dirname(dirname(__FILE__)));
require_once RUTA_PRODUCTO."/config/DBController.php";

class User extends DBController
{

    function Login($email,$password){

        $query = "SELECT id,email,firstname FROM tbluser WHERE email=? AND password=?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $email
            ),
            array(
                "param_type" => "s",
                "param_value" => $password
            )
        );

        return $this->getDBResult($query, $params);

    }


    function registrar($firstname,$lastname,$email,$password,$comment,$zip,$town,$cell){
        $query = "INSERT INTO tbluser (firstname,lastname,email,password,direcc,zip,town,cell) VALUES 
                  ('$firstname','$lastname', '$email', '$password', '$comment', '$zip', '$town', '$cell')";
            return $this->insertDB2($query);
    }

}