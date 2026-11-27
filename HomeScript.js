console.log("ran");
const bookmarkButton = document.querySelector(".bookmarks");
let current = "none";


document.addEventListener('keydown', (event)=>{
    if (event.key === 'Tab'){
        event.preventDefault();
        console.log("Tab pressed");
        bookmarkButton.style.animation = 'select-hover 0.3s ease forwards';
        console.log("fin");
        current = 'bookmarks'
    }
})

document.addEventListener('keydown', (event)=>{
    if (event.key === "w"){
        console.log("w key pressed");
        if (current === 'bookmarks'){
            bookmarkButton.style.animation = 'none' //removes existing animation
            void bookmarkButton.offsetWidth; //force refresh
            bookmarkButton.style.animation = 'select-return 0.3s ease forwards';
            console.log("condition ran");
        }
        
    }
})