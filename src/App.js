import logo from './logo.svg';
import './App.css';
import Question from './components/question'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
