// ===== CONTROLE DE TELAS =====
function mostrarTela(idTela) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(idTela).classList.add('ativa');
}

// ===== MENU LATERAL =====
const menuLateral = document.getElementById('menu-lateral');

document.getElementById('btn-abrir-menu').addEventListener('click', () => {
    menuLateral.classList.remove('escondido');
});

document.getElementById('fechar-menu').addEventListener('click', () => {
    menuLateral.classList.add('escondido');
});

// ===== BOTÕES DA TELA INICIAL =====
document.getElementById('btn-entrar').addEventListener('click', () => {
    mostrarTela('tela-login');
});

document.getElementById('btn-cadastrar').addEventListener('click', () => {
    mostrarTela('tela-cadastro');
});

// ===== BOTÕES DE VOLTAR =====
document.getElementById('voltar-inicio-login').addEventListener('click', () => {
    mostrarTela('tela-inicio');
});

document.getElementById('voltar-inicio-cadastro').addEventListener('click', () => {
    mostrarTela('tela-inicio');
});

document.getElementById('voltar-chat-temas').addEventListener('click', () => {
    mostrarTela('tela-chat');
});

document.getElementById('voltar-chat-vozes').addEventListener('click', () => {
    mostrarTela('tela-chat');
});

// ===== FORMULÁRIOS =====
document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarTela('tela-chat');
    menuLateral.classList.add('escondido');
});

document.getElementById('form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarTela('tela-chat');
    menuLateral.classList.add('escondido');
});

// ===== ITENS DO MENU =====
document.getElementById('ir-temas').addEventListener('click', () => {
    mostrarTela('tela-temas');
    menuLateral.classList.add('escondido');
});

document.getElementById('ir-vozes').addEventListener('click', () => {
    mostrarTela('tela-vozes');
    menuLateral.classList.add('escondido');
});

document.getElementById('ir-preferencias').addEventListener('click', () => {
    alert('Em breve! 😊');
    menuLateral.classList.add('escondido');
});

document.getElementById('ir-planos').addEventListener('click', () => {
    alert('Gratuito: 50 mensagens/dia ✅\nPro: Ilimitado + recursos extras ⚡');
    menuLateral.classList.add('escondido');
});

document.getElementById('ir-conta').addEventListener('click', () => {
    alert('Configurações da conta em breve! 😊');
    menuLateral.classList.add('escondido');
});

document.getElementById('btn-sair').addEventListener('click', () => {
    mostrarTela('tela-inicio');
    menuLateral.classList.add('escondido');
});

document.getElementById('btn-ver-planos').addEventListener('click', () => {
    alert('Gratuito: 50 mensagens/dia ✅\nPro: Ilimitado + recursos extras ⚡');
});

// ===== MENU FLUTUANTE =====
const botaoMais = document.querySelector('.btn-icone.mais');
const menuMais = document.getElementById('menu-mais');

if (botaoMais && menuMais) {
    botaoMais.addEventListener('click', () => {
        menuMais.classList.toggle('escondido');
    });
}

document.getElementById('opcao-camera')?.addEventListener('click', () => {
    alert('Câmera em breve! 📷');
    menuMais.classList.add('escondido');
});

document.getElementById('opcao-fotos')?.addEventListener('click', () => {
    alert('Galeria em breve! 🖼️');
    menuMais.classList.add('escondido');
});

document.getElementById('opcao-arquivo')?.addEventListener('click', () => {
    alert('Enviar arquivo em breve! 📁');
    menuMais.classList.add('escondido');
});

document.getElementById('opcao-pensar')?.addEventListener('click', () => {
    alert('Modo raciocínio em breve! 🧠');
    menuMais.classList.add('escondido');
});

// ===== FECHAR MENU AO CLICAR FORA =====
document.addEventListener('click', (e) => {
    if (!menuLateral.contains(e.target) && !document.getElementById('btn-abrir-menu').contains(e.target)) {
        menuLateral.classList.add('escondido');
    }
    if (menuMais && !menuMais.contains(e.target) && !botaoMais?.contains(e.target)) {
        menuMais.classList.add('escondido');
    }
});

console.log('✅ SuperAI carregado com sucesso!');
