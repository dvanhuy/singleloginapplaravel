import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Homepage';

function App() {
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route index element={<HomePage />} />
    </Routes>
  );
}

export default App;
