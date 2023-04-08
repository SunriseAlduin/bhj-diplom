/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * */
class User {
  static URL = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if(localStorage.user) {
      const user = JSON.parse(localStorage.user);
      return user;
    } else {
      return undefined;
    };
    
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    const options = {
      url: this.URL + '/current',
      callback: (error, response) => {
        if(response && response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        };

        callback(error, response);
      },
      method: 'GET',
    };

    createRequest(options);
  }
  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data: data,
      callback: (err, response) => {
        if(response && response.user) {
          this.setCurrent(response.user);
        };
        callback(err, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if(response && response.success) {
          this.unsetCurrent();
        };
        callback(err, response);
      },
    });
  };
};
