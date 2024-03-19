import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Edit from './Pages/Edit';
import Profile from './Pages/Profile';
import Pagenot from './Pages/Pagenot';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/edit/:id' element={<Edit/>} />
      <Route path='*' element={<Pagenot/>} />
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
