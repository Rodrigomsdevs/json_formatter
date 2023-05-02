class app_class {

  constructor() {
    this.input = document.getElementById('json-input');
    this.output = document.getElementById('json-output');
    this.themeIcon = document.getElementById('toggle-theme-icon');
    this.toggleTheme = document.getElementById('toggle-theme');
    this.init();
    this.keyUpFunction();
    this.alterThemeFunc();
  }

  init = () => {
    window.addEventListener('resize', this.adjustTextareaHeight);
    window.addEventListener('DOMContentLoaded', this.adjustTextareaHeight);
    this.formatJSON();
  }

  adjustTextareaHeight = () => {
    const headerHeight = document.querySelector('h1').offsetHeight;
    this.input.style.height = `calc(100vh - ${headerHeight + 60}px)`;
  }

  keyUpFunction = () => {
    let self = this;
    this.input.addEventListener('keyup', () => {
      self.formatJSON();
    });
  }

  formatJSON = () => {
    try {
      const json = JSON.parse(this.input.innerHTML);
      const jsonString = JSON.stringify(json, null, 2);
      this.output.innerHTML = Prism.highlight(jsonString, Prism.languages.json, 'json');
    } catch (error) {
      this.output.textContent = 'JSON inválido';
    }
  }

  alterThemeFunc = () => {
    this.toggleTheme.addEventListener('click', () => {
      const body = document.body;
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        this.themeIcon.className = 'icon-moon';
      } else {
        body.classList.add('dark-theme');
        this.themeIcon.className = 'icon-sun';
      }
      this.formatJSON();
    });
  }


}
let app = new app_class();