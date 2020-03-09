$(function() {
    listar();
   
});

function listar() {
    $.post
            (
                    "../controller/gestionarAnuncio.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">TÍTULO</th>';
            html += '<th style="text-align: center">DESCRIPCIÓN</th>';
            html += '<th style="text-align: center">TIPO DE ANUNCIO</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center" style="font-weight:normal">' + item.anuncio_id + '</td>';
                html += '<td align="center" style="font-weight:normal">' + item.titulo_evento + '</td>';
                html += '<td align="center" style="font-weight:normal">' + item.descripcion_evento + '</td>';
                html += '<td align="center" style="font-weight:normal">' + item.tipo_anuncio + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalFoto" onclick="leerFoto(' + item.anuncio_id + ')"><i class="fa fa-image"></i></button>';
                html += '&nbsp;&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.anuncio_id + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.anuncio_id + ')"><i class="fa fa-close"></i></button>';
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



        } else {
            swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje , "error"); 
    });
}

function leerDatos(codAnuncio) {
    $.post
            (
                    "../controller/gestionarAnuncio.leer.datos.controller.php",
                    {
                        p_doc_Anuncio: codAnuncio
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.anuncio_id);
            $("#txtTitulo").val(jsonResultado.datos.titulo_evento);
            $("#tipoAnuncio").val(jsonResultado.datos.tipo_anuncio);
            $("#txtDescripcion").val(jsonResultado.datos.descripcion_evento);
            


            $("#titulomodal").html("Modificar datos del puesto de trabajo");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}

function leerFoto(codAnuncio) {
    $.post
            (
                    "../controller/gestionarFotoAnuncio.leer.datos.controller.php",
                    {
                        p_doc_anuncio: codAnuncio
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            //$("#txtCodigo").val(jsonResultado.datos.codigo_usuario);
            $("#txtCodigoA").val(jsonResultado.datos.anuncio_id);
            $("#p_foto").val("");
            $("#file-preview-zone").val("view");
        
            


            $("#titulomodal").html("Modificar datos del puesto de trabajo");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });

    
}

$("#frmgrabar").submit(function (event) {
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
            function (isConfirm) {

                if (isConfirm) { //el usuario hizo clic en el boton SI     
                    //procedo a grabar
                    //Llamar al controlador para grabar los datos

                    //var codLab = ($("#txtTipoOperacion").val()==="agregar")? 

                    var codAnuncio = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codAnuncio = "0";
                    } else {
                        codAnuncio = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarAnuncio.agregar.editar.controller.php",
                            {
                                p_doc_ident:   $("#txtDoc_identidad").val(),
                                //p_anuncio_id:  $("#txtCodigo").val(),
                                p_titulo:      $("#txtTitulo").val(),
                                p_tipoAnuncio: $("#tipoAnuncio").val(),
                                p_descripcion: $("#txtDescripcion").val(),
                                p_tipo_ope:    $("#txtTipoOperacion").val(),
                                p_cod_anuncio: codAnuncio
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrar").click(); //Cerrar la ventana 
                            listar(); //actualizar la lista
                        } else {
                            swal("Mensaje del sistema", resultado, "warning");
                        }

                    }).fail(function (error) {
                        var datosJSON = $.parseJSON(error.responseText);
                        swal("Error", datosJSON.mensaje, "error");
                    });

                }
            });

});


$("#btnagregar").click(function () {
    $("#txtTipoOperacion").val("agregar");
    $("#txtCodigo").val("");
    $("#txtDoc_identidad").val("");
    $("#txtNombre").val("");
    $("#txtApellidos").val("");
    $("#txtDireccion").val("");
    $("#txtEmail").val("");
    $("#txtTelefono").val("");
    $("#sexo").val("");
    $("#edad").val("");
    $("#cargo").val("");
    $("#contrasenia").val("");
    $("#tipo").val("");
    $("#cuenta").val("");
    $("#estado").val("");
    $("#titulomodal").html("Crear nuevo usuario");
});


$("#myModal").on("shown.bs.modal", function () {
    $("#txtDoc_identidad").focus();
});


function eliminar(codAnuncio) {
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
            function (isConfirm) {
                if (isConfirm) {
                    $.post(
                            "../controller/gestionarAnuncio.eliminar.controller.php",
                            {
                                p_doc_anuncio: codAnuncio
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;
                        if (datosJSON.estado === 200) { //ok
                            listar();
                            swal("Exito", datosJSON.mensaje, "success");
                        }

                    }).fail(function (error) {
                        var datosJSON = $.parseJSON(error.responseText);
                        swal("Error", datosJSON.mensaje, "error");
                    });

                }
            });

}

