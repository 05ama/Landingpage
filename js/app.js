/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const tagsToBeSelected = ["section"]; //Array to hold the desired tags to be extracted from the document
let menuNavItems = [];                //For debugging-Array of Navigation Menu sections names 
let menu = [];                        //Array to hold the Actual goto Sections
let menuDiv= [];                      //Array to hold the NavMenu element

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**  
 * @description: Function to find all possible major sections 
 * that may be present in the page.
 * @param {Array}: keywords for desired tags
 * @returns {Array}: Sections Elements 
*/
function findAllPresentSections(tagsArray){
    let returnedArray =[];
    tagsArray.forEach(function(arayElement){                           // Loop for each tag in the array
        let sectionSelector = document.querySelectorAll(arayElement);  // Select all <section> tags
        sectionSelector.forEach( function (element){                   // Loop for each element found
            returnedArray.push(element);                               // save the elements
        });
    });
    return returnedArray;                                              // Return the array of elements
}

/**  
 * @description: Function to decide whether the given 
 * element is in view or not. 
 * @param {object}: Section Element
 * @returns {boolean}: Element in view     =>true
 *                     Element not in view =>false
*/
function isNearTopOfViewport(elementDiv) {
    const bounds = elementDiv.getBoundingClientRect();            // Get element bounds
    const compareValue = (bounds.height)*0.5;                     // How much of the element in view to be set as Active-set to 0.5 of the element height 
    if( bounds.top >= 0 && bounds.top < compareValue){            // compare element's top position to the portion of its height 
        return true;                                              // If the top is +ve meaning element is under the viewport, -ve it is above  
    }else if (( bounds.top < 0 && -(bounds.top) < compareValue)){ // top is +ve and less than its half height meaning its coming into view
        return true;                                              // top is -ve and (absolute value of top) less than its half height meaning its coming into view
    }else{
        return false;
    }    
}

/**  
 * @description: check only for sections in view will add active tag 
 * to the section in view and remove this tag from others
 * @param : None
 * @returns: None
*/
function checkSectionView(){
    const sections = document.querySelectorAll("section");              // select all section elements
    sections.forEach(function(section){                                 // Loop for each element 
        if(isNearTopOfViewport(section)){                               // check if the element in view or not
            if (!(section.classList.contains("your-active-class"))){    // Make sure not adding active class more than once
                section.classList.add("your-active-class");             // add active class incase element in view
            }
        }
        else{
            section.classList.remove("your-active-class");  // remove active class incase element outof view
        }
    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**  
 * @description: build the nav 
 * @param {Array}: Menu sections
 * @returns {NodeListOf<E>}: all option items in the menu
*/
function navBuild(menuItems)
{
    let navElementList = document.getElementById("navbar__list");     // Get navMenu section
    let docfragment = new DocumentFragment();                         // creat docfragment for better performance
    menuItems.forEach(function(menuItem,index){                       // Loop for each menu section option
        let li = document.createElement("li")                         // creat list item
        li.innerHTML = `${menuItem.querySelector("h2").textContent}`; // Get header test value of the menu option from section h2 content
        li.className = "menu__link";                                  // Set proper class for the list item
        li.id = index;                                                // set Id for the menu option to be easily accessed
        li.style.float = "left";                                      // proper postioning of the menu option list
        docfragment.appendChild(li)                                   // append the list item to the doc fragment
    });
    navElementList.appendChild(docfragment);                          // append the doc fragment to the navMenu section
    return navElementList.querySelectorAll(".menu__link");            // For debugging-return all option items in the menu
}

/**  
 * @description: Add class 'active' to section
 * @param {object}: section
 * @returns: None
*/
function setActive(section)                                        
{
    if (!(section.classList.contains("your-active-class")))     // If section not already active class
    {
        section.classList.add("your-active-class");             // Add active class
    }
}

/**  
 * @description: Scroll to anchor ID using scrollTO event
 * @param {object}: eventTarget
 * @returns: None
*/
function scrollToSection(eventTarget)
{
   if(eventTarget.target.className === "menu__link"){                   // check the click event is on one of the menu options
    menu[eventTarget.target.id].scrollIntoView({behavior: 'smooth'});   // scroll to the section
    setActive(menu[eventTarget.target.id])                              // set the section as active
   }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

/**  
 * @description: Main script sequence will be fired after window loaded
 * @param  : None
 * @returns: None
*/
function Main(){
    // Build menu 
    menu =  findAllPresentSections(tagsToBeSelected);
    menuNavItems = navBuild(menu);
    // Scroll to section on link click
    menuDiv = document.querySelectorAll("nav");
    menuDiv[0].addEventListener('click',scrollToSection);
    // Set sections as active
    document.addEventListener('scroll', checkSectionView);
}

// I decided it is better to have the Menu panel displayed before all stylesheets, images, and subframes finish loading
window.addEventListener('DOMContentLoaded',Main);  // document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading



