var msgBtn = document.querySelector('.show-message-button');
var message = document.querySelector('.message-view');
var icon = document.querySelector('.icon-view');
var affirmation = document.getElementById('affirmation-radio');
var mantra = document.getElementById('mantra-radio');
var notificationBox = document.getElementById('notification-box');
var choiceBox = document.getElementById('choice-box');
var notification = document.querySelector('.notification');
var question = document.querySelector('.question');
var acknowledgeBtn = document.querySelector('.acknowledge-notification');

msgBtn.addEventListener('click', displayMsg);
acknowledgeBtn.addEventListener('click', changeView);

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getAllIndexs() {
  return {
    affirmations: getRandomIndex(affirmations),
    mantras: getRandomIndex(mantras)
  }
}

var displayedMsgs = {
  mantras: [],
  affirmations: []
}

function changeView() {
  question.classList.toggle('hidden');
  notificationBox.classList.toggle('hidden');
  choiceBox.classList.toggle('hidden');
}

function alertUser(msgType) {
  notification.innerText = `You have seen all the ${msgType} we currently have to offer. You will now begin seeing repeated ${msgType}.`;
  changeView();
}

function organizeMsgs(type, array, i) {
  if (typeof i === "number") {
    displayedMsgs[type].push(array[i]);
    array.splice(i, 1);
  } else {
    displayedMsgs[type].forEach((msg) => array.push(msg));
    displayedMsgs[type] = [];
  }
}

function displayMsg() {
  if (chooseMsg()) {
    message.classList.remove('hidden');
    icon.classList.add('hidden');
  } else {
    icon.classList.remove('hidden');
    message.classList.add('hidden');
  }
}

function chooseMsg() {
  var idx = getAllIndexs();
  if (affirmation.checked) {
    if (affirmations.length) {
      message.innerText = affirmations[idx.affirmations];
      organizeMsgs('affirmations', affirmations, idx.affirmations)
      return true;
    } else {
      alertUser('affirmations')
      organizeMsgs('affirmations', affirmations)
    }
  } else if (mantra.checked) {
    if (mantras.length) {
      message.innerText = mantras[idx.mantras];
      organizeMsgs('mantras', mantras, idx.mantras);
      return true;
    } else {
      alertUser('mantras')
      organizeMsgs('mantras', mantras);
    }
  }
}