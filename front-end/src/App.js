import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom"
const mock = 'element'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ mock }/>
        <Route exact path="/patients" element={ mock }/>
        <Route exact path="/register" element={ mock }/>
        <Route exact path="/delete" element={ mock }/>
        <Route exact path="/update" element={ mock }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
