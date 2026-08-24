import { useEffect, useState } from "react"
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies } from "../services/movieService"
import HeroBanner from "../components/home/HeroBanner"
import MediaSection from "../components/home/MediaSection"

function Movies(){
    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovies() {

            try{

            setLoading(true)

            const [
                popular,
                topRated,
                upcoming,
                nowPlaying
            ] = await Promise.all([
                getPopularMovies(),
                getTopRatedMovies(),
                getUpcomingMovies(),
                getNowPlayingMovies()
            ])

            setPopularMovies(
                popular.map(movie => ({
                    ...movie,
                    media_type: "movie"
                })));
            setTopRatedMovies(
                topRated.map(movie => ({
                    ...movie,
                    media_type: "movie"
                })));
            setUpcomingMovies(
                upcoming.map(movie => ({
                    ...movie,
                    media_type: "movie"
                })));
            setNowPlayingMovies(
                nowPlaying.map(movie => ({
                    ...movie,
                    media_type: "movie"
                })))

            }catch(error){
                console.error("Erro ao carregar filmes:", error)
            }finally{
                setLoading(false)
            }
        }


        loadMovies()
    }, [])

    if(loading){
        return(
            <div className="movies-page-loading">
                <div className="loading-spinner"></div>

                    <p>
                        Carregando filmes...
                    </p>
            </div>
        )
    }

    return(
        <div className="movies-page">
            <HeroBanner media={popularMovies}/>

            <MediaSection 
            title="🎬 Filmes Populares"
            media={popularMovies}/>

            <MediaSection 
            title="⭐ Mais Bem Avaliados"
            media={topRatedMovies}/>

            <MediaSection 
            title="🆕 Lançamentos"
            media={upcomingMovies}/>

            <MediaSection 
            title="🎥 Em cartaz"
            media={nowPlayingMovies}/>
        </div>
    )
}

export default Movies