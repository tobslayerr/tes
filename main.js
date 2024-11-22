function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    const burger = document.querySelector('.burger');

    console.log('Toggling menu visibility');
    navbarLinks.classList.toggle('active');
    burger.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar");
    const contentContainer = document.getElementById("content");
    const footerContainer = document.getElementById("footer");
    
    if (!navbarContainer.innerHTML) {
        console.log('Loading navbar...');
        fetch("navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load navbar");
                return response.text();
            })
            .then(data => {
                navbarContainer.innerHTML = data;
                console.log('Navbar loaded successfully');
            })
            .catch(error => console.error(error));
    }

    if (!footerContainer.innerHTML) {
        console.log('Loading footer...');
        fetch("footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load footer");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
                console.log('Footer loaded successfully');
            })
            .catch(error => console.error(error));
    }

    const currentPage = localStorage.getItem("currentPage") || "home.html";
    console.log(`Loading current page: ${currentPage}`);
    loadHTML(currentPage, contentContainer);

    function loadHTML(file, target) {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                target.innerHTML = data;
                console.log(`${file} loaded successfully`);
            })
            .catch(error => console.error(error));
    }

    document.addEventListener("click", (event) => {
        const target = event.target.closest("a"); 
        if (target && target.hasAttribute("data-page")) {
            event.preventDefault();  
            const page = target.getAttribute("data-page");
            console.log(`Navigating to page: ${page}`);
            loadHTML(page, contentContainer);  
            localStorage.setItem("currentPage", page);  
        }
    });
});

