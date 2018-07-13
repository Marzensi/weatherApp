import React, { Component } from 'react';

import './DailyWeather.css';

class Weather extends Component {

    render() {
        let iconcode = this.props.icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                return (
                    <div>
                        <div className="text-center daily-icon">
                            <div>{this.props.description}</div>
                            <div className="d-inline-block"><img className="icon-img" id="wicon" src={iconurl} alt="icon" title={this.props.description}/>
                             <div className="daily-temp d-inline-block">{Math.round(this.props.temperature)} °C</div>
                        </div>
                        </div>
                        <div className="daily-weather-description text-center">
                            <div>ciśnienie: {Math.round(this.props.pressure)} hPa</div>
                            <div>wilgotność powietrza: {Math.round(this.props.humidity)}%</div>
                        </div>

                    </div>
                )
        }
    }

export default Weather;