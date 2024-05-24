class Card {
    /**
     * Initializes a new instance of the Card class.
     *
     * @param {number} id - The unique identifier for the card.
     * @param {number} value - The value of the card.
     */
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.imagePath = `https://raw.githubusercontent.com/Samelijah85/memory-match-madness/63eb61de5fe46955e571d37bc14379e3fe122ed1/static/images/cards/${value}.jpeg`; // Set the image path based on value
        this.score = 8; // Initial score for each card
        this.attempts = 0;
    }

    /**
     * Renders a new card element and appends it to the game board.
     *
     * @return {void} 
     */
    render() {
        let card = document.createElement('div');
        card.classList.add('card');
        card.id = this.id;
        card.dataset.value = this.value;

        let cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = "";

        let cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url(${this.imagePath})`; // Set image as background
        cardBack.textContent = ""; // Clear any text content

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.onclick = () => this.flipCard(card);
        document.getElementById('game-board').appendChild(card);
    }

    /**
     * Flips a card and checks for a match.
     *
     * @param {HTMLElement} card - The card element to flip.
     * @return {void} This function does not return a value.
     */
    flipCard(card) {
        if (card.classList.contains('popped') || card.classList.contains('flipped') || game.flippedCards.length === 2) {
            return;
        }
        card.classList.add('flipped');
        game.flippedCards.push(this);
        if (game.flippedCards.length === 2) {
            game.checkMatch();
        }
    }

    /**
     * Resets the card by removing the 'flipped' class, removing the background image, and clearing any text content.
     *
     * @param {string} id - The ID of the card element.
     * @return {void} This function does not return a value.
     */
    resetCard() {
        let card = document.getElementById(this.id);
        card.classList.remove('flipped');
    }

    setCard() {
        let card = document.getElementById(this.id);
        card.textContent = this.id;
    }

    popCard() {
        let card = document.getElementById(this.id);
        card.classList.remove('flipped');
        card.classList.add('popped');

        let cardFront = card.querySelector('.card-front');
        cardFront.classList.add('card-popped');
        cardFront.classList.remove('card-front');
    }
}

class MemoryMatchMadness {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.score = 0;
        this.matchedPairs = 0; // Track matched pairs
        this.preloadImages();
    }

    preloadImages() {
        const values = [0, 1, 2, 3, 4, 5, 6, 7];
        this.images = values.map(value => {
            const img = new Image();
            img.src = `https://raw.githubusercontent.com/Samelijah85/memory-match-madness/63eb61de5fe46955e571d37bc14379e3fe122ed1/static/images/cards/${value}.jpeg`;
            return img;
        });
    }

    initGame() {
        const values = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
        values.sort(() => 0.5 - Math.random()); // Shuffle the cards
        this.cards = values.map((value, index) => new Card(index, value));
        this.renderCards();
        //values.forEach((value, index) => {
        //    let card = new Card(index, value);
        //    this.cards.push(card);
        //    card.render();
        //});
    }

    renderCards() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        this.cards.forEach(card => card.render());
    }

    checkMatch() {
        let [card1, card2] = this.flippedCards;
        if (card1.value === card2.value) {
            this.awardPoints(card1, card2);
            this.removeCards(card1, card2);
            this.matchedPairs++;
            if (this.matchedPairs === this.cards.length / 2) {
                this.showCongratsMessage();
            }
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
            card1.popCard();
            card2.popCard();
        }, 1000);
    }

    resetCards(card1, card2) {
        card1.resetCard();
        card2.resetCard();

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
        this.matchedPairs = 0;
        document.getElementById('score').textContent = `Score: 0`;
        // Clear the game board
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = "";
        // Initialize a new game
        this.initGame();
    }

    showCongratsMessage() {
        const messageElement = document.getElementById('congrats-message');
        messageElement.textContent = `Congratulations! Your score is ${this.score}.`;
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none'; // Hide message after 2 seconds
            this.resetGame();
        }, 4000);
    }
}

const game = new MemoryMatchMadness();
game.initGame();

document.getElementById('reset').onclick = () => {
    game.resetGame()
    document.getElementById('score').textContent = `Score: 0`;
};
