$(document).ready(function(){        
    $('#btnAcessar').on('click', function () {
        $(".message").hide();
        var email = $('#email').val();
        var senha = $('#senha').val();
        //var dados = $(this).serialize();
        $('#btnAcessar').prop('disabled', true); //desabilita botao
       

        if (email.length === 0 || senha.length === 0) {
            $('#btnAcessar').prop('disabled', false);
            $(".message").html("Informe o email e a senha");
            $(".message").show();
        } else {
            doLogin(email, senha);
        }


    });
});

function doLogin(email, senha) {
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
        url: "/Usuario/loginAjax",
        data: { email: email, senha: senha },
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {
                //    $('#formulario').trigger("reset");
                // $(".message").html(msg);
                //  $(".message").show();
                //   $(".message").css('color', 'green');
                window.location.replace("/Home/index");
            } else {
                $(".message").html(msg);
                $(".message").show();
                //    $(".message").css('color', 'red');
                $('#btnAcessar').prop('disabled', false);
            }

        },
        error: function (xhr, status) {
            $(".message").html('Error: ' + status);
            $(".message").css('color', 'red');
            $(".message").show();
            $('#btnAcessar').prop('disabled', false);
        }
    });

    return false;
}