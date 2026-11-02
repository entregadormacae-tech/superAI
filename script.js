const API_URL = "https://superai-uhzg.onrender.com";

async function enviar() {
    const texto = document.getElementById('campo-texto').value;
    if (!texto.trim()) return;
    
    const caixa = document.getElementById('caixa-mensagens');
    
    // Mostra mensagem do usuário
    caixa.innerHTML += `
        <div class="mensagem">
            <div class="icone">👤</div>
            <div class="texto"><p>${texto}</p></div>
        </div>
    `;
    document.getElementById('campo-texto').value = '';
    caixa.scrollTop = caixa.scrollHeight;
    
    // Mostra "pensando..."
    const idTemp = 'temp-' + Date.now();
    caixa.innerHTML += `
        <div id="${idTemp}" class="mensagem ia">
            <div class="icone">🤖</div>
            <div class="texto"><p>Pensando... 🤔</p></div>
        </div>
    `;
    caixa.scrollTop = caixa.scrollHeight;
    
    // Envia para a IA
    try {
        const resposta = await fetch(`${API_URL}/api/mensagem`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ mensagem: texto })
        });
        
        const dados = await resposta.json();
        document.getElementById(idTemp).remove();
        
        caixa.innerHTML += `
            <div class="mensagem ia">
                <div class="icone">🤖</div>
                <div class="texto"><p>${dados.resposta.replace(/\n/g, '<br>')}</p></div>
            </div>
        `;
        caixa.scrollTop = caixa.scrollHeight;
        
    } catch (erro) {
        document.getElementById(idTemp).remove();
        caixa.innerHTML += `
            <div class="mensagem ia">
                <div class="icone">🤖</div>
                <div class="texto"><p>⚠️ Erro de conexão. Verifique o servidor no Render.</p></div>
            </div>
        `;
        caixa.scrollTop = caixa.scrollHeight;
    }
}

function usarMicrofone() {
    alert('🎤 Microfone — Fale agora!');
}

document.getElementById('anexo-imagem').addEventListener('change', function(e) {
    if (e.target.files[0]) alert('🖼️ Imagem: ' + e.target.files[0].name);
});

document.getElementById('anexo-arquivo').addEventListener('change', function(e) {
    if (e.target.files[0]) alert('📎 Arquivo: ' + e.target.files[0].name);
});
