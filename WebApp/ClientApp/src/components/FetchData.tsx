import React, { Component, Props } from "react";

interface IForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export class FetchData extends Component {
  public static displayName = FetchData.name;

  public static renderForecastsTable(forecasts: IForecast[]): JSX.Element {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) =>
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>,
          )}
        </tbody>
      </table>
    );
  }

  public state: { forecasts: IForecast[], loading: boolean };

  constructor(props: Props<FetchData>) {
    super(props);
    this.state = { forecasts: [], loading: true };

    fetch("api/SampleData/WeatherForecasts")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  public render(): JSX.Element {
    const contents: JSX.Element = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
