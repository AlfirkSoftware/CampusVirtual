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
            html += '<th style="text-align: center">DOC. IDENTIDAD</th>';
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
                html += '<td align="center">' + item.codigo_usuario + '</td>';
                html += '<td align="center">' + item.doc_id + '</td>';
                html += '<td align="center">' + item.clave + '</td>';

                if(item.tipo === "A") html += '<td align="center">Administrador</td>';
                if(item.tipo === "D") html += '<td align="center">Docente</td>';
                if(item.tipo === "E") html += '<td align="center">Estudiante</td>';

                if(item.estado === "A") 
                    html += '<td align="center">Habilitado</td>';
                else 
                    html += '<td align="center">Deshabilitado</td>';

                html += '<td align="center">' + item.fecha_registro + '</td>';
                html += '<td align="center">';
                html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="leerDatos(' + item.doc_id + ')"><i class="fa fa-pencil"></i></button>';
                html += '&nbsp;&nbsp;';
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

