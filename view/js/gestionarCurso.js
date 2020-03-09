$(document).ready(function () {

    listar();
});


function listar() {
    $.post
            (
                    "../controller/gestionarCurso.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align:center">CODIGO CURSO</th>';
            html += '<th style="text-align:center">NOMBRE DEL CURSO</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center" style="font-weight:normal">' + item.curso_id + '</td>';
                html += '<td align="center" style="font-weight:normal">' + item.nombre_curso + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.curso_id + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.curso_id + ')"><i class="fa fa-close"></i></button>';
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
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        //swal("Error", datosJSON.mensaje , "error"); 
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

                    var codCurso = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codCurso = "0";
                    } else {
                        codCurso = $("#txtCodigo").val();
                    }
                    $.post(
                            "../controller/gestionarCurso.agregar.editar.controller.php",
                            {
                                p_nombre_curso: $("#txtCurso").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_codigo_curso: codCurso
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
    $("#txtCurso").val(""),
$("#titulomodal").html("Agregar nuevo Curso");
});


$("#myModal").on("shown.bs.modal", function () {
    $("#txtPuesto").focus();
});


function leerDatos(codCurso) {
    $.post
            (
                    "../controller/gestionarCurso.leer.datos.controller.php",
                    {
                        p_codigo_curso: codCurso
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.curso_id);
            $("#txtCurso").val(jsonResultado.datos.nombre_curso);
            $("#titulomodal").html("Modificar datos del Curso");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}


function eliminar(codCurso) {
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
                            "../controller/gestionarCurso.eliminar.controller.php",
                            {
                                p_codigo_curso: codCurso
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

$("#frmgrabar2").submit(function (event) {
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

                    var codReq = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codReq = "0";
                    } else {
                        codReq = $("#txtCodigo2").val();
                    }

                    $.post(
                            "../controller/gestionarFormacionLaboral.agregar.editar.controller.php",
                            {
                                p_nomb_for: $("#cboFormacionLaboral").val(),
                               // p_nomb_exp: $("#txtExperienciaLaboral").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_cod_for: codReq
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrar2").click(); //Cerrar la ventana 
                            listarFormacion(); //actualizar la lista
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


$("#btnagregar2").click(function () {
    $("#txtTipoOperacion").val("agregar");
    $("#cboFormacionLaboral").val("");
    //$("#txtExperienciaLaboral").val("");
    $("#titulomodal2").html("Agregar nueva formación");
});


$("#myModal2").on("shown.bs.modal", function () {
    $("#txtFecha").focus();
});
function leerDatosFormacion(codReq) { //Requisitos o exigencias del Puesto
    $.post
            (
                    "../controller/gestionarFormacionLaboral.leer.datos.controller.php",
                    {
                        p_cod_for: codReq
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) 
        {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo2").val(jsonResultado.datos.codigo_formacion_laboral);
            $("#cboFormacionLaboral").val(jsonResultado.datos.nombre_formacion_laboral);
          //  $("#txtExperienciaLaboral").val(jsonResultado.datos.nombre_experiencia_laboral);
            $("#titulomodal2").html("Modificar datos de formación y experiencia");
            
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}
function eliminarFormacion(codReq) { //Requisitos o exigencias del Puesto
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
                            "../controller/gestionarFormacionLaboral.eliminar.controller.php",
                            {
                                p_cod_for: codReq
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;
                        if (datosJSON.estado === 200) { //ok
                            listarFormacion();
                            swal("Exito", datosJSON.mensaje, "success");
                        }

                    }).fail(function (error) {
                        var datosJSON = $.parseJSON(error.responseText);
                        swal("Error", datosJSON.mensaje, "error");
                    });

                }
            });

}


$("#frmgrabar3").submit(function (event) {
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

                    var codReq = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codReq = "0";
                    } else {
                        codReq = $("#txtCodigo3").val();
                    }

                    $.post(
                            "../controller/gestionarExperienciaLaboral.agregar.editar.controller.php",
                            {
                                p_cod_puesto: $("#cboPuesto").val(),
                                p_cod_formacion: $("#cboFormacion").val(),
                                p_duracion: $("#cboDuracion").val(),
                                p_nombre_Experiencia: $("#txtExperiencia").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_cod_exp: codReq
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrar3").click(); //Cerrar la ventana 
                            listarExperiencia(); //actualizar la lista
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


$("#btnagregar3").click(function () {
    $("#txtTipoOperacion").val("agregar");
    $("#cboPuesto").val("");
    $("#cboDuracion").val("");
    $("#txtExperiencia").val("");
    $("#txtCodigo3").val("");
    $("#cboFormacion").val("");
    $("#titulomodal3").html("Agregar nueva experiencia");
});


$("#myModal3").on("shown.bs.modal", function () {
    $("#txtFecha").focus();
});

function leerDatosExperiencia(codReq) { //Requisitos o exigencias del Puesto
    $.post
            (
                    "../controller/gestionarExperienciaLaboral.leer.datos.controller.php",
                    {
                        p_cod_exp: codReq
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) 
        {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo3").val(jsonResultado.datos.codigo_experiencia_laboral);
            $("#cboPuesto").val(jsonResultado.datos.codigo_puesto_laboral);
            $("#cboFormacion").val(jsonResultado.datos.codigo_formacion_laboral);
            $("#cboDuracion").val(jsonResultado.datos.duracion_experiencia_laboral);
            $("#txtExperiencia").val(jsonResultado.datos.nombre_experiencia_laboral);
          //  $("#txtExperienciaLaboral").val(jsonResultado.datos.nombre_experiencia_laboral);
            $("#titulomodal3").html("Modificar experiencia");
            
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}

function eliminarExperiencia(codReq) {
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
                            "../controller/gestionarExperienciaLaboral.eliminar.controller.php",
                            {
                                p_cod_for: codReq
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;
                        if (datosJSON.estado === 200) { //ok
                            listarExperiencia();
                            swal("Exito", datosJSON.mensaje, "success");
                        }

                    }).fail(function (error) {
                        var datosJSON = $.parseJSON(error.responseText);
                        swal("Error", datosJSON.mensaje, "error");
                    });

                }
            });

}
