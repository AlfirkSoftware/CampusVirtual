<?php

require_once '../logic/Anuncio.class.php';
require_once '../util/functions/Helper.class.php';

try {
    $objAnuncio = new Anuncio();
    $resultado = $objAnuncio->listar();
    Helper::imprimeJSON(200, "", $resultado);
    } catch (Exception $exc) {
        Helper::imprimeJSON(500, $exc->getMessage(), "");
    }

