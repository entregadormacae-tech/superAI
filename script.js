// ===== CONTROLE DE TELAS =====
function mostrarTela(idTela) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(idTela).classList.add('ativa');
    fecharMenu();
}

// ===== MENU LATERAL =====
const menuLateral = document.getElementById('menu-lateral');

function abrirMenu() {
    menuLateral.classList.remove('escondido');
}

function fecharMenu() {
    menuLateral.classList.add('escondido');
}

menuLateral.addEventListener('click', function(e) {
    if (e.target === menuLateral) {
        fecharMenu();
    }
});

// ===== BOTÕES DA TELA INICIAL =====
document.getElementById('btn-entrar').addEventListener('click', function() {
    mostrarTela('tela-chat');
});

document.getElementById('btn-cadastrar').addEventListener('click', function() {
    mostrarTela('tela-chat');
});

// ===== BOTÕES DE VOLTAR =====
document.getElementById('voltar-login').addEventListener('click', function() {
    mostrarTela('tela-inicio');
});

document.getElementById('voltar-cadastro').addEventListener('click', function() {
    mostrarTela('tela-inicio');
});

document.getElementById('voltar-temas').addEventListener('click', function() {
    mostrarTela('tela-chat');
});

document.getElementById('voltar-vozes').addEventListener('click', function() {
    mostrarTela('tela-chat');
});

// ===== FORMULÁRIOS =====
document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Entrando... Bem-vindo ao Nicoluz IA!');
    mostrarTela('tela-chat');
});

document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Conta criada com sucesso! Bem-vindo ao Nicoluz IA!');
    mostrarTela('tela-chat');
});

// ===== ITENS DO MENU =====
document.getElementById('ir-temas').addEventListener('click', function() {
    mostrarTela('tela-temas');
});

document.getElementById('ir-vozes').addEventListener('click', function() {
    mostrarTela('tela-vozes');
});

document.getElementById('ir-planos').addEventListener('click', function() {
    alert('⚡ Plano Grátis: 50 mensagens/dia • sem anúncios\n💎 Plano Pro: Ilimitado + recursos extras\n\nEm breve disponível!');
    fecharMenu();
});

document.getElementById('ir-conta').addEventListener('click', function() {
    alert('👤 Sua conta\n\nNome: Visitante\nPlano: Gratuito\nMensagens restantes hoje: 50/50');
    fecharMenu();
});

document.getElementById('ir-preferencias').addEventListener('click', function() {
    alert('⚙️ Preferências em desenvolvimento!');
    fecharMenu();
});

document.getElementById('btn-sair').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja sair?')) {
        mostrarTela('tela-inicio');
    }
    fecharMenu();
});

document.getElementById('fechar-menu').addEventListener('click', fecharMenu);
document.getElementById('btn-abrir-menu').addEventListener('click', abrirMenu);

// ===== BOTÃO PLANOS DO CHAT =====
document.getElementById('btn-planos').addEventListener('click', function() {
    alert('⚡ Plano Grátis: 50 mensagens/dia • sem anúncios\n💎 Plano Pro: Ilimitado + recursos extras\n\nEm breve disponível!');
});

// ===== SELEÇÃO DE TEMAS =====
document.querySelectorAll('.opcao-tema').forEach(tema => {
    tema.addEventListener('click', function() {
        document.querySelectorAll('.opcao-tema').forEach(t => t.classList.remove('selecionado'));
        this.classList.add('selecionado');
        
        document.querySelectorAll('.marca-selecionado').forEach(m => m.textContent = '');
        this.querySelector('.marca-selecionado').textContent = '✓';
        
        const nomeTema = this.getAttribute('data-tema');
        document.body.className = '';
        if (nomeTema !== 'escuro') {
            document.body.classList.add('tema-' + nomeTema);
        }
    });
});

// ===== TESTE DE VOZES =====
document.querySelectorAll('.btn-teste-voz').forEach(botao => {
    botao.addEventListener('click', function() {
        const nomeVoz = this.parentElement.getAttribute('data-voz');
        const nomes = {
            'calma': 'Calma e Suave',
            'animada': 'Amigável e Animada',
            'profissional': 'Clara e Profissional',
            'masculina': 'Suave Masculina'
        };
        alert('🔊 Tocando amostra: ' + nomes[nomeVoz] + '\n\n(áudio será adicionado em breve!)');
    });
});

// ===== CHAT — Enviar mensagem =====
const campoMensagem = document.getElementById('campo-mensagem');
const areaMensagens = document.getElementById('area-mensagens');

function adicionarMensagem(texto, ehUsuario = false) {
    const div = document.createElement('div');
    div.className = 'mensagem ' + (ehUsuario ? 'usuario' : 'ia');
    div.innerHTML = '<p>' + texto.replace(/\n/g, '</p><p>') + '</p>';
    areaMensagens.appendChild(div);
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

document.getElementById('btn-enviar').addEventListener('click', enviarMensagem);
campoMensagem.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') enviarMensagem();
});

async function enviarMensagem() {
    const texto = campoMensagem.value.trim();
    if (!texto) return;
    
    // Mostra mensagem do usuário
    adicionarMensagem(texto, true);
    campoMensagem.value = '';
    
    // Indicador de "escrevendo..."
    const idTemp = 'temp-' + Date.now();
    areaMensagens.insertAdjacentHTML('beforeend', `
        <div id="${idTemp}" class="mensagem ia">
            <p>✍️ Escrevendo...</p>
        </div>
    `);
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
    
    try {
        // ✅ LINK CORRIGIDO DO SEU SERVIDOR
        const URL_SERVIDOR = "https://nicoluz-la-servidor.onrender.com";
        
        const resposta = await fetch(`${URL_SERVIDOR}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                texto: texto,
                historico: []
            })
        });
        
        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
        
        const dados = await resposta.json();
        
        // Remove "escrevendo..."
        const tempEl = document.getElementById(idTemp);
        if (tempEl) tempEl.remove();
        
        // Mostra resposta
        adicionarMensagem(dados.resposta || "Sem resposta disponível");
        
    } catch (erro) {
        const tempEl = document.getElementById(idTemp);
        if (tempEl) tempEl.remove();
        adicionarMensagem("⚠️ Servidor está acordando... Tente em 1 minuto!");
        console.error("ERRO:", erro);
    }
}

// ===== BOTÃO MICROFONE =====
document.getElementById('btn-microfone').addEventListener('click', function() {
    alert('🎤 Entrada de voz em desenvolvimento! Em breve disponível!');
});
 
console.log('✅ Nicoluz IA carregada com sucesso!');
