function cargarComboSerie(p_nombreCombo, p_tipo, p_cod_tip){
    $.post
    (
	"../controller/serie.cargar.datos.controller.php",
        {
           p_cod_tip: p_cod_tip 
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
                html += '<option value="'+item.numero_serie+'">'+item.numero_serie+'</option>';
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