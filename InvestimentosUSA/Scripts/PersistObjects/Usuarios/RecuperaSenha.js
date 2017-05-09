$(document).ready(function () {
    $('#btnRecupera').on('click', function () {
        $("#errorMessage").hide();
        var email = $('#email').val();
        var senha = $('#senha').val();
        //var dados = $(this).serialize();
        $('#btnRecupera').prop('disabled', true); //desabilita botao
        
        if (email.length === 0 || senha.length === 0 || senha.length < 8) {
            $('#btnRecupera').prop('disabled', false);
            $("#errorMessage").prop("class", "alert-danger");
            $("#errorMessage").html("Informe o email e a nova senha");
            $("#errorMessage").show();
        } else {
            doChangePassword(email, senha);
        }
    });
});

function doChangePassword(email, senha) {
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
        url: "/Usuario/recuperarSenhaAjax",
        data: { email: email, senha: senha },
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-success");
                //$('#btnRecupera').prop('disabled', false);
                window.location.replace("/Usuario/senhaAlteradaComSucesso");
            } else {
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-danger");
                $('#btnRecupera').prop('disabled', false);
            }
            $("#errorMessage").show();

        },
        error: function (xhr, status) {
            $("#errorMessage").html('Error: ' + status);           
            $("#errorMessage").show();
            $('#btnRecupera').prop('disabled', false);
        }
    });

    return false;
}