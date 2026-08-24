import MessageBubble from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"

function ChatWindow({ messages, isTyping }){
    return(
        <section className="chat-window">
            {messages.map((message, index) => (
                <MessageBubble 
                key={index}
                message={message}/>
            ))}

            {isTyping && (
                <TypingIndicator />
            )}
        </section>
    )
}

export default ChatWindow

/*

<div className="assiatant-message">
                <h3>🎬 Bem-vindo ao CineMind AI</h3>

                <p>
                    Descubra sua próxima história.
                </p>

                <p>
                    Posso recomendar filmes,
                    séries, trailers, elenco,
                    onde assistir, comparar títulos
                    e conversar sobre cinema.
                </p>

                <p>
                    O que vamos assistir hoje?
                </p>
            </div>
*/