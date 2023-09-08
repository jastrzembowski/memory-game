import React from "react";
import "./card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    !disabled && handleChoice(card);
  };

  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt={card.id} />
        <img
          onClick={handleClick}
          className="back"
          src="img/cover.png"
          alt="back card"
        />
      </div>
    </div>
  );
}
