import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlay } from "react-icons/fa"
import { HiOutlineInformationCircle } from "react-icons/hi2"
import { MdOutlineSmartToy } from "react-icons/md"
import { getMovieTrailer, getSerieTrailer } from "../../services/movieService"
import "../home/HeroButtons.css"

function HeroButtons({ media }){
    const navigate = useNavigate();
    const [trailer, setTrailer] = useState(null)
    const [loadingTrailer, setLoadingTrailer] = useState(false)
    const title = media.title || media.name;
    const mediaType = media.media_type

    async function handleTrailer() {
        try{
            setLoadingTrailer(true)

            const trailer = mediaType === "movie"
            ? await getMovieTrailer(media.id)
            : await getSerieTrailer(media.id)

            if(!trailer){
                alert("Trailer não encontrado")
                return
            }

            setTrailer(trailer.key)

        }catch(error){

            console.error("Erro ao buscar trailer:", error)

            alert("Não foi possivel carregar o trailer.")

        }finally{
            setLoadingTrailer(false)
        }
    }

    function handleDetails(){
        if(mediaType === "movie"){
            navigate(`/movies/${media.id}`)
        }else{
            navigate(`/series/${media.id}`)
        }
    }

    function handleAskAI(){
        navigate("/assistant", {
            state: {
                prompt: `Me conte mais sobre ${title}. 
                Quero saber por que vale a pena assistir, a avaliação, 
                o gênero e o elenco principal`
            }
        })
    }

    return (
        <>
        <div className="hero-buttons">
            <button className="btn-trailer" onClick={handleTrailer} disabled={loadingTrailer}>
                <FaPlay />
                {loadingTrailer
                ? "Carregando..."
                : "Assistir Trailer"}
            </button>

            <button className="btn-details" onClick={handleDetails}>
                <HiOutlineInformationCircle />
                Ver Detalhes
            </button>

            <button className="btn-ai" onClick={handleAskAI}>
                <MdOutlineSmartToy />
                Perguntar para IA
            </button>
        </div>

        {trailer && (
            <div className="trailer-modal-novo">
                <div className="trailer-modal-content-novo">
                    <button className="trailer-close-novo" onClick={() => setTrailer(null)}>
                        X
                    </button>

                    <iframe 
                    src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                    title={`Trailer de ${title}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen />
                </div>
            </div>
        )}
        </>
    )
}

export default HeroButtons