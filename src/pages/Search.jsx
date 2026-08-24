import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMedia } from "../services/movieService";
import MediaCard from "../components/home/MediaCard";
import "../pages/Search.css"

function Search(){
   const [searchParams] = useSearchParams()
    const query = searchParams.get("query")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadSearch() {
            if(!query){
                setResults([])
                return
            }

            try{
                setLoading(true)

                const data = await searchMedia(query)
                const filteresResults = data
                .filter(
                    item => item.media_type === "movie" || item.media_type === "tv"
                )
                .map(item => ({
                    ...item,
                    media_type: item.media_type
                }))

                setResults(filteresResults)
            }catch(error){
                console.error("Erro ao pesquisar:", error)
                setResults([])
            }finally{
                setLoading(false)
            }
        }
        loadSearch()
    }, [query])

    return(
        <main className="search-page">
            <div className="search-header">
                <h1>
                    Resultados da pesquisa
                </h1>

                {query && (
                    <p>
                        Resultados para: <strong>"{query}"</strong>
                    </p>
                )}
            </div>

            {loading && (
                <div className="search-message">
                    <p>
                        🔍 Procurando no CineMind...
                    </p>
                </div>
            )}

            {!loading && results.length === 0 && query && (
                <div className="search-message">
                    <p>
                        Nenhum filme ou série encontrado.
                    </p>
                </div>
            )}

            {!loading && results.length > 0 && (
                <section className="search-results">
                    {results.map(media => (
                        <MediaCard 
                        key={`${media.media_type}-${media.id}`}
                        media={media}/>
                    ))}
                </section>
            )}
        </main>
    )
}

export default Search;