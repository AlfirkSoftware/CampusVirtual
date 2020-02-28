/*INICIO: BUSQUEDA DE CLIENTES*/
$("#txtnombrecliente").autocomplete({
    source: "../controller/cliente.autocompletar.controller.php",
    minLength: 3, //Filtrar desde que colocamos 3 o mas caracteres
    focus: f_enfocar_registro,
    select: f_seleccionar_registro
});

function f_enfocar_registro(event, ui){
    var registro = ui.item.value;
    $("#txtnombrecliente").val(registro.nombre);
    event.preventDefault();
}

function f_seleccionar_registro(event, ui){
    var registro = ui.item.value;
    $("#txtnombrecliente").val(registro.nombre);
    $("#txtcodigocliente").val(registro.codigo);
    $("#lbldireccioncliente").val(registro.direccion);
    $("#lbltelefonocliente").val(registro.telefono);
    
    event.preventDefault();
}

/*FIN: BUSQUEDA DE CLIENTES*/


