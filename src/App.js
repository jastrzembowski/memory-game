import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";
const cardImages = [
  { src: "img/helmet-1.png", matched: false },
  { src: "img/potion-1.png", matched: false },
  { src: "img/ring-1.png", matched: false },
  { src: "img/scroll-1.png", matched: false },
  { src: "img/shield-1.png", matched: false },
  { src: "img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null)
    setChoiceTwo(null)
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);


  useEffect(()=>{
    shuffleCards()
  },[])



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched === true
            }
            disabled={disabled}
          />
        ))}
      </div>
      <h1>turns: {turns}</h1>
    </div>
  );
}

export default App;
