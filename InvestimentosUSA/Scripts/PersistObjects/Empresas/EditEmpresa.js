$('#formEditEmpresa').submit(function (e) {
        e.preventDefault();
        //var dados = $(this).serialize();
        var dados = new FormData($('#formEditEmpresa').get(0));

        $('#btnEditarEmpresa').prop('disabled', true);
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
            url: "/Empresa/editAjax",
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
                    $('#btnEditarEmpresa').prop('disabled', false);
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-danger");
                }
                $("#errorMessage").show()
            },
            error: function (xhr, status) {
                $("#btnEditarEmpresa").prop("disabled", false);
                $("#errorMessage").html("Erro tentando alterar empresa :(");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }
        });

       
});




