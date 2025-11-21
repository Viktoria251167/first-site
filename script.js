const form = document.forms["form"];
const button = form.elements["button"];

const inputArr = Array.from(form);
const validInputArr = [];

// Создаем элемент для сообщений
const messageDiv = document.createElement('div');
messageDiv.style.cssText = `
    margin-top: 15px;
    padding: 12px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    min-height: 20px;
`;
button.parentNode.insertBefore(messageDiv, button.nextSibling);

inputArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0");
        validInputArr.push(el)
    }
});

form.addEventListener("input", inputHandler);
button.addEventListener("click", buttonHandler);

function inputHandler({target}){
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.style.border = "2px solid rgb(0,196,0)";
        el.setAttribute("is-valid", "1");
    } else {
        el.style.border = "2px solid rgba(255, 0, 0)";
        el.setAttribute("is-valid", "0");
    }
}

function buttonHandler(e) {
    e.preventDefault();
    
    const isAllValid = [];
    validInputArr.forEach((el) => {
        isAllValid.push(el.getAttribute("is-valid"));
    });
    const isValid = isAllValid.reduce((acc, current) => {
        return acc && current;
    });
    
    if (!Boolean(Number(isValid))) {
        showMessage('Заполните обязательные поля!', 'error');
    } else {
        // Получаем данные из всех полей
        const nameInput = form.querySelector('input[data-reg][type="text"], input[name="name"]');
        const emailInput = form.querySelector('input[data-reg][type="email"], input[name="email"]');
        const commentInput = form.querySelector('textarea[data-reg], textarea[name="comment"], textarea[name="message"]');
        
        const userName = nameInput ? nameInput.value : 'пользователь';
        const userEmail = emailInput ? emailInput.value : 'не указан';
        const userComment = commentInput ? commentInput.value : 'комментарий не указан';
        
        showMessage(`Спасибо, ${userName}, за уделенное время и Ваш комментарий "${userComment}"! Возможно скоро я свяжусь с вами по адресу: ${userEmail}.`, 'success');
    }
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    
    if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    } else if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    }
}