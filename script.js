/* =========================================================
   BRIGHTON ❤️ NAZLINE
   FINAL JAVASCRIPT
   Chapters 1–5 Navigation & Interactions
========================================================= */

"use strict";


/* =========================================================
   1. CHAPTER ELEMENTS
========================================================= */

const chapters = {

    chapter1:
        document.getElementById("chapter1"),

    yesResponse:
        document.getElementById("yesResponse"),

    chapter2:
        document.getElementById("chapter2"),

    chapter3:
        document.getElementById("chapter3"),

    chapter4:
        document.getElementById("chapter4"),

    chapter5:
        document.getElementById("chapter5"),

    // Chapter 6 will be revealed at the end of the flow
    chapter6:
        document.getElementById("chapter6")

};


/* =========================================================
   2. BUTTON ELEMENTS
========================================================= */

const buttons = {

    yes:
        document.getElementById("yesBtn"),

    no:
        document.getElementById("noBtn"),

    continueToChapter2:
        document.getElementById(
            "continueToChapter2"
        ),

    continueToChapter3:
        document.getElementById(
            "continueToChapter3"
        ),

    continueToChapter4:
        document.getElementById(
            "continueToChapter4"
        ),

    continueToChapter5:
        document.getElementById(
            "continueToChapter5"
        ),

    continueToChapter6:
        document.getElementById(
            "continueToChapter6"
        )

};


/* =========================================================
   3. NO BUTTON MESSAGES
========================================================= */

const noMessages = [

    "Are you sure? 🥺",

    "Think about it again ❤️",

    "Brighton is hoping you'll say yes 🥹",

    "Give this beautiful question another thought? 💕",

    "The YES button is still waiting ❤️"

];


let noClickCount = 0;


/* =========================================================
   4. INITIAL STATE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);


function initializeWebsite() {

    /*
        Hide every chapter except Chapter 1.
    */

    Object.values(chapters).forEach(
        chapter => {

            if (chapter) {
                chapter.hidden = true;
            }

        }
    );


    /*
        Show the beginning.
    */

    showChapter(
        chapters.chapter1,
        false
    );


    /*
        Connect all interactions.
    */

    setupProposal();

    setupNavigation();

}


/* =========================================================
   5. SHOW CHAPTER
========================================================= */

function showChapter(
    chapter,
    scroll = true
) {

    if (!chapter) {
        return;
    }


    /*
        Hide all chapters.
    */

    Object.values(chapters).forEach(
        currentChapter => {

            if (currentChapter) {
                currentChapter.hidden = true;

                currentChapter.classList.remove(
                    "chapter-enter"
                );
            }

        }
    );


    /*
        Show requested chapter.
    */

    chapter.hidden = false;


    /*
        Restart animation.
    */

    void chapter.offsetWidth;


    chapter.classList.add(
        "chapter-enter"
    );


    /*
        Move the visitor to the
        beginning of the chapter.
    */

    if (scroll) {

        setTimeout(
            () => {

                chapter.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            50
        );

    }

}


/* =========================================================
   6. PROPOSAL INTERACTION
========================================================= */

function setupProposal() {


    /* -----------------------------------------------------
       YES
    ----------------------------------------------------- */

    if (buttons.yes) {

        buttons.yes.addEventListener(
            "click",
            handleYes
        );

    }


    /* -----------------------------------------------------
       NO
    ----------------------------------------------------- */

    if (buttons.no) {

        buttons.no.addEventListener(
            "click",
            handleNo
        );

    }

}


/* =========================================================
   7. YES BUTTON
========================================================= */

function handleYes() {

    noClickCount = 0;


    /*
        Reset NO button.
    */

    if (buttons.no) {

        buttons.no.textContent = "No";

    }


    /*
        Reset YES button.
    */

    if (buttons.yes) {

        // Reset scale variable and any pulse class
        buttons.yes.style.removeProperty('--scale');
        buttons.yes.classList.remove('pulse');

    }


    /*
        Show YES response.
    */

    showChapter(
        chapters.yesResponse
    );

}


/* =========================================================
   8. NO BUTTON
========================================================= */

function handleNo() {

    noClickCount++;


    const messageIndex =
        Math.min(
            noClickCount - 1,
            noMessages.length - 1
        );


    if (buttons.no) {

        buttons.no.textContent =
            noMessages[messageIndex];

    }


    /*
        Make YES slightly more noticeable
        after several clicks.
    */

    if (
        noClickCount >= 1 &&
        buttons.yes
    ) {

        // Grow the YES button a bit with each click.
        //  - increment: how much to grow per click (15% here)
        //  - maxScale: stops growth at a reasonable size
        const increment = 0.15; // 15% per NO click
        const maxScale = 3; // don't grow larger than 3x

        const scale = Math.min(
            1 + (noClickCount * increment),
            maxScale
        );

        // Use a CSS variable for scale so animations can reference it.
        buttons.yes.style.setProperty('--scale', scale);

        // Restart pulse animation to draw attention.
        buttons.yes.classList.remove('pulse');
        void buttons.yes.offsetWidth; // force reflow to restart animation
        buttons.yes.classList.add('pulse');

        // Remove the pulse class after the animation finishes.
        const onAnimEnd = (e) => {
            if (e.animationName === 'pulse') {
                buttons.yes.classList.remove('pulse');
                buttons.yes.removeEventListener('animationend', onAnimEnd);
            }
        };

        buttons.yes.addEventListener('animationend', onAnimEnd);

    }


    /*
        After several playful attempts,
        keep the interaction respectful.
    */

    if (noClickCount >= 5) {

        buttons.no.textContent =
            "I understand ❤️";

    }

}


/* =========================================================
   9. CHAPTER NAVIGATION
========================================================= */

function setupNavigation() {


    /*
        YES response → Chapter 2
    */

    if (
        buttons.continueToChapter2
    ) {

        buttons.continueToChapter2
            .addEventListener(
                "click",
                () => {

                    showChapter(
                        chapters.chapter2
                    );

                }
            );

    }


    /*
        Chapter 2 → Chapter 3
    */

    if (
        buttons.continueToChapter3
    ) {

        buttons.continueToChapter3
            .addEventListener(
                "click",
                () => {

                    showChapter(
                        chapters.chapter3
                    );

                }
            );

    }


    /*
        Chapter 3 → Chapter 4
    */

    if (
        buttons.continueToChapter4
    ) {

        buttons.continueToChapter4
            .addEventListener(
                "click",
                () => {

                    showChapter(
                        chapters.chapter4
                    );

                }
            );

    }


    /*
        Chapter 4 → Chapter 5
    */

    if (
        buttons.continueToChapter5
    ) {

        buttons.continueToChapter5
            .addEventListener(
                "click",
                () => {

                    showChapter(
                        chapters.chapter5
                    );

                }
            );

    }


    /*
        Chapter 5 → Chapter 6

        Chapter 6 will be added to
        the same HTML later.
    */

    if (
        buttons.continueToChapter6
    ) {

        buttons.continueToChapter6
            .addEventListener(
                "click",
                handleChapter6
            );

    }

}


/* =========================================================
   10. CHAPTER 6 PLACEHOLDER
========================================================= */

function handleChapter6() {

    /*
        Reveal Chapter 6 if it exists. If not present,
        log and keep the button harmless.
    */

    if (chapters.chapter6) {
        showChapter(chapters.chapter6);
    } else {
        console.log("Chapter 6 is not present in the HTML yet.");
    }

}


/* =========================================================
   11. KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Escape returns to the beginning.
        */

        if (
            event.key === "Escape"
        ) {

            showChapter(
                chapters.chapter1
            );

        }

    }
);


/* =========================================================
   12. PREVENT DOUBLE CLICK SELECTION
========================================================= */

Object.values(buttons).forEach(
    button => {

        if (!button) {
            return;
        }


        button.addEventListener(
            "dblclick",
            event => {

                event.preventDefault();

            }
        );

    }
);


/* =========================================================
   13. CONSOLE CONFIRMATION
========================================================= */

console.log(
    "❤️ Brighton → Nazline website loaded successfully."
);

console.log(
    "Chapters 1–5 are connected."
);