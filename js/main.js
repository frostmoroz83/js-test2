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
  },
  form = document.querySelector('.main-form'),
  formEmail = document.getElementById('form'),
  statusMessage = document.createElement('div');
  statusMessage.classList.add('status');


  function sendForm(elem) {
    elem.addEventListener('submit', function (event) {
      event.preventDefault();
      elem.appendChild(statusMessage);
      let formData = new FormData(elem);
      let obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });
      let json = JSON.stringify(obj),
      input = elem.getElementsByTagName('input');
  
      function postData(data) {
        return new Promise(function(resolve,reject) {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          // request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded'); php формат данных
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = function() {
            
              if (request.readyState < 4) {
                resolve();
              } else if (request.readyState === 4){
                if (request.status === 300 && request.status == 200) {
                  resolve();
              }
                else {
                reject();
              }
            }
          };
          // request.send(formData); php формат данных
          request.send(data);
        });
      }//end post data

      function clearInput () {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }
  
      postData(formData)
        .then(()=> statusMessage.innerHTML = message.loading)
        .then(()=> statusMessage.innerHTML = message.success)
        .catch(()=> statusMessage.innerHTML = message.failure)
        .then(clearInput);

    });
  }
  sendForm(form);
  sendForm(formEmail);
  //end form

  //slider

  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(n) {
      if (n > slides.length) {
        slideIndex  =1;
      }
      if (n<1) {
        slideIndex = slides.length;
      }

      slides.forEach((item) => item.style.display = 'none');
      // for (let i = 0; i < slides.length; i++) {
      //   slides[i].style.display = 'none';
      // }
      dots.forEach((item) => item.classList.remove('dot-active'));
      slides[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function(){
      plusSlides(-1);
    });

    next.addEventListener('click', function(){
      plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(e){
      for (let i = 0; i < dots.length + 1; i++) {
        if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
          currentSlide(i);
        }
      }
    });
    //end slide

    //calculate
    let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personSum = 0,
    daySum = 0,
    total = 0;

    totalValue.innerHTML = 0;
    persons.addEventListener('change', function() {
      personSum = +this.value;
      total = (daySum + personSum) * 4000;

      if(restDays.value == '') {
        totalValue.innerHTML = 0;
      } else {
        totalValue.innerHTML = total;
      }
    });

    restDays.addEventListener('change', function() {
      daySum = +this.value;
      total = (daySum + personSum) * 4000;

      if(persons.value == '') {
        totalValue.innerHTML = 0;
      } else {
        totalValue.innerHTML = total;
      }
    });

    place.addEventListener('change', function() {
      if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
      } else {
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
      }
    });


});