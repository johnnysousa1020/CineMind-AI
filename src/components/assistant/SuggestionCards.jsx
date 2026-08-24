import { useState } from "react"
import { sendMessage } from "../../services/assistantService"

function SuggestionCards({ setMessages, setChatarTed, setIsTyping }){
    const [loading, setLoading] = useState(false)

    const suggestions = [
        {
           title: "🎬 Recomende um filme",
           prompt: "Me recomende alguns filmes excelentes para assistir hoje."
        },
        {
            title: "📺 Quero uma série",
            prompt: "Me recomende algumas séries excelentes para assistir hoje."
        },
        {
            title: "🍿 Estou indeciso",
            prompt: "Estou indeciso sobre o que assistir hoje. Me ajude a escolher um filme ou série."
        },
        {
            title: "🚀 Ficção Científica",
            prompt: "Me recomende filmes ou séries de ficção científica."
        },
        {
            title: "😂 Comédia",
            prompt: "Me recomende filmes ou séries de comédia para assistir."
        },
        {
            title: "❤️ Romance",
            prompt: "Me recomende filmes ou séries de romance para assistir."
        }
    ]

     async function handleSuggestion(prompt){
        if(loading) return

        setLoading(true)
        setChatarTed(true)
        setIsTyping(true)

        setMessages([
            {
                role: "user",
                content: prompt
            },
        ])

        try{
            const result = await sendMessage(prompt, [])

            setMessages([
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: result.answer,
                    recommendations: result.recommendations
                }
            ])
        }catch(error){
            console.error("Erro ao usar sugestão:", error)

            setMessages([
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: "Desculpe, não consegui conversar com o CineMind AI agora."
                }
            ])
        }finally{
            setIsTyping(false)
            setLoading(false)
        }
    }

    return(
        <section className="suggestions">
            <h3>
                O que vamos assistir hoje?
            </h3>

            <div className="suggestions-grid">
                {suggestions.map((suggestion) => (
                    <button 
                    key={suggestion.title} 
                    className="seggestion-card" 
                    onClick={() => handleSuggestion(suggestion.prompt)} 
                    disabled={loading}>
                        {suggestion.title}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default SuggestionCards