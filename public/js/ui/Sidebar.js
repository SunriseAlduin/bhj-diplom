/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const bodyMini = document.querySelector('.sidebar-mini');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    sidebarToggle.addEventListener('click', (event) => {
      bodyMini.classList.toggle('sidebar-open');
      bodyMini.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerButton = document.querySelector('.menu-item_register');
    registerButton.addEventListener('click', (evt) => {
      const register = App.getModal('register');
      register.open();
    });
    

    const loginButton = document.querySelector('.menu-item_login');
    loginButton.addEventListener('click', (evt) => {
      const login = App.getModal('login');
      login.open();
    });


    const exitButton = document.querySelector('.menu-item_logout');
    exitButton.addEventListener('click', (evt) => {
      User.logout((err, response) => {
        if(response && response.success) {
          App.setState('init');
        };
      });
    });
  }
}