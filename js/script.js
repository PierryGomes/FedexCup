document.addEventListener('DOMContentLoaded', function() {
    // Ano atual no footer
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    
    // Troca de abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active class ao botão e conteúdo clicado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Carrega o conteúdo específico da aba
            if (tabId === 'jogadores') {
                loadPlayers();
            } else if (tabId === 'jogos') {
                loadGames();
            } else if (tabId === 'estatisticas') {
                loadStats();
            }
        });
    });
    
    // Filtros de jogadores
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.hasAttribute('data-year') ? 'year' : 'course';
            
            // Ativa o botão clicado
            document.querySelectorAll(`.filter-btn[data-${filterType}]`).forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Obtém filtros ativos
            const year = document.querySelector('.filter-btn[data-year].active')?.getAttribute('data-year') || 'all';
            const course = document.querySelector('.filter-btn[data-course].active')?.getAttribute('data-course') || 'all';
            
            // Aplica filtros
            loadPlayers(year, course);
        });
    });
    
    // Dados dos jogadores
    const playersData = {
        // ... (mantenha sua estrutura atual de playersData)
    };

    // Dados dos jogos (versão simplificada)
    const gamesData = {
        "2025": [
            {
                teams: ["2 SAT", "3 SAT"],
                score: "2 x 1",
                phase: "Grupo A",
                events: [
                    { type: "goal", player: "Pierry Gomes", team: "2 SAT" },
                    { type: "goal", player: "Pedro Sant'ana", team: "3 SAT" },
                    { type: "goal", player: "Rodrigo Nascimento", team: "2 SAT" },
                    { type: "yellow", player: "Otavio Taieti", team: "3 SAT" }
                ]
            },
            {
                teams: ["1 SAT", "2 SIT"],
                score: "0 x 3",
                phase: "Grupo B",
                events: [
                    { type: "goal", player: "Jogador 2 SIT", team: "2 SIT" },
                    { type: "goal", player: "Jogador 2 SIT", team: "2 SIT" },
                    { type: "goal", player: "Jogador 2 SIT", team: "2 SIT" }
                ]
            }
        ]
    };

    // Função para carregar jogadores
    function loadPlayers(yearFilter = 'all', courseFilter = 'all') {
        // ... (mantenha sua implementação atual)
    }

    // Função para carregar jogos
    function loadGames() {
        const container = document.getElementById('games-container');
        container.innerHTML = '';
        
        const year = document.getElementById('footer-year').textContent;
        const games = gamesData[year] || [];
        
        if (games.length === 0) {
            container.innerHTML = '<p>Nenhum jogo registrado ainda.</p>';
            return;
        }
        
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            
            // Processar eventos do jogo
            const eventsHtml = game.events.map(event => {
                let icon, color, label;
                switch(event.type) {
                    case 'goal':
                        icon = 'fa-futbol';
                        color = '#00c853';
                        label = 'Gol';
                        break;
                    case 'yellow':
                        icon = 'fa-square';
                        color = '#ffd600';
                        label = 'Cartão Amarelo';
                        break;
                    case 'red':
                        icon = 'fa-square';
                        color = '#ff1744';
                        label = 'Cartão Vermelho';
                        break;
                    default:
                        icon = 'fa-info-circle';
                        color = '#2979ff';
                        label = 'Evento';
                }
                
                return `
                    <div class="game-event">
                        <span class="event-badge" style="background: ${color}">
                            <i class="fas ${icon}"></i> ${label}
                        </span>
                        ${event.player} (${event.team})
                    </div>
                `;
            }).join('');
            
            gameCard.innerHTML = `
                <div class="game-phase">${game.phase}</div>
                <div class="game-teams">
                    <div class="team">${game.teams[0]}</div>
                    <div class="game-score">${game.score}</div>
                    <div class="team">${game.teams[1]}</div>
                </div>
                <div class="game-events">
                    ${eventsHtml || '<p>Nenhum evento registrado</p>'}
                </div>
            `;
            
            container.appendChild(gameCard);
        });
    }

    // Carrega os dados iniciais
    loadPlayers();
});