import React from 'react';
import { Link } from 'react-router-dom';

const TrainDetail = ({ train }) => (
  <div className="container mt-5">
    <h1>Train Detail for {train.trainName}</h1>
    <table className="table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Train Number</td>
          <td>{train.trainNumber}</td>
        </tr>
        <tr>
          <td>Departure Time</td>
          <td>{`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</td>
        </tr>
        <tr>
          <td>Seats Available (Sleeper)</td>
          <td>{train.seatsAvailable.sleeper}</td>
        </tr>
        <tr>
          <td>Seats Available (AC)</td>
          <td>{train.seatsAvailable.AC}</td>
        </tr>
        <tr>
          <td>Price (Sleeper)</td>
          <td>{train.price.sleeper}</td>
        </tr>
        <tr>
          <td>Price (AC)</td>
          <td>{train.price.AC}</td>
        </tr>
        <tr>
          <td>Delayed By</td>
          <td>{train.delayedBy} minutes</td>
        </tr>
      </tbody>
    </table>
    <Link className="btn btn-primary mt-3" to="/">Back to All Trains</Link>
  </div>
);

export default TrainDetail;
