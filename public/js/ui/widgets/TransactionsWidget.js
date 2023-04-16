/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error('Элемент не передан в конструктор');
    };
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', (evt) => {
      if(evt.target.closest('.btn-success')) {
        const modal = App.getModal('newIncome');
        modal.open();
      };

      if(evt.target.closest('.btn-danger')) {
        const modal = App.getModal('newExpense');
        modal.open();
      };
    })
  }
}
