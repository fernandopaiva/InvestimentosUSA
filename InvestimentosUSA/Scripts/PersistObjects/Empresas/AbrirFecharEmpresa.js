$('#abrirEmpresa').click(function (e) {
    e.preventDefault();
    $('#abrirEmpresa').prop('disabled', true);
    var id = $('#id').val();

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
        url: "/Empresa/abrirEmpresa",
        data: { id: id },
        success: function (data) {
            var status = data["status"];
            var msg = data["msg"];
            if (status === "1") {
                $("#abrirEmpresa").html("Fechar empresa")
                $("#abrirEmpresa").prop("class", "btn btn-success");
            } else {
                $("#abrirEmpresa").html("Abrir empresa")
                $("#abrirEmpresa").prop("class", "btn btn-danger");
            }
            $('#abrirEmpresa').prop('disabled', false);
        },
        error: function (xhr, status) {
            alert(status);
        }
    });
});