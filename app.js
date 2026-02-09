function openFandom(name) {
  localStorage.setItem('currentFandom', name);
  window.location.href = 'fandom.html';
}

function goToNote() {
  let hero = document.getElementById('heroName').value;
  localStorage.setItem('currentHero', hero);
  window.location.href = 'note.html';
}

function saveNote() {
  let text = document.getElementById('noteText').value;
  let fandom = localStorage.getItem('currentFandom');
  let hero = localStorage.getItem('currentHero');

  let data = JSON.parse(localStorage.getItem('notes')) || {};

  if (!data[fandom]) data[fandom] = {};
  if (!data[fandom][hero]) data[fandom][hero] = [];

  data[fandom][hero].push(text);

  localStorage.setItem('notes', JSON.stringify(data));
  localStorage.setItem('lastHero_' + fandom, hero);

  alert("Сохранено!");
}

window.onload = function () {
  let fandom = localStorage.getItem('currentFandom');
  let lastHero = localStorage.getItem('lastHero_' + fandom);

  if (lastHero) {
    let el = document.getElementById('lastHero');
    if (el) el.innerText = "Последняя заметка была про: " + lastHero;
  }
};

function search(word) {
  let data = JSON.parse(localStorage.getItem('notes')) || {};
  console.log(data);
}