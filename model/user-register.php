<?php
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once RUTA_CLASS."/class/User-class.php";

$_user = new User();

$firstname = isset($_POST["firstname"]) ?$_POST["firstname"]:'';
$lastname = isset($_POST["lastname"]) ? $_POST["lastname"]:'';
$email = isset($_POST["email"])?$_POST["email"]:'';
$password = isset($_POST["passwor"])?$_POST["passwor"]:'';
$comment = isset($_POST["comment"])?$_POST["comment"]:'';
$zip = isset($_POST["zip"])?$_POST["zip"]:'';
$town = isset($_POST["town"])?$_POST["town"]:'';
$cell = isset($_POST["cell"])?$_POST["cell"]:'';

$result = $_user->registrar($firstname,$lastname,$email,$password,$comment,$zip,$town,$cell);

if($result > 0){
    die("Se registro correctamente");
}

?>