// Exemplo: Trocar cor do card ao clicar
const card = document.getElementById('destaque-1');

card.addEventListener('click', () => {
    card.style.backgroundColor = '#2a2a2a';
    card.style.transition = '0.3s';
});

// Futuramente, vocês podem adicionar:
// - Carregamento de dados (API de jogos/séries)
// - Slideshow de destaques
// - Sistema de comentários