/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  
  const { url, data, method } = options;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      try {
        if(xhr.status >= 200 && xhr.status < 300) {
          options.callback(null, xhr.response);
        } else {
          throw new Error(`Request failed with status ${xhr.status}`);
        };
      } catch(error) {
        options.callback(error, null);
      };
    };
  };


  if(method === 'GET') {
    const params = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

    const fullUrl = url + '?' + params;

    xhr.open(method, fullUrl);
    xhr.send();

  } else {
    const formData = new FormData();

    const params = Object.entries(data)
    .map(([key, value]) => formData.append(key, value));

    xhr.open(method, url);
    xhr.send(formData);
  };

  
};
