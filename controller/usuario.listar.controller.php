<?php

require_once '../logic/Usuario.class.php';
require_once '../util/functions/Helper.class.php';

try {
    $objUsuario = new Usuario();
    $resultado = $objUsuario->listar();
    Helper::imprimeJSON(200, "", $resultado);
    } catch (Exception $exc) {
        Helper::imprimeJSON(500, $exc->getMessage(), "");
    }

