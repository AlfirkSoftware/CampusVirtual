$(document).ready(function () {
//    //Esto se ejecuta cuando carga la página
//    //alert("ha cargado la página");
//    cargarComboPrueba("#cboCodPrueba", "seleccione");
    listar();
//    examenes();
});


function listar() {
    $.post
            (
                    "../controller/reporte.misPostulaciones.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listadoMp" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CONVOCATORIA</th>';
            html += '<th style="text-align: center">PUESTO</th>';
            html += '<th style="text-align: center">FECHA POSTULACIÓN</th>';
            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">CRONOGRAMA</th>';
            html += '<th style="text-align: center">PRUEBAS</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
//                if(item.estado == 'concluido'){
                html += '<tr>';
//                    html += '<td>'+item.codigo_convocatoria+'</td>';
                html += '<td style="text-align: center">' + item.nombre_convocatoria + '</td>';
                html += '<td style="text-align: center">' + item.nombre_puesto + '</td>';
                html += '<td style="text-align: center">' + item.fecha_postulacion + '</td>';
                html += '<td style="text-align: center">' + item.estado + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarCronograma(' + item.codigo_convocatoria + ')"><i class="fa fa-calendar"></i></button>';
                html += '</td>';
                html += '<td align="center">';
                
                if(item.estado === 'CURRICULO APTO')
                {
                    html += '<button type="button" class="btn btn-default btn-xs" onclick="evaluacion(' + item.codigo_puesto_laboral + ')"><i class="fa fa-file-text"></i></button>';
                 
                }
                //html += '';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal2" onclick="evaluacion(' + item.codigo_puesto_laboral + ')"><i class="fa fa-file-text"></i></button>';
                html += '</td>';
                html += '</tr>';
//                }    
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#listadoMp").html(html);


            $('#tabla-listadoMp').dataTable({
                "aaSorting": [[0, "asc"]]
            });



        } else {
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        //swal("Error", datosJSON.mensaje , "error"); 
    });
}
function listarCronograma(codConv) {
    $.post
            (
                    "../controller/cronograma.leer.listar.datos.controller.php",
                    {
                        p_cod_conv: codConv
                    }

            ).done(function (resultado) {
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado === 200) {
            var html = "";
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_convocatoria);
            $("#titulomodal").html("Cronograma");
            html += '<small>';
            html += '<table id="tabla-listado" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">FECHA</th>';
            html += '<th style="text-align: center">ETAPA</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
//                if(item.estado == 'concluido'){
                html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                html += '<td align="center">' + item.fecha_cronograma + '</td>';
                html += '<td align="center">' + item.nombre_etapa + '</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarCronograma(' + item.codigo_convocatoria + ')"><i class="fa fa-calendar"></i></button>';
//                    html += '</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarPuestos(' + item.codigo_convocatoria + ')"><i class="fa  fa-folder-open-o"></i></button>';
//                    html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#listado").html(html);


            $('#tabla-listado').dataTable({
//                "aaSorting": [[1, "desc"]]
            });



        } else {
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");

    });
}
function evaluacion(codPues) {
    
    $.post
            (
                    "../controller/pruebas.conocimiento.listar.controller.php",
                    {
                        p_cod_pues: codPues
                    }

            ).done(function (resultado) {
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado === 200) {
            var html = "";
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_prueba);
            $("#titulomodal").html("Test");
            html += '<small>';
            html += '<table id="tabla-listadoC" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">PRUEDAID</th>';
            html += '<th style="text-align: center">TIPO DE PRUEBA</th>';
            html += '<th style="text-align: center">PRUEBA</th>';
//            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">CALIFICAR</th>';
            html += '<th style="text-align: center">Tiempo</th>';
            html += '<th style="text-align: center">Promedio</th>';
            html += '<th style="text-align: center">MIS RESPUESTAS</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
//                if(item.estado == 'concluido'){
                html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                html += '<td align="center">' + item.codigo_prueba + '</td>';
                html += '<td align="center">' + item.nombre_tipo_prueba + '</td>';
                html += '<td align="center">' + item.nombre_prueba + '</td>';
//                if ((item.doc_id) === null) {
//                    html += '<td align="center" class="text-waning"><p class="text-danger"><b>SIN EVALUAR</b></p></td>';
//                    
//                } else {
//                    html += '<td align="center" class="text-waning"><p class="text-warning"><b>EVALUADO</b></p></td>';
//                }
                if ((item.promedio) === null) {
                    html += '<td align="center">';
//                    html += '<a href="evaluacion.examen.view.php?id=' + item.codigo_prueba + '"><i class="fa fa-eye"></i>';
                    html += '<button type="button" class="btn btn-warning btn-xs" onclick="examenes(' + item.codigo_prueba + ');"><i class=""></i>Empezar</button>';
                    html += '</td>';
                    
                } else {
                   html += '<td align="center" class="text-waning" disabled><p class="text-primary"><b>FINALIZADO</b></p></td>';
                }
                html += '<td align="center">' + item.duracion + '</td>';
                html += '<td align="center">' + item.promedio + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-default btn-xs" onclick="respuestaCandidato(' + item.codigo_prueba + ');"><i class="fa fa-eye"></i></button>';
                html += '</td>';
                html += '</tr>';
            });
//
            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#listadoC").html(html);


//            $('#tabla-listadoE').dataTable({
//                "aaSorting": [[1, "desc"]]
//            });



        } else {
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");

    });
}
function examenes(codPrueba) {
    $.post
            (
                    "../controller/evaluacion.examen.listar.controller.php",
                    {
                        p_cod_prueba: codPrueba
                    }

            ).done(function (resultado) {
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado === 200) {
            var html = "";
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_prueba);
            $("#titulomodal").html("Test");
            html += '<section class="content-header">';
            html += '  <h3>Respuestas</h3>';
            html += '  <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalResp" id="btnagregar"><i class="fa fa-copy"></i> Agregar nueva respuesta</button>';
            html += '</section><br/><br/>';
            html += '<small>';
            html += '<table id="tabla-examen" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CÓDIGO</th>';
            html += '<th style="text-align: center">PRUEBA</th>';
            html += '<th style="text-align: center">INSTRUCCIONES</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
//                if(item.estado == 'concluido'){
                html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                html += '<td align="center">' + item.codigo_prueba + '</td>';
                html += '<td align="center">' + item.nombre_prueba + '</td>';
                html += '<td align="center">' + item.instruccion + '</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarCronograma(' + item.codigo_convocatoria + ')"><i class="fa fa-calendar"></i></button>';
//                    html += '</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarPuestos(' + item.codigo_convocatoria + ')"><i class="fa  fa-folder-open-o"></i></button>';
//                    html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#examen").html(html);


//            $('#tabla-examen').dataTable({
////                "aaSorting": [[1, "desc"]]
//            });



        } else {
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");

    });
    $.post
            (
                    "../controller/evaluacion.examen.preguntas.listar.controller.php",
                    {
                        p_cod_prueba: codPrueba
                    }

            ).done(function (resultado) {
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado === 200) {
            var html = "";
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_pregunta);
            $("#titulomodal").html("Test");
            html += '<small>';
            html += '<table id="tabla-preguntas" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO PREGUNTA</th>';
            html += '<th style="text-align: center">NÚM. PREGUNTA</th>';
            html += '<th style="text-align: center">PREGUNTA</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
//                if(item.estado == 'concluido'){
                $('.timer').timer({
                    duration: item.duracion,
                    callback: function () {
                        location.href = "../view/misPostulaciones.view.php";
                    }
                });
                html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                html += '<td align="center">' + item.codigo_pregunta + '</td>';
                html += '<td align="center">' + item.numero_pregunta + '</td>';
                html += '<td align="center">' + item.nombre_pregunta + '</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarCronograma(' + item.codigo_convocatoria + ')"><i class="fa fa-calendar"></i></button>';
//                    html += '</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarPuestos(' + item.codigo_convocatoria + ')"><i class="fa  fa-folder-open-o"></i></button>';
//                    html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#preguntas").html(html);


//            $('#tabla-examen').dataTable({
////                "aaSorting": [[1, "desc"]]
//            });



        } else {
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");

    });
}
function respuestaCandidato(codPrueba) {
    $.post
            (
                    "../controller/gestionarRespuesta.candidato.listar.controller.php",
                    {
                        p_cod_prueba: codPrueba
                    }

            ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-respuestas" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th>CODIGO PRUEBA</th>';
            html += '<th>NÚMERO DE PREGUNTA</th>';
            html += '<th>RESPUESTA</th>';
            html += '<th>ESTADO</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
//                html += '<td align="center">'+item.codigo_prueba+'</td>';
                html += '<td align="center">' + item.numero_pregunta + '</td>';
                html += '<td align="center">' + item.respuesta_candidato + '</td>';
                if(item.estado === "CORRECTO") 
                    html += '<td align="center"><i class="fa fa-check"></td>';
                else
                    html += '<td align="center"> <i class="fa fa-times"></td>';
//		html += '<td align="center">';
//		html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_laboratorio + ')"><i class="fa fa-pencil"></i></button>';
//		html += '&nbsp;&nbsp;';
//		html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_laboratorio + ')"><i class="fa fa-close"></i></button>';
//		html += '</td>';
                html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';

            $("#respuestas").html(html);

//
//            $('#tabla-respuestas').dataTable({
//                "aaSorting": [[1, "asc"]]
//            });



        } else {
            //swal("Mensaje del sistema", resultado , "warning");
        }

    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        //swal("Error", datosJSON.mensaje , "error"); 
    });
}
$("#frmgrabarResp").submit(function (event) {
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

                    var codRespCand = "";
                    if ($("#txtTipoOperacion").val() === "editar") {
                        codRespCand = "0";
                    } else {
                        codRespCand = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarRespuesta.candidato.agregar.editar.controller.php",
                            {
                                p_codigo_pregunta: $("#txtCodPregunta").val(),
                                p_numPregunta: $("#txtNumRespuesta").val(),
                                p_respuesta: $("#cboRespuesta").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_cod_respuesta_candidato: codRespCand
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrarRc").click(); //Cerrar la ventana 
//                            respuestaCandidato(); //actualizar la lista
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
    $("#txtNombre").val("");
    $("#titulomodal").html("Agregar nuevo laboratorio");
});


$("#myModal").on("shown.bs.modal", function () {
    $("#txtNombre").focus();
});
$("#frmgrabarCalificarPrueba").submit(function (event) {
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

                    var codPrueba = "";
                    if ($("#txtTipoOperacionn").val() === "agregar") {
                        codPrueba = "0";
                    } else {
                        codPrueba = $("#txtCodigoo").val();
                    }

                    $.post(
                            "../controller/calificar.prueba.controller.php",
                            {
                                p_cod_prueba: $("#txtCodPrueba").val(),
                                p_tipo_ope: $("#txtTipoOperacionn").val(),
                                p_cod_calificacion_prueba: codPrueba
                            }
                    ).done(function (resultado) {
                        var datosJSON = resultado;

                        if (datosJSON.estado === 200) {
                            swal("Exito", datosJSON.mensaje, "success");
                            $("#btncerrarCalifPruebas").click(); //Cerrar la ventana 
//                            location.href = "../view/misPostulaciones.view.php";
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


$("#btnagregarCalifPruebas").click(function () {
    $("#txtTipoOperacionn").val("agregar");
    $("#txtCodigo").val("");
    $("#txtNombre").val("");
    $("#titulomodal").html("Agregar nueva evaluación");
});


$("#myModalCalifPruebas").on("shown.bs.modal", function () {
    $("#txtNombre").focus();
});
function calificar(codPrueba) {
    $.post
            (
                    "../controller/calificar.prueba.controller.php",
                    {
                        p_cod_prueba: codPrueba
                    }

            );
    location.href = "../view/misPostulaciones.view.php";
}