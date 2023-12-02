import enum


class SexOptions(enum.Enum):
    MASCULINO = 'M'
    FEMININO = 'F'
    def __str__(self) -> str:
        return self.value

class EmbarkmentOptions(enum.Enum):
    C = 'C'
    Q = 'Q'
    S = 'S'
    def __str__(self) -> str:
        return self.value


class Passageiro():   
    
    pclass = int
    sex = SexOptions
    age = float
    sibsp = int
    parch = int
    fare = float
    embarked = EmbarkmentOptions
    survived = bool

    def __init__(self, pclass: int, sex: SexOptions, age: float, sibsp: int, parch: int, fare: float, embarked: EmbarkmentOptions, survived: bool):
        if age < 0 or sibsp < 0 or parch < 0 or fare < 0 or pclass < 1 or pclass > 3:
            raise ValueError("Os valores de 'age', 'sibsp', 'parch' e 'fare' devem ser não negativos. O valor de 'pclass' deve estar entre 1 e 3.")
        
        self.pclass = pclass
        self.sex = sex
        self.age = age
        self.sibsp = sibsp
        self.parch = parch
        self.fare = fare
        self.embarked = embarked
        self.survived = survived


