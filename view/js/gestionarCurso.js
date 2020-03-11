
$(document).ready(function () {
    //cargarCbCodigoCurso(p_curso_id, p_textId, p_seleccione);
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
            html += '<th style="text-align: center">OPCIONES CURSO</th>';
            html += '<th style="text-align: center">GESTIONAR PRUEBA</th>';
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
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.curso_id + '"#textCursoId" '+'"seleccione"'+')"><i class="fa fa-close"></i></button>';
                html += '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalPrueba" onclick="ObtenerCursoID(' + item.curso_id + ')"><i class="fa fa-save"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalPrueba" onclick="leerDatosPrueba(' + item.curso_id + ')"><i class="fa fa-pencil"></i></button>';
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


$("#frmgrabarPrueba").submit(function (event) {
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
                   /* var codPrueba = "";
                    if ($("#txtTipoOperacionPrueba").val() === "agregar") {
                        codPrueba = "0";
                    } else {
                        codPrueba = $("#txtPrueba_id").val();
                    }
                    */
                    $.post(
                            "../controller/gestionarPrueba.agregar.editar.controller.php",
                            {
                                p_curso_id: $("#textCursoId").val(),
                                p_cantPregunta: $("#textCant_preguntas").val(),
                                p_tiempo: $("#textTiempo").val(),
                                p_puntaje: $("#txtPuntaje").val(),
                                p_instrucciones: $("#txtInstrucciones").val(),
                                //p_tipo_ope: $("#txtTipoOperacion").val(),
                                //p_codigo_prueba: codPrueba
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrarP").click(); //Cerrar la ventana 
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


$("#frmgrabarPrueba").click(function () {
    $("#txtTipoOperacion").val("agregar");
   
$("#titulomodal").html("Agregar nueva prueba");
});


$("#myModalPrueba").on("shown.bs.modal", function () {
   // $("#txtInstrucciones").focus();
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

function leerDatosPrueba(codCurso) {
    $.post
            (
                    "../controller/gestionarPrueba.leer.datos.controller.php",
                    {
                        p_codigo_prueba: codCurso
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacionPrueba").val("editar");
            $("#textCursoId").val(jsonResultado.datos.curso_id);
            $("#textCant_preguntas").val(jsonResultado.datos.cant_preguntas);
            $("#textTiempo").val(jsonResultado.datos.tiempo_prueba);
            $("#txtPuntaje").val(jsonResultado.datos.puntaje_aprobacion);
            $("#txtInstrucciones").val(jsonResultado.datos.instrucciones);
            $("#titulomodal").html("Modificar datos de la prueba");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}

function ObtenerCursoID(codCurso) {
    
                        p_curso_id      = codCurso;
                        p_textId        = "#textCursoId";
                        p_seleccione    = "seleccione";

                        cargarCbCodigoCurso(p_curso_id, p_textId, p_seleccione);       
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
