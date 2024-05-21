
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./Registar.jsx";
import Login from "./login.jsx";
import Home from "./index.jsx";

import UserList from "./components/UserList.jsx";


function Rutas() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route  path="/login" element={<Login/>} />
            <Route  path="/registrar" element={<RegisterForm/>} />
            <Route  path="/index" element={<Home/>} />
            <Route  path="/UserList" element={<UserList/>} />
           

            
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Rutas;
