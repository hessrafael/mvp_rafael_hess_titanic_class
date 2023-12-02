import numpy as np
import pickle

class Modelo:
    
    def carrega_pkl(path):
        file = pickle.load(open(path, 'rb'))
        return file    
    
    def preditor(model, scaler, data):
        """Realiza a predição de um passageiro com base no modelo treinado
        """
        X_input = data
        X_input_scaled = scaler.transform(X_input)
        # Faremos o reshape para que o modelo entenda que estamos passando
        destiny = model.predict(X_input_scaled)
        return int(destiny[0])