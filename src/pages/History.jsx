import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiClock, FiTrash2 } from "react-icons/fi"
import { getHistory, deleteConversation, clearHistory } from "../utils/history"
import "../pages/History.css"

function History(){
    const [history, setHistory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const savedHistory = getHistory()

        setHistory(savedHistory)
    }, [])

    function handleOpenConversation(id){
        navigate(`/assistant?conversation=${id}`)
    }

    function handleDelete(id){
        deleteConversation(id)

        setHistory(prev => prev.filter(conversation => conversation.id !== id)
     )
    }

    function handleClear(){
        clearHistory()
        setHistory([])
    }

    return(
        <main className="history-page">
            <header className="history-header">
                <div>
                    <h1>
                        <FiClock />
                        Histórico
                    </h1>

                    <p>
                        Suas conversas com o CineMind AI
                    </p>
                </div>

                {history.length > 0 && (
                    <button className="clear-history-button" onClick={handleClear}>
                        <FiTrash2 />
                        Limpar histórico
                    </button>
                )}
            </header>

            {history.length === 0 ? (
                <section className="history-empty">
                    <div className="hisstory-empty-icon">
                        <FiClock />
                    </div>

                    <h2>
                        Nenhuma conversa ainda
                    </h2>

                    <p>
                        Suas conversas com o CineMind AI aparecerão aqui.
                    </p>
                </section>

            ) : (

                <section className="history-list">
                    {history.map(conversation => (
                        <article 
                        className="history-card" 
                        key={conversation.id} 
                        onClick={() => handleOpenConversation(conversation.id)}>
                            <div className="history-card-icon">
                                <FiClock />
                            </div>

                            <div className="history-card-info">
                                <h2>
                                    {conversation.title}
                                </h2>

                                <p>
                                    {conversation.messages.length}
                                    mensagens
                                </p>
                            </div>

                            <button className="delete-history-button" 
                            onClick={(event) => {
                                event.stopPropagation()
                                handleDelete(conversation.id)}}>
                                <FiTrash2 />
                            </button>
                        </article>
                    ))}
                </section>
            )}
        </main>
    )
}

export default History