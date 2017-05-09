$(document).ready(function () {
    $('#imagem').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    });
});