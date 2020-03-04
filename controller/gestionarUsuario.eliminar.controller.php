<?php

try {
    require_once '../logic/Usuario.class.php';
    require_once '../util/functions/Helper.class.php';
    
    if 
        (
            !isset($_POST["p_doc_ident"]) ||
            empty($_POST["p_doc_ident"])
            
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $Dni = $_POST["p_doc_ident"];
    
    $objUsuario = new Usuario();
    $objUsuario->setDni($Dni);
    $resultado = $objUsuario->eliminar();
    
    if ($resultado){
        Helper::imprimeJSON(200, "Se eliminó correctamente", "");
    }
    
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


