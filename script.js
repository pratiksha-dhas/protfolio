/* =========================================================
   PRATIKSHA DHAS PORTFOLIO
   JavaScript
========================================================= */


/* ================= SELECT ELEMENTS ================= */

const navbar = document.getElementById("navbar");

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const themeBtn = document.getElementById("themeBtn");

const backToTop = document.getElementById("backToTop");

const contactForm = document.getElementById("contactForm");

const formNote = document.getElementById("formNote");

const yearElement = document.getElementById("year");


/* ================= CURRENT YEAR ================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ================= NAVBAR SCROLL ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon =
        menuBtn.querySelector("i");

    if (navMenu.classList.contains("open")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close menu after clicking a link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon =
            menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* ================= ACTIVE NAV LINK ================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* ================= REVEAL ANIMATION ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================= THEME ================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

    updateThemeIcon();

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle(
        "light-mode"
    );

    const isLight =
        document.body.classList.contains(
            "light-mode"
        );

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();

});


function updateThemeIcon() {

    const icon =
        themeBtn.querySelector("i");

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

    }

}


/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= CONTACT FORM ================= */

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            formNote.textContent =
                "Please fill in all fields.";

            return;

        }


        /*
            This is a frontend-only form.

            To actually receive messages,
            connect it to Formspree, EmailJS,
            Netlify Forms, or your own backend.
        */


        const subject =
            encodeURIComponent(
                `Portfolio message from ${name}`
            );

        const body =
            encodeURIComponent(
                `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
            );


        /*
            Replace this email address
            with your actual email.
        */

        const yourEmail =
            "your-email@example.com";


        window.location.href =
            `mailto:${yourEmail}?subject=${subject}&body=${body}`;


        formNote.textContent =
            "Opening your email application...";

    }
);


/* ================= PROJECT CARD TILT ================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* ================= SMOOTH BUTTON FEEDBACK ================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                targetId === ""
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* ================= CONSOLE ================= */

console.log(
    "%cHello! 👋 Welcome to Pratiksha's Portfolio.",
    "font-size: 16px; font-weight: bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript.",
    "font-size: 13px;"
);