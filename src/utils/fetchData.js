import { instance } from "./instanceOptions";

export const getWeatherData = async () => {
    const response = await instance.get("forecast?q=Kyrgyzstan&units=metric&lang=en")

    return response.data;
}

export const getForecasts = async () => {
    try {
        const response = await instance.get("forecast?q=Kyrgyzstan&units=metric&lang=en")
        const forecasts = await groupForecasts(response.data.list);
        return forecasts
    } catch(error) {
        console.error(error)
    }
}

export const groupForecasts = ({forecasts}) => {
    const daysofWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const groupedForecasts = {};
    forecasts.map((forecast, index) => {
        const date = forecast.dt_txt.split(" ")[0];
        const dayOfWeek = daysofWeek[new Date(date).getDay()] 

        if(!groupedForecasts[date])
            groupedForecasts[date] = {
                dayOfWeek: dayOfWeek,
                page: index + 1,
                forecasts: []
            };

        groupedForecasts[date].forecasts.push(forecast);
    });

    return groupedForecasts;
}