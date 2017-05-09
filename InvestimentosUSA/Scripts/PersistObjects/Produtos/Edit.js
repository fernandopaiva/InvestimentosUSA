$(document).ready(function () {
    $('#formEditProduto').submit(function () {
        //var dados = $(this).serialize();
        var dados = new FormData($('#formEditProduto').get(0));

        $('#btnEditarProduto').prop('disabled', true);
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
            url: "/Produto/editAjax",
            data: dados,
            processData: false,
            contentType: false,
            success: function (data) {
                var status = data["status"];
                var msg = data["msg"];
                if (status === "1") {
                    $('#formEditProduto').trigger("reset");
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-success");                    
                    window.location.replace("/Produto/view");                    
                } else {                    
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-danger");
                }
                $("#errorMessage").show()
                $('#btnEditarProduto').prop('disabled', false);
            },
            error: function (xhr, status) {
                $("#btnEditarProduto").prop("disabled", false);
                $("#errorMessage").html("Erro tentando alterar produto :(");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }
        });

        return false;
    });
});



