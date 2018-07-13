import React, { Component } from 'react';

import './HourlyWeather.css';

class Weather extends Component {

    render() {
        let iconcode = this.props.icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        return (
            <div>
                <div className="hourly-icon">
                    <div className="hourly-temp text-center">{Math.round(this.props.temperature)} °C</div>
                    <div className="text-center"><img className="icon-img" id="wicon" src={iconurl} alt="icon" title={this.props.description}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Weather;