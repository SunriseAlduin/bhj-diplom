/*
Это базовый класс, от которого будут наследоваться классы Account и Transaction. 
Необходим для организации взаимодействия между интерфейсом программы и сервером через функцию createRequest. 
Если пользователю необходимо получить, изменить или добавить данные, то происходит обращение к методам данного класса, 
которые делают запрос к серверу через функцию createRequest.
*/

class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    const options = {
      url: this.URL,
      callback: callback,
      method: 'GET',
      data: {...data},
    };

    createRequest(options);
  };

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    const options = {
      url: this.URL,
      callback: callback,
      method: 'PUT',
      data: {...data},
    };

    createRequest(options);
  };

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    const options = {
      url: this.URL,
      callback: callback,
      method: 'DELETE',
      data: {...data},
    };

    createRequest(options);
  };

  static URL = '';
}
