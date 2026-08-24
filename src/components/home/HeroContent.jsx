import "../home/HeroContent.css"

function HeroContent({ media }){
    const title = media.title || media.name;

    const year = media.release_date?.slice(0,4) || media.first_air_date?.slice(0,4)

    return(
        <div className="hero-content">
            <div className="hero-badges">
                <span className="media-type">
                    {media.media_type === "movie" ? "🎬 Filme" : "📺 Série"}
                </span>
                <span className="age-rating">16+</span>
            </div>

            <div className="hero-rating">
                ⭐ {media.vote_average.toFixed(1)}
            </div>

            <h1>{title}</h1>

            <p>
                {media.overview}
            </p>

            <div className="hero-details">
                <span>{year}</span>
                <span>Popularidade: {Math.round(media.popularity)}</span>
            </div>
        </div>
    )
}

export default HeroContent