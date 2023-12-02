from pydantic import BaseModel
from model.passageiro import Passageiro
import numpy as np

class PassageiroSchema(BaseModel):
    """ Define como um novo passageiro a ser inserido deve ser representado
    """
    pclass: int = 1
    sex: str = "M"
    age: float = 30.0
    sibsp: int = 3
    parch: int = 2
    fare: float = 7500.0
    embarked: str = "C"
    
class PassageiroViewSchema(BaseModel):
    """Define como um passageiro será retornado
    """
    pclass: int
    sex: str
    age: float
    sibsp: int
    parch: int
    fare: float
    embarked: str
    survived: bool

# Apresenta apenas os dados de um passageiro    
def apresenta_passageiro(passageiro: Passageiro):
    """ Retorna uma representação do passageiro seguindo o schema definido em
        PassageiroViewSchema.
    """
    return {
        "pclass": passageiro.pclass,
        "sex": passageiro.sex,
        "age": passageiro.age,
        "sibsp": passageiro.sibsp,
        "parch": passageiro.parch,
        "fare": passageiro.fare,
        "embarked": passageiro.embarked,
        "survived": passageiro.survived
    }
