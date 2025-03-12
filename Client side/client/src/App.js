import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AddUser from './Pages/Adduser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
                  <Routes>
                     <Route exact path="/" element={<Home/>} />
                     {/* <Route exact path="/user" element={<UserTable/>} /> */}
                     <Route exact path="/add" element={<AddUser/>} />
                     
 
                    
                  </Routes>
      </BrowserRouter>

    
      
    </div>
  );
}

export default App;
