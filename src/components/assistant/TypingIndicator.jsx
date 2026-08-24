import "../../styles/TypingIndicator.css"

function TypingIndicator(){
    return(
        <div className="typing-indicator">
            <div className="typing-avatar">
                <div className="typing-logo"></div>
            </div>

            <div className="typing-content">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default TypingIndicator