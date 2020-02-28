//$(document).ready(function(){
//    //Esto se ejecuta cuando carga la página
//    //alert("ha cargado la página");
//    cargarComboPais("#cboPais", "seleccione");
    listarConcluido();
//});


function listarConcluido(){
    $.post
    (
        "../controller/convocatoriaConcluida.listar.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listadoC" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">PROYECTO DE INVERSIÓN PÚBLICA</th>';
//            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">CRONOGRAMA</th>';
            html += '<th style="text-align: center">PUESTOS</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
                    html += '<td align="center"><a class="text-black">'+item.codigo_convocatoria+'</a></td>';
                    html += '<td align="center"><a class="text-black">'+item.nombre_convocatoria+'</a></td>';
//                    html += '<td align="center">'+item.estado+'</td>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarCronograma(' + item.codigo_convocatoria + ')"><i class="fa fa-calendar"></i></button>';
                    html += '</td>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarPuesto(' + item.codigo_convocatoria + ')"><i class="fa  fa-folder-open-o"></i></button>';
                    html += '</td>';
                    html += '</tr>';
//                }    
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listadoC").html(html);
            
            
            $('#tabla-listadoC').dataTable({
                "aaSorting": [[0, "asc"]]
//                "sScrollX":       "0%",
//                "sScrollXInner":  "0%"
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
            
            var codLab="";
            if ( $("#txtTipoOperacion").val()==="agregar" ){
                codLab = "0";
            }else{
                codLab = $("#txtCodigo").val();
            }
            
            $.post(
                "../controller/laboratorio.agregar.editar.controller.php",
                {
                    p_nom_lab: $("#txtNombre").val(),
                    p_cod_pais: $("#cboPais").val(),
                    p_tipo_ope: $("#txtTipoOperacion").val(),
                    p_cod_lab: codLab
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
    $("#txtCodigo").val("");
    $("#txtNombre").val("");
    $("#titulomodal").html("Agregar nuevo laboratorio");
});


$("#myModal").on("shown.bs.modal", function(){
    $("#txtNombre").focus();
});


function listarPuesto(codPues){
      $.post
    (
        "../controller/puesto.leer.listar.datos.controller.php",
            { 
                p_cod_pues: codPues
            }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado===200){
            var html = "";
            $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_puesto_laboral );
                $("#titulomodal").html("Puesto");
            html += '<small>';
            html += '<table id="tabla-listado" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">PUESTO</th>';
            html += '<th style="text-align: center">JORNADA</th>';
            html += '<th style="text-align: center">SUELDO</th>';
	    html += '<th style="text-align: center"></th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
//                    html += '<form role="form" enctype="multipart/form-data" action="puestoSeleccionado.view.php" method="post">';
                    html += '<tr>';
                    html += '<td align="center">'+item.codigo_puesto_laboral+'</td>';
                    html += '<td align="center">'+item.nombre_puesto+'</td>';
                    html += '<td align="center">'+item.tipo_jornada+'</td>';
                    html += '<td align="center">'+item.sueldo+'</td>';
                    html += '<td align="center">';
                    html += '<a href="puestoSeleccionado.view.php?id=' + item.codigo_puesto_laboral + '"><i class="fa fa-eye"></i>';
//                    html += '<input type = "hidden" name = "puesto_id" id = "puesto_id" value="'+item.codigo_puesto_laboral+'">';
//                    html += '<button type="submit"><a href="puestoSeleccionado.view.php"><i class="fa fa-eye"></i><a></button>';
                    html += '</td>';
                    html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listado").html(html);
            
            
            $('#tabla-listado').dataTable({
//                "aaSorting": [[1, "desc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
}



function eliminar(codLab){
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
                    "../controller/laboratorio.eliminar.controller.php",
                    {
                        p_cod_lab: codLab
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
