$(document).ready(function(){
    listar();
});


function listar(){
    $.post
    (
        "../controller/estudios.listar.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">GRADO ACADÉMICO</th>';
            html += '<th style="text-align: center">TÍTULO</th>';
	    html += '<th style="text-align: center">INSTITUCIÓN</th>';
	    html += '<th style="text-align: center">FECHA INICIO</th>';
	    html += '<th style="text-align: center">FECHA FIN</th>';
	    html += '<th style="text-align: center">OPCIÓN</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
                html += '<tr>';
                html += '<td align="center">'+item.codigo_estudio_candidato+'</td>';
                html += '<td align="center">'+item.grado_estudio+'</td>';                
                html += '<td align="center">'+item.titulo_estudio+'</td>';
                html += '<td align="center">'+item.institucion_educativa+'</td>';
                html += '<td align="center">'+item.fecha_inicio+'</td>';
                html += '<td align="center">'+item.fecha_fin+'</td>';
		html += '<td align="center">';
		html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_estudio_candidato + ')"><i class="fa fa-pencil"></i></button>';
		html += '&nbsp;&nbsp;';
		html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_estudio_candidato + ')"><i class="fa fa-close"></i></button>';
		html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listado").html(html);
            
            
            $('#tabla-listado').dataTable({
                "aaSorting": [[0, "desc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        //swal("Error", datosJSON.mensaje , "error"); 
    });

}



$("#frmgrabar").submit(function(event){
    event.preventDefault();
    
    swal({
            title: "Confirme",
            text: "¿Esta seguro de grabar los datos ingresados?",
            showCancelButton: true,
            confirmButtonColor: '#3d9205',
            confirmButtonText: 'Si',
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true,
            imageUrl: "../images/pregunta.png"
    },
    function(isConfirm){ 

        if (isConfirm){ //el usuario hizo clic en el boton SI     
            //procedo a grabar
            //Llamar al controlador para grabar los datos
            
            //var codLab = ($("#txtTipoOperacion").val()==="agregar")? 
            
            var codEst="";
            if ( $("#txtTipoOperacion").val()==="agregar" ){
                codEst = "0";
            }else{
                codEst = $("#txtCodigo").val();
            }
            
            $.post(
                "../controller/estudios.agregar.editar.controller.php",
                {
                    p_institucion_educativa: $("#txtInstitucion").val(),
                    p_titulo_estudios: $("#cboFormacionAcademico").val(),
                    p_grado_estudio: $("#txtGrado").val(),
                    p_fecha_inicio: $("#txtFecha1").val(),
                    p_fecha_fin: $("#txtFecha2").val(),
                    p_tipo_ope: $("#txtTipoOperacion").val(),
                    p_codigo_estudio: codEst 
                }
              ).done(function(resultado){                    
                  var datosJSON = resultado;

                  if (datosJSON.estado===200){
                      swal("Exito", datosJSON.mensaje, "success");
                      $("#btncerrar").click(); //Cerrar la ventana 
                      listar(); //actualizar la lista
                  }else{
                      swal("Mensaje del sistema", resultado , "warning");
                  }

              }).fail(function(error){
                    var datosJSON = $.parseJSON( error.responseText );
                    swal("Error", datosJSON.mensaje , "error");
              }) ;
            
        }
    });
    
});


$("#btnagregar").click(function(){
    $("#txtTipoOperacion").val("agregar");
    $("#txtInstitucion").val("");
    $("#cboFormacionAcademico").val("");
    $("#txtGrado").val("");
    $("#txtFecha1").val("");
    $("#txtFecha2").val("");
    $("#titulomodal").html("Agregar nuevo Estudio");
});


$("#myModal").on("shown.bs.modal", function(){
    $("#txtInstitucion").focus();
});


function leerDatos(codEst){
    $.post
        (
            "../controller/estudios.leer.datos.controller.php",
            {
                p_cod_est: codEst
            }
        ).done(function(resultado){
           var jsonResultado = resultado;
           if (jsonResultado.estado === 200){
                $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_estudio_candidato );
                $("#txtInstitucion").val( jsonResultado.datos.institucion_educativa );
                $("#cboFormacionAcademico").val( jsonResultado.datos.titulo_estudio );
                $("#txtGrado").val( jsonResultado.datos.grado_estudio );
                $("#txtFecha1").val( jsonResultado.datos.fecha_inicio );
                $("#txtFecha2").val( jsonResultado.datos.fecha_fin );
                $("#titulomodal").html("Modificar datos del Estudios");
           }
        }).fail(function(error){
            var datosJSON = $.parseJSON( error.responseText );
            swal("Error", datosJSON.mensaje , "error");
        });
}


function eliminar(codEst){
   swal({
            title: "Confirme",
            text: "¿Esta seguro de eliminar el registro seleccionado?",

            showCancelButton: true,
            confirmButtonColor: '#d93f1f',
            confirmButtonText: 'Si',
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true,
            imageUrl: "../images/eliminar2.png"
	},
	function(isConfirm){
            if (isConfirm){
                $.post(
                    "../controller/estudios.eliminar.controller.php",
                    {
                        p_cod_est: codEst
                    }
                    ).done(function(resultado){
                        var datosJSON = resultado;   
                        if (datosJSON.estado===200){ //ok
                            listar();
                            swal("Exito", datosJSON.mensaje , "success");
                        }

                    }).fail(function(error){
                        var datosJSON = $.parseJSON( error.responseText );
                        swal("Error", datosJSON.mensaje , "error");
                    });
                
            }
	});
   
}
