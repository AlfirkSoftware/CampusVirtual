<?php

require_once '../logic/comboCodigo.class.php';
require_once '../util/functions/Helper.class.php';

try {
	if
    	(
            !isset($_POST["p_codigo_curso"]) ||
            empty($_POST["p_codigo_curso"]) 
    	) 
	{
        //Helper::imprimeJSON(500, "Falta completar datos", "");
        //exit();
    }
    //$codigo_curso         = $_POST["p_codigo_curso"];

    $objComboCodigo = new comboCodigo();
	$resultado = $objComboCodigo->cargarDatos_CodigoCursoPregunta();    
    Helper::imprimeJSON(200, "", $resultado);
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}

