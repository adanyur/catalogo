<?php


setcookie("COOKIE_INDEFINED_SESSION", TRUE, time()+0);
setcookie("COOKIE_DATA_INDEFINED_SESSION[user]", null, time()+0);
setcookie("COOKIE_DATA_INDEFINED_SESSION[id]", null, time()+0); 

if(isset($_SESSION['id'])){
    session_destroy();
}

?>