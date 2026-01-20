import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

# Pegando as variáveis do .env
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")

# A URL PRECISA COMECAR COM mysql+pymysql
url_object = URL.create(
    "mysql+pymysql", 
    username=db_user,
    password=db_password,
    host="127.0.0.1",
    port=3306,
    database=db_name,
)

# Adicionamos o pool_pre_ping para evitar que a conexão caia
engine = create_engine(url_object, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()