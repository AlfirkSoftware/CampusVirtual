function cargarComboUnidadMedida(p_nombreCombo, p_tipo, p_cod_pro){
    $.post
    (
	"../controller/unidad.medida.cargar.datos.controller.php",
        {
           p_cod_pro: p_cod_pro 
        }
    ).done(function(resultado){
	var datosJSON = resultado;
	
        if (datosJSON.estado===200){
            var html = "";
            if (p_tipo==="seleccione"){
                html += '<option value="">Seleccione</option>';
            }else{
                html += '<option value="0">Todos</option>';
            }

            
            $.each(datosJSON.datos, function(i,item) {
                html += '<option value="'+item.tipo+'">'+item.abreviatura+' ('+ item.tipo +')</option>';
            });
            
            $(p_nombreCombo).html(html);
	}else{
            swal("Mensaje del sistema", resultado , "warning");
        }
    }).fail(function(error){
	var datosJSON = $.parseJSON( error.responseText );
	swal("Error", datosJSON.mensaje , "error");
    });
}