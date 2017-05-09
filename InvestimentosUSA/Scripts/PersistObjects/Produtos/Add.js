$(document).ready(function () {
    $('#formAddProduto').submit(function () {
        //var dados = $(this).serialize();
        var dados = new FormData($('#formAddProduto').get(0));

        $('#btnGravarProduto').prop('disabled', true);
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
            url: "/Produto/addAjax",
            data: dados,
            processData: false,
            contentType: false,
            success: function (data) {
                var status = data["status"];
                var msg = data["msg"];
                if (status === "1") {
                    $('#formAddProduto').trigger("reset");
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-success");
                    $("#image").attr('src', '~/Imagens/default.png');
                   // window.location.replace("/Empresa/view");                    
                } else {                    
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-danger");
                }
                $("#errorMessage").show()
                $('#btnGravarProduto').prop('disabled', false);
            },
            error: function (xhr, status) {
                $("#btnGravarProduto").prop("disabled", false);
                $("#errorMessage").html("Erro tentando cadastrar produto :(");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }
        });

        return false;
    });
});



