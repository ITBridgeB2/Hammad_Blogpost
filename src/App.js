import { Routes, Route, BrowserRouter } from "react-router-dom";
import PostForm from './postForm';
import EditPost from "./editpost";
import Home from "./homepage";
import LoginForm from "./loginpage";
import RegistrationForm from "./registrationpage";
import PostList from "./blogdisplay";
import Travel from "./travelpage";
import Movies from "./moviespage";
import Food from "./foodpage";
import Games from "./gamespage";
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/edit" element={<EditPost/>} />
        <Route path="/tologin" element={<LoginForm/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path="/dash" element={<PostForm/>} />
        <Route path="/tolist" element={<PostList/>} />        
        <Route path="/travel" element={<Travel/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/food" element={<Food/>} />
        <Route path="/games" element={<Games/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
