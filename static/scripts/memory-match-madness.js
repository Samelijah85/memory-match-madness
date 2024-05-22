class Card {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.score = 8; // Initial score for each card
        this.attempts = 0;
    }

    render() {
        let card = document.createElement('div');
        card.classList.add('card');
        card.id = this.id;
        card.dataset.value = this.value;
        card.onclick = () => this.flipCard(card);
        document.getElementById('game-board').appendChild(card);
    }

    flipCard(card) {
        if (card.classList.contains('flipped') || game.flippedCards.length === 2) {
            return;
        }
        card.classList.add('flipped');
        card.textContent = this.value;
        game.flippedCards.push(this);
        if (game.flippedCards.length === 2) {
            game.checkMatch();
        }
    }

    setCard() {
        let card = document.getElementById(this.id);
        card.textContent = this.id;
    }

    clearCard() {
        let card = document.getElementById(this.id);
        card.textContent = "";
    }
}

class MemoryMatchMadness {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.score = 0;
    }

    initGame() {
        const values = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        values.sort(() => 0.5 - Math.random()); // Shuffle the cards
        values.forEach((value, index) => {
            let card = new Card(index, value);
            this.cards.push(card);
            card.render();
        });
    }

    checkMatch() {
        let [card1, card2] = this.flippedCards;
        if (card1.value === card2.value) {
            this.awardPoints(card1, card2);
            this.removeCards(card1, card2);
        } else {
            setTimeout(() => this.resetCards(card1, card2), 1000);
        }
        this.flippedCards = [];
    }

    awardPoints(card1, card2) {
        this.score += card1.score;
        card1.attempts++;
        card2.attempts++;
        // console.log(`Score: ${this.score}`);
        document.getElementById('score').textContent = `Score: ${game.score}`;
    }

    removeCards(card1, card2) {
        setTimeout(() => {
            document.getElementById(card1.id).classList.add('popped');
            document.getElementById(card2.id).classList.add('popped');
            card1.clearCard();
            card2.clearCard();
        }, 500);
    }

    resetCards(card1, card2) {
        let cardElement1 = document.getElementById(card1.id);
        let cardElement2 = document.getElementById(card2.id);
        cardElement1.classList.remove('flipped');
        cardElement2.classList.remove('flipped');
        cardElement1.textContent = "";
        cardElement2.textContent = "";

        card1.attempts++;
        card2.attempts++;

        // Adjust scores based on attempts
        card1.score = Math.max(card1.score / 2, 0);
        card2.score = Math.max(card2.score / 2, 0);
    }

    resetGame() {
        // Clear game state
        this.cards = [];
        this.flippedCards = [];
        this.score = 0;
        // Clear the game board
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = "";
        // Initialize a new game
        this.initGame();
    }
}

const game = new MemoryMatchMadness();
game.initGame();

document.getElementById('reset').onclick = () => {
    game.resetGame()
    document.getElementById('score').textContent = `Score: 0`;
};
