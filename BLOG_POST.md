![Memory Match Madness](https://raw.githubusercontent.com/Samelijah85/memory-match-madness/main/static/images/favicon/android-chrome-512x512.png)

# Memory Match Madness
### A Classic Card Matching Game to Test Your Memory

---

## Introduction

Welcome to Memory Match Madness, a classic card matching game designed to test and improve your memory skills. Our project is a simple yet engaging game where players flip cards to find matching pairs. 

**Team Members**:
- **[Sam Elijah Kwasi]**: Lead Developer

**Purpose**:
Our project aims to create an entertaining and challenging game that enhances memory and concentration.

**Target Audience**:
This game is designed for players of all ages who enjoy memory challenges and casual gaming.

**Personal Focus**:
My personal focus was on the full-stack development of the game, including the front-end design, game logic implementation, and user experience optimization.

---

## Story of Inspiration

Memory Match Madness was inspired by my childhood love for card games. Growing up, I spent countless hours playing card matching games with my family and friends. These games were not only fun but also helped sharpen my memory and attention to detail. The joy and nostalgia of those moments inspired me to recreate that experience in a digital format. My goal was to build a game that is both fun and beneficial for cognitive skills, making it accessible to a wider audience through a web-based platform.

---

## Accomplishments

**Architecture Diagram**:
![Architecture Diagram](https://raw.githubusercontent.com/Samelijah85/memory-match-madness/main/static/images/mmm-screenshot-1.png)

**Technologies Used**:
- **Frontend**: HTML5, CSS3, JavaScript
  - Chose these technologies to solidify my understanding of core web development concepts without relying on additional frameworks.
- **Version Control**: GitHub
  - Used for version control and collaboration, ensuring a smooth development process.

**Completed Features**:
1. **Card Flipping Animation**:
   - Smooth animations when cards are flipped, providing a visually appealing user experience.
2. **Scoreboard and Game Restart**:
   - Real-time score tracking and a restart button for replayability.
3. **Congratulatory Message**:
   - Displays a congratulatory message when all pairs are successfully matched, enhancing user satisfaction.

---

## Technical Challenge

One of the most difficult technical challenges I faced was implementing smooth card flipping animations using CSS and JavaScript.

**Situation**:
To create an engaging user experience, I needed the cards to flip smoothly, revealing their content when clicked and flipping back if they didn't match.

**Task**:
I had to ensure that the animations were smooth and synchronized with the game logic to avoid any discrepancies or glitches.

**Action**:
I started by researching CSS animations and JavaScript timing functions. I experimented with various techniques to achieve the desired effect. The key was to use CSS transitions for the flip animation and JavaScript to handle the game logic. Here's a snippet of the animation code:

```javascript
isFlippedOrPopped(card) {
    return card.classList.contains('flipped') || card.classList.contains('popped');
}

flipCard(card) {
    if (this.isFlippedOrPopped(card) || game.flippedCards.length === 2) return;

    card.classList.add('flipped');
    game.flippedCards.push(this);
    if (game.flippedCards.length === 2) game.checkMatch();
}
```

**Result**:
After several iterations and testing, I achieved smooth and responsive animations that significantly enhanced the gameplay experience. This challenge taught me a lot about the intricacies of animations and timing functions in web development.

---

## Learnings

**Technical Takeaways**:
- Improved understanding of CSS animations and JavaScript event handling.
- Gained experience in creating responsive and interactive web applications.

**What I Might Do Differently**:
- Plan more time for testing and refining animations to avoid last-minute adjustments.

**Personal Growth as an Engineer**:
- This project reinforced my interest in front-end development and user experience design. It also taught me the importance of balancing aesthetics with functionality.

**Future Engineering Path**:
- I am now more confident in my ability to tackle complex web development challenges and am excited to explore more advanced frameworks and libraries in future projects.

**Beliefs Confirmed or Questioned**:
- Confirmed the value of focusing on core technologies (HTML, CSS, JavaScript) before moving on to more complex frameworks.

---

## Conclusion

Memory Match Madness was a rewarding project that allowed me to combine my love for games with my passion for web development. The process was challenging but immensely educational, and I am proud of the final product.

---

## About Me

I am an aspiring software engineer with a keen interest in web development and user experience design. You can view the project on GitHub and play the game online using the links below.

- [Deployed Project Page](https://samelijah85.github.io/memory-match-madness/game/)
- [Project Landing Page](https://samelijah85.github.io/memory-match-madness/)
- [LinkedIn Profile](#)

Thank you for reading about my project! Feel free to reach out with any questions or feedback.
