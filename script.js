window.addEventListener("DOMContentLoaded", (event) => {
    let onOff = false;
    const hamBurger = document.getElementsByClassName('hamWrapper')[0];
    const mobMenu = document.getElementsByClassName('mobileNav')[0];


 const menuWrapper = document.getElementsByClassName('nav1')[0];
 console.log(menuWrapper.style.display);

 hamBurger.addEventListener('click', () => {
    if(!onOff){
        mobMenu.style.display = "block";
        console.log('woohoo');
        onOff = true;
    }else if (onOff) {
        mobMenu.style.display = "none";
        console.log('yaha')
        onOff = false;
    }
 })

 window.addEventListener("resize", () => {
    if(window.innerWidth >= 1137) {
        mobMenu.style.display = "none";
        onOff = false;
    }
 })

})