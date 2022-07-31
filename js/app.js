// HTML ELEMENTS

const CART = document.querySelector('#cart');
const CART_LIST = document.querySelector('#cart-list tbody');
const EMPTY_CART_BTN = document.querySelector('#empty-cart');
const COURSES_LIST = document.querySelector('#courses-list');

let coursesCart = [];

function registerEventListeners() {
    COURSES_LIST.addEventListener('click', addCourse);
}

function addCourse(e) {
    
    if( e.target.classList.contains('add-cart') ) {
        e.preventDefault();       
        const COURSE_SELECTED = e.target.parentElement.parentElement;
        addCourseDataCart(COURSE_SELECTED);
        
    }
}

function addCourseDataCart(course) {

    const COURSE_DATA = {
        id: course.querySelector('a').getAttribute('data-id'),
        img: course.querySelector('img').src,
        name: course.children[1].children[0].textContent,
        price: course.querySelector('span').textContent,
        quantity: 1
    }

    console.log(COURSE_DATA);
    
    // Add course to the shopping cart array
    coursesCart = [...coursesCart, COURSE_DATA];
    // Print shopping cart
    cartHTML();
}

function cartHTML () {
    
    cleanCartHTML();
    
    coursesCart.forEach( course => {
        const TR = document.createElement('tr');
        TR.innerHTML =  `
            <td>${ course.img }</td>
            <td>${ course.name }</td>
            <td>${ course.price }</td>
            <td>${ course.quantity }</td>
        `;
        
        CART_LIST.appendChild(TR);
    });
}

function cleanCartHTML() {
    // CART_LIST.innerHTML = '';
    
    while( CART_LIST.firstChild ) {
        CART_LIST.removeChild( CART_LIST.firstChild );
    }
}



registerEventListeners();