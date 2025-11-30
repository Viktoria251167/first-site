document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Создаем контейнер для сообщений
    const messageContainer = document.createElement('div');
    messageContainer.className = 'form-message';
    form.parentNode.appendChild(messageContainer);

    // Функция проверки поля
    function validateField(field) {
        const regex = new RegExp(field.dataset.reg);
        const value = field.value.trim();
        const isValid = regex.test(value);
        
        // Сбрасываем предыдущие стили
        field.style.border = '2px solid ';
        
        if (value === '' || !isValid) {
            field.style.borderColor = '#ff3860';
            return false;
        } else {
            field.style.borderColor = '#009579';
            return true;
        }
    }

    // Функция показа сообщения
    function showMessage(type, data = null) {
        if (type === 'success') {
            messageContainer.className = 'form-message success-message';
            messageContainer.innerHTML = `
                Спасибо, <strong>${data.name}</strong>, за уделенное время и Ваш комментарий "<em>${data.message}</em>"! 
                Возможно скоро я свяжусь с вами по адресу <strong>${data.email}</strong>.
            `;
        } else {
            messageContainer.className = 'form-message error-message';
            messageContainer.textContent = 'Кажется Вы заполнили не все поля, или же что-то заполнено неверно.';
        }
        
        // Показываем контейнер
        messageContainer.style.display = 'block';
    }

    // Скрываем сообщение
    function hideMessage() {
        messageContainer.style.display = 'none';
    }

    // Функция очистки полей
    function clearFormFields() {
        inputs.forEach(input => {
            if (input.name !== 'button') {
                input.value = ''; // Очищаем поле
                input.style.border = 'none'; // Убираем рамку
            }
        });
    }

    // Валидация в реальном времени
    inputs.forEach(input => {
        // Пропускаем кнопку отправки
        if (input.name === 'button') return;
        
        input.addEventListener('blur', function() {
            validateField(this);
            // Убираем скрытие сообщения при редактировании
        });
        
        input.addEventListener('input', function() {
            // Проверяем поле только если оно уже было проверено (имеет цветную рамку)
            if (this.style.borderColor !== '') {
                validateField(this);
            }
            // Убираем скрытие сообщения при вводе
        });
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        const formData = {};
        
        // Проверяем все поля
        inputs.forEach(input => {
            if (input.name !== 'button') {
                const isValid = validateField(input);
                if (!isValid) {
                    isFormValid = false;
                } else {
                    formData[input.name] = input.value.trim();
                }
            }
        });
        
        if (isFormValid) {
            showMessage('success', formData);
            clearFormFields(); // Очищаем поля формы
            
        } else {
            showMessage('error');
        }
    });
});