const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

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

const fetchData = () => load(ApiOptions.FETCH);

const sendData = (body) => load(ApiOptions.SEND, body);


export {fetchData, sendData};
