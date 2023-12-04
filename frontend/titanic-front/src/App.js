import logo from './logo.svg';
import PassengerAdd from './PassengerAdd'
import './App.css';
import { useState } from 'react';

function App() {
  const [survivedInfo, setSurvivedInfo] = useState("");


  //Handler para lidar com a adição de passageiro
  function handleAddPassenger(passenger) {
    console.log('caiu no handle')
    //Constroi formulário para envio da informação dos atributos
    const formData = new FormData();
    formData.append('pclass', passenger.l_pclass);
    formData.append('sex', passenger.l_sex);
    formData.append('age', passenger.l_age);
    formData.append('sibsp', passenger.l_sibsp);
    formData.append('parch', passenger.l_parch);
    formData.append('fare', passenger.l_fare);
    formData.append('embarked', passenger.l_embarked);
    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    //Envia a requisição para adição de colunas
    fetch('http://localhost:5000/passageiro',{      
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },      
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        //Atualiza os dados do passageiro
        setSurvivedInfo(data.survived);
      })      
      .catch(error => console.log(error));     

    }

  function handleFormClear(){
    setSurvivedInfo("")
  }
    
  
  return (
    <div className="App">
      <h1 className='Title'>Bem-vindo ao Titanic</h1>
      <PassengerAdd survivedInfo={survivedInfo}  onSubmit={handleAddPassenger} onFormClear={handleFormClear}></PassengerAdd>      
    </div>
  );
}

export default App;
