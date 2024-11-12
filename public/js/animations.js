// anime({
//     targets: '.header',
//     translateX: 250,
//     rotate: '1turn',
//     backgroundColor: '#FFF',
//     duration: 800
// });

// var textWrapper = document.getElementById('mainHeader');
// // textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letters'>$&</span>");
// var letterArray = textWrapper.innerHTML.split("");
// var letterStr = "";

// for (let i = 0; i < letterArray.length; i++) {
//     letterStr += "<span class='letters'>" + letterArray[i] + "</span>"
// }
// textWrapper.innerHTML = letterStr;


// anime.timeline({loop: true})
//   .add({
//     targets: '.header .letters',
//     translateY: [".5em", 0],
//     // translateZ: 0,
//     duration: 750,
//     delay: (el, i) => 50 * i
//   }).add({
//     targets: '.header',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });

  function playAnswerAnimation() {
    anime({
        targets: '.answer-option',
        translateY: [-1250, 0],
        loop: false,
    //    direction: 'alternate',
        // delay: anime.stagger(100, {start: 600})
        delay: anime.stagger(50, {start: 100})
      });
  }

  function playEndingAnimation() {
    anime({
        targets: '.answer-option',
        translateY: 2250,
        loop: false,
        easing: 'easeOutExpo',
    //    direction: 'alternate',
        // delay: anime.stagger(100, {start: 600})
        delay: anime.stagger(150)
      });
  }

  function playFallAnimation() {
    anime({
        targets: '.answer-option',
        translateY: 1250,
        opacity: [1, 0],
        loop: false,
        easing: 'easeOutExpo',
    //    direction: 'alternate',
        // delay: anime.stagger(100, {start: 600})
        delay: anime.stagger(150)
      });
  }