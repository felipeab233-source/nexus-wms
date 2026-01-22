from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
import models, schemas
from database import engine, get_db
from sqlalchemy import func
from datetime import date

# --- INICIALIZAÇÃO DO BANCO ---
print("--- DEBUG: Verificando e criando tabelas no MySQL... ---")
try:
    models.Base.metadata.create_all(bind=engine)
    print("--- DEBUG: Banco de dados pronto para uso! ---")
except Exception as e:
    print(f"--- DEBUG ERRO: Falha ao conectar no banco: {e} ---")

app = FastAPI(title="WMS Profissional")

# --- CONFIGURAÇÃO DE CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "WMS API Online", "timestamp": datetime.now()}

# --- ROTAS DE PRODUTOS ---

@app.get("/produtos")
def listar_produtos(search: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Produto)
    if search:
        # Filtra por nome ou SKU se o parâmetro search for enviado
        query = query.filter(
            (models.Produto.nome.contains(search)) | 
            (models.Produto.sku.contains(search))
        )
    return query.all()

# --- NOVA ROTA PARA O DASHBOARD ---
@app.get("/api/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    try:
        total_itens = db.query(models.Produto).count()
        
        # Soma entradas de hoje
        entradas_hoje = db.query(func.sum(models.Movimentacao.quantidade))\
            .filter(
                models.Movimentacao.tipo == "ENTRADA", 
                func.date(models.Movimentacao.data_movimentacao) == date.today()
            ).scalar() or 0
            
        # Soma saídas de hoje
        saidas_hoje = db.query(func.sum(models.Movimentacao.quantidade))\
            .filter(
                models.Movimentacao.tipo == "SAIDA", 
                func.date(models.Movimentacao.data_movimentacao) == date.today()
            ).scalar() or 0

        return {
            "total_itens": total_itens,
            "entradas_dia": int(entradas_hoje),
            "saidas_dia": int(saidas_hoje),
            "alertas_estoque": 0 # Você pode implementar lógica de estoque baixo depois
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- ROTAS DE MOVIMENTAÇÃO (ESTOQUE) ---

@app.get("/movimentacoes")
def listar_movimentacoes(db: Session = Depends(get_db)):
    return db.query(models.Movimentacao).order_by(models.Movimentacao.id.desc()).limit(10).all()

@app.post("/movimentar")
def movimentar_estoque(mov: schemas.MovimentacaoCreate, db: Session = Depends(get_db)):
    print(f"--- INICIANDO MOVIMENTAÇÃO: Produto {mov.produto_id} ---")
    
    try:
        # 1. VALIDAÇÃO: O Produto existe?
        produto = db.query(models.Produto).filter(models.Produto.id == mov.produto_id).first()
        if not produto:
            raise HTTPException(status_code=404, detail=f"Produto ID {mov.produto_id} não encontrado.")

        # 2. VALIDAÇÃO: O Endereço existe?
        endereco = db.query(models.Endereco).filter(models.Endereco.id == mov.endereco_id).first()
        if not endereco:
            # Se não houver endereço 1, criamos um automaticamente para não travar o sistema
            if mov.endereco_id == 1:
                novo_end = models.Endereco(id=1, codigo_endereco="ALMOX-01")
                db.add(novo_end)
                db.flush() # Registra mas não commita ainda
            else:
                raise HTTPException(status_code=404, detail=f"Endereço ID {mov.endereco_id} não existe.")

        # 3. BUSCAR SALDO ATUAL
        item_estoque = db.query(models.Estoque).filter(
            models.Estoque.produto_id == mov.produto_id,
            models.Estoque.endereco_id == mov.endereco_id
        ).first()

        tipo_mov = mov.tipo.upper()

        # 4. LÓGICA DE SALDO
        if tipo_mov == "ENTRADA":
            if item_estoque:
                item_estoque.quantidade += mov.quantidade
            else:
                novo_item = models.Estoque(
                    produto_id=mov.produto_id,
                    endereco_id=mov.endereco_id,
                    quantidade=mov.quantidade
                )
                db.add(novo_item)

        elif tipo_mov == "SAIDA":
            if not item_estoque or item_estoque.quantidade < mov.quantidade:
                saldo_atual = item_estoque.quantidade if item_estoque else 0
                raise HTTPException(status_code=400, detail=f"Saldo insuficiente. Atual: {saldo_atual}")
            item_estoque.quantidade -= mov.quantidade
        else:
            raise HTTPException(status_code=400, detail="Tipo inválido. Use ENTRADA ou SAIDA.")

        # 5. REGISTRAR HISTÓRICO
        nova_mov = models.Movimentacao(
            produto_id=mov.produto_id,
            endereco_id=mov.endereco_id,
            quantidade=mov.quantidade,
            tipo=tipo_mov,
            data_movimentacao=datetime.now(),
            observacao=mov.observacao
        )
        db.add(nova_mov)

        # 6. COMMIT FINAL
        db.commit()
        print("--- SUCESSO NO BANCO! ---")
        return {"mensagem": "Movimentação concluída com sucesso!", "status": "ok"}

    except HTTPException as http_e:
        db.rollback()
        raise http_e
    except Exception as e:
        db.rollback()
        print(f"--- ERRO CRÍTICO NO BACKEND: {str(e)} ---")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Execução do Servidor
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)