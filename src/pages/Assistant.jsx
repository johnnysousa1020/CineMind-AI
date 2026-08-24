import AssistantHero from "../components/assistant/AssistantHero"
import SuggestionCards from "../components/assistant/SuggestionCards"
import ChatWindow from "../components/assistant/ChatWindow"
import ChatInput from "../components/assistant/ChatInput"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { saveConversation } from "../utils/history"
import { useSearchParams } from "react-router-dom"
import { getHistory } from "../utils/history"
import "../styles/Assistant.css"

function Assistant(){
    const [searchParams] = useSearchParams()
    const conversationIdFromUrl = searchParams.get("conversation")

    const [chatStarted, setChatarTed] = useState(false)
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const location = useLocation()

    const [conversationId, setConversationId] = useState(() => 
      conversationIdFromUrl || Date.now().toString()
    )

    useEffect(() => {
        if(!conversationIdFromUrl) return

        const history = getHistory()

        const conversation = history.find(
            item => item.id === conversationIdFromUrl
        )

        if(!conversation){
            console.warn("Conversa não encontrada:", conversationIdFromUrl) 
            return
        }

        setMessages(conversation.messages)
        setChatarTed(true)
        setConversationId(conversation.id)

    }, [conversationIdFromUrl])

    useEffect(() => {
        if(messages.length === 0) return

        const firstUserMessage = messages.find(
            message => message.role === "user"
        )

        if(!firstUserMessage) return

        const conversation = {
            id: conversationId,
            title: firstUserMessage.content,
            date: new Date().toISOString(),
            messages
        }

        saveConversation(conversation)

    }, [messages, conversationId])

    const initialPrompt = location.state?.prompt

    useEffect(() => {
        if(initialPrompt){
            setChatarTed(true)
        }
    }, [initialPrompt])

    return(
        <div className="assistant-page">
             <AssistantHero />

             {!chatStarted && !initialPrompt && (
                <SuggestionCards setMessages={setMessages} setChatarTed={setChatarTed} setIsTyping={setIsTyping}/>
             )}

            {chatStarted && (
                <ChatWindow messages={messages} isTyping={isTyping}/>
            )}

            <ChatInput messages={messages} setMessages={setMessages} setChatarTed={setChatarTed} setIsTyping={setIsTyping} initialPrompt={initialPrompt}/>
        </div>
    )
}

export default Assistant