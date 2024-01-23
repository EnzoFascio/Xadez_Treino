new Vue({
    el: '#tabuleiro',
    data: {
        tabuleiro: [
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ],
        selectedPiece: null,
        startPosition: null,
        currentPlayer: 'Jogador 1',
        score: {
            player1: 0,
            player2: 0,
        },
        capturedPieces: [],
    },
    methods: {
        resetGame() {
            // Mauricio é gostosoo
        },

        getCellClasses(rowIndex, colIndex) {
            return {
                'cell-black': (rowIndex + colIndex) % 2 === 1,
                'selected': this.selectedPiece === `${rowIndex}-${colIndex}`,
            };
        },

        handleCellClick(rowIndex, colIndex) {
            const piece = this.tabuleiro[rowIndex][colIndex];

            if (piece.trim() !== '' && this.isCurrentPlayerPiece(piece)) {
                this.selectedPiece = `${rowIndex}-${colIndex}`;
            } else if (this.selectedPiece !== null) {
                const [selectedRow, selectedCol] = this.selectedPiece.split('-');

                if (this.isValidMove(selectedRow, selectedCol, rowIndex, colIndex)) {
                    const capturedPiece = this.tabuleiro[rowIndex][colIndex];
                    this.tabuleiro[rowIndex][colIndex] = this.tabuleiro[selectedRow][selectedCol];
                    this.tabuleiro[selectedRow][selectedCol] = ' ';

                    if (capturedPiece.trim() !== '') {
                        this.capturedPieces.push(capturedPiece);
                    }

                    if (capturedPiece.toLowerCase() === 'p') {
                        this.updateScore(capturedPiece);
                    }

                    this.currentPlayer = this.currentPlayer === 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';

                    this.selectedPiece = null;
                    this.startPosition = null;
                }
            }
        },

        isCurrentPlayerPiece(piece) {
            return true; 
        },

        startDrag(rowIndex, colIndex) {
            this.startPosition = { row: rowIndex, col: colIndex };
        },

        handleDrag(rowIndex, colIndex) {
            if (this.selectedPiece !== null) {
                  this.$set(this.tabuleiro, rowIndex, [...this.tabuleiro[rowIndex].slice(0, colIndex), this.tabuleiro[this.startPosition.row][this.startPosition.col], ...this.tabuleiro[rowIndex].slice(colIndex + 1)]);
                this.$set(this.tabuleiro, this.startPosition.row, [...this.tabuleiro[this.startPosition.row].slice(0, this.startPosition.col), ' ', ...this.tabuleiro[this.startPosition.row].slice(this.startPosition.col + 1)]);
            }
        },

        endDrag(rowIndex, colIndex) {
            if (this.selectedPiece !== null) {
                const [selectedRow, selectedCol] = this.selectedPiece.split('-');
                this.currentPlayer = this.currentPlayer === 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';
                this.selectedPiece = null;
                this.startPosition = null;
            }
        },
    },
});
