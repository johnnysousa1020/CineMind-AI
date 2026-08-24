import { useEffect, useState } from "react"
import { getPopularSeries, getTopRatedSeries, getOnTheAirSeries } from "../services/movieService"
import HeroBanner from "../components/home/HeroBanner"
import MediaSection from "../components/home/MediaSection"

function Series(){
    const [popularSeries, setPopularSeries] = useState([])
    const [topRatedSeries, setTopRatedSeries] = useState([])
    const [onTheAirSeries, setOnTheAirSeries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadSeries() {

            try{

            setLoading(true)

            const [
                popular,
                topRated,
                onTheAir
            ] = await Promise.all([
                getPopularSeries(),
                getTopRatedSeries(),
                getOnTheAirSeries()
            ])
            

            setPopularSeries(
                popular.map(serie => ({
                    ...serie,
                    media_type: "tv"
                }))
            )

            setTopRatedSeries(
                topRated.map(serie => ({
                    ...serie,
                    media_type: "tv"
                }))
            )

            setOnTheAirSeries(
                onTheAir.map(serie => ({
                    ...serie,
                    media_type: "tv"
                }))
            )

            }catch(error){
                console.error("Erro ao carregar séries:", error)
            }finally{
                setLoading(false)
            }
        }

        loadSeries()
    }, [])

    if(loading){

        return(
        <div className="series-page-loading">
            <div className="loading-spinner"></div>

            <p>
                Carregando séries...
            </p>
        </div>
        )
    }

    return(
        <div className="series-page">
            <HeroBanner media={popularSeries}/>

            <MediaSection 
            title="📺 Séries Populares"
            media={popularSeries}/>

            <MediaSection 
            title="⭐ Mais Bem Avaliados"
            media={topRatedSeries}/>

            <MediaSection 
            title="📡 Séries no Ar"
            media={onTheAirSeries}/>
        </div>
    )
}

export default Series