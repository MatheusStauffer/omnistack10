import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente: função que retorna algum conteúdo - geralmente html, css ou js
// Boa prática diz para por um componente por arquivo. Outra definição seria
// Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação

// Propriedade: Informações que um componente PAI passa para o componente FILHO

// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    // adição em array no JS. as reticências mantém os que já existem
    setDevs([...devs, response.data]);
  }

  /*function incrementCounter(){
    setCounter(counter + 1);
  } Toda função que é própria de um componente é criada dentro dele
  */
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
    
    /*<>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar </button>
    </>
    // Essa tag vazia se chama fragment. Serve para conseguir empilhar componentes
    // iguais sem que seja necessário por uma div em volta - react não permite que
    // se reutilize o mesmo componente várias vezes seguidas sem que haja algo em volta
    */
  );
}

export default App;
