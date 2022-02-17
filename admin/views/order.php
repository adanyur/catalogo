<?php
define('__RUTA__', dirname(dirname(__FILE__)));
require_once __RUTA__."/Controller/OrderController.php";
$order = new OrderController();


$fecha = isset($_GET['fecha'])?$_GET['fecha']:null;
$idshow = isset($_GET['idshow'])?$_GET['idshow']:null;
$route = isset($_GET['consulta'])?$_GET['consulta']:null;
$status = isset($_GET['status'])?$_GET['status']:null;
$method =isset($_POST['method'])? $_POST['method']:null;
$idOrder = isset($_POST['idOrder'])?$_POST['idOrder']:null;
$REQUEST_METHOD = $method ? $method:$_SERVER['REQUEST_METHOD'];


switch ($REQUEST_METHOD) {
    case 'GET':      
            if(isset($_GET['idshow'])){
                return die($order->show($idshow));       
            }
            return die($order->index(array('fecha'=>$fecha,'route'=>$route,'status'=>$status)));
        break;
    case 'PUT':
        return die($order->put($idOrder));
}




?>