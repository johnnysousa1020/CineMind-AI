const HISTORY_KEY = "cinemind_history"

export function getHistory(){
    const history = localStorage.getItem(HISTORY_KEY)

    if(!history){
        return []
    }

    return JSON.parse(history)
}

export function saveConversation(conversation){
    const history = getHistory()

    const existingIndex = history.findIndex(
        item => item.id === conversation.id
    )

    if(existingIndex !== -1){
        history[existingIndex] = conversation
    }else{
        history.unshift(conversation)
    }

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    )

    window.dispatchEvent(
        new Event("historyUpdated")
    )
}

export function deleteConversation(id){
    const history = getHistory()

    const updatedHistory = history.filter(
        item => item.id !== id
    )

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
    )
}

export function clearHistory(){
    localStorage.removeItem(HISTORY_KEY)
}



export function getAIRecommendations(limit = 8){

    const history = getHistory()

    const recommendations = []

    history.forEach(conversation => {

        conversation.messages.forEach(message => {

        if(
            message.role === "assistant" &&
            message.recommendations?.length
        ){

            recommendations.push(
                ...message.recommendations
            )
         }

     })

    })

    const uniqueRecommendations = recommendations.filter(
        (media, index, array) => 
            index === array.findIndex(
                item => item.id === media.id
            )
    )

    return uniqueRecommendations.slice(0, limit)
}