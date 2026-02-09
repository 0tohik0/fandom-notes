function openFandom(name) {
  localStorage.setItem('currentFandom', name);
  window.location.href = 'note.html';   // сразу к заметке
}

function loadHeroes() {
  let fandom = localStorage.getItem('currentFandom');
  let data = JSON.parse(localStorage.getItem('notes')) || {};
  let select = document.getElementById('existingHeroes');
  if (!select) return;

  select.innerHTML = '<option value="">— выбрать из базы —</option>';

  if (data[fandom]) {
    Object.keys(data[fandom]).forEach(h => {
      let o = document.createElement('option');
      o.value = h;
      o.textContent = h;
      select.appendChild(o);
    });
  }

  // если выбрали из списка — подставить в поле имени
  select.onchange = () => {
    document.getElementById('heroName').value = select.value;
  };
}

function saveNote() {
  let hero = document.getElementById('heroName').value.trim();
  let text = document.getElementById('noteText').value;
  let theme = document.getElementById('noteTheme').value;

  if (!hero) {
    alert('Укажи имя персонажа');
    return;
  }

  let fandom = localStorage.getItem('currentFandom');
  let data = JSON.parse(localStorage.getItem('notes')) || {};

  if (!data[fandom]) data[fandom] = {};
  if (!data[fandom][hero]) data[fandom][hero] = [];

  data[fandom][hero].push({
    theme: theme,
    text: text,
    date: new Date().toLocaleString()
  });

  localStorage.setItem('notes', JSON.stringify(data));
  localStorage.setItem('lastHero_' + fandom, hero);

  alert("Сохранено!");
}

window.onload = function () {
  loadHeroes();
};