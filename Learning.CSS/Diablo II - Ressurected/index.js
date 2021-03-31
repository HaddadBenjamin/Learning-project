// i can simplify, use :hover  + each
$('.nav-link-item-forum').hover(
    function ()
    {
        $('.nav-link-item-goto-image').css('fill', '#e9c964')
        $('.nav-link-item-forum-text').css('color', '#e9c964')
    },
    function()
    {
        $('.nav-link-item-goto-image').css('fill', '#a58546')
        $('.nav-link-item-forum-text').css('color', '#a58546')
    }
)

$('.sign-up-button').hover(
    function ()
    {
        $(this).css('filter', 'brightness(125%)')
        $(this).find('.sign-up-button').css('color', '#e9c964')
    },
    function ()
    {
        $(this).css('filter', 'brightness(100%)')
        $(this).find('.sign-up-button').css('color', '#bd9b4e')
    }
)