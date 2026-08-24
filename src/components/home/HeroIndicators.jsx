import "../home/HeroIndicators.css"

function HeroIndicators({ total, current, onChange }){
    return (
        <div className="hero-indicators">
            {Array.from({ length: total }).map((_, index) => (
            <button 
            key={index}
            className={`indicator ${index === current ? "active" : ""}`} onClick={() => onChange(index)}/>
        ))}
        </div>
    )
}

export default HeroIndicators