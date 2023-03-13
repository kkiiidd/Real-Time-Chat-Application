import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger'
import "./main.scss";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element=<Messenger /> path="/" ></Route>
          <Route element=<Login /> path="/login" ></Route>
          <Route element=<Register /> path="/register" ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
