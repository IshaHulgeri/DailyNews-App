import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(0);

  const Home = () => {
    return <h1>Welcome to DailyNews</h1>;
  };

  const CategoryNews = () => {
    const { categoryName } = useParams();
    return (
      <News setProgress={setProgress} pageSize={5} category={categoryName} />
    );
  };

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/:categoryName" element={<CategoryNews />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
