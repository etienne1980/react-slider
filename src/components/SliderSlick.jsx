

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import { list } from "../data"; 
import { FaQuoteRight } from 'react-icons/fa'
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";


const SliderSlick = () => {

    let [people, setPeople] = useState(list)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: true,
        autoplay:true,  
        autoplaySpeed: 2500,
        pauseOnHover: true,
    
    };

    return (
             <section className="slick-container">

                <Breadcrumbs title='Slider (autoplay, stop on hover)'/>

                <Slider {...settings}>
                {people.map((item)=>{
                let {id, name, title, image, quote} = item
                return (
                    <article
                        key={id}>
                        <img className="person-img" src={image}alt={name} />
                        <h5 className="name">{name}</h5>
                        <p className="title">{title}</p>
                        <p className="text">{quote}</p>
                        <FaQuoteRight className="icon"/>
                    </article>
                )
                  })}
                </Slider>
              </section>    
    )

}
export default SliderSlick