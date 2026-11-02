// ===== ELEMENTOS GERAIS =====
const menuLateral = document.getElementById('menu-lateral');
const btnAbrirMenu = document.getElementById('btn-abrir-menu');
const btnFecharMenu = document.getElementById('fechar-menu');
const menuMais = document.getElementById('menu-mais');
const btnMais = document.getElementById('btn-mais');
const areaMensagens = document.getElementById('area-mensagens');
const entradaTexto = document.getElementById('entrada-texto');
const btnEnviar = document.getElementById('btn-enviar');
const previewItem = document.getElementById('preview-item');
const previewConteudo = document.getElementById('preview-conteudo');
const btnRemoverPreview = document.getElementById('btn-remover-preview');
const avisoCopiado = document.getElementById('aviso-copiado');

// ===== TELAS =====
const telas = {
    inicio: document.getElementById('tela-inicio'),
    login: document.getElementById('tela-login'),
    cadastro: document.getElementById('tela-cadastro'),
    temas: document.getElementById('tela-temas'),
    vozes: document.getElementById('tela-vozes'),
    chat: document.getElementById('tela-chat')
};

function mostrarTela(nomeTela) {
    Object.values(telas).forEach(tela => tela.classList.remove('ativa'));
    telas[nomeTela].classList.add('ativa');
    fecharMenuLateral();
    fecharMenuMais();
}

// ===== MENU LATERAL =====
function abrirMenuLateral() {
    menuLateral.classList.remove('escondido');
}

function fecharMenuLateral() {
    menuLateral.classList.add('escondido');
}

btnAbrirMenu.addEventListener('click', abrirMenuLateral);
btnFecharMenu.addEventListener('click', fecharMenuLateral);

document.getElementById('ir-temas').addEventListener('click', () => mostrarTela('temas'));
document.getElementById('ir-vozes').addEventListener('click', () => mostrarTela('vozes'));
document.getElementById('ir-planos').addEventListener('click', () => alert('Planos em desenvolvimento! Em breve! ⚡'));
document.getElementById('ir-conta').addEventListener('click', () => alert('Conta em desenvolvimento! 👤'));
document.getElementById('btn-sair').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja sair?')) {
        mostrarTela('inicio');
    }
});

// ===== MENU MAIS (+) =====
function abrirMenuMais() {
    menuMais.classList.remove('escondido');
}

function fecharMenuMais() {
    menuMais.classList.add('escondido');
}

btnMais.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuMais.classList.contains('escondido')) {
        abrirMenuMais();
    } else {
        fecharMenuMais();
    }
});

document.addEventListener('click', (e) => {
    if (!menuMais.contains(e.target) && e.target !== btnMais) {
        fecharMenuMais();
    }
});

// ===== OPÇÕES DO MENU MAIS =====
document.getElementById('opcao-camera').addEventListener('click', () => {
    document.getElementById('input-camera').click();
    fecharMenuMais();
});

document.getElementById('opcao-fotos').addEventListener('click', () => {
    document.getElementById('input-fotos').click();
    fecharMenuMais();
});

document.getElementById('opcao-arquivos').addEventListener('click', () => {
    document.getElementById('input-arquivos').click();
    fecharMenuMais();
});

document.getElementById('opcao-pensar').addEventListener('click', () => {
    adicionarMensagemSistema('💭 Modo de raciocínio ativado! A IA vai pensar mais antes de responder.');
    fecharMenuMais();
});

// ===== PREVIEW DE ARQUIVOS =====
let arquivoSelecionado = null;

function mostrarPreview(arquivo, tipo) {
    arquivoSelecionado = arquivo;
    let icone = tipo === 'imagem' ? '🖼️' : '📄';
    previewConteudo.innerHTML = `<span>${icone}</span><span>${arquivo.name}</span>`;
    previewItem.classList.remove('escondido');
}

btnRemoverPreview.addEventListener('click', () => {
    arquivoSelecionado = null;
    previewItem.classList.add('escondido');
});

document.getElementById('input-camera').addEventListener('change', (e) => {
    if (e.target.files[0]) mostrarPreview(e.target.files[0], 'imagem');
});

document.getElementById('input-fotos').addEventListener('change', (e) => {
    if (e.target.files[0]) mostrarPreview(e.target.files[0], 'imagem');
});

document.getElementById('input-arquivos').addEventListener('change', (e) => {
    if (e.target.files[0]) mostrarPreview(e.target.files[0], 'arquivo');
});

// ===== ENVIAR MENSAGEM =====
let contadorMensagens = 0;
const LIMITE_GRATUITO = 50;

function adicionarMensagem(texto, ehUsuario = true) {
    const div = document.createElement('div');
    div.className = ehUsuario ? 'mensagem usuario' : 'mensagem ia';
    div.innerHTML = `<p>${texto}</p>`;
    
    if (!ehUsuario) {
        div.innerHTML += `
            <div class="acoes-mensagem">
                <button class="btn-acao-mensagem" data-acao="copiar" title="Copiar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="9" y="9" width="13" height="13" rx="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                </button>
                <button class="btn-acao-mensagem" data-acao="ouvir" title="Ouvir resposta">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                </button>
                <button class="btn-acao-mensagem" data-acao="compartilhar" title="Compartilhar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                </button>
            </div>
        `;
    }
    
    areaMensagens.appendChild(div);
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
    return div;
}

function adicionarMensagemSistema(texto) {
    const div = document.createElement('div');
    div.style.padding = '8px 16px';
    div.style.color = '#86868b';
    div.style.fontSize = '13px';
    div.style.textAlign = 'center';
    div.textContent = texto;
    areaMensagens.appendChild(div);
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

function responderIA(mensagemUsuario) {
    contadorMensagens++;
    
    setTimeout(() => {
        const resposta = `Entendi! Você disse: "${mensagemUsuario}"\n\nIsso é uma resposta de exemplo. Em breve conectaremos com a IA real! ✨`;
        adicionarMensagem(resposta, false);
    }, 800);
}

btnEnviar.addEventListener('click', () => {
    const texto = entradaTexto.value.trim();
    if (!texto && !arquivoSelecionado) return;
    
    if (contadorMensagens >= LIMITE_GRATUITO) {
        alert('Você atingiu o limite de 50 mensagens de hoje! Assine o Pro para continuar sem limites. ⚡');
        return;
    }
    
    if (texto) {
        adicionarMensagem(texto, true);
        entradaTexto.value = '';
    }
    
    if (arquivoSelecionado) {
        adicionarMensagem(`📎 Enviou: ${arquivoSelecionado.name}`, true);
        arquivoSelecionado = null;
        previewItem.classList.add('escondido');
    }
    
    responderIA(texto);
});

entradaTexto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        btnEnviar.click();
    }
});

// ===== AÇÕES DAS MENSAGENS (Copiar / Ouvir / Compartilhar) =====
document.addEventListener('click', (e) => {
    const botao = e.target.closest('.btn-acao-mensagem');
    if (!botao) return;
    
    const acao = botao.dataset.acao;
    const mensagemEl = botao.closest('.mensagem');
    const texto = mensagemEl.querySelector('p').textContent;
    
    switch (acao) {
        case 'copiar':
            navigator.clipboard.writeText(texto).then(() => {
                avisoCopiado.classList.remove('escondido');
                setTimeout(() => avisoCopiado.classList.add('escondido'), 2000);
            });
            break;
            
        case 'ouvir':
            if ('speechSynthesis' in window) {
                const fala = new SpeechSynthesisUtterance(texto);
                fala.lang = 'pt-BR';
                fala.rate = 1;
                speechSynthesis.speak(fala);
            } else {
                alert('Seu navegador não suporta leitura de voz 😔');
            }
            break;
            
        case 'compartilhar':
            if (navigator.share) {
                navigator.share({
                    title: 'Resposta da SuperAI',
                    text: texto
                });
            } else {
                navigator.clipboard.writeText(texto).then(() => {
                    avisoCopiado.classList.remove('escondido');
                    setTimeout(() => avisoCopiado.classList.add('escondido'), 2000);
                });
            }
            break;
    }
});

// ===== TELAS INICIAIS =====
document.getElementById('btn-entrar').addEventListener('click', () => mostrarTela('login'));
document.getElementById('btn-cadastrar').addEventListener('click', () => mostrarTela('cadastro'));
document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarTela('chat');
});
document.getElementById('form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarTela('chat');
});
