
# Project Blueprint: Photo to Speech

## Overview

This application allows users to take a picture, recognizes English words within that picture, and provides Text-to-Speech (TTS) audio for the recognized words.

## Implemented Features

### Initial Version
- **UI/UX:**
  - A clean, modern interface with a title and a main content area.
  - A video element to display the camera feed.
  - A "Capture" button to take a picture.
  - An area to display the recognized text.
  - A "Speak" button to trigger the TTS.
- **Functionality:**
  - **Camera Access:** The application requests permission to use the user's camera and streams the feed to the video element.
  - **Image Capture:** Clicking the "Capture" button freezes a frame from the video feed.
  - **Text Recognition (OCR):** It uses Tesseract.js to perform Optical Character Recognition on the captured image to identify English text.
  - **Text-to-Speech (TTS):** It uses the browser's built-in Web Speech API (`SpeechSynthesis`) to convert the recognized text into speech.

## Current Plan

- **Goal:** Build the initial version of the Photo to Speech application.
- **Steps:**
  1.  **Update `index.html`:** Create the necessary HTML elements for the camera view, capture button, and results display.
  2.  **Update `style.css`:** Apply a modern and responsive design to the application.
  3.  **Update `main.js`:**
      - Implement camera access using `navigator.mediaDevices.getUserMedia`.
      - Implement the capture logic to draw the video frame onto a canvas.
      - Integrate Tesseract.js to perform OCR on the canvas image.
      - Implement the TTS functionality using the Web Speech API.
