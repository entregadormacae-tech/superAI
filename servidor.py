from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests

load_dotenv()
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

api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
def home():
    return {"mensagem": "✅ Nicoluz IA está online!"}

@app.post("/api/chat")
def chat(mensagem: Mensagem):
    if not api_key:
        return {"resposta": "⚠️ Chave da OpenAI não configurada!"}
    
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        dados = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "Você é a Nicoluz IA, uma assistente amigável e prestativa. Responda de forma clara e natural em português."},
                *mensagem.historico,
                {"role": "user", "content": mensagem.texto}
            ],
            "temperature": 0.7
        }
        
        resposta = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=dados,
            timeout=30
        )
        
        if resposta.status_code == 200:
            resultado = resposta.json()
            texto_resposta = resultado["choices"][0]["message"]["content"]
            return {"resposta": texto_resposta}
        else:
            return {"resposta": f"❌ Erro: {resposta.status_code} — Verifique sua chave da OpenAI."}
    
    except Exception as e:
        return {"resposta": f"⚠️ Erro de conexão: {str(e)}"}
