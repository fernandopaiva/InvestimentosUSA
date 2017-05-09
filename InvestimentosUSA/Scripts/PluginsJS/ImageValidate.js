(function ($) {
    var getFileExtension = function (fileName) {
        var extension = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName) : undefined;
        if (extension != undefined) {
            return extension[0];
        }
        return extension;
    };

    var getFileSize = function (fileElement) {
        if (fileElement.files && fileElement.files.length > 0) {
            return fileElement.files[0].size;
        }
        return -1;
    };

    $.validator.unobtrusive.adapters.add(
        'file', ['fileextensions', 'maxcontentlength'], function (options) {
            var params = {
                fileextensions: options.params.fileextensions.split(','),
                maxcontentlength: options.params.maxcontentlength
            };
            options.rules['file'] = params;
            if (options.message) {
                options.messages['file'] = options.message;
            }
        }
    );

    $.validator.addMethod('file', function (value, element, params) {
        var extension = getFileExtension(value);
        var validExtension = $.inArray(extension, params.fileextensions) !== -1;
        var fileSize = getFileSize(element);
        return validExtension && fileSize < parseInt(params.maxcontentlength);
    }, '');

})(jQuery);