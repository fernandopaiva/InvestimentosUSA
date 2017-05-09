
$('#formAddCatProduto').submit(function (e) {
    e.preventDefault();
    var dados = $(this).serialize();
    //var dados = new FormData($('#formAddEmpresa').get(0));

    $('#btnCancelar').prop('disabled', true);
    $('#btnGravarCatProd').prop('disabled', true);
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
        url: "/CategoriaProduto/addAjax",
        data: dados,       
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {
                $('#formAddCatProduto').trigger("reset");
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-success");
                $("#descricao").focus();
                //window.location.replace("/Empresa/view");
            } else {
                $('#btnGravarCatProd').prop('disabled', false);
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-danger");
            }
            $("#errorMessage").show()
            $("#btnGravarCatProd").prop("disabled", false);
            $('#btnCancelar').prop('disabled', false);
        },
        error: function (xhr, status) {
            $("#btnGravarCatProd").prop("disabled", false);
            $('#btnCancelar').prop('disabled', false);
            $("#errorMessage").html("Erro tentando cadastrar categoria de produto :(");
            $("#errorMessage").prop("class", "alert-danger");
            $("#errorMessage").show()
        }
    });
    
});
