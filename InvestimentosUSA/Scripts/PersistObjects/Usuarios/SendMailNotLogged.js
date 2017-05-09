$(document).ready(function(){        
    $('#formularioEmail').submit(function(){            
        var dados = $(this).serialize();
        $('#btnSubmitEmail').prop('disabled', true); //desabilita botao
        $("#errorMessage").hide();
            
        var loading = $(".imageLoading");
        $(document).ajaxStart(function () {
            loading.show();
        });
        $(document).ajaxStop(function () {
            loading.hide();
        });

        $.ajax({
            accepts: {json: 'application/json'},
            dataType:'json',
            type: "POST",
            url: "/Usuario/sendMailNotLogged",
            data: dados,
            success: function (data) {
                var status = data["status"];
                var msg = data["msg"];  
                if (status === "1") {                    
                    //$('#formularioEmail').trigger("reset");
                    //$("#btnSubmitEmail").prop("disabled", false);
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-success");                    
                    window.location.replace("/Usuario/_emailEnviadoComSucesso");
                } else {
                    $("#btnSubmitEmail").prop("disabled", false);
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-danger");                   
                }
                $("#errorMessage").show()
            },
            error: function (xhr, status) {                    
                $("#btnSubmitEmail").prop("disabled", false);
                $("#errorMessage").html("Erro tentando enviar email");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }   
        });

        return false;
    });
});