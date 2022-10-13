import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";
import Header from "./components/Header"
import "./App.css";
import { useAppDispatch } from "./hooks/redux";
import { useRefreshQuery } from "./services/AuthService";
import { setUser } from "./store/reducers/AuthSlice";

function App() {
  const [skip, setSkip] = useState(true);
  const {data, isLoading} = useRefreshQuery({},{skip});
  const dispatch = useAppDispatch();
  
  useEffect(() => {
      if(localStorage.getItem("token")){
        setSkip(false);
      }
  },[])

  useEffect(() => {
    if(data){
      setSkip(true);
      dispatch(setUser(data));
    }
  },[data])

  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer></footer>
    </div>
  );
}

export default App;
