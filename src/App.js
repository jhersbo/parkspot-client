import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react'
import Cookies from 'cookies-js'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

//components
import PrimaryNav from './components/PrimaryNav';

const localServerURL = "http://localhost:3000/"

function App() {
  //cookies for login
  let cookieUser = Cookies.get('user')
  if(cookieUser){
    cookieUser = JSON.parse(cookieUser)
  }
  let [user, setUser] = useState(cookieUser)
  let [userDB, setUserDB] = useState('')
  let [postingsDB, setPostingsDB] = useState('')
  
  useEffect(()=>{
    console.log('app.js mounted')
    let fetchUserDB = async ()=>{
      let response = await fetch(localServerURL + "users")
      let rData = await response.json()
      console.log(rData)
      setUserDB(rData)
    }
    let fetchPostingsDB = async ()=>{
      let response = await fetch(localServerURL + "postings")
      let rData = await response.json()
      console.log(rData)
      setPostingsDB(rData)
    }
    fetchUserDB()
    fetchPostingsDB()
  },[user])
  
  
  return (
    <div className="App">
      <PrimaryNav user={user} setUser={setUser}></PrimaryNav>
    </div>
  );
}

export default App;
