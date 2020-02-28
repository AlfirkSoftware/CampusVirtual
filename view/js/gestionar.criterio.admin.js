$(document).ready(function () {
    //Esto se ejecuta cuando carga la página
    //alert("ha cargado la página");
//    cargarComboConvocatoria("#cboConvocatoria", "seleccione");
//    cargarComboPuesto("#cboPuesto", "seleccione");
    cargarComboPrueba("#cboPruebaa", "seleccione");
//    listar();
//    listarPreguntas();
    listar();
});


function listar() {
    $.post
            (
                    "../controller/gestionarCriterios.listar.controller.php"

                    ).done(function (resultado) {
        var datosJSON = resultado;

        if (datosJSON.estado === 200) {
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO PRUEBA</th>';
            html += '<th style="text-align: center">CODIGO CRITERIO</th>';
            html += '<th style="text-align: center">PONDERACIÓN MÍNIMA</th>';
            html += '<th style="text-align: center">PONDERACIÓN MÁXIMO</th>';
            html += '<th style="text-align: center">VALORACIÓN</th>';
            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function (i, item) {
                html += '<tr>';
                html += '<td align="center">' + item.codigo_prueba + '</td>';
                html += '<td align="center">' + item.codigo_ponderacion_deseable + '</td>';
                html += '<td>' + item.ponderacion_deseable_minimo + '</td>';
                html += '<td>' + item.ponderacion_deseable_maximo + '</td>';
                html += '<td>' + item.valoracion + '</td>';
                html += '<td>' + item.estado + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.codigo_ponderacion_deseable + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
                html += '<button type="button" class="btn btn-danger btn-xs" onclick="eliminar(' + item.codigo_ponderacion_deseable + ')"><i class="fa fa-close"></i></button>';
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

                    var codCrit = "";
                    if ($("#txtTipoOperacion").val() === "agregar") {
                        codCrit = "0";
                    }else {
                        codCrit = $("#txtCodigo").val();
                    }

                    $.post(
                            "../controller/gestionarCriterios.agregar.editar.controller.php",
                            {
                                p_cod_prueb: $("#cboPruebaa").val(),
                                p_min: $("#txtMinimo").val(),
                                p_max: $("#txtMaximo").val(),
                                p_val: $("#cboValoracion").val(),
                                p_est: $("#cboEstado").val(),
                                p_tipo_ope: $("#txtTipoOperacion").val(),
                                p_cod_crit: codCrit
                                
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
    $("#txtMinimo").val(""),
    $("#txtMaximo").val(""),
    $("#cboValoracion").val(""),
    $("#cboEstado").val(""),
    $("#cboPruebaa").val(""),
$("#titulomodal").html("Agregar nuevo criterio");
});


$("#myModal").on("shown.bs.modal", function () {
    $("#txtNombrePrueba").focus();
});


function leerDatos(codCrit) {
    $.post
            (
                    "../controller/gestionarCriterios.leer.datos.controller.php",
                    {
                        p_cod_crit: codCrit
                    }
            ).done(function (resultado) {
        var jsonResultado = resultado;
        if (jsonResultado.estado === 200) {
            $("#txtTipoOperacion").val("editar");
            $("#txtCodigo").val(jsonResultado.datos.codigo_ponderacion_deseable);
            $("#txtMinimo").val(jsonResultado.datos.ponderacion_deseable_minimo);
            $("#txtMaximo").val( jsonResultado.datos.ponderacion_deseable_maximo );
            $("#cboValoracion").val(jsonResultado.datos.valoracion);
            $("#cboEstado").val(jsonResultado.datos.estado);
            $("#cboPruebaa").val(jsonResultado.datos.codigo_prueba);
            $("#titulomodal").html("Modificar datos criterios");
        }
    }).fail(function (error) {
        var datosJSON = $.parseJSON(error.responseText);
        swal("Error", datosJSON.mensaje, "error");
    });
}


function eliminar(codCrit) {
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
                            "../controller/gestionarCriterios.eliminar.controller.php",
                            {
                                p_cod_crit: codCrit
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

