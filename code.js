let scales = {
  cmajor: ['C', 'Dm', 'Em', 'F', 'G', 'Am'],
  csharpmajor: ['C#', 'D#m', 'E#m', 'F#', 'G#', 'A#m'],
  dbmajor: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm'],
  dmajor: ['D', 'Em', 'F#m', 'G', 'A', 'Bm'],
  ebmajor: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm'],
  emajor: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
  fmajor: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm'],
  fsharpmajor: ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m'],
  gbmajor: ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm'],
  gmajor: ['G', 'Am', 'Bm', 'C', 'D', 'Em'],
  abmajor: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm'],
  amajor: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
  bbmajor: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm'],
  bmajor: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m'],

  cminor: ['Cm', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
  csharpminor: ['C#m', 'E', 'F#m', 'G#m', 'A', 'B'],
  dminor: ['Dm', 'F', 'Gm', 'Am', 'Bb', 'C'],
  dsharpminor: ['D#m', 'F#', 'G#m', 'A#m', 'B', 'C#'],
  ebminor: ['Ebm', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'],
  eminor: ['Em', 'G', 'Am', 'Bm', 'C', 'D'],
  fminor: ['Fm', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
  fsharpminor: ['F#m', 'A', 'Bm', 'C#m', 'D', 'E'],
  gminor: ['Gm', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
  gsharpminor: ['G#m', 'B', 'C#m', 'D#m', 'E', 'F#'],
  abminor: ['Abm', 'Cb', 'Dbm', 'Ebm', 'Fb', 'Gb'],
  aminor: ['Am', 'C', 'Dm', 'Em', 'F', 'G'],
  asharpminor: ['A#m', 'C#', 'D#m', 'E#m', 'F#', 'G#'],
  bbminor: ['Bbm', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
  bminor: ['Bm', 'D', 'Em', 'F#m', 'G', 'A'],

  styles: {
    pop: ['7', '', '', ''],
    jazz: ['7', '9', '11', '', 'maj7', '', 'min7']
    },
}
let functions = {
  generateRandomNumber(...args) {
    if (args.length == 2) {
      return Math.floor(Math.random() * (args[0] - args[1]) + args[1])
    }
    return Math.floor(Math.random() * args);
  }
}
function makeProgression(scale, chordsNum, style) {
  let res = [];
  for (let i=0; i<chordsNum; i++) {
    res.push(scale[functions.generateRandomNumber(scale.length)]);
  }
  res = res.map(i => i + '' + style[functions.generateRandomNumber(style.length)])
  for (let i in res) {
    res[i].includes('mm') ? res[i] = res[i].slice(0, 2) : null;
  }
  return res;
}
function makeAMelody(scale, chordsNum) {
  let res = [];
    for (let i=0; i<chordsNum; i++) {
      res.push(scale[functions.generateRandomNumber(scale.length)]);
  }
  for (let i in res) {
    res[i].includes('#' || 'b') ? res[i] = res[i].slice(0, 2) : null;
    res[i].includes('m') ? res[i] = res[i].slice(0, 1) : null;
  }
  return res;
}
function pushTheTempo(max, min) {
  return functions.generateRandomNumber(max, min);
}

function toggleHandler() {
  let modal = document.querySelector('.result');
  modal.classList.toggle('none');
  veil.classList.toggle('none');
}

makeThisHappen.onclick = () => {
  let chordsNumber = chordsQuantity.value,
  minimumTempo = Number(tempoMin.value),
  maximumTempo = Number(tempoMax.value),
  currentScaleIndex = scaleSelect.options.selectedIndex,
  currentGenreIndex = genreSelect.options.selectedIndex,
  currentScaleValue = scaleSelect.options[currentScaleIndex].text,
  currentGenreValue = genreSelect.options[currentGenreIndex].text;

  currentScaleValue = currentScaleValue.replace(/\s/g, '').toLowerCase();
  currentGenreValue = currentGenreValue.replace(/\s/g, '').toLowerCase();

  if (tempoMin.value == '') {
    minimumTempo = 0;
  }
  if (tempoMax.value == '') {
    maximumTempo = 400;
  }
  if (tempoMin.value == '' && tempoMax.value == '') {
    resultTempo.innerText = 'темп не указан';
  } else {
    let tempo = pushTheTempo(maximumTempo, minimumTempo);
    resultTempo.innerText = tempo + ' ' + 'ударов в минуту';
  }

  if (currentScaleValue.includes('#')) {
    currentScaleValue = currentScaleValue.split('#').reduce((prev, next) => prev + 'sharp' + next);
  }
  let progression = makeProgression(scales[currentScaleValue], chordsNumber, scales.styles[currentGenreValue]),
  melody = [];
  if (generateMelody.checked) {
    let melodyNumber = Number(melodyNotesQuantity.value);
    melody = makeAMelody(scales[currentScaleValue], melodyNumber)
  } else {
    melody = ['опция не выбрана']
  }

  if (melodyNotesQuantity.value == '') {
    melody = ['не указано кол-во нот в такте']
  }

  if (chordsNumber == '') {
    resultChords.innerText = 'количество аккордов не указано';
  } else {
    resultChords.innerText = progression.join(', ');
  }

  resultMelody.innerText = melody.join(', ');
  toggleHandler()
}

veil.onclick = () => {
  toggleHandler()
}
resultClose.onclick = () => {
  toggleHandler()
}
generateMelody.onchange = () => {
  melodyNotesQuantity.classList.toggle('none');
}
