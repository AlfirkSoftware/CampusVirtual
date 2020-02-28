$(document).ready(function () {
    //Esto se ejecuta cuando carga la página
    //alert("ha cargado la página");
//    cargarComboConvocatoria("#cboConvocatoria", "seleccione");
    cargarComboPuesto("#cboPuesto", "seleccione");
    cargarComboPrueba("#cboPruebaa", "seleccione");
    listar();
    listarPreguntas();
//    listarCriterios();
});


function listar() {
    $.post
            (
                    "../controller/gestionarPruebas.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO DEL PUESTO</th>';
            html += '<th style="text-align: center">CODIGO DE LA PRUEBA</th>';
            html += '<th style="text-align: center">TIPO DE PRUEBA</th>';
            html += '<th style="text-align: center">NOMBRE DE LA PRUEBA</th>';
            html += '<th style="text-align: center">INSTRUCCIONES</th>';
//            html += '<th style="text-align: center">DURACIÓN</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center">' + item.codigo_puesto_laboral + '</td>';
                html += '<td align="center">' + item.codigo_prueba + '</td>';
                html += '<td>' + item.nombre_tipo_prueba + '</td>';
                html += '<td>' + item.nombre_prueba + '</td>';
                html += '<td>' + item.instruccion + '</td>';
//                html += '<td>' + item.duracion + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_prueba + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_prueba + ')"><i class="fa fa-close"></i></button>';
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

                    var codPrue = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codPrue = "0";
                    } else {
                        codPrue = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarPrueba.agregar.editar.controller.php",
                            {
                                p_nombre_prueba: $("#txtNombrePrueba").val(),
                                p_instruccion: $("#txtInstrucciones").val(),
                                p_duracion: $("#cboDuracion").val(),
                                p_codigo_tipo_prueba: $("#cboTipoPrueba").val(),
                                p_codigo_puesto_laboral: $("#cboPuesto").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_codigo_prueba: codPrue
                                
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
    $("#txtNombrePrueba").val(""),
    $("#txtInstrucciones").val(""),
    $("#cboDuracion").val(""),
    $("#cboTipoPrueba").val(""),
    $("#cboPuesto").val(""),
$("#titulomodal").html("Agregar nueva prueba");
});


$("#myModal").on("shown.bs.modal", function () {
    $("#txtNombrePrueba").focus();
});


function leerDatos(codPuesto) {
    $.post
            (
                    "../controller/gestionarPrueba.leer.datos.controller.php",
                    {
                        p_codigo_prueba: codPuesto
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_prueba);
            $("#txtNombrePrueba").val(jsonResultado.datos.nombre_prueba);
            $("#txtInstrucciones").val( jsonResultado.datos.instruccion );
            $("#cboDuracion").val(jsonResultado.datos.duracion);
            $("#cboTipoPrueba").val(jsonResultado.datos.codigo_tipo_prueba);
            $("#cboPuesto").val(jsonResultado.datos.codigo_puesto_laboral);
            $("#titulomodal").html("Modificar datos de la prueba");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}


function eliminar(codPuesto) {
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
                            "../controller/gestionarPrueba.eliminar.controller.php",
                            {
                                p_codigo_prueba: codPuesto
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
function listarPreguntas() {
    $.post
            (
                    "../controller/gestionarPreguntas.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado2" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO PRUEBA</th>';
            html += '<th style="text-align: center">CODIGO PREGUNTA</th>';
            html += '<th style="text-align: center">NÚMERO DE PREGUNTA</th>';
            html += '<th style="text-align: center">PREGUNTA</th>';
            html += '<th style="text-align: center">PUNTAJE CORRECTO</th>';
            html += '<th style="text-align: center">PUNTAJE INCCORRECTO</th>';
            html += '<th style="text-align: center">RESPUESTA</th>';
//            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center">' + item.codigo_prueba + '</td>';
                html += '<td align="center">' + item.codigo_pregunta + '</td>';
                html += '<td align="center">' + item.numero_pregunta + '</td>';
                html += '<td align="justify">' + item.nombre_pregunta + '</td>';
                html += '<td align="justify">' + item.puntaje_correcto + '</td>';
                html += '<td align="justify">' + item.puntaje_incorrecto + '</td>';
                html += '<td align="justify">' + item.respuesta + '</td>';
//                html += '<td align="center">' + item.estado + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal2" onclick="leerDatosPregunta(' + item.codigo_pregunta + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminarPregunta(' + item.codigo_pregunta + ')"><i class="fa fa-close"></i></button>';
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

                    var codPreg = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codPreg = "0";
                    } else {
                        codPreg = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarPregunta.agregar.editar.controller.php",
                            {
                                p_nombre_pregunta: $("#editor1").val(),
                                p_puntaje_correcto: $("#cboPuntajeCorrecto").val(),
                                p_puntaje_incorrecto: $("#cboPuntajeIncorrecto").val(),
                                p_respuesta: $("#cboRespuesta").val(),
                                p_codigo_prueba: $("#cboPruebaa").val(),
                                p_numero_prueba: $("#cboNumPregunta").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_codigo_pregunta: codPreg
                                
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrar2").click(); //Cerrar la ventana 
                            listarPreguntas(); //actualizar la lista
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
    $("#txtCodigo").val("");
    $("#cboNumPregunta").val("");
    $("#cboPruebaa").val("");
    CKEDITOR.instances.editor1.setData('');
    $("#cboRespuesta").val("");
    $("#cboPuntajeCorrecto").val("");
    $("#cboPuntajeIncorrecto").val("");
    $("#titulomodal2").html("Agregar nueva pregunta");
});


$("#myModal2").on("shown.bs.modal", function () {
    $("#txtFecha").focus();
});
function leerDatosPregunta(codPreg) {
    $.post
            (
                    "../controller/gestionarPregunta.leer.datos.controller.php",
                    {
                        p_codigo_pregunta: codPreg
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
           
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_pregunta);
            $("#cboPruebaa").val(jsonResultado.datos.codigo_prueba);
            $("#cboNumPregunta").val(jsonResultado.datos.numero_pregunta);
            $(CKEDITOR.instances["editor1"].setData(jsonResultado.datos.nombre_pregunta));
            $("#cboRespuesta").val(jsonResultado.datos.respuesta);
            $("#cboPuntajeCorrecto").val(jsonResultado.datos.puntaje_correcto);
            $("#cboPuntajeIncorrecto").val(jsonResultado.datos.puntaje_incorrecto);
            $("#titulomodal2").html("Modificar datos de la pregunta");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}
function eliminarPregunta(codPreg) {
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
                            "../controller/gestionarPregunta.eliminar.controller.php",
                            {
                                p_codigo_pregunta: codPreg
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;
                        if (datosJSON.estado === 200) { //ok
                            listarPreguntas();
                            swal("Exito", datosJSON.mensaje, "success");
                        }

                    }).fail(function (error) {
                        var datosJSON = $.parseJSON(error.responseText);
                        swal("Error", datosJSON.mensaje, "error");
                    });

                }
            });

}

