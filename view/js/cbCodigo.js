function cargarCbCodigoCurso(p_curso_id, p_nombreCombo, p_tipo){
    $.post
    (
    	"../controller/comboCodigoCurso.php",
        {
            p_codigo_curso: p_curso_id
        }

    ).done(function(resultado){
	var datosJSON = resultado;
	
        if (datosJSON.estado===200){
            var html = "";
            if (p_tipo==="seleccione"){
                html += '<option value="">-</option>';
            }else{
                html += '<option value="0">Todos los Cursos</option>';
            }

            
            $.each(datosJSON.datos, function(i,item) {
                html += '<option value="'+item.curso_id+'">'+item.nombre_curso+'</option>';
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

function cargarCbCodigoCursoPregunta(p_nombreCombo, p_tipo){
    $.post
    (
	"../controller/comboCodigoCursoPregunta.php"
    ).done(function(resultado){
	var datosJSON = resultado;
	
        if (datosJSON.estado===200){
            var html = "";
            if (p_tipo==="seleccione"){
                html += '<option value="">-</option>';
            }else{
                html += '<option value="0">Todos los puestos</option>';
            }

            
            $.each(datosJSON.datos, function(i,item) {
                html += '<option value="'+item.curso_id+'">'+item.nombre_curso+'</option>';
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