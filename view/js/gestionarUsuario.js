$(function() {
    listar();
   
});

function listar() {
    $.post
            (
                    "../controller/usuario.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">DOCUMENTO</th>';
            html += '<th style="text-align: center">CLAVE</th>';
            html += '<th style="text-align: center">ROL</th>';
            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">FECHA DE REGISTRO</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center" style="font-weight:normal">' + item.codigo_usuario + '</td>';
                html += '<td align="center" style="font-weight:normal">' + item.doc_id + '</td>';
                html += '<td align="center" style="font-weight:normal">' + item.clave + '</td>';

                if(item.tipo === "A") html += '<td align="center" style="font-weight:normal">Administrador</td>';
                if(item.tipo === "D") html += '<td align="center" style="font-weight:normal">Docente</td>';
                if(item.tipo === "E") html += '<td align="center" style="font-weight:normal">Estudiante</td>';

                if(item.estado === "A") 
                    html += '<td align="center" style="font-weight:normal">Habilitado</td>';
                else 
                    html += '<td align="center" style="font-weight:normal">Deshabilitado</td>';

                html += '<td align="center" style="font-weight:normal">' + item.fecha_registro + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalFoto" onclick="leerFoto(' + item.doc_id + ')"><i class="fa fa-camera"></i></button>';
                html += '&nbsp;&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.doc_id + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.doc_id + ')"><i class="fa fa-close"></i></button>';
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

function leerDatos(codIdentidad) {
    $.post
            (
                    "../controller/gestionarUsuario.leer.datos.controller.php",
                    {
                        p_doc_ident: codIdentidad
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_usuario);
            $("#txtDoc_identidad").val(jsonResultado.datos.doc_id);
            $("#txtNombre").val(jsonResultado.datos.nombres);
            $("#txtApellidos").val(jsonResultado.datos.apellidos);
            $("#txtDireccion").val(jsonResultado.datos.direccion);
            $("#txtEmail").val(jsonResultado.datos.telefono);
            $("#txtTelefono").val(jsonResultado.datos.telefono);

            $("#sexo").val(jsonResultado.datos.sexo);
            $("#edad").val(jsonResultado.datos.edad);
            $("#txtEmail").val(jsonResultado.datos.email);
            $("#cargo").val(jsonResultado.datos.cargo_id);
            $("#contrasenia").val(jsonResultado.datos.clave);
            $("#tipo").val(jsonResultado.datos.tipo);
            $("#estado").val(jsonResultado.datos.estado);
            $("#cuenta").val(jsonResultado.datos.email);
            


            $("#titulomodal").html("Modificar datos del puesto de trabajo");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}

function leerFoto(codIdentidad) {
    $.post
            (
                    "../controller/gestionarFotoUsuario.leer.datos.controller.php",
                    {
                        p_doc_ident: codIdentidad
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            //$("#txtCodigo").val(jsonResultado.datos.codigo_usuario);
            $("#txtDocID").val(jsonResultado.datos.doc_id);
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

                    var codUsuario = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codUsuario = "0";
                    } else {
                        codUsuario = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarUsuario.agregar.editar.controller.php",
                            {
                                p_doc_ident:   $("#txtDoc_identidad").val(),
                                p_nombres:     $("#txtNombre").val(),
                                p_apellidos:   $("#txtApellidos").val(),
                                p_direccion:   $("#txtDireccion").val(),
                                p_email:       $("#txtEmail").val(),
                                p_telefono:    $("#txtTelefono").val(),
                                p_sexo:        $("#sexo").val(),
                                p_edad:        $("#edad").val(),
                                p_cargo:       $("#cargo").val(),
                                p_contrasenia: $("#contrasenia").val(),
                                p_tipo:        $("#tipo").val(),
                                p_estado:      $("#estado").val(),
                               // p_cuenta:      $("#cuenta").val(),
                                p_tipo_ope:    $("#txtTipoOperacion").val(),
                                p_cod_usuario: codUsuario
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


function eliminar(codUsuario) {
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
                            "../controller/gestionarUsuario.eliminar.controller.php",
                            {
                                p_doc_ident: codUsuario
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

