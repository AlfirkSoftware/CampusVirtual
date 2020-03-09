<?php

require_once '../util/functions/Helper.class.php';

$anuncio_id = $_POST["txtCodigoA"];

if ($_FILES["file-upload"]["name"] != "" ){
    $tipo_archivo = $_FILES["file-upload"]["type"];
    $direccion_subida = "../view/fotos/anuncios/";
    
    $nombre_archivo_subir = $direccion_subida . $anuncio_id . ".png";
    
    $resultado_subida = move_uploaded_file( $_FILES["file-upload"]["tmp_name"], $nombre_archivo_subir);
    
    if ($resultado_subida){
        Helper::mensaje("Se ha actualizado la imagen del anuncio", "s", "../view/gestionarAnuncios.view.php", 5);
    }
    
}else{
    Helper::mensaje("No ha seleccionado la imagen", "i");
}
