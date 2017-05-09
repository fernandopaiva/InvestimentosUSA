
$('#formEditCatProduto').submit(function (e) {
    e.preventDefault();
    var dados = $(this).serialize();
    //var dados = new FormData($('#formAddEmpresa').get(0));

    $('#btnEditarCatProd').prop('disabled', true);
    $('#btnCancelar').prop('disabled', true);
    $("#errorMessage").hide();

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
        url: "/CategoriaProduto/editAjax",
        data: dados,       
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {               
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-success");                
                window.location.replace("/CategoriaProduto/view");
            } else {
                $('#btnEditarCatProd').prop('disabled', false);
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-danger");
            }
            $("#errorMessage").show()            
        },
        error: function (xhr, status) {
            $("#btnEditarCatProd").prop("disabled", false);
            $("#btnCancelar").prop("disabled", false);
            $("#errorMessage").html("Erro tentando editar categoria de produto :(");
            $("#errorMessage").prop("class", "alert-danger");
            $("#errorMessage").show()
        }
    });
    
});

