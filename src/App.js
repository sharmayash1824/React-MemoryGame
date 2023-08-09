import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './component/SingleCard';

const cardImages = [
  {"src" : "/Images/Hanumanji.jpg" , matched: false},
  {"src" : "/Images/Ganeshji.jpg" , matched: false},
  {"src" : "/Images/Krishnaji.jpg" , matched: false},
  {"src" : "/Images/Radha Krishna.jpg" , matched: false},
  {"src" : "/Images/Ramji.jpg" , matched: false},
  {"src" : "/Images/Saraswatiji.jpg" , matched: false},
  {"src" : "/Images/Shivji.jpg" , matched: false},
  {"src" : "/Images/Laxmi maa.jpg" , matched: false}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisabled] = useState(false);
  
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(() => Math.random()-0.5)
    .map((card) => ({...card , id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);

  }

  // console.log(cards, turns)

  const handleChoice = (card) => {
    // console.log(card.src);
    choiceOne ? setChoiceTwo(card):setChoiceOne(card);
  }


  useEffect( () => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        console.log('Cards Match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log("Cards Don't Match")
        setTimeout(() => resetTurn(),500);
      }
    }
  },[choiceOne,choiceTwo])

// console.log(cards)

useEffect(() => {
  shuffleCards();
},[])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns => turns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>MEMORY GAME</h1>
      <div>
        <button onClick={shuffleCards}>New Game</button>
      </div>

      <div className="card-grid">
        {
          cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card===choiceOne || card===choiceTwo ||card.matched}
            disabled={disabled}
            />
          ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
