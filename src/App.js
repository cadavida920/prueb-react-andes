import './App.css';
import PostList from './components/PostList';
import PostDetailsPage from './components/PostDetailsPage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Headers from './components/Headers';

function App() {
  return (
    <div className="App">
      <Router>
        <Headers></Headers>
        <Routes>
          <Route exact path="/" element={<PostList></PostList>} />
          <Route path="/post/:postId" element={<PostDetailsPage></PostDetailsPage>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
