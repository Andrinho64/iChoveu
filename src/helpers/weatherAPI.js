const TOKEN = import.meta.env.VITE_TOKEN;

const MSG_NOT_FOUND = 'Nenhuma cidade encontrada';
const MSG_API_ERROR = 'Erro! Lendo a API:';

export const searchCities = (searchValue) => {
  const searchURL = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${searchValue}`;
  return fetch(searchURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        window.alert(MSG_NOT_FOUND);
        return [];
      }
      return data;
    })
    .catch((error) => {
      console.error(MSG_API_ERROR, error.message);
      return [];
    });
};

export const getWeatherByCity = (cityURL) => {
  const currentURL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`;
  return fetch(currentURL)
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
    .catch((error) => {
      console.error(MSG_API_ERROR, error.message);
      return null;
    });
};

export const getForecast = (cityURL) => {
  const forecastURL = `http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${cityURL}&days=7`;
  return fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
      const days = data.forecast.forecastday;
      return days.map((element) => ({
        date: element.date,
        maxTemp: element.day.maxtemp_c,
        minTemp: element.day.mintemp_c,
        condition: element.day.condition.text,
        icon: element.day.condition.icon,
      }));
    })
    .catch((error) => {
      console.error(MSG_API_ERROR, error.message);
      return null;
    });
};
