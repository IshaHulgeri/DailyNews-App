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
    return (
      <div style={styles.welcomeContainer}>
        <div style={styles.marquee}>
          <div style={styles.welcomeTitle}>Welcome to DailyNews</div>
        </div>
        <div style={styles.marquee}>
          <div style={styles.welcomeSubtitle}>
            Start exploring the latest news
          </div>
        </div>
      </div>
    );
  };

  const CategoryNews = () => {
    const { categoryName } = useParams();
    return (
      <News setProgress={setProgress} pageSize={5} category={categoryName} />
    );
  };

  const styles = {
    welcomeContainer: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      overflow: "hidden",
    },
    marquee: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "block",
      width: "100%",
      animation: "marquee 2s linear forwards",
    },
    welcomeTitle: {
      fontSize: "5rem",
      fontWeight: "bold",
      display: "inline-block",
    },
    welcomeSubtitle: {
      fontSize: "3rem",
      marginTop: "1rem",
      display: "inline-block",
    },
    "@keyframes marquee": {
      "0%": { transform: "translateX(-100%)" },
      "50%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(0%)" },
    },
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
