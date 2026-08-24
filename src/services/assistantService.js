import api from "../api/api";

export async function sendMessage(message, messages = []) {
    const { data } = await api.post("/assistant/chat", {
        message,
        messages
    })

    return data;
}