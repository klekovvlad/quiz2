const app = document.querySelector('#app');
const body = document.querySelector('body');
const bodyHeight = () => {
    body.style.height = `${window.innerHeight}px`;
    app.style.height = `${window.innerHeight}px`;
}
// bodyHeight();

const headerSRC = 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/QUIZ/HEADER.png';
const flowertopSRC = 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/QUIZ/flower-headerTOP.png';
const flowerbottomSRC = 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/QUIZ/flower-headerBOTTOM.png';
const flowerMainTopSRC = 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/QUIZ/flower-t.png';
const flowerMainBottomSRC = 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/QUIZ/flower-b.png';

const questions = [
    {   
    question: 'В каком году был учрежден Международный женский день?',
    answers: [
        {content: '1857', right: false},
        {content: '1910', right: true},
        {content: '1917', right: false},
    ],
    text: 'Верный ответ - 1910'
    },
    {   
    question: 'Кому принадлежит идея праздника?',
    answers: [
        {content: 'Кларе Цеткин', right: true},
        {content: 'Розе Люксенбург', right: false},
        {content: 'Надежде Крупской', right: false},
    ],
    text: 'Идея праздника принадлежит Кларе Цеткин'
    },
    {   
    question: 'Когда в России впервые отметили Международный женский день?',
    answers: [
        {content: '2 марта 1913', right: true},
        {content: '15 марта 1911', right: false},
        {content: '28 февраля 1918', right: false},
    ],
    text: '2 марта 1913 года впервые в России отметили Международный женский день'
    },
    {   
    question: 'С какого года Международный женский день стал отмечаться в России именно 8 марта',
    answers: [
        {content: '1921', right: true},
        {content: '1917', right: false},
        {content: '1936', right: false},
    ],
    text: 'с 1921 года в России Международный женский день отмечается именно 8 марта'
    },
    {   
    question: 'Как правильно называется цветок мимоза ставший символом 8 марта?',
    answers: [
        {content: 'Акация серебристая', right: true},
        {content: 'Аквитания китайская', right: false},
        {content: 'Тараксакум', right: false},
    ],
    text: 'Символ 8 марта - акация серебристая'
    },
];
let targetCategory = 'okeymobile://category?id=3074457345616778220'
let gameIndex = 0;
let frameIndex = 0;
let trueIndex = 0;
let lives = 1;
// if(localStorage.getItem('quizEND') === null || localStorage.getItem('quizEND') === undefined) {
//     localStorage.setItem('quizEND', 'false');
// }
//Генерация картинок
const imageBg = (srcOne, srcTwo) => {
    for(let i = 0; i < 2; i++) {
        const imageFLOWER = document.createElement('img');
        if(i == 0) {
            imageFLOWER.src = srcOne;
            imageFLOWER.classList.add('app-bg__top');
        }else{
            imageFLOWER.src = srcTwo;
            imageFLOWER.classList.add('app-bg__bottom');
        }
        body.append(imageFLOWER);
    }
}


//Первый экран
const startFrame = () => {
    app.innerHTML = '';
    const start = document.createElement('div');
    const startHeader = document.createElement('img');
    const startDesc = document.createElement('p');
    const quizButton = document.createElement ('button');
    const titleText = document.createElement('div');
    titleText.classList.add('quiz-title');
    titleText.textContent = 'Акция завершена!'
    quizButton.classList.add('quiz-button');
    start.classList.add('quiz-start');
    startHeader.src = headerSRC;
    startDesc.innerHTML = "Не расстраивайтесь, впереди Вас также будут ожидать игры/опросы с возможностью выиграть призы"
    quizButton.textContent = 'За покупками!';
    imageBg(flowertopSRC, flowerbottomSRC);
    start.append(titleText, startDesc);
    app.append(start, quizButton)
}

// if(localStorage.getItem('quizEND') === 'false') {
//     startFrame();
// }else{
//     app.textContent = 'Вы уже играли'
// }
startFrame();

const quizButton = app.querySelector('.quiz-button');

//Запуск квиза
const startQuiz = () => {
    const imageOne = body.querySelector('.app-bg__top');
    const imageTwo = body.querySelector('.app-bg__bottom');
    imageOne.src = flowerMainTopSRC;
    imageTwo.src = flowerMainBottomSRC;
    imageOne.style.maxWidth = '80%';
    imageOne.style.top = '-10%';
    imageTwo.style.left = '100%'
    imageTwo.style.transform = 'translate(-100%,0)'
    const startFrame = document.querySelector('.quiz-start');
    startFrame.parentNode.removeChild(startFrame);
    const quizHeader = document.createElement('div');
    const quizAnswers = document.createElement('div');
    quizHeader.classList.add('quiz-title');
    quizAnswers.classList.add('quiz-content');
    const trueText = document.createElement('div');
    trueText.classList.add('quiz-true');
    quizButton.before(trueText);
    app.prepend(quizHeader, quizAnswers);
    frameIndex++;
}

//Основной движок
const game = () => {
    quizButton.classList.add('quiz-button__hidden');
    const title = app.querySelector('.quiz-title');
    const content = app.querySelector('.quiz-content');
    const trueText = app.querySelector('.quiz-true');
    trueText.textContent = '';
    title.textContent = '';
    content.innerHTML = '';
    title.textContent = questions[gameIndex].question;
    questions[gameIndex].answers.sort( () => Math.random() - 0.5);
    for(let i = 0; i < questions[gameIndex].answers.length; i++) {
        let answer = document.createElement('div');
        answer.classList.add('quiz-answer');
        answer.textContent = questions[gameIndex].answers[i].content;
        content.append(answer);
    }
    
    const answers = content.querySelectorAll('.quiz-answer');
    answers.forEach(function(answer, index) {
        answer.classList.remove('.quiz-answer__hidden')
        answer.addEventListener('click', () => {
            if(questions[gameIndex - 1].answers[index].right === true) {
                trueIndex++;
                answer.classList.add('quiz-answer__success');
            }else {
                lives--;
                answer.classList.add('quiz-answer__wrong');
            }
            trueText.append(questions[gameIndex - 1].text);
            for(let i = 0; i < answers.length; i++) {
                answers[i].classList.add('quiz-answer__hidden')
            }
            quizButton.classList.remove('quiz-button__hidden');
        })
    })

    gameIndex++;
}

//Очистить экран
const final = () => {
    // localStorage.setItem('quizEND', 'true')
    const content = app.querySelector('.quiz-content');
    const trueText = app.querySelector('.quiz-true');
    trueText.parentNode.removeChild(trueText);
    content.innerHTML = '';
    quizButton.textContent = 'За покупками!';
    quizButton.addEventListener('click', () => {
        window.location.href = `${targetCategory}`;
    })
}

//Экран победителя
const winner = () => {
    const title = app.querySelector('.quiz-title'); 
    title.textContent = 'Поздравляем!';
    const gift = document.createElement('div');
    gift.classList.add('quiz-promo');
    const giftContent = document.createElement('div');
    giftContent.classList.add('quiz-promo__text');
    const giftPromocode = document.createElement('div');
    giftPromocode.classList.add('quiz-promo__promocode');
    giftContent.innerHTML = `Вы ответили на все вопросы. <br>Дарим промокод на скидку 500 рублей`;
    giftPromocode.textContent = '8МАРТА'
    const giftDesc = document.createElement('div');
    giftDesc.classList.add('quiz-promo__desc');
    giftDesc.innerHTML = `Промокод вводится на русском языке. Промокод выдаётся покупателю только после успешного прохождения квиза (опроса) в МП. Предоставляется скидка 500 руб. на 1 заказ от 2500 рублей. Скидка не распространяется на алкогольную продукцию и товары со скидками. Данные товары не учитываются при расчете общей стоимости заказа. Срок действия: с 08.03.2023 по 12.03.2023 включительно.`
    gift.append(giftContent, giftPromocode, giftDesc);
    quizButton.before(gift)
}

//Экран проигравшего
const looser = () => {
    const content = app.querySelector('.quiz-content');
    const title = app.querySelector('.quiz-title'); 
    title.textContent = 'Игра закончена!'
    const looseText = document.createElement('div')
    looseText.classList.add('quiz-loose');
    let trueIndexText = 'вопросов';
    content.textContent = `Вы правильно ответили на ${trueIndex} из ${questions.length} ${trueIndexText}!`;
    looseText.textContent = 'Не смогли правильно ответить на все вопросы? Не расстраивайтесь, впереди Вас также будут ожидать игры/опросы с возможностью выиграть призы';
    quizButton.before(looseText);
}

//Отправка сообщений в ТГ
const chatID = '-1001891588574';
const tokenBot = '6259676936:AAGZn7TwbVd-o4gQuqRpgASNgki89zKJCY8';
const sendMessage = (tokenBot, chatID) => {
    const messageBot = `Клиент прошел тест. Правильных ответов: ${trueIndex}`;
    const request = new XMLHttpRequest();
    const url = `https://api.telegram.org/bot${tokenBot}/sendMessage?chat_id=${chatID}&parse_mode=html&text=${messageBot}`;
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    request.send();
}

// quizButton.addEventListener('click', () => {
//     if(frameIndex == 0 ) {
//         startQuiz();
//     }
//     quizButton.textContent = 'Далее'
//     if(lives == 0) {
//         final();
//         looser();
//     }else if(gameIndex < questions.length) {
//         game();
//     }else{
//         final();
//         winner();
//         sendMessage(tokenBot, chatID);
//     }
// });

quizButton.addEventListener('click', () => {
    window.location.href = `${targetCategory}`;
})