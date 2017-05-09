//remove forma pagamento empresa
$(document).ready(function () {
    $('#selectedItems')
        .on('select2:unselect', function (e) {
            var idFPG = e.params.data.id;
            var idEmp = $("#id").val();

            $('#btnEditarEmpresa').prop('disabled', true);

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
                url: "/Empresa/deleteFormaPagto",
                data: { idEmp: idEmp, idFPG: idFPG },
                success: function (data) {
                    var status = data["status"];
                    var msg = data["msg"];
                    if (status === "1") {
                        console.log(msg);
                    } else {
                        console.log(msg);
                    }
                    $('#btnEditarEmpresa').prop('disabled', false);
                },
                error: function (xhr, status) {
                    console.log(status);
                    $('#btnEditarEmpresa').prop('disabled', false);
                }
            });
        })
        .select2({
            placeholder: "Informe a forma de pagamento"
        });
        

});

