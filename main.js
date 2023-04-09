var homeView = document.querySelector('.home-view');
var loginView = document.querySelector('.login-view');
var userName = document.getElementById('user');
var welcomeName = document.querySelector('.user-name');
var promptUser = document.querySelector('.prompt');
var message = document.querySelector('.message-view');
var icon = document.querySelector('.icon-view');
var notificationBox = document.getElementById('notification-box');
var choiceBox = document.getElementById('choice-box');
var notification = document.querySelector('.notification');
var question = document.querySelector('.question');
var affirmationBtn = document.getElementById('affirmation-radio');
var mantraBtn = document.getElementById('mantra-radio');
var msgBtn = document.querySelector('.show-message-button');
var acknowledgeBtn = document.querySelector('.acknowledge-notification');
var loginBtn = document.querySelector('.login-button');
var fullPage = document.querySelector('main');
var allBtns = [msgBtn, acknowledgeBtn, loginBtn];


msgBtn.addEventListener('click', displayMsg);
acknowledgeBtn.addEventListener('click', changeView);
loginBtn.addEventListener('click', switchToHome);
fullPage.addEventListener('mouseover', switchBtnColor)

var user;
var displayedMsgs = {
  mantras: [],
  affirmations: []
}

function createUser() {
  user = {
    name: userName.value
  }
  return user;
}

function updateWelcomeMsg() {
 var user = createUser();
 welcomeName.innerText = user.name;
}

function switchBtnColor(event) {
  var selectedBtn = event.target;
  if (selectedBtn.classList.contains('button')) {
    selectedBtn.classList.add('colored-button');
  } else {
    allBtns.forEach((btn) => btn.classList.remove('colored-button'));
  }
}

function switchToHome(event) {
  event.preventDefault();
  if (!userName.value) {
    promptUser.classList.remove('hidden');
  } else{
    updateWelcomeMsg();
    homeView.classList.remove('hidden');
    loginView.classList.add('hidden');
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getAllIndexs() {
  return {
    affirmations: getRandomIndex(affirmations),
    mantras: getRandomIndex(mantras)
  }
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
  if (affirmationBtn.checked) {
    if (affirmations.length) {
      message.innerText = affirmations[idx.affirmations];
      organizeMsgs('affirmations', affirmations, idx.affirmations)
      return true;
    } else {
      alertUser('affirmations')
      organizeMsgs('affirmations', affirmations)
    }
  } else if (mantraBtn.checked) {
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