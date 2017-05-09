$(document).ready(function(){        
    $('#formulario').submit(function(){            
        var dados = $(this).serialize();
        $('input[type="submit"]').prop('disabled', true); //desabilita botao
            
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
            url: "/Usuarios/editJSON",
            data: dados,
            success: function (data) {
                var status = data["status"];
                var msg = data["msg"];  
                if (status === "1") {                    
                    $('#formulario').trigger("reset");
                    $(".message").html(msg);
                    $(".message").css('color', 'green');
                    window.location.replace("/Usuarios/index");
                } else {
                    $(".message").html(msg);
                    $(".message").css('color', 'red');
                }
                $('input[type="submit"]').prop('disabled', false);
            },
            error: function (xhr, status) {                    
                $(".message").html('Error: ' + status);
                $(".message").css('color', 'red');
                $('input[type="submit"]').prop('disabled', false);
            }   
        });

        return false;
    });
});