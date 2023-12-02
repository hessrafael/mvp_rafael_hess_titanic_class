import pytest
import pandas as pd
import numpy as np
from model import Modelo
from sklearn.metrics import accuracy_score

def setup_function():
    print('Inicion do teste')

def test_model_accuracy():
    # Carregando modelo
    ml_path = '../ml_model/modelo_final_SVM_Titanic.pkl'
    modelo = Modelo.carrega_pkl(ml_path)

    # Carregando o scaler
    scaler_path = '../ml_model/scaler.pkl'
    scaler = Modelo.carrega_pkl(scaler_path)

    # Carregando o dataset
    dataset_path = '../../golden_dataset.csv'
    dataset = pd.read_csv(dataset_path, delimiter=',')

    ## Aplicando pre-processamento no golden_dataset ##
    
    # Drop de colunas inúteis para o modelo
    dataset = dataset.drop(columns=['Name','Cabin','PassengerId','Ticket', 'PassengerId'])
    

    # Vamos mapear os campos String para Int
    dataset['Sex'] = dataset['Sex'].map({'male':0, 'female':1})
    dataset['Embarked'] = dataset['Embarked'].map({'C':0, 'Q':1, 'S':2})

    # Preenchendo os NaN de Embarked
    val_embarked = dataset['Embarked'].value_counts()
    dataset['Embarked'] = dataset['Embarked'].fillna(val_embarked.index[0])

    # Preenchendo os NaN de Age

    indices_null_age = dataset[dataset['Age'].isnull()].index

    for indice in indices_null_age:
        idade_prevista = dataset['Age'][((dataset.SibSp == dataset.loc[indice]["SibSp"]) & (dataset.Parch == dataset.loc[indice]["Parch"]) & (dataset.Pclass == dataset.loc[indice]["Pclass"]))].mean()

        # Caso não tenha encontrado uma pessoa similar
        if np.isnan(idade_prevista):
            # Calcula a media com base na Classe (maior correlação)
            idade_prevista = dataset['Age'][(dataset.Pclass == dataset.loc[indice]["Pclass"])].mean()

            # Caso ainda não tenha encontrado uma pessoa similar
            if np.isnan(idade_prevista):
                # Calcula a media com base no dataset completo
                idade_prevista = dataset['Age'].mean()

        # Escreve a idade do registro originalmente null
        dataset['Age'].loc[indice] = idade_prevista

    ## Fim do pre-processamento ##
    array = dataset.values
    y_true = array[:,0]
    X_golden = array[:,1:]
    X_golden_scaled = scaler.transform(X_golden)
    y_pred = modelo.predict(X_golden_scaled)
    assert accuracy_score(y_true, y_pred) > 0.75

