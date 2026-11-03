from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai

app = FastAPI(title="Nicoluz IA", version="1.0.0")

# Habilita CORS para o site funcionar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração da IA
CHAVE_GEMINI = os.getenv("GOOGLE_API_KEY", "")
genai.configure(api_key=CHAVE_GEMINI)
model = genai.GenerativeModel("gemini-2.0-flash")

class Mensagem(BaseModel):
    texto: str
    historico: list = []

@app.get("/")
def raiz():
    return {"mensagem": "✅ Nicoluz IA está online!"}

@app.post("/api/chat")
def conversar(mensagem: Mensagem):
    if not CHAVE_GEMINI:
        return {"resposta": "⚠️ Chave da API não configurada no servidor!"}
    
    try:
        resposta = modelo.generate_content(mensagem.texto)
        return {"resposta": resposta.text}
    except Exception as erro:
        return {"resposta": f"⚠️ Erro: {str(erro)}"}
