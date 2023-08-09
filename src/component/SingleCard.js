import './SingleCard.css';

export default function SingleCard({card,handleChoice,flipped,disabled}) {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
          <div className={flipped?"flipped":""}>
            <img 
                src={card.src} 
                className="front" 
                alt="front image"
            />
            <img 
                src="/Images/cover1.jpg" 
                className="back"
                alt="back image" 
                onClick={handleClick}
            /> 
          </div>
        </div>
    )
}