
# Project Blueprint: Photo to Speech

## Overview

This application allows users to **upload a photo**, recognizes English words within that picture in their original order, and provides Text-to-Speech (TTS) audio for the recognized words.

## Implemented Features

### Version 6 (Order & Accuracy Enhancement)
- **UI/UX:** No changes.
- **Functionality:**
  - **Strict Word Validation:** Implemented a much stricter rule for word extraction. A word is only extracted if its line contains *exactly one* word, and that word consists *only* of 3 or more alphabetic characters. This prevents punctuation or numbers from being included.
  - **Order Preservation:** The application now processes OCR results in the order they are detected and uses an order-preserving method to remove duplicates. This ensures the final word list correctly matches the top-to-bottom order from the source image.

### Version 5 (Structural Word Extraction)
- **Functionality:** Analyzed text structure to isolate single-word lines, which was a good step but had ordering and accuracy issues.

### Version 3 & 4 (Previous Attempts)
- Earlier versions had less sophisticated extraction logic.

### Version 2 (File Upload)
- **UI/UX & Functionality:** File upload, basic OCR, and TTS.

## Current Plan

**Goal:** The application now provides a highly accurate, ordered list of vocabulary words, fully addressing user feedback on extraction quality and sequence.

**Last Action:**
1.  **Updated `main.js`:**
    *   The OCR processing logic was significantly refined.
    *   It now uses a strict regex (`/^[a-zA-Z]{3,}$/`) to ensure only lines containing a single, purely alphabetic word are processed.
    *   It replaces the default `Set` based de-duplication with a new loop that removes duplicates while preserving the original top-to-bottom order of the words.
