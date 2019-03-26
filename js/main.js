window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  let hidetabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };

  hidetabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (e) {
    let target = e.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hidetabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  //timer
  let deadline = '2019-03-25';

  function gettimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      // seconds = Math.floor((t/1000) % 60),
      seconds = ("0" + -~(Math.floor((t / 1000) % 60))).substr(-2, 2),
      // minutes = Math.floor((t/1000/60) % 60),
      minutes = ("0" + -~(Math.floor((t / 1000 / 60) % 60))).substr(-2, 2),
      // hours = Math.floor((t/(1000*60*60)));
      hours = ("0" + -~(Math.floor((t / (1000 * 60 * 60))))).substr(-2, 2);

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);


    function updateClock() {
      let t = gettimeRemaining(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
      }
    }
  }
  setClock('timer', deadline);


  //modal

  let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    description = document.querySelector('.description-btn'),
    close = document.querySelector('.popup-close');

  function foo(item) {
    item.addEventListener('click', function () {
      overlay.style.display = 'block';
      console.log(this);
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';

    });
  }
  foo(more);
  foo(description);


  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    console.log(this);
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  //form


  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    // request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded'); php формат данных
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let formData = new FormData(form);
    let obj = {};
    formData.forEach(function (value, key) {
      obj[key] = value;
    });
    let json = JSON.stringify(obj);

    // request.send(formData); php формат данных
    request.send(json);

    request.addEventListener('readystatechange', function () {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }

  });

  //contact form
  let formEmail = document.getElementById('form'),
  inputEmail = formEmail.getElementsByTagName('input');

  formEmail.addEventListener('submit', function (event) {
    event.preventDefault();
    formEmail.appendChild(statusMessage);
    console.log(formEmail);
    console.log(inputEmail);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    // request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded'); php формат данных
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let formDataE = new FormData(formEmail);
    let obj = {};
    formDataE.forEach(function (value, key) {
      obj[key] = value;
    });
    let jsonE = JSON.stringify(obj);

    // request.send(formData); php формат данных
    request.send(jsonE);

    request.addEventListener('readystatechange', function () {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < inputEmail.length; i++) {
      inputEmail[i].value = '';
    }

  });


  

  //end form










});