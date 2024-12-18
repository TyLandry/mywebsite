document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const greenScoreDisplay = document.getElementById('green-score'); 
    const orangeScoreDisplay = document.getElementById('orange-score'); 
    const gamesPlayedDisplay = document.getElementById('games-played');

    const rows = 6;
    const cols = 3;
    const cells = [];
    let currentPlayer = 'green'; 
    let greenScore = 0; 
    let orangeScore = 0; 
    let gamesPlayed = 0;

    function initializeBoard() {
        board.innerHTML = ''; 
        for (let row = 0; row < rows; row++) {
            cells[row] = [];
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cells[row][col] = cell;
                board.appendChild(cell);
            }
        }
    }

    board.addEventListener('click', (event) => {
        if (!event.target.classList.contains('cell')) return;
        const col = parseInt(event.target.dataset.col);
        dropDisc(col);
    });

    function dropDisc(col) {
        for (let row = rows - 1; row >= 0; row--) {
            const cell = cells[row][col];
            if (!cell.classList.contains('taken')) {
                cell.classList.add('taken');

                const disc = document.createElement('div');
                disc.classList.add('disc', currentPlayer); 
                cell.appendChild(disc);

                if (checkWin(row, col)) {
                    handleWin(currentPlayer);
                } else {
                    currentPlayer = currentPlayer === 'green' ? 'orange' : 'green'; 
                }

                break;
            }
        }
    }

    function handleWin(winner) {
        setTimeout(() => {
            const winnerName = winner === 'green' ? 'Neon Green' : 'Neon Orange'; 
            alert(`${winnerName} wins!`);

            if (winner === 'green') {
                greenScore++;
                greenScoreDisplay.textContent = greenScore;
            } else {
                orangeScore++;
                orangeScoreDisplay.textContent = orangeScore;
            }

            gamesPlayed++;
            gamesPlayedDisplay.textContent = gamesPlayed;

            if (greenScore === 3 || orangeScore === 3) {
                alert(`${winnerName} wins the series! Scores are resetting.`);
                greenScore = 0;
                orangeScore = 0;
                gamesPlayed = 0;
                greenScoreDisplay.textContent = greenScore;
                orangeScoreDisplay.textContent = orangeScore;
                gamesPlayedDisplay.textContent = gamesPlayed;
            }

            board.style.pointerEvents = 'none'; 
        }, 100);
    }

    function checkWin(row, col) {
        return (
            checkDirection(row, col, 0, 1) || 
            checkDirection(row, col, 1, 0) || 
            checkDirection(row, col, 1, 1) || 
            checkDirection(row, col, 1, -1)   
        );
    }

    function checkDirection(row, col, rowInc, colInc) {
        let count = 1;
        count += countDiscs(row, col, rowInc, colInc);
        count += countDiscs(row, col, -rowInc, -colInc);
        return count >= 3;
    }

    function countDiscs(row, col, rowInc, colInc) {
        let r = row + rowInc;
        let c = col + colInc;
        let count = 0;

        while (r >= 0 && r < rows && c >= 0 && c < cols && cells[r][c].classList.contains('taken')) {
            const disc = cells[r][c].querySelector('.disc');
            if (disc && disc.classList.contains(currentPlayer)) {
                count++;
                r += rowInc;
                c += colInc;
            } else {
                break;
            }
        }

        return count;
    }

    restartButton.addEventListener('click', () => {
        board.style.pointerEvents = 'auto';
        currentPlayer = 'green'; 
        initializeBoard();
    });

    initializeBoard();
});
