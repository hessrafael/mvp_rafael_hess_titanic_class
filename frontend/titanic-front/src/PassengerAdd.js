import React, { useState, useEffect} from 'react';
import './PassengerAdd.css';

function PassengerAdd(props){
    const [pclass, setPclass] = useState("")
    const [nbSibs, setNbSibs] = useState("")
    const [nbChild, setNbChild] = useState("")
    const [nbParents, setNbParents] = useState("")
    const [nbSpouse, setNbSpouse] = useState("")
    const [fare, setFare] = useState("")
    const [embarked, setEmbarked] = useState("")
    const [sex, setSex] = useState("")
    const [age, setAge] = useState("")
    const survived = props.survivedInfo
    
    //Função para resetar os campos de adição após adicionar
    function clearStates(){
    document.getElementById("create-passenger-form").reset();
    setPclass("");
    setNbSibs("");
    setNbChild("");
    setNbParents("");
    setNbSpouse("");
    setFare("");
    setEmbarked("");
    setSex("");
    setAge("");
    props.onFormClear()
    
    }

    const logStates = () => {
        console.log('Pclass:', pclass);
        console.log('NbSibs:', nbSibs);
        console.log('NbChild:', nbChild);
        console.log('NbParents:', nbParents);
        console.log('NbSpouse:', nbSpouse);
        console.log('Fare:', fare);
        console.log('Embarked:', embarked);
        console.log('Sex:', sex);
        console.log('Age:', age);
        console.log('Survived:', survived);
      };


    //Função para lidar com o envio do form
    function handleFormSubmit(event){
        event.preventDefault()

        const passenger = {
            l_pclass: pclass,
            l_sibsp: parseInt(nbSibs) + parseInt(nbSpouse),
            l_parch: parseInt(nbChild) + parseInt(nbParents),
            l_age: age,
            l_sex: sex,
            l_fare: fare,
            l_embarked: embarked
        };        
        props.onSubmit(passenger);        
    }

    function changeRadio(event){
        console.log("change ", {value: event.target.value, event})
        setPclass(event.target.value)
    }

    return(
        <span>
        {/* <button onClick={logStates}>Ver Estados</button> */}
        <form onSubmit={handleFormSubmit} id='create-passenger-form' className='PassengerAdd'>
        <div  className='ticket-back'>
            <div className='ticket-row'>
                <span>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Whitestarline.svg/1024px-Whitestarline.svg.png' alt='White Star Line logo'  width="230" height="193"></img>
                </span>
                <span>
                    <img src={process.env.PUBLIC_URL +'/Titanic_logo.png'} alt='Titanic logo'  width="505" height="288"></img>
                </span>
                <div> 
                    <label htmlFor="Class">Classe:</label>
                    <div>
                        <label className="styled-label">
                            <input                            
                                className="styled-radio"
                                type="radio"
                                name="Class"
                                value="1"
                                checked={pclass === "1"}
                                onChange={(event) => setPclass(event.target.value)}
                            />
                            1
                        </label>
                        <label className="styled-label">
                            <input
                                className="styled-radio"
                                type="radio"
                                name="Class"
                                value="2"
                                checked={pclass === "2"}
                                onChange={(event) => setPclass(event.target.value)}
                            />
                            2
                        </label>
                        <label className="styled-label">
                            <input
                                className="styled-radio"
                                type="radio"
                                name="Class"
                                value="3"
                                checked={pclass === "3"}
                                onChange={(event) => setPclass(event.target.value)}
                            />
                            3
                        </label>
                    </div>
                </div>
            </div>

            <div className='ticket-row'>
                <div className='ticket-col'>
            <div>
                    <label htmlFor="NbSibs">Número de Irmãos a bordo:</label>
                    <input
                        className="vintage"
                        id="NbSibs"
                        type="number"
                        value={nbSibs}
                        min = "0"
                        placeholder='Insira o número de irmãos a bordo'
                        onChange={(event) => setNbSibs(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="NbChild">Número de Filhos a bordo:</label>
                    <input
                        className="vintage"
                        id="NbChild"
                        type="number"
                        value={nbChild}
                        min="0"
                        placeholder='Insira o número de filhos a bordo'
                        onChange={(event) => setNbChild(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="NbParents">Número de Pais a bordo:</label>
                    <input
                        className="vintage"
                        id="NbParents"
                        type="number"
                        value={nbParents}
                        min="0"
                        max="2"
                        placeholder='Insira o número de pais a bordo'
                        onChange={(event) => setNbParents(event.target.value)}
                    />
                </div>
                <div className='ticket-row'>
                    <label htmlFor="NbSpouse">Possui Cônjuge a bordo?</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="NbSpouse"
                                value="1"
                                checked={nbSpouse === "1"}
                                onChange={(event) => setNbSpouse(event.target.value)}
                            />
                            Sim
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="NbSpouse"
                                value="0"
                                checked={nbSpouse === "0"}
                                onChange={(event) => setNbSpouse(event.target.value)}
                            />
                            Não
                        </label>
                    </div>
                </div>
                <div className='ticket-row'>
                <label htmlFor="Sex">Sexo:</label>
                <label>
                    <input
                        type="radio"
                        name="sex"
                        value="M"
                        checked={sex === "M"}
                        onChange={(event) => setSex(event.target.value)}
                    />
                    Masculino
                </label>
                <label>
                    <input
                        type="radio"
                        name="sex"
                        value="F"
                        checked={sex === "F"}
                        onChange={(event) => setSex(event.target.value)}
                    />
                    Feminino
                </label>
            </div>
            <div>
                <label htmlFor="Age">Idade:</label>
                <input
                    className="vintage"
                    id="Age"
                    type="number"
                    value={age}
                    placeholder='Insira a idade do passageiro'
                    onChange={(event) => setAge(event.target.value)}
                />
            </div>
            </div>  
            
            
            
            
            <div className='ticket-col'>
                <div>
                    <label htmlFor="Fare">Tarifa:</label>
                    <input
                        className="vintage"
                        id="Fare"
                        type="number"
                        value={fare}
                        min = "0.01"
                        step="0.01"
                        placeholder='Insira a tarifa paga pelo bilhete'
                        onChange={(event) => setFare(event.target.value)}
                    />
                </div>
                
                <div className='ticket-col'> 
                    <label htmlFor="Embarked">Local de Embarque:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="Embarked"
                                value="C"
                                checked={embarked === "C"}
                                onChange={(event) => setEmbarked(event.target.value)}
                            />
                            Cherbourg
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="Embarked"
                                value="Q"
                                checked={embarked === "Q"}
                                onChange={(event) => setEmbarked(event.target.value)}
                            />
                            Queenstown
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="Embarked"
                                value="S"
                                checked={embarked === "S"}
                                onChange={(event) => setEmbarked(event.target.value)}
                            />
                            Southampton
                        </label>
                    </div>
                </div>
                {/* Habilita o submit apenas se há texto inserido */}
            <div className='ticket-col'>
                <button type='submit' className='pirate-button' disabled={
                !pclass ||
                !nbSibs ||
                !nbChild ||
                !nbParents ||
                !nbSpouse ||
                !fare ||
                !embarked ||
                !sex ||
                !age
            }>
                Adicionar Passageiro
            </button>
            <input id='surv' readOnly value={survived === (null || "") ? "" : (survived ? "Sobreviveu" : "Faleceu")} />

            </div>
            

            </div>
            </div>

            
            

            

        </div>
        
        </form>
        <button onClick={clearStates}>Novo Passageiro</button>
        
        </span>

        
        
    )
}

export default PassengerAdd;

