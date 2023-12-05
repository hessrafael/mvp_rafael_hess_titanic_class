# MVP - Rafael Hess - Classificador Titanic!
Repositório para MVP da Sprint 4 da Pós em Eng. de Software da PUCRio

O presente repositório serve para criação de um modelo de classificação o Titanic Dataset. O objetivo é descobrir se um passageiro do Titanic sobreviveu ao naufrágio com base em suas características.

O modelo foi treinado com o arquivo "train.csv" de onde foi extraído o "golden_dataset.csv", para validação via testes unitários (ambos presentes na raiz do repositório).

A lógica de montagem do modelo e preparação dos dados está presente em: https://colab.research.google.com/drive/11V-0DVKBiW18EVQJTz8L64VHQRAySUY-?usp=sharing ou então no arquivo ipynb na raiz do repositório.

O modelo final e o scaler encontram-se na pasta "ml_model"

## Executando o backend

Comece criando um ambiente virtual executando na pasta "/backend" o comando:

```
py -3.10 -m venv env310
```
ou então

```
python -m venv env310
```
caso não precise especificar a versão do python

Após, execute o script "activate" no seguinte caminho:

```
.\env310\Scripts\activate     
```
Você deverá ver que o ambiente virtual foi ativado

Finalmente, basta rodar o comando:

```
(env310) flask run --host 0.0.0.0 --port 5000 --reload
```
Que irá executar o aplicativo em [http://localhost:5000](http://localhost:5000). Basta abrir no seu navegador e conferir a documentação em Swagger

## Executando o frontend

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app).

### Scripts Disponíveis

Abra um novo terminal e navegue até a pasta "/frontend/titanic-front"

No diretório do projeto, você pode executar:

```
npm i
``` 
Para instalar as dependências do React

E

```
npm start
```

Para executar o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada quando você fizer alterações.\
Você também poderá ver quaisquer erros de lint no console.




## Executando os testes unitários

Vá até a pasta "/backend/tests" e rode o comando

```
(env310) pytest
```

