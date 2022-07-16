function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Слайдер, два варианта

    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesFild = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;              // получаем изначальную ширину окошка
        
    let slideIndex = 1;
    let offset = 0;

    // Первый вариант

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
    
    // function showSlides(n) {

    //     if (n > slides.length) {
    //         slideIndex = 1;  
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plsuSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plsuSlides(-1);
    // });  

    // next.addEventListener('click', () => {
    //     plsuSlides(+1);
    // });


    // Второй вариант

    function dotsForEach() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function slidePutIndex() {
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesFild.style.width = 100 * slides.length + '%'; // задаем ширину, так чтобы у нас поместились в ширину все наши салйды
    slidesFild.style.display = 'flex';
    slidesFild.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;     // слайды могут быть разной ширины, поэтому устанавливаем для них всех одно значение
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);  // помещаем нашу обертку прямо во внутрь слайдера

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { 
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesFild.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsForEach();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesFild.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slidePutIndex();

        dotsForEach();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesFild.style.transform = `translateX(-${offset}px)`;

            slidePutIndex();

            dotsForEach();

        });
    });
}

export default slider;