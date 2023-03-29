function adjustTextareaHeight() {
  const headerHeight = document.querySelector('h1').offsetHeight;
  const textarea = document.getElementById('json-input');
  textarea.style.height = `calc(100vh - ${headerHeight + 60}px)`;
}

window.addEventListener('resize', adjustTextareaHeight);
window.addEventListener('DOMContentLoaded', adjustTextareaHeight);

document.getElementById('json-input').addEventListener('keyup', () => {
  formatJSON();
});

formatJSON();

function formatJSON() {
  const input = document.getElementById('json-input').value;
  const output = document.getElementById('json-output');

  try {
    const json = JSON.parse(input);
    const jsonString = JSON.stringify(json, null, 2);
    output.innerHTML = Prism.highlight(jsonString, Prism.languages.json, 'json');
  } catch (error) {
    output.textContent = 'JSON inválido';
    console.error(`Ocorreu um erro: ${error.message}`);
  }
}

document.getElementById('toggle-theme').addEventListener('click', () => {
  const body = document.body;
  const themeIcon = document.getElementById('toggle-theme-icon');

  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    themeIcon.className = 'icon-moon';
  } else {
    body.classList.add('dark-theme');
    themeIcon.className = 'icon-sun';
  }
  formatJSON();
});
