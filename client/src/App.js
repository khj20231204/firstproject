import logo from './logo.svg';
import './App.css';
import PharmacyPage from './pages/PharmacyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Join from './pages/Join';
import User from './pages/User';
import LoginContextProvider from './contexts/LoginContextProvider';
import LoginJoin from './pages/LoginJoin';

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
      <Routes>
         <Route path="/" element={<PharmacyPage></PharmacyPage>}></Route>
         {/* PharmacyPage안에 Header와 PharMain에서도 context적용 */}
         <Route path="/about" element={<About></About>}></Route>
         <Route path="/user" element={<User></User>}></Route>
         <Route path="/join" element={<Join></Join>}></Route>
         <Route path="/login" element={<Login></Login>}></Route>
         {/* <Route path="/loginjoin" element={<LoginJoin></LoginJoin>}></Route> */}
      </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
