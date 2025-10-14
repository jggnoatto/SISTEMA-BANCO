import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Componentes/Header/header';
import Main from './Componentes/Main/main';
import Cadastro from './Componentes/Cadastro/cadastro';

function App() {
  return (
     <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} /> 
          {/* //ir para tela cadastro */}
          <Route path="/cadastro" element={<Cadastro />} /> 
          <Route path="/inicio" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
