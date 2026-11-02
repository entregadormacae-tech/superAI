from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route('/')
def index():
    return "✅ SuperAI API está funcionando!"

@app.route('/api/mensagem', methods=['POST'])
def mensagem():
    try:
        dados = request.json
        texto_usuario = dados.get('mensagem', '')
        
        resposta = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é a SuperAI, uma assistente amigável e prestativa."},
                {"role": "user", "content": texto_usuario}
            ]
        )
        
        return jsonify({
            "resposta": resposta.choices[0].message.content
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
