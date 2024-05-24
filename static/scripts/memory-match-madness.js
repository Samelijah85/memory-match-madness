$('document').ready(() => {
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
         * Renders a card element on the game board with the provided ID and value.
         * The card has a front and back side, with the front side being empty and the
         * back side having an image set as the background. The card is appended to the
         * game board and an onclick event is set to flip the card when clicked.
         *
         * @return {void} This function does not return a value.
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
         * Flips the specified card if it is not already popped or flipped, and adds it to the list of flipped cards.
         * If two cards are flipped, checks for a match.
         *
         * @param {HTMLElement} card - The card element to flip.
         * @return {void} This function does not return a value.
         */
        flipCard(card) {
            if (this.isFlippedOrPopped(card) || game.flippedCards.length === 2) return;

            card.classList.add('flipped');
            game.flippedCards.push(this);
            if (game.flippedCards.length === 2) game.checkMatch();
        }

        /**
         * Checks if the card is already flipped or popped.
         *
         * @param {HTMLElement} card - The card element to check.
         * @return {boolean} True if the card is flipped or popped, false otherwise.
         */
        isFlippedOrPopped(card) {
            return card.classList.contains('flipped') || card.classList.contains('popped');
        }

        /**
         * Resets the specified card by removing the 'flipped' class from its class list.
         *
         * @return {void} This function does not return a value.
         */
        resetCard() {
            const card = document.getElementById(this.id);
            card.classList.remove('flipped');
        }

        /**
         * Pops a card by removing the 'flipped' class and adding the 'popped' class to the card element.
         * It also updates the card front element by adding the 'card-popped' class and removing the 'card-front' class.
         *
         * @return {void} This function does not return a value.
         */
        popCard() {
            const card = document.getElementById(this.id);
            const cardFront = card.querySelector('.card-front');

            card.classList.remove('flipped');
            card.classList.add('popped');

            cardFront.classList.add('card-popped');
            cardFront.classList.remove('card-front');
        }
    }

    class MemoryMatchMadness {
        /**
         * Initializes a new instance of the MemoryMatchMadness class.
         *
         * This constructor initializes the cards array, flippedCards array, score, and matchedPairs properties.
         * It also calls the preloadImages method to load the images for the game.
         *
         * @return {void} This constructor does not return a value.
         */
        constructor() {
            this.cards = [];
            this.flippedCards = [];
            this.score = 0;
            this.matchedPairs = 0; // Track matched pairs
            this.preloadImages();
        }

        /**
         * Preloads images for the game by creating Image objects for each value in the range [0, 7]
         * and setting their source to the corresponding image URL.
         *
         * @return {void} This function does not return a value.
         */
        preloadImages() {
            const values = [0, 1, 2, 3, 4, 5, 6, 7];
            this.images = values.map(value => {
                const img = new Image();
                img.src = `https://raw.githubusercontent.com/Samelijah85/memory-match-madness/63eb61de5fe46955e571d37bc14379e3fe122ed1/static/images/cards/${value}.jpeg`;
                return img;
            });
        }

        /**
         * Initializes a new game by creating a shuffled array of card values and creating Card objects for each value.
         * The cards are then rendered on the game board.
         *
         * @return {void} This function does not return a value.
         */
        initGame() {
            const values = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
            values.sort(() => 0.5 - Math.random()); // Shuffle the cards
            this.cards = values.map((value, index) => new Card(index, value));
            this.renderCards();
        }

        /**
         * Renders the cards on the game board by clearing the existing content and
         * iterating over the cards array to call the render method of each card object.
         *
         * @return {void} This function does not return a value.
         */
        renderCards() {
            const gameBoard = document.getElementById('game-board');
            gameBoard.innerHTML = '';
            this.cards.forEach(card => card.render());
        }

        /**
         * Checks if the flipped cards match and performs the corresponding actions.
         *
         * @return {void} This function does not return a value.
         */
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

        /**
         * Updates the score by adding the score of the given cards and increments the attempts of both cards.
         * Also updates the score display on the HTML page.
         *
         * @param {Card} card1 - The first card to award points.
         * @param {Card} card2 - The second card to award points.
         * @return {void} This function does not return a value.
         */
        awardPoints(card1, card2) {
            this.score += card1.score;
            card1.attempts++;
            card2.attempts++;
            document.getElementById('score').textContent = `Score: ${game.score}`;
        }

        /**
         * Removes the specified cards after a delay of 1 second.
         *
         * @param {Card} card1 - The first card to remove.
         * @param {Card} card2 - The second card to remove.
         * @return {void} This function does not return a value.
         */
        removeCards(card1, card2) {
            setTimeout(() => {
                card1.popCard();
                card2.popCard();
            }, 1000);
        }

        /**
         * Resets the specified cards by resetting their state and adjusting their scores based on attempts.
         *
         * @param {Card} card1 - The first card to reset.
         * @param {Card} card2 - The second card to reset.
         */
        resetCards(card1, card2) {
            card1.resetCard();
            card2.resetCard();

            card1.attempts++;
            card2.attempts++;

            // Adjust scores based on attempts
            card1.score = Math.max(card1.score / 2, 0);
            card2.score = Math.max(card2.score / 2, 0);
        }

        /**
         * Resets the game by clearing the game state, updating the score display, and initializing a new game.
         *
         * @return {void} This function does not return a value.
         */
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

        /**
         * Displays a congratulatory message with the player's score and resets the game after a delay.
         *
         * @return {void} This function does not return a value.
         */
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

        /**
         * Resets the game by calling the `resetGame` method of the `game` object and updates the score display.
         *
         * @return {void} This function does not return a value.
         */
    document.getElementById('reset').onclick = () => {
        game.resetGame()
        document.getElementById('score').textContent = `Score: 0`;
    };
});
