$(document).ready(function () {
    $('#btnEnviar').on('click', function () {
        $("#btnEnviar").prop("disabled", true);

        var email = $("#email").val();
        var assunto = $("#assunto").val();
        var mensagem = $("#mensagem").val();

        if (email.length === 0 || assunto.length === 0 || mensagem.length === 0 || mensagem.length < 5) {
            $("#btnEnviar").prop("disabled", false);
            $("#errorMessage").html("Informe todos os campos");
            $("#errorMessage").prop("class", "alert-danger");
            $("#errorMessage").show()
        } else {
            envia(email, assunto, mensagem);
        }


    });
});

//envia o email
function envia(email, assunto, mensagem) {
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
        url: "/Usuario/sendMessageToContato",
        data: { email: email, assunto: assunto, mensagem: mensagem },
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {
                $("#btnEnviar").prop("disabled", false);
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-success");
                $("#errorMessage").show()
                window.location.replace("/Home/index");
            } else {
                $("#btnEnviar").prop("disabled", false);
                $("#errorMessage").html("Erro tentando enviar email, tente novamente mais tarde");
                $("#errorMessage").prop("class", "alert-danger");
                $("#errorMessage").show()
            }
        },
        error: function (xhr, status) {
            $("#btnEnviar").prop("disabled", false);
            $("#errorMessage").html("Erro tentando enviar email, tente novamente mais tarde");
            $("#errorMessage").prop("class", "alert-danger");
            $("#errorMessage").show()
        }
    });

    return false;
}

