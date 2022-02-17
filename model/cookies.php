<?php
session_start();
if(isset($_COOKIE['COOKIE_DATA_INDEFINED_SESSION'])){
    $json = array(); 
    $nombre_user = isset($_COOKIE['COOKIE_DATA_INDEFINED_SESSION']['user']) ? $_COOKIE['COOKIE_DATA_INDEFINED_SESSION']['user'] : '';
    $id = isset($_COOKIE['COOKIE_DATA_INDEFINED_SESSION']['id']) ? $_COOKIE['COOKIE_DATA_INDEFINED_SESSION']['id'] : '';
    $_SESSION['user']  = $nombre_user;
    $json[] = array('user'=>$nombre_user,'id'=>$id);
    die(json_encode($json));
}else{
    die(false);
}


?>