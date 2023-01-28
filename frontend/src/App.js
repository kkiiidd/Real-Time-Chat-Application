import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import "./main.scss";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element=<Login/> path="/login" ></Route>
          <Route element=<Register></Register> path="/register" ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
