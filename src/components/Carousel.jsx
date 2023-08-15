import { useEffect, useState } from "react";
import { shortList, list, longList } from "../data"; 
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronRight,FiChevronLeft  } from 'react-icons/fi'



const Carousel = () => {

    let [people, setPeople] = useState(longList);
    let [currentSlide, setCurrentSlide] = useState(0);

    let prevSlide = () =>{
        setCurrentSlide((prevState)=>{

            
            let prevSlide = prevState - 1;

            if(prevSlide < 0){
                prevSlide = people.length - 1
            };
            return prevSlide;
        });
    };

    let nextSlide = () =>{
        setCurrentSlide((prevState)=>{

            let nextSlide = prevState + 1;

            if(nextSlide > people.length - 1){
                nextSlide = 0
            }

            return nextSlide;
        });
    };


    useEffect(()=>{
        let sliderId = setInterval(()=>{
            nextSlide()
        }, 2500)

        return () =>{
            clearInterval(sliderId)
        }

    },[currentSlide])

  return (
    <section className="slider-container">
        
        {people.map((item, personIndex)=>{

            let {id, name, title, image, quote} = item

            return (
                <article 
                    className="slide"
                    style={{

                        transform: `translateX(${100 * (personIndex - currentSlide)})`,
                        opacity: personIndex === currentSlide ? '1' : '0',
                        visibility: personIndex === currentSlide ? 'visible' : 'hidden'
                    }}

                    key={id}>

                    <img className="person-img" src={image}alt={name} />
                    <h5 className="name">{name}</h5>
                    <p className="title">{title}</p>
                    <p className="text">{quote}</p>
                    <FaQuoteRight className="icon"/>
                </article>
            )
        })}

        <button onClick={prevSlide} className="prev" type="button">
            <FiChevronLeft/>
        </button>

        <button onClick={nextSlide} className="next" type="button">
            <FiChevronRight/>
        </button>


    </section>
  )
}
export default Carousel