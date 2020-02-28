$(document).ready(function () {
    //Esto se ejecuta cuando carga la página
    //alert("ha cargado la página");
    cargarComboConvocatoria("#cboConvocatoria", "seleccione");
    listar();
    listarCronograma();
});
function listar() {
    $.post
            (
                    "../controller/gestionarConvocatoria.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">NOMBRE DE LA CONVOCATORIA</th>';
            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center">' + item.codigo_convocatoria + '</td>';
                html += '<td align="justify">' + item.nombre_convocatoria + '</td>';
                html += '<td align="center">' + item.estado + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_convocatoria + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_convocatoria + ')"><i class="fa fa-close"></i></button>';
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

                    var codConv = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codConv = "0";
                    } else {
                        codConv = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarConvocatoria.agregar.editar.controller.php",
                            {
                                p_nom: $("#txtNombreConvocatoria").val(),
                                p_est: $("#txtEstado").val(),
//                                p_fec1: $("#txtFecha1").val(),
//                                p_fec2: $("#txtFecha2").val(),
//                                p_fec3: $("#txtFecha3").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_cod_conv: codConv
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
    $("#txtNombreConvocatoria").val("");
    $("#txtEstado").val("");
//    $("#txtFecha1").val("");
//    $("#txtFecha2").val("");
//    $("#txtFecha3").val("");
    $("#titulomodal").html("Agregar nueva convocatoria");
});


$("#myModal").on("shown.bs.modal", function () {
    $("#txtNombreConvocatoria").focus();
});



function leerDatos(codConv) {
    $.post
            (
                    "../controller/gestionarConvocatoria.leer.datos.controller.php",
                    {
                        p_cod_conv: codConv
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_convocatoria);
            $("#txtNombreConvocatoria").val(jsonResultado.datos.nombre_convocatoria);
            $("#txtEstado").val(jsonResultado.datos.estado);
//            $("#txtFecha1").val(jsonResultado.datos.codigo_pais);
//            $("#txtFecha2").val(jsonResultado.datos.codigo_pais);
//            $("#txtFecha3").val(jsonResultado.datos.codigo_pais);
            $("#titulomodal").html("Modificar datos de la convocatoria");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}
function listarCronograma() {
    $.post
            (
                    "../controller/cronograma.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado2" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO CONVOCATORI</th>';
            html += '<th style="text-align: center">CODIGO CRONOGRAMA</th>';
            html += '<th style="text-align: center">NOMBRE DE LA ETAPA</th>';
            html += '<th style="text-align: center">FECHA</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center">' + item.codigo_convocatoria + '</td>';
                html += '<td align="center">' + item.codigo_cronograma + '</td>';
                html += '<td align="justify">' + item.nombre_etapa + '</td>';
                html += '<td align="center">' + item.fecha_cronograma + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal2" onclick="leerDatosCronograma(' + item.codigo_cronograma + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminarCronograma(' + item.codigo_cronograma + ')"><i class="fa fa-close"></i></button>';
                html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#listado2").html(html);


            $('#tabla-listado2').dataTable({
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

                    var codCron = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codCron = "0";
                    } else {
                        codCron = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarCronograma.agregar.editar.controller.php",
                            {
                                p_fecha: $("#txtFecha").val(),
                                p_cod_conv: $("#cboConvocatoria").val(),
                                p_cod_etapa: $("#cboEtapa").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_cod_cron: codCron
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrar2").click(); //Cerrar la ventana 
                            listarCronograma(); //actualizar la lista
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
    $("#txtFecha").val("");
    $("#cboConvocatoria").val("");
    $("#cboEtapa").val("");
    $("#titulomodal2").html("Agregar nuevo cronograma");
});


$("#myModal2").on("shown.bs.modal", function () {
    $("#txtFecha").focus();
});
function leerDatosCronograma(codCron) {
    $.post
            (
                    "../controller/gestionarCronograma.leer.listar.datos.controller.php",
                    {
                        p_cod_cron: codCron
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_cronograma);
            $("#txtFecha").val(jsonResultado.datos.fecha_cronograma);
            $("#cboConvocatoria").val(jsonResultado.datos.codigo_convocatoria);
            $("#cboEtapa").val(jsonResultado.datos.codigo_etapa);
            $("#titulomodal2").html("Modificar datos del cronograma");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}


function eliminar(codConv) {
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
                            "../controller/gestionarConvocatoria.eliminar.controller.php",
                            {
                                p_cod_conv: codConv
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
function eliminarCronograma(codCron) {
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
                            "../controller/gestionarCronograma.eliminar.controller.php",
                            {
                                p_cod_cron: codCron
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;
                        if (datosJSON.estado === 200) { //ok
                            listarCronograma();
                            swal("Exito", datosJSON.mensaje, "success");
                        }

                    }).fail(function (error) {
                        var datosJSON = $.parseJSON(error.responseText);
                        swal("Error", datosJSON.mensaje, "error");
                    });

                }
            });

}
