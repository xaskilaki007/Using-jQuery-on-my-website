// Функция проверки заполненности всех полей формы
function validateForm(formId) {
    let $form = $(`#${formId}`);
    let $inputs = $form.find('input[required], textarea[required], select[required]');
    
    for (let i = 0; i < $inputs.length; i++) {
        let $input = $($inputs[i]);
        if (!$input.val().trim()) {
            alert(`Поле ${$input.attr('name')} должно быть заполнено`);
            $input.focus();
            return false;
        }
    }
    return true;
}

// Пример вызова для проверки формы при отправке
$('#submitButton').on('click', function(event) {
    if (!validateForm('contactForm')) {
        event.preventDefault();
    }
});
