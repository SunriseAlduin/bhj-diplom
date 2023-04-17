/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    const options = {
      method: 'GET',
      callback: callback,
      url: `${this.URL}/${id}`,
      data: {},
    };

    createRequest(options);
  }

  static URL = '/account';
}
