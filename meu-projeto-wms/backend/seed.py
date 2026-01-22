# seed.py
from database import SessionLocal
import models

def popular_banco():
    db = SessionLocal()
    try:
        # 1. Criar Categoria se não existir
        categoria = db.query(models.Categoria).filter_by(id=1).first()
        if not categoria:
            categoria = models.Categoria(id=1, nome="Smartphones")
            db.add(categoria)
            db.commit()
            print("Categoria criada!")

        # 2. Criar Endereço padrão se não existir
        endereco = db.query(models.Endereco).filter_by(id=1).first()
        if not endereco:
            endereco = models.Endereco(id=1, codigo_endereco="ALMOX-01")
            db.add(endereco)
            db.commit()
            print("Endereço padrão criado!")

        # 3. Criar Produtos de teste
        produtos_teste = [
            {"sku": "IPH15-001", "nome": "iPhone 15 Pro Max", "categoria_id": 1},
            {"sku": "SAM-S24", "nome": "Samsung Galaxy S24", "categoria_id": 1},
        ]

        for p in produtos_teste:
            existe = db.query(models.Produto).filter_by(sku=p["sku"]).first()
            if not existe:
                novo_p = models.Produto(sku=p["sku"], nome=p["nome"], categoria_id=p["categoria_id"])
                db.add(novo_p)
        
        db.commit()
        print("Produtos de teste inseridos com sucesso!")

    except Exception as e:
        print(f"Erro ao popular banco: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    popular_banco()