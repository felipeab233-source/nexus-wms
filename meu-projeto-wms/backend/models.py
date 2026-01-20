from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base
import datetime

# A CATEGORIA TEM QUE VIR PRIMEIRO NO ARQUIVO
class Categoria(Base):
    __tablename__ = "categorias" # O SQLAlchemy procura por este nome
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)

class Produto(Base):
    __tablename__ = "produtos"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(50), unique=True, nullable=False)
    nome = Column(String(150), nullable=False)
    # Aqui ele procura a tabela "categorias" (definida acima) e a coluna "id"
    categoria_id = Column(Integer, ForeignKey("categorias.id")) 

class Endereco(Base):
    __tablename__ = "enderecos"
    id = Column(Integer, primary_key=True, index=True)
    codigo_endereco = Column(String(20), unique=True, nullable=False)

class Estoque(Base):
    __tablename__ = "estoque"
    id = Column(Integer, primary_key=True, index=True)
    produto_id = Column(Integer, ForeignKey("produtos.id"))
    endereco_id = Column(Integer, ForeignKey("enderecos.id"))
    quantidade = Column(Integer, default=0)

class Movimentacao(Base):
    __tablename__ = "movimentacoes"
    id = Column(Integer, primary_key=True, index=True)         
    produto_id = Column(Integer, ForeignKey("produtos.id"))
    quantidade = Column(Integer)
    tipo = Column(String(10))  # ENTRADA ou SAIDA
    data_movimentacao = Column(DateTime, default=datetime.datetime.now)
    observacao = Column(String(255), nullable=True)
    endereco_id = Column(Integer, ForeignKey("enderecos.id")) 
    produto = relationship("Produto")
    endereco = relationship("Endereco")