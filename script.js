const API_URL = '/api/chat';
let mensagensRestantes = 50;

function abrirInicio() {
    document.getElementById('tela-inicio').classList.add('ativa');
    document.getElementById('tela-chat').classList.remove('ativa');
    fecharMenu();
}

function abrirChat() {
    document.getElementById('tela-inicio').classList.remove('ativa');
    document.getElementById('tela-chat').classList.add('ativa');
}

function abrirMenu() {
    document.getElementById('menu-lateral').classList.add('aberto');
}

function fecharMenu() {
    document.getElementById('menu-lateral').classList.remove('aberto');
}

function adicionarMensagem(texto, ehUsuario = false) {
    const area = document.getElementById('area-mensagens');
    const div = document.createElement('div');
    div.className = `mensagem ${ehUsuario ? 'usuario' : 'ia'}`;
    
    const avatar = ehUsuario ? '👤' : '🤖';
    div.innerHTML = `
        <div class="avatar">${avatar}</div>
        <div class="texto">${texto}</div>
    `;
    
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
}

async function enviarMensagem() {
    const entrada = document.getElementById('entrada-mensagem');
    const texto = entrada.value.trim();
    
    if (!texto) return;
    
    if (mensagensRestantes <= 0) {
        adicionarMensagem('Limite diário atingido! Volte amanhã ou faça upgrade para o plano Pro.', false);
        return;
    }
    
    // Mostra mensagem do usuário
    adicionarMensagem(texto, true);
    entrada.value = '';
    
    // Atualiza contador
    mensagensRestantes--;
    document.getElementById('contador').textContent = mensagensRestantes;
    
    // Resposta temporária
    setTimeout(() => {
        adicionarMensagem('Recebi sua mensagem! Conectando com a IA... 🤖\n\nIsso é só uma prévia. Em breve a IA real responderá aqui! ✨');
    }, 600);
}

// Fecha menu ao clicar fora
document.addEventListener('click', (e) => {
    const menu = document.getElementById('menu-lateral');
    const botao = e.target.closest('.btn-menu');
    if (!menu.contains(e.target) && !botao && menu.classList.contains('aberto')) {
        fecharMenu();
    }
});
