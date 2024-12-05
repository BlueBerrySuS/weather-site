import { useEffect, useState } from "react";
import { getWeatherData } from "../../utils/fetchData";
import s from "./WeatherForecastPage.module.css"
import citys_icon from "../../assets/img/citys-icon.svg"
import explore_icon from "../../assets/img/explore-icon.svg"
import settings_icon from "../../assets/img/settings-icon.svg"
import weather_icon from "../../assets/img/weather-icon.svg"
import avatar_icon from "../../assets/img/avatar.png"


const WeatherForecastPage = () => {

    const [data, setData] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        const getData = async () => {
            const res = await getWeatherData();
            setData(res);
        };
        
        getData();
    }, [])

    if(!data) return
    if(data) console.log(data)

    return (
        <>
            <div className={s.weather_page__wrapper}>
                <div className={s.weather_report__wrapper}>
                    <div className={s.weather_report}>
                        <div className={`${s.weather_report__data} ${s.weather_report__block}`}>
                            <div className={s.data__city_name}>{data.cityData.name}</div>
                            <div className={s.data__weather}>{data.currentForecast.weather[0].main}</div>
                            <div className={s.data__temp_date__wrapper}>
                                <div className={s.data__temp}>{data.currentForecast.main.temp}C</div>
                                <div className={s.date__date}>{`${data.currentForecast.dayOfWeek} | ${data.currentForecast.date}`}</div>
                            </div>
                        </div>
                        <div className={`${s.weather__image} ${s.weather_report__block}`}>
                            <img src={data.currentForecast.sizedIconURL("4x")} alt="" />
                        </div>
                    </div>
                </div>

                <div className={s.content__wrapper}>
                    <div className={`${s.nav} ${s.content__block}`}>
                        <div className={s.nav__account}>
                            <img src={avatar_icon} alt="" />
                        </div>
                        <nav className={s.nav__buttons}>
                            <div className={s.nav__buton}>
                                <img src={weather_icon} alt="img" />
                            </div>
                            <div className={s.nav__buton}>
                                <img src={explore_icon} alt="img" />
                            </div>
                            <div className={s.nav__buton}>
                                <img src={citys_icon} alt="img" />
                            </div>
                            <div className={s.nav__buton}>
                                <img src={settings_icon} alt="img" />
                            </div>
                        </nav>
                    </div>
                    <div className={`${s.activites_list__wrapper} ${s.content__block}`}>
                        <p className={s.activites_title}></p>
                        <div className={s.activites_list}>

                        </div>
                    </div>
                    <div className={`${s.search_and_conditions} ${s.content__block}`}>
                        <div className={s.search}>
                            <div></div>
                            <div><input type="text" /></div>
                        </div>
                        <div className={s.air_conditions__wrapper}>
                            <div className={s.air_condition__title}>Air conditions</div>
                            <div className={s.air_conditions}>
                                <div className={s.air_conditions__container}>
                                    <div className={s.air_condition__name}>Real feel</div>
                                    <div className={s.air_condition__value}>{data.currentForecast.main.feels_like}</div>
                                </div>
                                <div className={s.air_conditions__container}>
                                    <div className={s.air_condition__name}>Wind</div>
                                    <div className={s.air_condition__value}>{(data.currentForecast.wind.speed * 3.6).toFixed(1)}km/hr</div>
                                </div>
                                <div className={s.air_conditions__container}>
                                    <div className={s.air_condition__name}>Chance of rain</div>
                                    <div className={s.air_condition__value}>{data.currentForecast.pop}%</div>
                                </div>
                                <div className={s.air_conditions__container}>
                                    <div className={s.air_condition__name}>UV Index</div>
                                    <div className={s.air_condition__value}>Undefined</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherForecastPage;