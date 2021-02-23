$(".faq-question-container").click(function() {
    $(this).children().prev('.faq-question-expand-image').toggle();
    $(this).children().next('.faq-question-collapse-image').toggle();
    $(this).parent().find('.faq-answer').toggle();
});