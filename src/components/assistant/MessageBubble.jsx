import "../../styles/MessageBubble.css"
import ReactMarkdown from "react-markdown"
import RecommendationCard from "./RecommendationCard"

function MessageBubble({ message }){
    return(
        <div className={`message-bubble ${message.role}`}>
            <ReactMarkdown 
            components={{ 
                h1: ({children}) => <h1 className="markdown-title">{children}</h1>,
                h2: ({children}) => <h2 className="markdown-subtitle">{children}</h2>,
                p: ({children}) => <p className="markdown-text">{children}</p>,
                li: ({children}) => <li className="markdown-list">{children}</li>}}>
                {message.content}
            </ReactMarkdown>
            {message.recommendations?.length > 0 && (
                <div className="recommendations-container">
                    {message.recommendations.map((media) => (
                        <RecommendationCard 
                        key={`${media.media_type}-${media.id}`}
                        media={media}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MessageBubble

























// className="message-content"