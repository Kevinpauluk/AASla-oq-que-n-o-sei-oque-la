        // Sua chave API da RAWG
        const API_KEY = 'e9c325ed2dea4caca1c162537d438f28';
        // Data de hoje no formato AAAA-MM-DD
        const hoje = new Date().toISOString().split('T')[0];
        // Fim do ano
        const fimDoAno = '2024-12-31';

        // A URL da API para buscar jogos com data de lançamento entre hoje e o fim do ano, ordenados por data
        const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${hoje},${fimDoAno}&ordering=released`;

        // O elemento HTML onde vamos colocar os jogos
        const container = document.getElementById('calendario');

        // Função principal que busca os dados
        async function carregarCalendario() {
            try {
                // Faz a requisição para a API
                const response = await fetch(apiUrl);
                const data = await response.json();

                // 'data.results' é a array com a lista de jogos
                data.results.forEach(jogo => {
                    // Formata a data para o padrão BR
                    const dataLancamento = new Date(jogo.released).toLocaleDateString('pt-BR');

                    // Cria o HTML para cada jogo
                    const elementoJogo = `
                        <div class="jogo">
                            <img class="capa" src="${jogo.background_image}" alt="Capa de ${jogo.name}">
                            <div class="info">
                                <h2>${jogo.name}</h2>
                                <p class="data">🏁 Lançamento: ${dataLancamento}</p>
                                <p>Plataformas: ${jogo.platforms.map(p => p.platform.name).join(', ')}</p>
                            </div>
                        </div>
                    `;

                    // Adiciona o jogo ao container
                    container.innerHTML += elementoJogo;
                });

            } catch (error) {
                // Se der erro, mostra no console e para o usuário
                console.error("Erro ao carregar o calendário:", error);
                container.innerHTML = "<p>Opa! Não foi possível carregar o calendário de lançamentos no momento.</p>";
            }
        }

        // Chama a função quando a página carregar
        carregarCalendario();