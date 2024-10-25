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

    const emojiButton = document.getElementById('emoji');
    const emojiPickerContainer = document.getElementById('emojiPickerContainer');
    const messageBox = document.getElementById('msg');
    const sendMessageContainer = document.querySelector('.sendmsg');

    const emojiPicker = document.createElement('emoji-picker');
    emojiPickerContainer.appendChild(emojiPicker);

    emojiButton.addEventListener('click', () => {
        const isPickerVisible = emojiPickerContainer.style.display === 'block';
        emojiPickerContainer.style.display = isPickerVisible ? 'none' : 'block';
        sendMessageContainer.classList.toggle('emoji-active', !isPickerVisible);
    });

    emojiPicker.addEventListener('emoji-click', (event) => {
        const emoji = event.detail.unicode;
        messageBox.value += emoji;
    });

    document.addEventListener('click', (event) => {
        if (!emojiPickerContainer.contains(event.target) && !emojiButton.contains(event.target)) {
            emojiPickerContainer.style.display = 'none';
            sendMessageContainer.classList.remove('emoji-active');
        }
    });

}

window.addEventListener('load', function () {
    initializeListeners();
});