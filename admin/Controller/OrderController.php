<?php
define('__RUTA__model', dirname(dirname(__FILE__)));
require_once __RUTA__model."/Model/OrderModel.php";

class OrderController extends OrderModel{

    function index(array $params){
        $order = new OrderModel();
        switch($params['route']){
            case 'LISTADO':
                return $order->getListOrder($params['fecha']);
                break;
            case 'CANTIDAD-PENDIENTE':
                return $order->countOrder($params);
                break;
            case 'CANTIDAD-ATENDIDO':
                    return $order->countOrder($params);
                break;    
        }        
    }

    function show($id){
        $order = new OrderModel();
        return $order->getOrderById($id);
    }


    function put($id){
        $order = new OrderModel();
        return $order->updateStatus($id);
    }


    

}
