<?php

require_once '../util/functions/Helper.class.php';

/*
echo '<pre>';
echo 'Datos que llegan por POST';
print_r($_POST);
echo 'Datos que llegan por FILES';
print_r($_FILES);
echo '</pre>';
*/

$dni = $_POST["txtDocID"];
//echo $dni;

if ($_FILES["file-upload"]["name"] != "" ){
    $tipo_archivo = $_FILES["file-upload"]["type"];
    $direccion_subida = "../view/fotos/";
    
    $nombre_archivo_subir = $direccion_subida . $dni . ".png";
    
    /*
    if ($tipo_archivo == "image/png"){
        $nombre_archivo_subir = $direccion_subida . $dni . ".png";
    }else{
        $nombre_archivo_subir = $direccion_subida . $dni . ".jpg";
    }
    */
    
    $resultado_subida = move_uploaded_file( $_FILES["file-upload"]["tmp_name"], $nombre_archivo_subir);
    //$resultado_subida = true o false
    if ($resultado_subida){ //true
        Helper::mensaje("Se ha actualizado la foto del usuario", "s", "../view/gestionarUsuario.view.php", 5);
    }
    
    //if ($tipo_archivo)
    
}else{
    Helper::mensaje("No ha seleccionado la foto", "i");
}
