import { useEffect, useState } from "react"
import { getTrending, getPopularMovies, getPopularSeries, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies, getOnTheAirSeries } from "../services/movieService"
import HeroBanner from "../components/home/HeroBanner"
import MediaSection from "../components/home/MediaSection"
import { getAIRecommendations } from "../utils/history"

function Home(){
    console.log("Home")
    const [trending, setTrending] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [popularSeries, setPopularSeries] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [onTheAirSeries, setOnTheAirSeries] = useState([])
    const [aiRecommendations, setAiRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadRecommendations(){
            const recommendations = getAIRecommendations(8)
            setAiRecommendations(recommendations)
        }

        loadRecommendations()

        window.addEventListener(
            "historyUpdated",
            loadRecommendations
        )

        return () => {
            window.removeEventListener(
                "historyUpdated",
                loadRecommendations
            )
        }
    }, [])

    useEffect(() => {

        async function loadData() {

            try{

            const trendingData = await getTrending()
            const moviesData = await getPopularMovies()
            const seriesData = await getPopularSeries()
            const topRatedData = await getTopRatedMovies()
            const upcomigData = await getUpcomingMovies()
            const nowPlayingData = await getNowPlayingMovies()
            const onTheAirData = await getOnTheAirSeries()

            setTrending(trendingData)

            setPopularMovies(
                moviesData.map(movie => ({
                    ...movie,
                    media_type: "movie"
                }))
            )

            setPopularSeries(
                seriesData.map(series => ({
                    ...series,
                    media_type: "tv"
                }))
            )

            setTopRatedMovies(
                topRatedData.map(movie => ({
                    ...movie,
                    media_type: "movie"
                }))
            )

            setUpcomingMovies(
                upcomigData.map(movie => ({
                    ...movie,
                    media_type: "movie"
                }))
            )

            setNowPlayingMovies(
                nowPlayingData.map(movie => ({
                    ...movie,
                    media_type: "movie"
                }))
            )

            setOnTheAirSeries(
                onTheAirData.map(series => ({
                    ...series,
                    media_type: "tv"
                }))
            )

            }catch(error){
                console.error("Erro ao carregar Home:", error)
            }finally{
                setLoading(false)
            }

        }

        loadData()
    }, [])

    return (
        <div className="home">
            <HeroBanner media={trending}/>

            <MediaSection title="🔥 Em Alta" media={trending} loading={loading}/>
            <MediaSection title="⭐ Mais Bem Avaliados" media={topRatedMovies} loading={loading}/>
            <MediaSection title="🎬 Filmes Populares" media={popularMovies} loading={loading}/>
            <MediaSection title="📺 Séries Populares" media={popularSeries} loading={loading}/>
            <MediaSection title="🆕 Lançamentos" media={upcomingMovies} loading={loading}/>
            <MediaSection title="🎥 Em cartaz" media={nowPlayingMovies} loading={loading}/>
            <MediaSection title="📡 Séries no Ar" media={onTheAirSeries} loading={loading}/>
            <MediaSection title="🤖 Recomendados pela IA" media={aiRecommendations} loading={false}/>
        </div>
    )
}

export default Home