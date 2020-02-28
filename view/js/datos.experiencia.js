$(document).ready(function(){
    listar();
});


function listar(){
    $.post
    (
        "../controller/experiencia.listar.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th>CODIGO</th>';
            html += '<th>RUBRO</th>';
            html += '<th>EMPRESA</th>';
            html += '<th>PUESTO</th>';
	    html += '<th style="text-align: center">LUGAR</th>';
	    html += '<th style="text-align: center">FUNCIONES LABORALES</th>';
	    html += '<th style="text-align: center">MOTVIO DE CESE</th>';
            html += '<th style="text-align: center">ÁREA</th>';
	    html += '<th style="text-align: center">DURACIÓN</th>';
	    html += '<th style="text-align: center">OPCIÓN</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
                html += '<tr>';
                html += '<td align="center">'+item.codigo_experiencia_candidato+'</td>';
                html += '<td>'+item.rubro_empresa+'</td>';
                html += '<td>'+item.empresa+'</td>';
                html += '<td>'+item.puesto+'</td>';
                html += '<td>'+item.lugar+'</td>';
                html += '<td>'+item.descripcion_laboral+'</td>';
                html += '<td>'+item.motivo_cambio+'</td>';
                html += '<td>'+item.area+'</td>';
                html += '<td>'+item.duracion+'</td>';
		html += '<td align="center">';
		html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_experiencia_candidato + ')"><i class="fa fa-pencil"></i></button>';
		html += '&nbsp;&nbsp;';
		html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_experiencia_candidato + ')"><i class="fa fa-close"></i></button>';
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
            
            var codExp="";
            if ( $("#txtTipoOperacion").val()==="agregar" ){
                codExp = "0";
            }else{
                codExp = $("#txtCodigo").val();
            }
            
            $.post(
                "../controller/experiencia.agregar.editar.controller.php",
                {
                    p_rubro_empresa: $("#txtRubro").val(),
                    p_empresa: $("#txtEmpresa").val(),
                    p_puesto: $("#txtPuesto").val(),
                    p_lugar: $("#txtLugar").val(),
                    p_descripcion_laboral: $("#txtFunciones").val(),
                    p_motivo_cambio: $("#txtCese").val(),
                    p_area: $("#txtArea").val(),
                    p_duracion: $("#cboDuracion").val(),
                    // p_fecha_fin: $("#txtFecha2").val(),
                    p_tipo_ope: $("#txtTipoOperacion").val(),
                    p_cod_experiencia_candidato: codExp 
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
    $("#txtRubro").val("");
    $("#txtEmpresa").val("");
    $("#txtPuesto").val("");
    $("#txtLugar").val("");
    $("#txtFunciones").val("");
    $("#txtCese").val("");
    $("#txtArea").val("");
    $("#cboDuracion").val("");
    $("#titulomodal").html("Agregar nueva Experiencia Laboral");
});


$("#myModal").on("shown.bs.modal", function(){
    $("#txtRubro").focus();
});


function leerDatos(codExp){
    $.post
        (
            "../controller/experiencia.leer.datos.controller.php",
            {
                p_cod_exp: codExp
            }
        ).done(function(resultado){
           var jsonResultado = resultado;
           if (jsonResultado.estado === 200){
                $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_experiencia_candidato );
                $("#txtRubro").val( jsonResultado.datos.rubro_empresa );
                $("#txtEmpresa").val( jsonResultado.datos.empresa );
                $("#txtPuesto").val( jsonResultado.datos.puesto );
                $("#txtLugar").val( jsonResultado.datos.lugar );
                $("#txtFunciones").val( jsonResultado.datos.descripcion_laboral );
                $("#txtCese").val( jsonResultado.datos.motivo_cambio );
                $("#txtArea").val( jsonResultado.datos.area );
                $("#cboDuracion").val( jsonResultado.datos.duracion );
                $("#titulomodal").html("Agregar nueva Experiencia Laboral");
           }
        }).fail(function(error){
            var datosJSON = $.parseJSON( error.responseText );
            swal("Error", datosJSON.mensaje , "error");
        });
}


function eliminar(codExp){
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
                    "../controller/experiencia.eliminar.controller.php",
                    {
                        p_cod_experiencia_candidato: codExp
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
