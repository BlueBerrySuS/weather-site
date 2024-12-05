import { instance } from "./instanceOptions";

export const getWeatherData = async () => {
    try {
        const response = await instance.get("forecast?q=Kyrgyzstan&units=metric&lang=en");
        const groupedForecasts = groupForecasts(response.data.list);

        const data = {
            cityData: response.data.city,
            forecasts: groupedForecasts,
            currentForecast: {
                date: new Date(groupedForecasts[0].date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }),
                dayOfWeek: groupedForecasts[0].dayOfWeek,
                iconURL: groupedForecasts[0].iconURL,
                sizedIconURL: groupedForecasts[0].sizedIconURL,
                ...groupedForecasts[0].forecasts[0]
            }
        }

        return data;
    } catch(error) {
        console.error(error)
    }
}


const groupForecasts = (forecasts) => {
    const daysofWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let groupedForecasts = {};
    forecasts.map((forecast, index) => {
        const date = forecast.dt_txt.split(" ")[0];
        const iconURL = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
        const sizedIconURL = (multiplier) => {
            return `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@${multiplier}.png`;
        }
        const dayOfWeek = daysofWeek[new Date(date).getDay()] 

        if(!groupedForecasts[date])
            groupedForecasts[date] = {
                date: date,
                dayOfWeek: dayOfWeek,
                iconURL: iconURL,
                sizedIconURL: sizedIconURL,
                page: index + 1,
                forecasts: []
            };

        groupedForecasts[date].forecasts.push(forecast);
    });

    return Object.values(groupedForecasts);
}