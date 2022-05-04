import "./scss/globals.scss";

import React from "react";
import ReactDOM, { render }  from "react-dom";

const root = document.querySelector("#root");

function BoilingVerdict(props) {
    if (props.celcius>=100) {
        return <p>L'eau bout.</p>
    }
    return <p>L'eau ne bout pas</p>
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

class TemperatureInput extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render()
    {
        const temperature = parseInt(this.props.temperature);
        return (
            <fieldset>
                <legend>Saisissez la temperature en {scaleNames[this.props.scale]}</legend>
                <input type="number" value={temperature} onChange={this.handleChange}/> 
            </fieldset>
        )
    }

    handleChange(e)
    {
        this.props.onTemperatureChange(e.target.value);
    }
}

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);

        this.state = {
            temperature:'',
            scale:'c'
        }
    }
    render()
    {
        const scale = this.state.scale;
        const temperature = this.state.temperature;

        const celcius = (scale === 'c' ? temperature : tryConvert(temperature,toFahrenheit));
        const fahrenheit = (scale === 'f' ? temperature : tryConvert(temperature,toCelsius));

        return(
            <div>
                <TemperatureInput scale="c" temperature={celcius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celcius={celcius}/>
            </div>
        )
    }
    handleCelsiusChange(temperature)
    {
        this.setState({
            temperature,
            scale:'c'
        })
    }
    handleFahrenheitChange(temperature)
    {
        this.setState({
            temperature,
            scale:'f'
        })
    }
}

ReactDOM.render(
    <Calculator/>,
    root
);