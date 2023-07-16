const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const LoadingMethod = {
  GET: {
    route: '/data',
    method: 'GET',
    errorText: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  },
  POST: {
    route: '/',
    method: 'POST',
    errorText: 'Не удалось отправить форму. Попробуйте ещё раз',
  },
};


const load = async ({route, method, errorText}, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if(!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch {
    throw new Error(errorText);
  }
};


const getData = () => load(LoadingMethod.GET);

const sendData = (body) => load(LoadingMethod.POST, body);


export {getData, sendData};
