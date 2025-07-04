// Dados de exemplo (substitua por API futuramente)
const dados = {
    animes: [
        { titulo: "Attack on Titan", imagem: "aot.jpg", eps: 88 },
        { titulo: "Vanitas no Carte", imagem: "vanitas.jpg", eps: 24 }
    ],
    mangas: [
        { titulo: "Berserk", imagem: "berserk.jpg", capitulos: 400, genero: "Ação" }
    ],
    manhwas: [] // Adicione seus manhwas aqui quando tiver
};

// Função para criar cards
function criarCard(item, tipo) {
    const card = document.createElement("div");
    card.className = "card";
    
    let infoExtra = "";
    if (tipo === "anime") infoExtra = `${item.eps} episódios`;
    else if (tipo === "manga" || tipo === "manhwa") infoExtra = `Cap. ${item.capitulos}`;
    
    // Verifica se a imagem existe antes de criar o elemento img
    const imgElement = item.imagem 
        ? `<img src="imagens/${item.imagem}" alt="${item.titulo}" onerror="this.style.display='none'">`
        : '';
    
    card.innerHTML = `
        ${imgElement}
        <div class="card-info">
            <h3>${item.titulo}</h3>
            <p>${infoExtra}</p>
        </div>
    `;
    return card;
}

// Carrega todos os dados na página
function carregarDados() {
    const sections = {
        "anime-grid": { tipo: "anime", dados: dados.animes },
        "manga-grid": { tipo: "manga", dados: dados.mangas },
        "manhwa-grid": { tipo: "manhwa", dados: dados.manhwas }
    };

    for (const [id, secao] of Object.entries(sections)) {
        const grid = document.getElementById(id);
        if (grid && secao.dados.length > 0) {
            grid.innerHTML = ''; // Limpa o conteúdo antes de adicionar
            secao.dados.forEach(item => {
                grid.appendChild(criarCard(item, secao.tipo));
            });
        }
    }
}

// Carrossel
function initCarrossel() {
    const carrossel = document.querySelector(".carrossel");
    if (!carrossel) return;

    const items = document.querySelectorAll(".carrossel-item");
    if (items.length === 0) return;

    const btnPrev = document.querySelector(".carrossel-btn.prev");
    const btnNext = document.querySelector(".carrossel-btn.next");
    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarrossel();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarrossel();
        });
    }

    // Auto-avanço (opcional)
    const carrosselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarrossel();
    }, 5000);

    // Limpa o intervalo quando a página é fechada
    window.addEventListener('beforeunload', () => {
        clearInterval(carrosselInterval);
    });
}

// Inicializa tudo quando o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    initCarrossel();
    
    // Debug: Verifica os dados no console
    console.log("Dados carregados:", dados);
});