import {BASE_URL} from './constants.js';

const ApiOptions = {
  FETCH: {
    route: '/data',
    method: 'GET',
    errorText: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  },
  SEND: {
    route: '/',
    method: 'POST',
    errorText: 'Не удалось отправить форму. Попробуйте ещё раз',
  },
};


const load = async ({route, method, errorText}, body) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, ...(body ? {body: body} : {})});
    if(!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch {
    throw new Error(errorText);
  }
};

// TODO here we can use classes to group those simillar functions:
// class API {
//   static fetch() {
//     return fn(2);
//   }

//   static send(body) {
//     return fn(1, body)
//   }
// }
// API.fetch()

const getData = () => load(ApiOptions.FETCH);

const sendData = (body) => load(ApiOptions.SEND, body);


export {getData, sendData};
