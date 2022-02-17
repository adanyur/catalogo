<?php


$email = isset($_POST['email']) ? $_POST['email'] : '';
$comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';

$html = '<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            <h1>'.$comentario.'</h1>
        </body></html>
';





$para      = $email;
$titulo    = 'Mensaje del carrito';
$mensaje   = $html;
$cabeceras = 'From: webmaster@example.com' . "\r\n" .
             'Reply-To: webmaster@example.com' . "\r\n" .
             'Reply-To: webmaster@example.com' . "\r\n".
             "MIME-Version: 1.0" . "\r\n".
             "Content-type:text/html;charset=UTF-8" . "\r\n".
             'X-Mailer: PHP/' . phpversion();

mail($para, $titulo, $mensaje, $cabeceras);
?>