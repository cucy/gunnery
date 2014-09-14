$('.execution-list-inline .well').click(function (event) {
    window.location = $(this).find('a')[0].href;
});

$(document.body).on('hidden.bs.modal', function () {
    $('#large-modal').removeData('bs.modal').find('.modal-body').html('');
});

$(document.body).on('shown.bs.modal', function () {
    setTimeout(function() {
        $('#large-modal').find('.form-group input,.form-group select,.form-group textarea').first().focus();
    }, 200);
});

(function ($) {
    $('[data-toggle="element"]').click(function (event) {
        $($(this).data('target')).toggleClass('hide');
    });
    $(".chosen-select").chosen({width: '100%'});

    function modalAjaxHandler(form) {
        return function (data, status, response) {
            var contentType = response.getResponseHeader('Content-Type');
            if (contentType.match(/text/)) {
                form.parents('.modal-body').html(data);
                $('.modal .save').prop('disabled', false);
            } else if (contentType.match(/json/)) {
                form.parents('.modal').find('.cancel').click();
                if (data.action == 'reload') {
                    window.location = window.location;
                    window.location.reload();
                } else if (data.action == 'redirect') {
                    window.location = data.target;
                }
            }
        }
    }

    function modalSaveHandler(event) {
        event.preventDefault();
        $(this).prop('disabled', true);
        var form = $(this).parents('.modal-content').find('form[role="form"]');
        $.post(form.attr('action'), form.serialize(), modalAjaxHandler(form));
    }

    function modalDeleteHandler(event) {
        if (confirm('Are you sure?')) {
            $(this).prop('disabled', true);
            var form = $(this).parents('.modal-content').find('form[role="delete"]');
            $.post(form.attr('action'), form.serialize(), modalAjaxHandler(form));
        }
    }

    $('body').on('click', '.modal .save', modalSaveHandler);
    $('body').on('submit', '.modal form', modalSaveHandler);
    $('body').on('click', '.modal .delete', modalDeleteHandler);
})(jQuery);

function updateSideBarHeight() {
    document.querySelector('style').textContent +=
        "@media screen and (min-width:769px) { .side-nav { height: "+$(document).height()+"px; }}";
}
updateSideBarHeight();

(function ($) {
    $('#department-select').change(function () {
        window.location = window.location.origin + '/department/switch/' + this.value;
    });

    $('#settings-opener').click(function(e){
        e.preventDefault();
        $('#settings-submenu').toggleClass('hide');
        updateSideBarHeight();
    })

    $('.sessionMessageWrap div').addClass('show').each(function(i, e){
        e = $(e);
        if (!e.hasClass('error')) {
            setTimeout(function(){$(e).removeClass('show')}, e.text().length*256);
        }
    }).click(function(){
        $(this).removeClass('show');
    });
})(jQuery);
