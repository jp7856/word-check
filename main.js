
const video = document.getElementById('video');
const captureBtn = document.getElementById('capture-btn');
const textResult = document.getElementById('text-result');
const speakBtn = document.getElementById('speak-btn');

let capturedImage = null;

// Access camera
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log("Something went wrong!", error);
        });
}

// Capture image
captureBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedImage = canvas.toDataURL('image/png');

    Tesseract.recognize(
        capturedImage,
        'eng',
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        textResult.textContent = text;
    });
});

// Speak text
speakBtn.addEventListener('click', () => {
    const text = textResult.textContent;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
});
