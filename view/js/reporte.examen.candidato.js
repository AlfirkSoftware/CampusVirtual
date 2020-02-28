$(document).ready(function(){
//    //Esto se ejecuta cuando carga la página
//    //alert("ha cargado la página");
//    cargarComboPais("#cboPais", "seleccione");
    listar();
});


function listar(){
    $.post
    (
        "../controller/reporte.examen.candidato.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listadoMe" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CONVOCATORIA</th>';
            html += '<th style="text-align: center">PUESTO</th>';
            html += '<th style="text-align: center">FECHA POSTULACIÓN</th>';
            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">CRONOGRAMA</th>';
            html += '<th style="text-align: center">TEST</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td>'+item.codigo_convocatoria+'</td>';
                    html += '<td style="text-align: center">'+item.nombre_convocatoria+'</td>';
                    html += '<td style="text-align: center">'+item.nombre_puesto+'</td>';
                    html += '<td style="text-align: center">'+item.fecha_postulacion+'</td>';
                    html += '<td style="text-align: center">'+item.estado+'</td>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarCronograma(' + item.codigo_convocatoria + ')"><i class="fa fa-calendar"></i></button>';
                    html += '</td>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal2" onclick="evaluacion(' + item.codigo_puesto_laboral + ')"><i class="fa fa-file-text"></i></button>';
                    html += '</td>';
                    html += '</tr>';
//                }    
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listadoMe").html(html);
            
            
//            $('#tabla-listadoMp').dataTable({
//                "aaSorting": [[0, "asc"]]
//            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        //swal("Error", datosJSON.mensaje , "error"); 
    });
}
function listarCronograma(codConv){
      $.post
    (
        "../controller/cronograma.leer.listar.datos.controller.php",
            { 
                p_cod_conv: codConv
            }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado===200){
            var html = "";
            $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_convocatoria );
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
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                    html += '<td align="center">'+item.fecha_cronograma+'</td>';
                    html += '<td align="center">'+item.nombre_etapa+'</td>';
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
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
}
function evaluacion(codPues){
      $.post
    (
        "../controller/pruebas.especificas.listar.controller.php",
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
                $("#titulomodal").html("Test");
            html += '<small>';
            html += '<table id="tabla-listadoE" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CÓDIGO</th>';
            html += '<th style="text-align: center">PRUEBA</th>';
            html += '<th style="text-align: center">OPCIÓN</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                    html += '<td align="center">'+item.codigo_prueba+'</td>';
                    html += '<td align="center">'+item.nombre_prueba+'</td>';
                    if((item.promedio) >= 0) {
                        html += '<td align="center" class="text-primary">EVALUADO</td>';
                }else{
                    html += '<td align="center">';
                    html += '<a href="evaluacion.examen.view.php?id=' + item.codigo_prueba + '"><i class="fa fa-eye"></i>';
                    html += '</td>';
                }
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarPuestos(' + item.codigo_convocatoria + ')"><i class="fa  fa-folder-open-o"></i></button>';
//                    html += '</td>';
                    html += '</tr>';
            });
//
            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listadoE").html(html);
            
            
//            $('#tabla-listadoE').dataTable({
//                "aaSorting": [[1, "desc"]]
//            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
      $.post
    (
        "../controller/pruebas.conocimiento.listar.controller.php",
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
                $("#titulomodal").html("Test");
            html += '<small>';
            html += '<table id="tabla-listadoC" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
//            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CÓDIGO</th>';
            html += '<th style="text-align: center">PRUEBA</th>';
            html += '<th style="text-align: center">OPCIÓN</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                    html += '<td align="center">'+item.codigo_prueba+'</td>';
                    html += '<td align="center">'+item.nombre_prueba+'</td>';
                    if((item.promedio) > 0) {
                        html += '<td align="center" class="text-primary">EVALUADO</td>';
                }else{
                    html += '<td align="center">';
                    html += '<a href="evaluacion.examen.view.php?id=' + item.codigo_prueba + '"><i class="fa fa-eye"></i>';
//                    html += '<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal" onclick="examenes(' + item.codigo_prueba + ')"><i class=""></i>Empezar</button>';
                    html += '</td>';
                }
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModal" onclick="listarPuestos(' + item.codigo_convocatoria + ')"><i class="fa  fa-folder-open-o"></i></button>';
//                    html += '</td>';
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
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
}
function examenes(codPrueba){
      $.post
    (
        "../controller/evaluacion.examen.listar.controller.php",
            { 
                p_cod_prueba: codPrueba
            }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado===200){
            var html = "";
            $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_convocatoria );
                $("#titulomodal").html("Cronograma");
            html += '<small>';
            html += '<table id="tabla-listadoEE" class="table table-condensed">';
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
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                    html += '<td align="center">'+item.codigo_prueba+'</td>';
                    html += '<td align="center">'+item.nombre_prueba+'</td>';
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
            
            $("#listadoEE").html(html);
            
            
            $('#tabla-listadoEE').dataTable({
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