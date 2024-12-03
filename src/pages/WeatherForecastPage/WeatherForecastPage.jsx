import { useEffect, useState } from "react";
import { getForecasts, getWeatherData, groupForecasts } from "../../utils/fetchData";


const WeatherForecastPage = () => {

    const [data, setData] = useState({
        fullData: undefined,
        forecasts: undefined
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        const getData = async () => {
            const data = await getWeatherData();
            const forecasts = await groupForecasts(data.list)
            setData({fullData: data, forecasts: forecasts});
        };
        
        getData();
    }, [])

    console.log(data)
    return (
        <>
            <div></div>
        </>
    )
}

export default WeatherForecastPage;