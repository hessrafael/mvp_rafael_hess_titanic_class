from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from urllib.parse import unquote

from sqlalchemy.exc import IntegrityError

# from model import Session, Passageiro , Modelo
from model import Passageiro, Modelo
from schemas import *
from flask_cors import CORS

import numpy as np
import pandas as pd


# Instanciando o objeto OpenAPI
info = Info(title="Titanic API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# Definindo tags para agrupamento das rotas
home_tag = Tag(name="Documentação", description="Seleção de documentação: Swagger, Redoc ou RapiDoc")
passageiro_tag = Tag(name="Passageiro", description="Adição e predição de sobreviv~encia de passageiros no Titanic")


# Rota home
@app.get('/', tags=[home_tag])
def home():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')

# Rota de adição de passageiro
@app.post('/passageiro', tags=[passageiro_tag],
          responses={"200": PassageiroViewSchema})
def predict(form: PassageiroSchema):
    """Adiciona um novo passageiro e retorna a predição de sobrevivência
    
    Args:   
        pclass: (int): A classe na qual o passageiro viajou (1, 2 ou 3)
        sex: (str): O sexo do passageiro, M - Masculino, F - Feminino
        age: (float): A idade do passageiro
        sibsp: (int): Numero de irmãos + conjuge do passageiro que também estavam a bordo do Titanic 
        parch: (int): Numero de pais + filhos do passageiro que também estavam a bordo do Titanic
        fare: (float): Valor pago pela passagem
        embarked: (str): Porto de embarque, C - Cherbourg, Q - Queenstown, S - Southampton
        
    Returns:
        dict: representação do passageiro e se ele sobreviveu
    """
    
    # Carregando modelo
    ml_path = 'ml_model/modelo_final_SVM_Titanic.pkl'
    modelo = Modelo.carrega_pkl(ml_path)

    # Carregando o scaler
    scaler_path = 'ml_model/scaler.pkl'
    scaler = Modelo.carrega_pkl(scaler_path)

    # Convertendo o form em dataset

    X_input = np.array([form.pclass, 
                            form.sex, 
                            form.age, 
                            form.sibsp, 
                            form.parch, 
                            form.fare, 
                            form.embarked
                        ])
    
    df_input = pd.DataFrame(X_input.reshape(1,-1),columns=['Pclass','Sex','Age','SibSp','Parch','Fare','Embarked'])

    # Mapeando o dataset para valores numéricos

    df_input['Sex'] = df_input['Sex'].map({'M':0, 'F':1})
    df_input['Embarked'] = df_input['Embarked'].map({'C':0, 'Q':1, 'S':2})

    # Prevendo o destino do Passageiro

    survived= bool(Modelo.preditor(modelo,scaler,df_input.values))
           

    passageiro = Passageiro(
    pclass=form.pclass,
    sex=form.sex,
    age=form.age,
    sibsp=form.sibsp,
    parch=form.parch,
    fare=form.fare,
    embarked=form.embarked,
    survived=survived)

    return apresenta_passageiro(passageiro), 200
    