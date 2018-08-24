import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import DailyWeather from './components/DailyWeather';
import HourlyWeather from './components/HourlyWeather';

const apiKey = 'bd6815fd6114722bebc4d8d737075b7f';
const months = ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'];
const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: `https://api.openweathermap.org/data/2.5/forecast?q=Warszawa,pl&mode=json&lang=pl&units=metric&appid=${apiKey}`,
            inputValue: '',
            hourWeatherList:[],
            dayWeatherList:[],
            cityName:"Warszawa",
            errorMsg:''
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getData() {
        let url = this.state.url;
        fetch(url)
            .then(function(resp) {
                if (resp.ok)
                    return resp.json();
                else
                    throw new Error('Błąd sieci!');
            })
            .then((data) => {
                this.setState({
                    hourWeatherList: data.list.slice(0,8),
                    dayWeatherList: data.list.filter((item, index) => index % 8 === 0),
                    errorMsg:''
                });
            })
            .catch((error)=> {
                console.log('error' + error);
                this.setState({
                    errorMsg:'Wpisz poprawne miasto',
                    cityName:'',
                    hourWeatherList:[],
                    dayWeatherList:[]
                });
            });
    }

    componentDidMount() {
        this.getData();
    }

    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.inputValue}&mode=json&lang=pl&units=metric&appid=${apiKey}`,
            cityName: this.state.inputValue,
            inputValue:''
        }, () => {
            this.getData();
        })
    };

    hourConverter = UNIX_timestamp => {
        let a = new Date(UNIX_timestamp * 1000);
        let hour = a.getHours();
        let min = a.getMinutes();
        return hour + ':' + min + min ;
    };

    dateConverter = UNIX_timestamp => {
        let a = new Date(UNIX_timestamp * 1000);
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        return date + ' ' + month + ' ' + year;
    };

    dayNameConverter = UNIX_timestamp => {
        let a = new Date(UNIX_timestamp * 1000);
        return days[a.getDay()];
    };

    render(){
        let cityName = this.state.cityName.charAt(0).toUpperCase() + this.state.cityName.slice(1);
        let daysWeather = this.state.dayWeatherList.map((item, index) => {
            return (
                <div key={index}>
                <div className='day-by-day-weather d-inline-block'>
                    <div className="day-weather text-center">
                        {this.dayNameConverter(item.dt)}<br/>
                        {this.dateConverter(item.dt)}
                    </div>
                    <DailyWeather
                        temperature={item.main.temp}
                        pressure={item.main.pressure}
                        description={item.weather[0].description}
                        humidity={item.main.humidity}
                        icon={item.weather[0].icon}
                    />
                </div>
                </div>
            )
        });

        let hourlyWeather = this.state.hourWeatherList.map((item, index) => {
            return (
                <div key={index} className='hourly-weather d-inline-block'>
                    <div className="hour-weather text-center">{this.hourConverter(item.dt)}</div>
                    <HourlyWeather
                        temperature={item.main.temp}
                        pressure={item.main.pressure}
                        description={item.weather[0].description}
                        humidity={item.main.humidity}
                        icon={item.weather[0].icon}
                    />
                </div>
            )
        });

        return (
                <div className="container align-items-center">
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <form onSubmit={this.handleSubmit} className="form-inline mt-4 justify-content-around">
                                <input value={this.state.inputValue} onChange={this.handleChange} className="form-control mb-4 mb-sm-0" type="text" placeholder="wpisz miasto" required/>
                                <button type="submit" className="btn btn-light">Szukaj</button>
                            </form>
                            <div className='error-msg'>
                                <p className="alert-msg alert-warning text-center">{this.state.errorMsg}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='city-name d-inline-block'>{cityName}</h1>
                    </div>
                    <div className="row justify-content-md-center">
                        {daysWeather}
                    </div>
                    <div className="row">
                        <div className='col-sm-2'/>
                        <div className="col-sm-8">
                            {hourlyWeather}
                        </div>
                        <div className='col-sm-2'/>
                    </div>
                </div>
        )
    }
}

export default App;
