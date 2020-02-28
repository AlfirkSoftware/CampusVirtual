$(document).ready(function(){
//    //Esto se ejecuta cuando carga la página
//    //alert("ha cargado la página");
//    cargarComboPais("#cboPais", "seleccione");
    listarRPrueba();
});


function listarRPrueba(){
    $.post
    (
        "../controller/reporte.resultadoCurriculo.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listadoResulPruebas" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CONVOCATORIA</th>';
            html += '<th style="text-align: center">PUESTO</th>';
            html += '<th style="text-align: center">PRUEBAS</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
                    html += '<td align="center"><a class="text-black">'+item.codigo_puesto_laboral+'</a></td>';
                    html += '<td><a class="text-black">'+item.nombre_convocatoria+'</a></td>';
                    html += '<td><a class="text-black">'+item.nombre_puesto+'</a></td>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="resultadosPruebas(' + item.codigo_puesto_laboral + ')"><i class="fa fa-file-text-o"></i></button>';
                    html += '</td>';
                    html += '</tr>';
//                }    
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listadoResulPruebas").html(html);
            
            
            $('#tabla-listadoResulPruebas').dataTable({
                "aaSorting": [[0, "asc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        //swal("Error", datosJSON.mensaje , "error"); 
    });
}
function resultadosPruebas(codPost){
      $.post
    (
        "../controller/reporte.resultadosPruebas.controller.php",
            { 
                p_cod_puest: codPost
            }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado===200){
            var html = "";
            $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_convocatoria );
                $("#titulomodal").html("Resultados de Pruebas");
            html += '<small>';
            html += '<table id="tabla-listado" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO PRUEBA</th>';
            html += '<th style="text-align: center">NOMBRE PRUEBA</th>';
            html += '<th style="text-align: center">APROBADOS</th>';
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
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModalA" onclick="Aprobados(' + item.codigo_prueba + ')"><i class="fa fa-user"></i></button>';
                    html += '</td>';
                    html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listado").html(html);
            
            
            $('#tabla-listado').dataTable({
                "aaSorting": [[1, "desc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
}
function Aprobados(codPrueba){
      $.post
    (
        "../controller/reporte.candidatos.aprobados.controller.php",
            { 
                p_cod_prueba: codPrueba
            }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado===200){
            var html = "";
            $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_promedio_prueba );
                $("#titulomodal2").html("Candidatos Aprobados");
            html += '<small>';
            html += '<table id="tabla-listadoP" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">DNI</th>';
            html += '<th style="text-align: center">NOMBRES</th>';
            html += '<th style="text-align: center">APELLIDOS</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                    html += '<td align="center">'+item.doc_id+'</td>';
                    html += '<td align="center">'+item.nombre+'</td>';
                    html += '<td align="center">'+item.apellidos+'</td>';
//                    html += '<td align="center">';
//                    html += '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#myModalA" onclick="Aprobados(' + item.codigo_puesto_laboral + ')"><i class="fa fa-user"></i></button>';
//                    html += '</td>';
                    html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listadoP").html(html);
            
            
            $('#tabla-listadoP').dataTable({
                "aaSorting": [[1, "desc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
}