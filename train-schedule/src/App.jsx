import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import TrainList from "./TrainList";
import TrainDetail from "./TrainDetail";
import {
  registerCompany,
  getAuthToken,
  fetchTrains,
  fetchTrainDetail,
} from "./api";

const App = () => {
  const [trains, setTrains] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Register and get the token.
    const registerAndGetToken = async () => {
      try {
        await registerCompany({
          "companyName": "Train Central v2",
          "ownerName": "Ram",
          "rollNo": "1",
          "ownerEmail": "ram@abc.edu",
          "accessCode": "FKDLjg",
        });

        const authResponse = await getAuthToken({
          companyName: "Train Central",
          clientID: "b46128a0-fbde-4c16-a4b1-6ae6ad718e27",
          ownerName: "Ram",
          ownerEmail: "ram@abc.edu",
          rollNo: "1",
          clientSecret: "XOyolORPayKBOdAN",
        });
        setToken(authResponse["access token"]);

        const trainData = await fetchTrains(authResponse["access token"]);
        setTrains(trainData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    registerAndGetToken();
  }, []);

  const TrainDetailWithFetch = () => {
    const { trainNumber } = useParams();
    const [train, setTrain] = useState(null);

    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const detailData = await fetchTrainDetail(trainNumber, token);
          setTrain(detailData);
        } catch (error) {
          console.error("Error fetching train detail:", error);
        }
      };

      fetchDetails();
    }, [trainNumber, token]);

    return train ? <TrainDetail train={train} /> : <div>Loading...</div>;
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Train Central
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<TrainList trains={trains} />} />
        <Route path="/train/:trainNumber" element={<TrainDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
