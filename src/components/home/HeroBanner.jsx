import { useEffect, useState } from "react";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroIndicators from "./HeroIndicators";
import "../home/HeroBanner.css"

function HeroBanner({ media }){
    const [currentMedia, setCurrentMendia] = useState(0)
    const [isChanging, setIsChanging] = useState(false)

    useEffect(() => {
        if(!media?.length) return

        const interval = setInterval(() => {
            setIsChanging(true);

            setTimeout(() => {

                setCurrentMendia((prev) => 
                prev === media.length - 1 ? 0 : prev + 1
              )
              setIsChanging(false)
            }, 300)

        }, 10000)

        return () => clearInterval(interval)
    }, [media])

    const selectedMedia = media?.[currentMedia]

    if (!selectedMedia) return null

    const image = `https://image.tmdb.org/t/p/original${selectedMedia.backdrop_path}`

    function changeBanner(index){
        if(index === currentMedia) return

        setIsChanging(true)

        setTimeout(() => {
            setCurrentMendia(index)
            setIsChanging(false)
        }, 300)
    }

    return(
        <section className={`hero-banner ${isChanging ? "changing" : ""}`} style={{ backgroundImage: `url(${image})`}}>
            <div className="hero-overlay">
                <div className="hero-info">
                    <HeroContent media={selectedMedia} />

                    <HeroButtons media={selectedMedia}/>
                </div>

                <HeroIndicators total={media.length} current={currentMedia} onChange={changeBanner}/>
            </div>
        </section>
    )
}

export default HeroBanner