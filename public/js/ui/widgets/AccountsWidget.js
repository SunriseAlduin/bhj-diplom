/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Передан пустой элемент');
    };

    this.element = element;

    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const button = document.querySelector('.create-account');

    button.addEventListener('click', () => {
      const modal = App.getModal('createAccount');
      modal.open();
    });

    const menu = document.querySelector('.accounts-panel');
    const accounts = menu.querySelectorAll('.account');

    accounts.forEach((account) => {
      account.addEventListener('click', () => {
        this.onSelectAccount(account);
      });
    });

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()) {
      Account.list({}, (err, response) => {
        if(response.success) {
          this.clear();
          response.data.forEach((item) => {
            this.renderItem(item);
          })
        };
      })
    };
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const menu = document.querySelector('.accounts-panel');
    const accounts = menu.querySelectorAll('.account');
    
    accounts.forEach((element) => {
      element.remove();
    });
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const previousActive = document.querySelector('li.account.active');
    previousActive.classList.remove('active');

    element.classList.add('active');

    const accId = element.getAttribute('data-id');
    const id = {};
    id[User.current().id] = accId;

    App.showPage('transactions', id);
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="active account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
    </a>
  </li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    const accountList = this.element.querySelector('.accounts-list');
    const accountHTML = this.getAccountHTML(data);
    accountList.innerHTML += accountHTML;
  }
}
