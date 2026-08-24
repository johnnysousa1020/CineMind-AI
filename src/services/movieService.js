import api from "../api/api";

export const getTrending = async () => {
    const response = await api.get("/trending");
    return response.data
}

export const getPopularMovies = async () => {
    const response = await api.get("/movies/popular");
    return response.data
}

export const getPopularSeries = async () => {
    const response = await api.get("/tv/popular");
    return response.data
}

export async function searchMedia(query) {
    const response = await api.get("/search", {
        params: {
            query
        }
    })

    return response.data
}

export async function getTopRatedMovies() {
    const response = await api.get("/movies/top_rated")

    return response.data
}

export async function getTopRatedSeries() {
    const response = await api.get("/tv/top_rated")

    return response.data.results
}

export async function getUpcomingMovies() {
    const response = await api.get("/movies/upcoming")

    return response.data
}

export async function getNowPlayingMovies() {
    const response = await api.get("/movies/now-playing")

    return response.data
}

export async function getOnTheAirSeries() {
    const response = await api.get("/tv/on_the_air")

    console.log(response.data)

    return response.data.results
}

export async function getMovieFull(id) {
    const response = await api.get(`/movie/${id}/full`)

    return response.data
}

export async function getSeriesFull(id) {
    const response = await api.get(`/tv/${id}/full`)

    return response.data
}

export async function getMovieTrailer(id) {
    const response = await api.get(`/movie/${id}/trailer`)

    return response.data
}

export async function getSerieTrailer(id) {
    const response = await api.get(`/tv/${id}/trailer`)

    return response.data
}