import { useEffect, useState } from "react"
import { sendMessage } from "../../services/assistantService";

function ChatInput({ messages, setMessages, setChatarTed, setIsTyping, initialPrompt }){
    const [input, setInput] = useState("")

    async function handleSend(messageToSend = input){

        if(!messageToSend.trim()) return

        const userMessage = {
            role: "user",
            content: input
        }

            setChatarTed(true)

            setMessages(prev => [
                ...prev,
                userMessage
            ])

            setIsTyping(true)

        try{

            const result = await sendMessage(messageToSend, messages)

            setMessages(prev => [
                ...prev,

                {
                    role: "assistant",
                    content: result.answer,
                    recommendations: result.recommendations
                }
            ])
        }catch(error){
            console.error(error)

            setMessages(prev => [
                ...prev,

                {
                    role: "assistant",

                    content: "X Ocorreu um erro ao conversar com o CineMMind AI."
                }
            ])
        }finally{
            setIsTyping(false)
            setInput("")
        }
    }

    useEffect(() => {
        if(initialPrompt){
            handleSend(initialPrompt)
        }
    }, [initialPrompt])

    return(
        <section className="chat-input-container">
            <div className="chat-input-box">
                <input 
                type="text" 
                placeholder="Pergunte sobre qualquer filme ou série..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleSend()
                    }
                }}/>

                <button onClick={() => handleSend()} disabled={!input.trim() || false}>
                    ➜
                </button>
            </div>
        </section>
    )
}

export default ChatInput
















/*
const answer = await sendMessage(input)

if(!input.trim()) return;

        setChatarTed(true)

        setMessages([
            ...messages,

            {
                role: "user",
                content: input
            }
        ]);

        setIsTyping(true)

        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Em breve esta resposta virá do Gemini."
                }
            ])

            setIsTyping(false)
        }, 2000)

        setInput("")
*/