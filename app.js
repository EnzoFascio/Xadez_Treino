const app = new Vue({
  el: '#tabuleiro',
  data: {
    tabuleiro: [
      ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ],
    capturedPieces: [],
    currentPlayer: 'Jogador 1',
    score: {
      player1: 0,
      player2: 0,
    },
  },
  methods: {
    isValidMove(fromRow, fromCol, toRow, toCol) {
      const chess = new Chess();
      const board = chess.board();

      
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          board[i][j] = this.tabuleiro[i][j];
        }
      }

      const move = chess.move({ from: chess.square(fromRow, fromCol), to: chess.square(toRow, toCol) });
      return move.san !== ''; 
    },

    handleCellClick(rowIndex, colIndex) {
      const piece = this.tabuleiro[rowIndex][colIndex];

      if (piece.trim() !== '' && this.isCurrentPlayerPiece(piece)) {
        this.selectedPiece = `<span class="math-inline">\{rowIndex\}\-</span>{colIndex}`;
      } else if (this.selectedPiece !== null) {
        const [selectedRow, selectedCol] = this.selectedPiece.split('-');

        if (this.isValidMove(selectedRow, selectedCol, rowIndex, colIndex)) {
          const capturedPiece = this.tabuleiro[rowIndex][colIndex];

          this.tabuleiro[rowIndex][colIndex] = this.tabuleiro[selectedRow][selectedCol];
          this.tabuleiro[selectedRow][selectedCol] = ' ';

          if (capturedPiece.trim() !== '') {
            this.capturedPieces.push(capturedPiece);
            this.updateScore(capturedPiece);
          }

          this.currentPlayer = this.currentPlayer === 'Jogador 1' ? 'Jogador 2' : 'Jogador 1';

          this.selectedPiece = null;
          this.startPosition = null;
        }
      }
    },

    isCurrentPlayerPiece(piece) {
      return piece.trim() !== '' && piece.charAt(0) === this.currentPlayer.charAt(0);
    },

    updateScore(capturedPiece) {
      if (capturedPiece.charAt(0) === '♙') {
        this.score.player2 += 1;
      } else {
        this.score.player1 += 1;
      }
    },

    resetGame() {
    
        this.tabuleiro = [
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ]
        ['♖', '♘', '♗']
    }
}
});