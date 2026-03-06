
# Project Blueprint: Photo to Speech

## Overview

This application allows users to **upload a photo**, recognizes English words within that picture, and provides Text-to-Speech (TTS) audio for the recognized words.

## Implemented Features

### Version 3 (Improved Word Extraction)
- **UI/UX:** No changes.
- **Functionality:**
  - **Enhanced OCR Logic:** The OCR process now intelligently extracts words. Instead of grabbing the first word of every line, it specifically looks for the first valid English word of at least 3 characters in length.
  - **Duplicate Removal:** The final list of extracted words is de-duplicated to provide a clean vocabulary list.
  - **TTS Repetition:** The "Speak" button now iterates through the clean list of extracted words, speaking each one 5 times consecutively.

### Version 2 (File Upload)
- **UI/UX:**
  - An "Upload Image" button and a preview area.
- **Functionality:**
  - **Image Upload:** Users can select an image file from their device.
  - **Text Recognition (OCR):** Uses Tesseract.js with `eng+kor` to identify text.
  - **Text-to-Speech (TTS):** Uses the browser's Web Speech API.

### Initial Version (Camera Capture - Replaced)
- Functionality for using the device camera was replaced in favor of file uploads.

## Current Plan

**Goal:** The application's core logic has been refined to provide a more accurate and useful learning tool based on user feedback.

**Last Action:**
1.  **Updated `main.js`:**
    *   **Refined Word Extraction:**
        *   The logic was updated to find the first English word of 3 or more characters per line.
        *   This avoids capturing OCR errors or single letters.
        *   Added a de-duplication step for the final word list.
    *   **TTS Functionality:**
        *   The logic to repeat each extracted word 5 times has been confirmed and works as intended.
