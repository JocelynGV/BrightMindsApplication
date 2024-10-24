anime({
    targets: '.header',
    translateX: 250,
    rotate: '1turn',
    backgroundColor: '#FFF',
    duration: 800
});

// pretty nifty im ngl
anime({
    targets: '.box',
    translateX: 250,
    delay: anime.stagger(100, {start: 600})
  });