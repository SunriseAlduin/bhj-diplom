/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
   
    Account.list({}, (err, response) => {
      if(response) {
        const expenseList = this.element.querySelector('#expense-accounts-list');
        expenseList.innerHTML = '';

        response.data.forEach((account) => {
          const optionExpence = document.createElement('option');
          optionExpence.value = account.id;
          optionExpence.textContent = account.name;

          expenseList.appendChild(optionExpence);
        });
      }
    });  

    Account.list({}, (err, response) => {
      if(response) {
        const incomeList = this.element.querySelector('#income-accounts-list');
        incomeList.innerHTML = '';

        response.data.forEach((account) => {
          const optionIncome = document.createElement('option');
            optionIncome.value = account.id;
            optionIncome.textContent = account.name;
  

            incomeList.appendChild(optionIncome);
        });
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(err) {
        console.log(err);
      };

      if(response) {
        this.element.reset();
        const modalIncome = App.getModal('newIncome');
        const modalExpence = App.getModal('newExpense');
        modalIncome.close();
        modalExpence.close();
        App.update();
      };
    });
  }
}