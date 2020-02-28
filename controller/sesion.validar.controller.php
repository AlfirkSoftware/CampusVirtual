<?php

try {
    $email = $_POST["txtEmail"];
    $clave = $_POST["txtClave"];

    require_once '../logic/Sesion.class.php';
    require_once '../util/functions/Helper.class.php';
    /* Obtener los datos ingresados en el formulario */

//    if (!isset($_POST["txtEmail"]) || $_POST["txtEmail"] == "") {
//        Helper::mensaje("Debe ingresar su email", "e", "../view/index.php", 5);
//    } else 
//        if (!isset($_POST["txtClave"]) || $_POST["txtClave"] == "") {
//        Helper::mensaje("Debe ingresar su clave", "e", "../view/index.php", 5);
//        }
    $objSesion = new Sesion();
    $objSesion->setEmail($email);
    $objSesion->setClave($clave);

    $resultado = $objSesion->iniciarSesion();

    //echo $resultado;

    switch ($resultado) {

        case "CI": //Contraseña incorrecta
            Helper::mensaje("La Contraseña es incorrecta", "e", "../view/index.php", 5);
            break;
        
        case "IN": //usuario inactivo
            Helper::mensaje("El usuario esta inactivo. Consulte con su administrador", "a", "../view/index.php", 5);
            break;
        
        case "NE": //usuario no existe
            Helper::mensaje("El usuario no existe", "e", "../view/index.php", 5);
            break;
//        Helper::mensaje("Usuario inactivo", "a", "../view/index.php", 3);
        default:// SI
                    header("location:../view/menu.principal.view.php");
            break;
    }

} catch (Exception $exc) {
    echo $exc->getMessage();
}


