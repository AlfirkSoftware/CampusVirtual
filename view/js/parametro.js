function obtenerParametro(p_cod_par, p_nombre_control){
    $.post
    (
	"../controller/parametro.obetener.valor.controller.php",
        {
           p_cod_par: p_cod_par
        }
    ).done(function(resultado){
	var datosJSON = resultado;
	
        if (datosJSON.estado===200){
            var valor = datosJSON.datos.valor_parametro;
            $(p_nombre_control).val(valor);
            
	}else{
            swal("Mensaje del sistema", resultado , "warning");
        }
    }).fail(function(error){
	var datosJSON = $.parseJSON( error.responseText );
	swal("Error", datosJSON.mensaje , "error");
    });
}
