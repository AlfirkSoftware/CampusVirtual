<?php

try {
    require_once '../logic/Curso.class.php';
    require_once '../util/functions/Helper.class.php';
    
    if 
        (
            !isset($_POST["p_codigo_curso"]) ||
            empty($_POST["p_codigo_curso"])
            
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $codCurso = $_POST["p_codigo_curso"];
    
    $objCurso = new Curso();
    $resultado = $objCurso->leerDatos($codCurso);
    
    Helper::imprimeJSON(200, "", $resultado);
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


