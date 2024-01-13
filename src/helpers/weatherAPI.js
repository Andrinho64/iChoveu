const TOKEN = import.meta.env.VITE_TOKEN;

const MSG_NOT_FOUND = 'Nenhuma cidade encontrada';

export const searchCities = (searchValue = '') => {
  const searchURL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${searchValue}`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        window.alert(MSG_NOT_FOUND);
      }
      return data;
    })
    .catch(console.error('Erro! Lendo a API:'));
  return [];
};

export const getWeatherByCity = (cityURL) => {
  const currentURL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`;
  fetch(currentURL)
    .then((response) => response.json())
    .then((data) => {
      return {
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        country: data.location.country,
        name: data.location.name,
        url: cityURL,
      };
    })
    .catch(console.error('Erro! Lendo a API:', error.message));
  return null;
};
