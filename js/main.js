// move page
async function changePage( url ) {
    const res = await axios.get(url)
    return res
}

async function movePage(url) {
    try {
        url += '.html'
        let response = await changePage(url)

        document.open()
        document.write(response.data)
        document.close()

        if ( url != window.location ) {
            window.history.pushState( { url: url }, '', url );
        }

        initializeListeners()

    } catch (error) {
      console.error(error);
    }
}


window.addEventListener("popstate", async function() {
    const url = this.window.location.pathname;
    const res = await changePage(url);

    document.open();
    document.write(res.data);
    document.close();

    initializeListeners()
} );


function initializeListeners() {
    // toggle light and dark mode
    // const toggleSwitch = document.getElementById("toggle-mode");

    // const savedMode = localStorage.getItem("theme");
    // if (savedMode) {
    //     document.body.classList.remove("light-mode", "dark-mode");
    //     document.body.classList.add(savedMode);
    //     toggleSwitch.checked = savedMode === "dark-mode";
    // }

    // if (toggleSwitch) {
    //     toggleSwitch.addEventListener("change", function () {
    //         if (this.checked) {
    //             document.body.classList.remove("light-mode");
    //             document.body.classList.add("dark-mode");
    //             localStorage.setItem("theme", "dark-mode");
    //         } else {
    //             document.body.classList.remove("dark-mode");
    //             document.body.classList.add("light-mode");
    //             localStorage.setItem("theme", "light-mode");
    //         }
    //     });
    // }



    // language dropdown
    // const dropdown = document.getElementById("dropdown");

    // if (dropdown) {
    //     const dropdownMenu = document.getElementById("dropdown-menu");
    //     dropdown.addEventListener('click', () => {
    //         if (dropdownMenu.style.display === 'block') {
    //             dropdownMenu.style.display = 'none';
    //         } else {
    //             dropdownMenu.style.display = 'block';
    //         }
    //     });

    //     // Optional: Click outside the dropdown to close it
    //     document.addEventListener('click', (event) => {
    //         if (!dropdown.contains(event.target)) {
    //             dropdownMenu.style.display = 'none';
    //         }
    //     });
    // }


    // switch between login and register
    let s1 = document.querySelector('.s1')
    if (s1) {
        let s2 = document.querySelector('.s2')
        let login = document.querySelector('.login')
        let register = document.querySelector('.register')

        s1.addEventListener('click', () => {
            login.style.display = 'none'
            register.style.display = 'block'
        })

        s2.addEventListener('click', () => {
            login.style.display = 'block'
            register.style.display = 'none'
        })
    }


    // hide and show password in login / register section
    let show1 = document.getElementById('show1')
    if (show1) {
        show1.addEventListener('click', () => {
            let passwordType = document.getElementById('password').getAttribute('type')
            let type = passwordType == 'text' ? 'password' : 'text'
            document.getElementById('password').setAttribute('type', type)
        })
    }

    let show2 = document.getElementById('show2')
    if (show2) {
        show2.addEventListener('click', () => {
            let rpasswordType = document.getElementById('rpassword').getAttribute('type')
            let type = rpasswordType == 'text' ? 'password' : 'text'
            document.getElementById('rpassword').setAttribute('type', type)
        })
    }


    // call up forgot password modal
    let forgotLink = document.getElementById("forgot");

    if (forgotLink) {
        let modal = document.getElementById("forgotModal");
        let closeBtn = document.querySelector(".close");

        // When the user clicks the "Forgot Password" link, open the modal
        forgotLink.addEventListener('click', function (event) {
            event.preventDefault();
            modal.style.display = "flex";
        });

        // When the user clicks on <span> (x), close the modal
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // call up add business / date night modal
    let busAdd = document.getElementById("busAdd");

    if (busAdd) {
        let modal = document.getElementById("businessModal");
        let closeBtn = document.querySelector(".busclose");

        // When the user clicks the "Forgot Password" link, open the modal
        busAdd.addEventListener('click', function (event) {
            event.preventDefault();
            modal.style.display = "flex";
        });

        // When the user clicks on <span> (x), close the modal
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // call up add business / date night modal
    let awin = document.querySelectorAll("#awin");
    
    if (awin.length > 0) {
        let hwin = document.querySelectorAll("#hwin");
        let modal = document.getElementById("playModal");
        let closeBtn = document.querySelector(".playclose");

        awin.forEach((win) => {
            win.addEventListener('click', function (event) {
                event.preventDefault();
                modal.style.display = "flex";
            });
        })

        hwin.forEach((win) => {
            win.addEventListener('click', function (event) {
                event.preventDefault();
                modal.style.display = "flex";
            });
        })

        // When the user clicks on <span> (x), close the modal
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // Function to open side navigation    
    const menuIcon = document.getElementById("menu-icon");
    if(menuIcon){
        menuIcon.addEventListener("click", () => {
            document.getElementById("sideNav").style.width = "250px";
        });
    }

    // Function to close side navigation
    const closeBtn = document.getElementById("close-btn");
    if(closeBtn){
        closeBtn.addEventListener("click", () => {
            document.getElementById("sideNav").style.width = "0";
        });
    }

    // Close side navigation when clicking outside of it
    // document.addEventListener('click', function (event) {
    //     let sideNav = document.getElementById("sideNav");
    //     if (!sideNav.contains(event.target) && sideNav.style.width === "250px") {
    //         closeNav();
    //     }
    // });



    // show sports category
    const btn1 = document.getElementById("btn1");
    if (btn1) {
        const btn2 = document.getElementById("btn2");
        const btn3 = document.getElementById("btn3");
        const btn4 = document.getElementById("btn4");

        const all = document.getElementById("all");
        const club = document.getElementById("club");
        const international = document.getElementById("international");
        const national = document.getElementById("national");

        btn1.addEventListener("click", function () {
            all.style.display = 'block'
            club.style.display = 'none'
            international.style.display = 'none'
            national.style.display = 'none'
            btn1.classList.add('active')
            btn2.classList.remove('active')
            btn3.classList.remove('active')
            btn4.classList.remove('active')
        });

        btn2.addEventListener("click", function () {
            all.style.display = 'none'
            club.style.display = 'block'
            international.style.display = 'none'
            national.style.display = 'none'
            btn1.classList.remove('active')
            btn2.classList.add('active')
            btn3.classList.remove('active')
            btn4.classList.remove('active')
        });

        btn3.addEventListener("click", function () {
            all.style.display = 'none'
            club.style.display = 'none'
            international.style.display = 'block'
            national.style.display = 'none'
            btn1.classList.remove('active')
            btn2.classList.remove('active')
            btn3.classList.add('active')
            btn4.classList.remove('active')
        });

        btn4.addEventListener("click", function () {
            all.style.display = 'none'
            club.style.display = 'none'
            international.style.display = 'none'
            national.style.display = 'block'
            btn1.classList.remove('active')
            btn2.classList.remove('active')
            btn3.classList.remove('active')
            btn4.classList.add('active')
        });
    }


    // show voting category
    const vbtn1 = document.getElementById("vbtn1");
    if (vbtn1) {
        const vbtn2 = document.getElementById("vbtn2");
        const vbtn3 = document.getElementById("vbtn3");
        const vbtn4 = document.getElementById("vbtn4");
        const vbtn5 = document.getElementById("vbtn5");
        const vbtn6 = document.getElementById("vbtn6");

        const nigeria = document.getElementById("nigeria");
        const england = document.getElementById("england");
        const spain = document.getElementById("spain");
        const germany = document.getElementById("germany");
        const france = document.getElementById("france");
        const italy = document.getElementById("italy");

        vbtn1.addEventListener("click", function () {
            nigeria.style.display = 'block'
            england.style.display = 'none'
            spain.style.display = 'none'
            germany.style.display = 'none'
            france.style.display = 'none'
            italy.style.display = 'none'
            vbtn1.classList.add('active')
            vbtn2.classList.remove('active')
            vbtn3.classList.remove('active')
            vbtn4.classList.remove('active')
            vbtn5.classList.remove('active')
            vbtn6.classList.remove('active')
        });

        vbtn2.addEventListener("click", function () {
            nigeria.style.display = 'none'
            england.style.display = 'block'
            spain.style.display = 'none'
            germany.style.display = 'none'
            france.style.display = 'none'
            italy.style.display = 'none'
            vbtn1.classList.remove('active')
            vbtn2.classList.add('active')
            vbtn3.classList.remove('active')
            vbtn4.classList.remove('active')
            vbtn5.classList.remove('active')
            vbtn6.classList.remove('active')
        });

        vbtn3.addEventListener("click", function () {
            nigeria.style.display = 'none'
            england.style.display = 'none'
            spain.style.display = 'block'
            germany.style.display = 'none'
            france.style.display = 'none'
            italy.style.display = 'none'
            vbtn1.classList.remove('active')
            vbtn2.classList.remove('active')
            vbtn3.classList.add('active')
            vbtn4.classList.remove('active')
            vbtn5.classList.remove('active')
            vbtn6.classList.remove('active')
        });

        vbtn4.addEventListener("click", function () {
            nigeria.style.display = 'none'
            england.style.display = 'none'
            spain.style.display = 'none'
            germany.style.display = 'block'
            france.style.display = 'none'
            italy.style.display = 'none'
            vbtn1.classList.remove('active')
            vbtn2.classList.remove('active')
            vbtn3.classList.remove('active')
            vbtn4.classList.add('active')
            vbtn5.classList.remove('active')
            vbtn6.classList.remove('active')
        });

        vbtn5.addEventListener("click", function () {
            nigeria.style.display = 'none'
            england.style.display = 'none'
            spain.style.display = 'none'
            germany.style.display = 'none'
            france.style.display = 'block'
            italy.style.display = 'none'
            vbtn1.classList.remove('active')
            vbtn2.classList.remove('active')
            vbtn3.classList.remove('active')
            vbtn4.classList.remove('active')
            vbtn5.classList.add('active')
            vbtn6.classList.remove('active')
        });

        vbtn6.addEventListener("click", function () {
            nigeria.style.display = 'none'
            england.style.display = 'none'
            spain.style.display = 'none'
            germany.style.display = 'none'
            france.style.display = 'none'
            italy.style.display = 'block'
            vbtn1.classList.remove('active')
            vbtn2.classList.remove('active')
            vbtn3.classList.remove('active')
            vbtn4.classList.remove('active')
            vbtn5.classList.remove('active')
            vbtn6.classList.add('active')
        });
    }
}

window.addEventListener('load', function () {
    initializeListeners();
});