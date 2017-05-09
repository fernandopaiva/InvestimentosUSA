
$(document).ready(function () { 

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
        url: "/Produto/countProdutoEmpresa",        
        success: function (data) {
            console.log(data);
            totalReg = parseInt(data["totalReg"]);
            console.log(totalReg);
            createPagination(totalReg);
        },
        error: function (xhr, status) {
            console.log("Erro: " + status);
        }
    });
});

function createPagination(totalReg) {
    var page = 1;
    var offset = 0;
    var row = 0;
    for (x = 0; x < totalReg; x++) {        
        if (row === offset) {
            if (offset === 0) {
                findByPagination(offset);
            }
            $("#paginator").append('<li><a href="#" onclick="findByPagination(' + offset + ');">' + page + '</a></li>');
            page++;
            row = 0;
            offset += 10;            
        }
        row++;
    }
}

function findByPagination(offset) {
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
        url: "/Produto/findByOffset",
        data: { offset: offset },
        success: function (data) {
            preencheGrid(data);
        },
        error: function (xhr, status) {
            console.log("Erro: " + status);
        }
    });
    
}

function preencheGrid(data) {
    $('#tableView > tbody').empty();
    if (data["Produto"].length > 0) {
        var url = '/Produto/edit/';
        $.each(data["Produto"], function (i, cp) {
            $.base64.utf8encode = true;
            var id = $.base64.encode(String(cp.id));
            var link = url + id;   //variavel url esta na view  

            var status = "";
            if (cp.status === 1) {
                status = "ATIVO";
            } else {
                status = "INATIVO";
            }

            $('#tableView > tbody:last-child').append('<tr>'
                                                    + '<td class="text-capitalize small">' + cp.descricao + '</td>'
                                                    + '<td class="text-capitalize small">' + cp.catProduto + '</td>'
                                                    + '<td class="text-capitalize text-right small" style="width:120px;">' + cp.valorVenda + '</td>'
                                                    + '<td class="text-capitalize text-center small" style="width:80px;">' + status + '</td>'
                                                    + '<td class="col-md-1"><a href="' + link + '" class="glyphicon glyphicon-pencil" title="editar"></a></td>'
                                                    + '</tr>');
        });
    }
}



