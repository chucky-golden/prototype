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

        let emojiPicker = document.querySelector('emoji-picker');
        if (emojiPicker) {
            let searchrow = emojiPicker.shadowRoot.querySelector('.search-row');
            if (searchrow) {
                searchrow.style.display = 'none';
            } else {
                console.log('Search input not found');
            }
        } else {
            console.log('Emoji picker not found');
        }
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

    // Microphone recording setup
    const micButton = document.getElementById('mic-button');
    micButton.addEventListener('click', toggleRecording);

}

// record audio
let mediaRecorder;
let audioChunks = [];
let isRecording = false;
const micButton = document.getElementById('mic-button');
let startTime;
let timerInterval;
const recordingNotification = document.getElementById('recording-notification');


// Toggle recording function
async function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        await startRecording();
    }
}

// Function to start recording
async function startRecording() {
    if (isRecording) return;
    
    // Check for microphone permission and availability
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone not supported on this browser');
        return;
    }

    try {
        // Start the recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
        mediaRecorder.start();

        // Update recording status
        isRecording = true;
        
        micButton.style.color = 'black'
        micButton.classList.toggle('active');
        startTimer();

        console.log('Recording started');

        // Automatically stop after 1 minute if not stopped by user
        setTimeout(() => {
            if (isRecording) stopRecording();
        }, 60000);
    } catch (err) {
        console.error('Error accessing microphone:', err);
    }
}

// Function to stop recording and send audio
async function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        if (!isRecording) return;

        
        mediaRecorder.stop();
        console.log('Recording stopped');
        micButton.style.color = 'white'
        micButton.classList.toggle('active');
        stopTimer();

        isRecording = false;

        mediaRecorder.onstop = async () => {
            // Create a Blob from the recorded audio
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            // saveRecordingLocally(audioBlob);

            // const formData = new FormData();
            // formData.append('audio', audioBlob, 'recording.webm');

            // Send audio to server with Axios
            try {
                // const response = await axios.post('https://your-node-server-url/upload', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // });
                // console.log('Audio uploaded successfully:', response.data);
                alert('done')
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        };
    }
}

// Function to start the recording timer
function startTimer() {
    startTime = Date.now();
    recordingNotification.classList.add('active');
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / 60000);
        recordingNotification.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Function to stop the recording timer
function stopTimer() {
    clearInterval(timerInterval);
    recordingNotification.classList.remove('active');
    recordingNotification.style.opacity = '0';
    setTimeout(() => {
        recordingNotification.textContent = '00:00'; // Reset the timer display
    }, 500); // Allow time for fade-out transition
}

// Save the recording to a local folder (works in server environments)
function saveRecordingLocally(audioBlob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(audioBlob);
    link.download = `recording_${new Date().toISOString()}.webm`;
    link.click();
}

window.addEventListener('load', async () => {
    initializeListeners();

    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
    } catch (err) {
        console.error('Microphone permission denied:', err);
    }
});