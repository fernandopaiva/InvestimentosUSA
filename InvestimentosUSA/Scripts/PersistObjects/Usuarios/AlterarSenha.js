$(document).ready(function () {
    $('#btnAlteraSenha').on('click', function () {
        $("#errorMessage").hide();       
        var senha = $('#senha').val();
        //var dados = $(this).serialize();
        $('#btnAlteraSenha').prop('disabled', true); //desabilita botao


        if (senha.length === 0 || senha.length < 8) {
            $('#btnAlteraSenha').prop('disabled', false);
            $("#errorMessage").prop("class", "alert-danger");
            $("#errorMessage").html("A nova senha deve ter 8 carácteres");
            $("#errorMessage").show();
        } else {
            changePassword(senha);
        }
    });
});

function changePassword(senha) {
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
        url: "/Usuario/alteraSenhaUsuario",
        data: {senha: senha },
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {
                $("#errorMessage").html(msg);
                $("#errorMessage").prop("class", "alert-success");
                //$('#btnRecupera').prop('disabled', false);
                window.location.replace("/Usuario/logout");
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