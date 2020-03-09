<?php

try {
    require_once '../logic/Anuncio.class.php';
    require_once '../util/functions/Helper.class.php';
    
    if 
        (
            !isset($_POST["p_doc_Anuncio"]) ||
            empty($_POST["p_doc_Anuncio"])
            
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $codAnuncio = $_POST["p_doc_Anuncio"];
    
    $objAnuncio = new Anuncio();
    $resultado = $objAnuncio->leerDatos($codAnuncio);
    
    Helper::imprimeJSON(200, "", $resultado);
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


