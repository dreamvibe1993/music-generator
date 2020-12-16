let scales = {
  cmajor: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'E'],
  aminor: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'E'],
  styles: {
    pop: ['7', '', '', ''],
    jazz: ['7', '9', '11', '']
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
  if (style) {
    res = res.map(i => i + '' + style[functions.generateRandomNumber(style.length)])
  }
  return res;
}

function makeAMelody(scale, chordsNum) {
  let res = [];
    for (let i=0; i<chordsNum; i++) {
      res.push(scale[functions.generateRandomNumber(scale.length)].slice(0,1));
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
  let progression = makeProgression(scales[currentScaleValue], chordsNumber, scales.styles[currentGenreValue])
  let tempo = pushTheTempo(maximumTempo, minimumTempo);
  let melody = [];
  if (generateMelody.checked) {
    let melodyNumber = Number(melodyNotesQuantity.value);
    melody = makeAMelody(scales[currentScaleValue], melodyNumber)
  } else {
    melody = ['опция не выбрана']
  }
  if (chordsNumber == '') {
    resultChords.innerText = 'количество аккордов не указано';
  } else {
    resultChords.innerText = progression.join(', ');
  }
  if (tempo == 0) {
    resultTempo.innerText = 'темп не указан';
  } else {
  resultTempo.innerText = tempo;
  }
  resultMelody.innerText = melody.join(', ');
  toggleHandler()
console.log(progression)
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
