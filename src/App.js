import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Consumir a API
    fetch('http://192.168.1.67:8080/customer')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Array vazio para rodar apenas uma vez após o carregamento inicial

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>VAMOS CONSUMIR API</p>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} (ID: {customer.id})
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
