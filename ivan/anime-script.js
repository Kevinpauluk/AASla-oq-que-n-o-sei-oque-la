// Dados de exemplo (substitua por API futuramente)
const dados = {
    animes: [
        { titulo: "One Piece", imagem: "one-piece.jpg", eps: 1100 },
        { titulo: "Attack on Titan", imagem: "aot.jpg", eps: 88 }
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