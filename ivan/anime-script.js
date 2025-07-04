// Dados de exemplo (substitua por API futuramente)
const dados = {
    animes: [
        { titulo: "Seraph of the End", imagem: "yui.jfif", eps: 1100 },
        { titulo: "Vanitas no Carte", imagem: "Vanitas.jpg", eps: 88 }
    ],
    mangas: [
        { titulo: "Berserk", imagem: "berserk.jpg", capitulos: 400 },
        { titulo: "Chainsaw Man", imagem: "chainsaw.jpg", capitulos: 150 }
    ],
    manhwas: [
        { titulo: "Solo Leveling", imagem: "solo-leveling.jpg", capitulos: 200 },
        { titulo: "Tower of God", imagem: "tower-of-god.jpg", capitulos: 550 }
    ],
    novels: [
        { titulo: "Mushoku Tensei", volume: 26 },
        { titulo: "Overlord", volume: 16 }
    ]
};

// Função para criar cards
function criarCard(item, tipo) {
    const card = document.createElement("div");
    card.className = "card";
    
    let infoExtra = "";
    if (tipo === "anime") infoExtra = `${item.eps} episódios`;
    else if (tipo === "manga" || tipo === "manhwa") infoExtra = `Cap. ${item.capitulos}`;
    
    card.innerHTML = `
        <img src="imagens/${item.imagem}" alt="${item.titulo}">
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
        secao.dados.forEach(item => {
            grid.appendChild(criarCard(item, secao.tipo));
        });
    }
}

document.addEventListener("DOMContentLoaded", carregarDados);

// Exemplo: Filtrar mangás por gênero
function filtrarMangas(genero) {
    const mangasFiltrados = dados.mangas.filter(manga => manga.genero === genero);
    // Atualiza a grid...
}
// Carrossel
function initCarrossel() {
    const carrossel = document.querySelector(".carrossel");
    const items = document.querySelectorAll(".carrossel-item");
    const btnPrev = document.querySelector(".carrossel-btn.prev");
    const btnNext = document.querySelector(".carrossel-btn.next");
    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    btnNext.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarrossel();
    });

    btnPrev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarrossel();
    });

    // Auto-avanço (opcional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarrossel();
    }, 5000);
}

// Inicializa tudo quando o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
    carregarDados(); // Função anterior
    initCarrossel();
});