var langs = [
  ['English', ['en-GB']],
  ['Pусский', ['ru-RU']]
];
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

select_language.selectedIndex = 0;
select_dialect.selectedIndex = 0;

for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}

updateCountry();
showInfo('info_start');

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function () {
    recognizing = true;
    showInfo('info_speak_now');
    document.getElementById('btn_voice').getElementsByTagName('span')[0].innerHTML = 'SPEAKING... ';
  };
  recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };
  recognition.onend = function () {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      showInfo('info_start');
      document.getElementById('btn_voice').getElementsByTagName('span')[0].innerHTML = 'START VOICE ';
      return;
    }
  };
  recognition.onresult = function (event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    if (final_transcript || interim_transcript) {
      speechComand = interim_transcript;
      window.dispatchEvent(new Event('speeching'));
    }
  };
}

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
};
function upgrade() {
  showInfo('info_upgrade');
};
function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  if (!helperGame.start) return;
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;;
  start_timestamp = event.timeStamp;
};
function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
};
function speeching() {
  let originPoint = helperGame.activeBlock.THREE.position.clone();
  let sentence = speechComand.split(' ');
  command = sentence[sentence.length - 1].toLowerCase();
  if (~command.indexOf('l') || ~command.indexOf('л')) {
    helperGame.activeBlock.moveLeft();
  } else if (~command.indexOf('r') || ~command.indexOf('п')) {
    helperGame.activeBlock.moveRight();
  } else if (~command.indexOf('u') || ~command.indexOf('х')) {
    helperGame.activeBlock.moveTop();
  } else if (~command.indexOf('d') || ~command.indexOf('н')) {
    helperGame.activeBlock.moveBottom();
  }
  if (isIntersects(helperGame.activeBlock.THREE, blockMeshes)) {
    helperGame.activeBlock.THREE.position.set(originPoint.x, originPoint.y, originPoint.z);
  }
  if (isIntersects(helperGame.activeBlock.THREE, invisibleMeshes)) {
    helperGame.activeBlock.THREE.position.set(originPoint.x, originPoint.y, originPoint.z);
  }
};