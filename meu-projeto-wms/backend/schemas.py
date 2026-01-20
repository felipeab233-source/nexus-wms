from pydantic import BaseModel
from typing import Optional

class ProdutoCreate(BaseModel):
    sku: str
    nome: str
    categoria_id: int


class MovimentacaoCreate(BaseModel):
    produto_id: int
    endereco_id: int
    quantidade: int
    tipo: str # "ENTRADA" ou "SAIDA"
    observacao: Optional[str] = None


# No schemas.py adicione:
class CategoriaCreate(BaseModel):
    nome: str

class EnderecoCreate(BaseModel):
    codigo_endereco: str

