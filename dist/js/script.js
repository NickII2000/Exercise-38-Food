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

    const deadLine = '2022-02-15';

    function endTimeRemaining(endTime) {
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
            const t = endTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', deadLine);

});