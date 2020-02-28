c$(document).ready(function(){
    //Esto se ejecuta cuando carga la página
    //alert("ha cargado la página");
    cargarComboPais("#cboPais", "seleccione");
    listar();
});


function listar(){
    $.post
    (
        "../controller/laboratorio.listar.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th>CODIGO</th>';
            html += '<th>NOMBRE DEL LABORATORIO</th>';
            html += '<th>PAIS</th>';
	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
                html += '<tr>';
                html += '<td align="center">'+item.codigo_laboratorio+'</td>';
                html += '<td>'+item.nombre+'</td>';
                html += '<td>'+item.pais+'</td>';
		html += '<td align="center">';
		html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_laboratorio + ')"><i class="fa fa-pencil"></i></button>';
		html += '&nbsp;&nbsp;';
		html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_laboratorio + ')"><i class="fa fa-close"></i></button>';
		html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listado").html(html);
            
            
            $('#tabla-listado').dataTable({
                "aaSorting": [[1, "asc"]]
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


function leerDatos(codLab){
    $.post
        (
            "../controller/laboratorio.leer.datos.controller.php",
            {
                p_cod_lab: codLab
            }
        ).done(function(resultado){
           var jsonResultado = resultado;
           if (jsonResultado.estado === 200){
                $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_laboratorio );
                $("#txtNombre").val( jsonResultado.datos.nombre );
                $("#cboPais").val( jsonResultado.datos.codigo_pais );
                $("#titulomodal").html("Modificar datos del laboratorio");
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
