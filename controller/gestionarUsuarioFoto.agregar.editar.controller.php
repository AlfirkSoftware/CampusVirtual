<?php
    
    try {

    require_once '../logic/Usuario.class.php';
    require_once '../util/functions/Helper.class.php';

    if
    (
            !isset($_POST["p_doc_ident"]) ||
            empty($_POST["p_doc_ident"]) ||
            
            !isset($_POST["p_foto"]) ||
            empty($_POST["p_foto"]) ||
            
            
            !isset($_POST["p_tipo_ope"]) ||
            empty($_POST["p_tipo_ope"])
    ) 
        {
        Helper::imprimeJSON(500, "Falta completar datos", "");
        exit();
    }

    $Dni                = $_POST["p_doc_ident"];
    $P_foto            = $_POST["p_foto"];
    $tipoOperacion      = $_POST["p_tipo_ope"];

    $objUsuario = new Usuario();

    if ($tipoOperacion == "agregar") {
        $objUsuario->setDni($Dni);
        $objUsuario->setP_foto($P_foto);
        $resultado = $objUsuario->agregarFoto();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    } else 
        { //Editar
            if (
                    !isset($_POST["p_cod_usuario"]) ||
                    empty($_POST["p_cod_usuario"])
            ) {
                Helper::imprimeJSON(500, "Falta completar datos para editar", "");
                exit();
            }

            //$codigo = $_POST["p_cod_usuario"];
            $objUsuario->setDni($Dni);
            $objUsuario->setP_foto($P_foto);
            
            $resultado = $objUsuario->editar();
            if ($resultado) {
                Helper::imprimeJSON(200, "Agregado correctamente", "");
            }
        }
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


