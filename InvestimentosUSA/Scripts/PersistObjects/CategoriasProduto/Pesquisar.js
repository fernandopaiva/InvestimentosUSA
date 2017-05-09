$("#pesquisar").on('click', function () {    

    var criterio = $('#criterio').val();

    var loading = $(".imageLoading");
    $(document).ajaxStart(function () {
        loading.show();
    });
    $(document).ajaxStop(function () {
        loading.hide();
    });

    $.ajax({
        accepts: { json: 'application/json' },
        dataType: 'json',
        type: "POST",
        url: "/CategoriaProduto/findByCriterio",
        data: {criterio:criterio},
        success: function (data) {
            preencheGrid(data);
        },
        error: function (xhr, status) {
            console.log("Erro: " + status);
        }
    });
});



//function preencheGrid(data) {
//    $('#tableView > tbody').empty();   
//    if (data["CategoriaProduto"].length > 0) {
//        $.each(data["CategoriaProduto"], function (i, cp) {
//            $.base64.utf8encode = true;
//            var id = $.base64.encode(String(cp.id));            
//            var link = url + id;   //variavel url esta na view        
                        
//            $('#tableView > tbody:last-child').append('<tr>'
//                                                    + '<td class="text-capitalize small">' + cp.descricao + '</td>'
//                                                    + '<td class="col-md-1"><a href="' + link + '" class="glyphicon glyphicon-pencil" title="editar"></a></td>'
//                                                    + '</tr>');
            
           
//        });
//    }
//}