const FAVORITES_KEY = "cinemid-favorites";

export function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY)

    return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export function isFavorite(id){
    return getFavorites().some(item => item.id === id)
}

export function addFavorite(media){
    const favorites = getFavorites();

    if(!favorites.some(item => item.id === media.id))
    {
        favorites.push(media)
        saveFavorites(favorites)
        window.dispatchEvent(new Event("favoritesUpdated"))
    }
}

export function removeFavorite(id){
    const favorites = getFavorites().filter(item => item.id !== id)

    saveFavorites(favorites)
}

export function toggleFavorite(media){
    if(isFavorite(media.id)){
        removeFavorite(media.id)
    }else{
        addFavorite(media)
    }
}