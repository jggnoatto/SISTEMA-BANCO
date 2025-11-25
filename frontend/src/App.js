import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Componentes/Header/header';
import Login from './Componentes/Login/login';
import Cadastro from './Componentes/Cadastro/cadastro';
import TelaInicio from './Componentes/TelaInício/telaInicio';
import TelaDeposito from './Componentes/TelaDepósito/telaDeposito';
import TelaSaque from './Componentes/TelaSaque/telaSaque';

function App() {
  return (
     <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} /> 
          {/* //ir para tela cadastro */}
          <Route path="/cadastro" element={<Cadastro />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<TelaInicio />} />
          <Route path="/depositar" element={<TelaDeposito />} />
          <Route path="/saque" element={<TelaSaque />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
