import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Student from './pages/Student';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Student/>}></Route>
        <Route path='/create' element={<AddStudent/>}></Route>
        <Route path='/update/:id' element={<EditStudent/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
