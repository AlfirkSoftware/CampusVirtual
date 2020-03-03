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
    
    $codIdentidad = $_POST["p_doc_ident"];
    
    $objUsuario = new Usuario();
    $resultado = $objUsuario->leerDatos($codIdentidad);
    
    Helper::imprimeJSON(200, "", $resultado);
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


