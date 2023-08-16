import { useEffect, useState } from "react";
import { shortList, list, longList } from "../data"; 
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronRight,FiChevronLeft  } from 'react-icons/fi'
import Breadcrumbs from './Breadcrumbs'



const Carousel = () => {

    let [people, setPeople] = useState(longList); //<<-- set up state variable = array of people

    let [currentSlide, setCurrentSlide] = useState(0); //<<-- set up current slide

    let [bcTitle, setBcTitle] = useState('Slider');


    // function responsible to move 1 PREVIOUS slide
    let prevSlide = () =>{

        // using functional approach
        setCurrentSlide((prev)=>{

            let prevSlide = (prev - 1 ) % people.length;

            // if(prevSlide < 0){ //<<-- if prev slide is < than 0 (meaning we are about to cross the edge of the array ... we are scrolling back the slides and we have arrived at the last one and we are trying to still go back, then set up the next slide to the the last of the array)
            //     prevSlide = people.length - 1 
            // };
            return prevSlide;
        });
    };


    // function responsible to move 1 NEXT slide
    let nextSlide = () =>{

        // using functional approach
        setCurrentSlide((prev)=>{

            let nextSlide = (prev + 1) % people.length; 

            // if(nextSlide > people.length - 1){ //<<-- if next slide is > than the number of slides available on the array, then come back to the initial slide
            //     nextSlide = 0
            // }

            return nextSlide;
        });
    };


    // this function is responsible to run the function nextSlide automatically every 2.5 seconds
    useEffect(()=>{
    
        let setIntId = setInterval(()=>{
            nextSlide();
        },2500);

        return ()=>{
            clearInterval(setIntId);
        };

    },[currentSlide]);

    /*  
        - user clicks the next button and useEffect fires (because it is fired only when the currentSlide changes ... see the dependency array)

        - setInterval is fired and the functionality inside fires too

        - next slides is invoked every 2.5 seconds

        - currentSlide changes (it is increased by one because set interval calls next slide function) and every time it changes it invokes set interval once again

        adding at the end the clean up function to avoid the setInterval to keep running in the background

    */


  return (

    <div>

        <Breadcrumbs title={bcTitle}/>


        <section className="slider-container">
            
            {people.map((item, personIndex)=>{

                let {id, name, title, image, quote} = item

                return (
                    <article 
                        className="slide"
                        style={{
                            // comment down
                            transform: `translateX(${100 * (personIndex - currentSlide)}%)`,
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
    </div>
  )
}
export default Carousel


/* 

    - when the state value currentSlide changes, the component is going to re-render

    - each time the component re-render the map method is going to run

    - the map method renders this article:

            {people.map((item, personIndex)=>{

            let {id, name, title, image, quote} = item

        <article 

            className="slide"
            style={{
                
                transform: `translateX(${100 * (personIndex - currentSlide)}%)`,
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


        - at the initial render, currentSlide is 0 and the first element of the array (personIndex) is also 0 then the transform property is 0% meaning nothing is translated on the X and we see the current slide + opacity of 1 and visible

        - when currentSlide and personIndex are the same (meaning that we are seeing the active slide) I also want to hide all other slides. this is done by adding with the ternary operator
        
        opacity = currentSlide === personIndex ? '1' : '0' <<-- if personindex is equals to currentslide add property opacity 1

        visibility = currentSlide === personIndex ? 'visible' : 'hidden' if personindex is equals to currentslide add property visibility visible

        - then the user clicks on the button to move forward the slider; by doing so, the currentSlide changes its value from 0 to 1; since the state value changed, the component re-renders
        
        - since the component re-renders, the map method is going to run again and return once again the article

        - each index representing the item into the array, is going to be multiplied by the current slide value (which is now 1 since we clicked on next)

        - the first element -->> personIndex - currentSlide = -1 (first element has the index of 0 and current slide is now 1). this gives the result of the transform as -100% for the first element. it means that the first slide is moved 100% of its width to the left (translateX -100%) 

        - the second element -->> personIndex - currentSlide = 0 (second element has the index of 1 and current slide is now 1). this gives the result of the transform as 0% for the second element. it means that the second slide is the active one (translateX 0%) 

        - the third element -->> personIndex - currentSlide = 1 (second element has the index of 2 and current slide is now 1). this gives the result of the transform as 100% for the third element. it means that the third slide is moved 100% of its width to the right (translateX 100%) 

         - the forth element -->> personIndex - currentSlide = 2 (second element has the index of 3 and current slide is now 1). this gives the result of the transform as 200% for the forth element. it means that the forth slide is moved 200% of its width to the right (translateX 200%) 

        and so on for the other element. if you check the element html it is shown this logic

        --
        when the button in cliched again (assuming is next) the current slide has now the value of 2 and you need to do the same reasoning as above but need to change the values

        --
        IMPORTANT
        changes in the state value will trigger the re-render of the component which in turn will invoke the map method and return the html structure in the component



*/