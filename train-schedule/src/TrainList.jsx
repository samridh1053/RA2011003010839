import React from "react";
import { Link } from "react-router-dom";

const TrainList = ({ trains }) => (
  <div className="container mt-5">
    <h1>All Trains</h1>
    <table className="table">
      <thead>
        <tr>
          <th>Train Name</th>
          <th>Train Number</th>
          <th>Departure Time</th>
          <th>Seats Available (Sleeper)</th>
          <th>Seats Available (AC)</th>
          <th>Price (Sleeper)</th>
          <th>Price (AC)</th>
          <th>Delayed By</th>
        </tr>
      </thead>
      <tbody>
        {trains.map((train) => (
          <tr key={train.trainNumber}>
            <td>
              <Link to={`/train/${train.trainNumber}`}>{train.trainName}</Link>
            </td>
            <td>{train.trainNumber}</td>
            <td>{`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</td>
            <td>{train.seatsAvailable.sleeper}</td>
            <td>{train.seatsAvailable.AC}</td>
            <td>{train.price.sleeper}</td>
            <td>{train.price.AC}</td>
            <td>{train.delayedBy} minutes</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TrainList;
