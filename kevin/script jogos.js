// Configurações da API
const API_KEY = 'e9c325ed2dea4caca1c162537d438f28'; // SUA CHAVE AQUI
const API_URL = 'https://api.rawg.io/api/games';

// Elementos do DOM
const containerCalendario = document.getElementById('container-calendario');
const mesAtualElement = document.getElementById('mes-atual');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const loadingElement = document.getElementById('loading');
const erroElement = document.getElementById('erro');
const botoesFiltro = document.querySelectorAll('.filtros button');

// Estado da aplicação
let todosOsJogos = [];
let mesAtual = new Date().getMonth(); // 0-11 (Jan-Dez)
let anoAtual = new Date().getFullYear();
let filtroAtual = 'all';

// Função para mostrar/ocultar loading e erro
function toggleEstado(estado) { // 'loading', 'erro', 'conteudo'
    loadingElement.style.display = estado === 'loading' ? 'block' : 'none';
    erroElement.style.display = estado === 'erro' ? 'block' : 'none';
    containerCalendario.style.display = estado === 'conteudo' ? 'grid' : 'none';
}

// Função para formatar a data para o padrão BR
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

// Função para obter o nome do mês
function getNomeMes(mes) {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes];
}

// Função para atualizar o cabeçalho do mês/ano
function atualizarCabecalhoMes() {
    mesAtualElement.textContent = `${getNomeMes(mesAtual)} ${anoAtual}`;
}

// Função para buscar jogos da API
async function buscarJogos() {
    toggleEstado('loading');
    
    // Calcula as datas para o filtro da API (do primeiro ao último dia do mês atual)
    const primeiroDia = new Date(anoAtual, mesAtual, 1).toISOString().split('T')[0];
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).toISOString().split('T')[0];

    const url = `${API_URL}?key=${API_KEY}&dates=${primeiroDia},${ultimoDia}&ordering=released&page_size=50`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
        todosOsJogos = data.results || [];
        
        toggleEstado('conteudo');
        aplicarFiltroERenderizar();
        
    } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        toggleEstado('erro');
    }
}

// Função para renderizar a lista de jogos na tela
function renderizarJogos(jogosParaRenderizar) {
    containerCalendario.innerHTML = ''; // Limpa o container

    if (jogosParaRenderizar.length === 0) {
        containerCalendario.innerHTML = '<p class="loading">Nenhum jogo encontrado para este período.</p>';
        return;
    }

    jogosParaRenderizar.forEach(jogo => {
        const dataFormatada = formatarData(jogo.released);
        const plataformas = jogo.platforms ? jogo.platforms.map(p => p.platform.name) : ['Plataforma não informada'];

        const elementoJogo = document.createElement('div');
        elementoJogo.className = 'jogo';
        elementoJogo.dataset.plataformas = plataformas.join(',');

        elementoJogo.innerHTML = `
            <img src="${jogo.background_image || 'https://via.placeholder.com/300x180/21262d/58a6ff?text=Imagem+Não+Encontrada'}" 
                 alt="Capa de ${jogo.name}" 
                 onerror="this.src='https://via.placeholder.com/300x180/21262d/58a6ff?text=Imagem+Não+Encontrada'">
            <div class="info">
                <h3>${jogo.name}</h3>
                <span class="data">🗓️ ${dataFormatada}</span>
                <div class="plataformas">🎮 ${plataformas.join(' • ')}</div>
            </div>
        `;

        containerCalendario.appendChild(elementoJogo);
    });
}

// Função para aplicar o filtro e renderizar
function aplicarFiltroERenderizar() {
    let jogosFiltrados = todosOsJogos;

    if (filtroAtual !== 'all') {
        jogosFiltrados = todosOsJogos.filter(jogo => 
            jogo.platforms?.some(p => 
                p.platform.name.toLowerCase().includes(filtroAtual.toLowerCase())
            )
        );
    }

    renderizarJogos(jogosFiltrados);
}

// Event Listeners
btnPrev.addEventListener('click', () => {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    atualizarCabecalhoMes();
    buscarJogos();
});

btnNext.addEventListener('click', () => {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    atualizarCabecalhoMes();
    buscarJogos();
});

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Atualiza o botão ativo
        botoesFiltro.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');
        
        // Atualiza o filtro e re-renderiza
        filtroAtual = botao.dataset.filter;
        aplicarFiltroERenderizar();
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarCabecalhoMes();
    buscarJogos();
});