$(document).ready(function () {
    $('#formAddEmpresa').submit(function () {
        //var dados = $(this).serialize();
        var dados = new FormData($('#formAddEmpresa').get(0));

        $('#btnGravarEmpresa').prop('disabled', true);
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
            url: "/Empresa/addAjax",
            data: dados,
            processData: false,
            contentType: false,
            success: function (data) {
                var status = data["status"];
                var msg = data["msg"];
                if (status === "1") {
                    //$('#formulario').trigger("reset");
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-success");
                    window.location.replace("/Empresa/view");                    
                } else {
                    $('#btnGravarEmpresa').prop('disabled', false);
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-danger");
                }
                $("#errorMessage").show()
            },
            error: function (xhr, status) {
                $("#btnGravarEmpresa").prop("disabled", false);
                $("#errorMessage").html("Erro tentando cadastrar empresa :(");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }
        });

        return false;
    });
});



