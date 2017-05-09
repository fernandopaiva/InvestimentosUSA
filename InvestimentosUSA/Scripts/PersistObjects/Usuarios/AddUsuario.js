$(document).ready(function(){        
    $('#formulario').submit(function(){            
        var dados = $(this).serialize();
        $('#btnSubmit').prop('disabled', true); //desabilita botao
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
            url: "/Usuario/addAjax",
            data: dados,
            success: function (data) {
                var status = data["status"];
                var msg = data["msg"];  
                if (status === "1") {                    
                    //$('#formulario').trigger("reset");
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-success");                    
                    window.location.replace("/Usuario/cadastroRealizadoComSucesso");
                } else {
                    $('#btnSubmit').prop('disabled', false);
                    $("#errorMessage").html(msg);
                    $("#errorMessage").prop("class", "alert-danger");
                }
                $("#errorMessage").show()
            },
            error: function (xhr, status) {                    
                $("#btnSubmit").prop("disabled", false);
                $("#errorMessage").html("Erro tentando cadastrar usuário :(");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }   
        });

        return false;
    });
});