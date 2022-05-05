import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react'
import Cookies from 'cookies-js'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useMediaQuery } from '@mui/material'

//components
import PrimaryNav from './components/PrimaryNav';
import PostingsFeed from './components/PostingsFeed';
import AddPostingScreen from './components/AddPostingScreen';
import LoginRegScreen from './components/LoginRegScreen';

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
  let [thinScreen, setThinScreen] = useState(false)

  const thinScreenBool = useMediaQuery('(max-width: 900px)')
  console.log(thinScreen)

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
    setThinScreen(thinScreenBool)
  },[user, thinScreenBool])
  
  
  return (
    <div className="App">
      <Router>
        <PrimaryNav user={user} setUser={setUser} thinScreen={thinScreen}></PrimaryNav>
        <Routes>
          <Route path='/' element={<PostingsFeed postingsDB={postingsDB} thinScreen={thinScreen}/>}></Route>
          <Route path='/list' element={<AddPostingScreen thinScreen={thinScreen}/>}></Route>
          <Route path='/user' element={<LoginRegScreen user={user} userDB={userDB} setUser={setUser} setUserDB={setUserDB} thinScreen={thinScreen}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
