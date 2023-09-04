import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NewsList from "./components/NewsList";
import NewsForm from "./components/NewsForm";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <main className="container">
          <Routes>
            <Route path="/" exact element={<NewsList />} />
            <Route path="/create" element={<NewsForm />} />
            <Route path="/edit/:id" element={<NewsForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
