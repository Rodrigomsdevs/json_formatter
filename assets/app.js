document.getElementById('json-input').innerHTML = '{"ID":null,"nome":"Rodrigo","sobrenome":"Silva","idade":22,"hobbies":["Programar","Jogar",{"esportes":[]}],"endereco":{}}';
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


    if (localStorage.getItem('theme') == 'night') {
      const body = document.body;
      body.classList.add('dark-theme');
      this.themeIcon.className = 'icon-sun';
    }
  }

  adjustTextareaHeight = () => {
    const headerHeight = document.querySelector('h1').offsetHeight;
    this.input.style.height = `calc(100vh - ${headerHeight + 60}px)`;
  }

  keyUpFunction = () => {
    let self = this;
    this.input.addEventListener('keyup', () => {
      console.log('keyup');
      self.formatJSON();
    });

    this.input.addEventListener('keydown', () => {
      console.log('keyup');
      self.formatJSON();
    });
  }

  /*formatJSON = () => {
    try {
      const json = JSON.parse(document.getElementById('json-input').value);
      console.log(json);
      const jsonString = JSON.stringify(json, null, 2);
      this.output.innerHTML = Prism.highlight(jsonString, Prism.languages.json, 'json');
    } catch (error) {
      console.log(error);
      this.output.innerHTML =  Prism.highlight('{"invalid_json": true}', Prism.languages.json, 'json');

    }
  }*/

  formatJSON = () => {
    try {
      const json = JSON.parse(this.input.value);
      console.log(json);

      // Removendo o uso do Prism e usando o json-view para mostrar e permitir colapsar/expandir
      $(this.output).empty().jsonView(json);

    } catch (error) {
      console.log(error);
      // Mantendo o feedback de JSON inválido com o Prism
      this.output.innerHTML = Prism.highlight('{"invalid_json": true}', Prism.languages.json, 'json');
    }
  }


  alterThemeFunc = () => {
    this.toggleTheme.addEventListener('click', () => {

      const body = document.body;

      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        this.themeIcon.className = 'icon-moon';
        localStorage.setItem('theme', 'day');
      } else {
        body.classList.add('dark-theme');
        this.themeIcon.className = 'icon-sun';
        localStorage.setItem('theme', 'night');
      }

      this.formatJSON();

    });
  }


}
let app = new app_class();