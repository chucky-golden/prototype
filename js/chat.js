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
    let backbtn = document.getElementById("back");

    if (backbtn) {
        backbtn.addEventListener('click', function (event) {
            window.history.back();
        });
    }
}

window.addEventListener('load', function () {
    initializeListeners();
});