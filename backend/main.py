from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Mensagem(BaseModel):
    texto: str
    historico: list = []

@app.get("/")
def raiz():
    return {"mensagem": "✅ Nicoluz IA está online!"}

@app.post("/api/chat")
def chat(dados: Mensagem):
    resposta = f"Olá! Você disse: \"{dados.texto}\"\nEu sou a Nicoluz IA 🤖 Em breve serei mais inteligente!"
    return {"resposta": resposta, "sucesso": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
