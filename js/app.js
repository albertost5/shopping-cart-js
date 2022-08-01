// HTML ELEMENTS

const CART = document.querySelector('#cart');
const CART_LIST = document.querySelector('#cart-list tbody');
const EMPTY_CART_BTN = document.querySelector('#empty-cart');
const COURSES_LIST = document.querySelector('#courses-list');

let coursesCart = [];

function registerEventListeners() {
    // Add course
    COURSES_LIST.addEventListener('click', addCourse);

    // Delete course
    CART.addEventListener('click', deleteCourse);

    // Empty cart
    EMPTY_CART_BTN.addEventListener('click', emptyCart);
    
}

function addCourse(e) {
    
    if( e.target.classList.contains('add-cart') ) {
        e.preventDefault();       
        const COURSE_SELECTED = e.target.parentElement.parentElement;
        addCourseDataCart(COURSE_SELECTED);
        
    }
}

function deleteCourse(e) {
    if( e.target.classList.contains('delete-course') ) {

        // Remove course from the cart (Array)
        const courseId = e.target.getAttribute('data-id');
        coursesCart = coursesCart.filter( course => course.id !== courseId );
        // Print the cart updated
        cartHTML();
    }
}

function emptyCart() {
    coursesCart = [];
    cartHTML();
}


function addCourseDataCart(course) {

    const COURSE_DATA = {
        id: course.querySelector('a').getAttribute('data-id'),
        img: course.querySelector('img').src,
        name: course.children[1].children[0].textContent,
        price: course.querySelector('span').textContent,
        quantity: 1
    }

    console.log('courseObj => ', COURSE_DATA);

    // Check if the course is already in the cart
    if ( coursesCart.some( c => c.id === COURSE_DATA.id) ) {
        const courseToIncrement = coursesCart.find( c => c.id === COURSE_DATA.id);
        courseToIncrement.quantity = courseToIncrement.quantity + 1;
    } else {
        // Add course to the shopping cart 
        coursesCart = [...coursesCart, COURSE_DATA];
    }

    // Print shopping cart
    cartHTML();
    console.log('-------------');
}

function cartHTML () {
    
    cleanCartHTML();
    
    coursesCart.forEach( course => {
        const TR = document.createElement('tr');

        const { img, name, price, quantity } = course;

        TR.innerHTML =  `
            <td>
                <img src="${ img}" width="100">
            </td>
            <td>${ name }</td>
            <td>${ price }</td>
            <td>${ quantity }</td>
            <td>
                <a href="#" class="delete-course" data-id="${ course.id }"> X </a>
            </td>
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