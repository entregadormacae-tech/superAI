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

api_key = os.getenv("GOOGLE_API_KEY")

@app.get("/")
def home():
    return {"mensagem": "✅ Nicoluz IA está online! Usando Gemini."}

@app.post("/api/chat")
def chat(mensagem: Mensagem):
    if not api_key:
        return {"resposta": "⚠️ Chave da Google não configurada!"}
    
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
        
        dados = {
            "contents": [
                {"parts": [{"text": "Você é a Nicoluz IA, uma assistente amigável e prestativa. Responda de forma clara e natural em português."}]},
                {"parts": [{"text": mensagem.texto}]}
            ],
            "generationConfig": {
                "temperature": 0.7
            }
        }
        
        resposta = requests.post(url, json=dados, timeout=30)
        
        if resposta.status_code == 200:
            resultado = resposta.json()
            try:
                texto_resposta = resultado["candidates"][0]["content"]["parts"][0]["text"]
                return {"resposta": texto_resposta}
            except:
                return {"resposta": "⚠️ Não consegui entender a resposta. Tente novamente."}
        else:
            return {"resposta": f"❌ Erro {resposta.status_code}. Verifique sua chave da Google."}
    
    except Exception as e:
        return {"resposta": f"⚠️ Erro de conexão: {str(e)}"}
