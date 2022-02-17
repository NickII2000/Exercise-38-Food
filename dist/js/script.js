window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        // tabContent[i].style.display = 'block';
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(1);

    tabParent.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    // const deadLine = '2022-02-15';
    const deadLine = new Date(new Date().getTime() + 10 * (24 * 60 * 60 * 1000));

    function endTimeRemaining(endTime = new Date()) {
        const t = Date.parse(endTime) - Date.parse(new Date());

        return {
            total: t,
            days: Math.floor(t / (1000 * 60 * 60 * 24)),
            hours: Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((t / (1000 * 60)) % 60),
            seconds: Math.floor((t / 1000) % 60),
        };
    }

    // function getZero(num) {
    //     // if (num >= 0 && num < 10) {
    //     //     return `0${num}`;
    //     // } else {
    //     //     return num;
    //     // }
    //     return (num >= 0 && num < 10) ? `0${num}` : num;
    // }

    const getZero = (num) => (num >= 0 && num < 10) ? `0${num}` : num;

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let t = endTimeRemaining(endTime);
            if (t.total <= 0) {
                clearInterval(timerInterval);
                t = endTimeRemaining();
            }
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }
    }

    setClock('.timer', deadLine);

    //Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    const openModal = () => {
        modal.classList.add('show');
        modal.classList.remove('hiddes');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    const closeModal = () => {
        modal.classList.add('hiddes');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    };

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        console.log(event.target);
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);

    //Class, используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 28;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container' //,
        // 'menu__item',
        // 'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

});

//Other

function func1(a, b, c) {
    console.log(arguments);
    console.log(typeof arguments);

    console.log(arguments[0]);
    // expected output: 1

    console.log(arguments[1]);
    // expected output: 2

    console.log(arguments[2]);
    // expected output: 3

    console.log(arguments[3]);
    // expected output: 4

    console.log('объекты arguments js итерируемые ===========================');
    for (let value of arguments) {
        console.log(value);
    }
    console.log('===========================');

    const arr = Array.from(arguments);
    console.log(arr);
    console.log(typeof arr);

}

func1(1, 2, 3, 4, 'word', {
    a: 'apple'
}, ['dog', 'cat'], undefined, null, NaN, false);

// Ввод: натуральное число n
// Вывод: количество простых чисел строго меньше n

const n = 101; // натуральное число n > 1
let arrBoolean = [];
for (let i = 2; i < n; i++) {
    arrBoolean[i] = true;
}

for (let i = 2; i * i <= (n - 1); i++) {
    if (arrBoolean[i] === true) {
        for (let j = i * i; j <= (n - 1); j += i) {
            arrBoolean[j] = false;
        }
    }
}

let count = 0;
for (let i = 2; i < n; i++) {
    if (arrBoolean[i]) {
        count++;
        console.log(`Простое число: ${i}`);
    }
}
console.log(`ВЫВОД: количество простых чисел строго меньше натурального ${n}: ${count}`);

// Вход: натуральное число n (n > 1).
// Выход: все простые числа от 2 до n.

// Пусть A — булевый массив, индексируемый числами от 2 до n, 
// изначально заполненный значениями true.

//  для i := 2, 3, 4, ..., пока i * i ≤ n:
//   если A[i] = true:
//     для j := i * i, i * i + i, i * i + 2i, ..., пока j ≤ n:
//       A[j] := false

//  возвращаем: все числа i, для которых A[i] = true.