import MediaCard from "./MediaCard";
import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "../home/MediaCarousel.css"

function MediaCarousel({ medias }){
    const carouselRef = useRef(null)

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -900,
            behavior: "smooth",
        })
    }

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: 900,
            behavior: "smooth",
        })
    }

    return(
        <section className="media-carousel">
            <button className="carousel-button left" onClick={scrollLeft}>
                <HiChevronLeft />
            </button>

            <div className="carousel-track" ref={carouselRef}>
                {medias?.map((media) => (
                    <MediaCard 
                    key={media.id}
                    media={media}
                    title={media.title}
                    image={media.image}
                    rating={media.rating}
                    type={media.type}/>
                ))}
            </div>

            <button className="carousel-button right" onClick={scrollRight}>
                <HiChevronRight />
            </button>
        </section>
    )
}

export default MediaCarousel








/*
const medias = [
        {
            id: 1,
            title: "Interestelar",
            image: "https://via.placeholder.com/300x450",
            rating: "8.7",
            type: "Filme",
        },
        {
            id: 2,
            title: "Stranger Things",
            image: "https://via.placeholder.com/300x450",
            rating: "8.9",
            type: "Série",
        },

        {
            id: 3,
            title: "O Batman",
            image: "https://via.placeholder.com/300x450",
            rating: "8.0",
            type: "Filme",
        },
    ]

*/