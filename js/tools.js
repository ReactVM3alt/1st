// Tool-specific JavaScript logic will go here
console.log("tools.js loaded successfully!");

// This object will store initialization functions for each tool
window.toolInitializers = {};

// --- Text Case Converter ---
window.toolInitializers['text-case-converter'] = function() {
    // ... (previous code for Text Case Converter) ...
    console.log('Initializing Text Case Converter...');

    const inputArea = document.getElementById('text-case-input');
    const outputArea = document.getElementById('text-case-output');
    const btnUppercase = document.getElementById('text-case-btn-uppercase');
    const btnLowercase = document.getElementById('text-case-btn-lowercase');
    const btnTitleCase = document.getElementById('text-case-btn-titlecase');
    const btnSentenceCase = document.getElementById('text-case-btn-sentencecase');
    const btnCopy = document.getElementById('text-case-btn-copy');

    if (!inputArea || !outputArea || !btnUppercase || !btnLowercase || !btnTitleCase || !btnSentenceCase || !btnCopy) {
        console.error('Text Case Converter: One or more DOM elements not found.');
        return; 
    }

    btnUppercase.addEventListener('click', () => {
        outputArea.value = inputArea.value.toUpperCase();
    });

    btnLowercase.addEventListener('click', () => {
        outputArea.value = inputArea.value.toLowerCase();
    });

    btnTitleCase.addEventListener('click', () => {
        outputArea.value = inputArea.value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    });

    btnSentenceCase.addEventListener('click', () => {
        const text = inputArea.value.toLowerCase();
        outputArea.value = text.replace(/(^\s*\w|[.!?]\s+\w)/g, char => char.toUpperCase());
    });

    btnCopy.addEventListener('click', () => {
        if (outputArea.value) {
            navigator.clipboard.writeText(outputArea.value)
                .then(() => {
                    const originalText = btnCopy.textContent;
                    btnCopy.textContent = 'Copied!';
                    setTimeout(() => {
                        btnCopy.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert("Failed to copy text. See console for details.");
                });
        }
    });

    console.log('Text Case Converter initialized.');
};

// --- JSON Formatter ---
window.toolInitializers['json-formatter'] = function() {
    // ... (previous code for JSON Formatter) ...
    console.log('Initializing JSON Formatter...');

    const inputArea = document.getElementById('json-input');
    const outputArea = document.getElementById('json-output');
    const btnBeautify = document.getElementById('json-btn-beautify');
    const btnMinify = document.getElementById('json-btn-minify');
    const btnValidate = document.getElementById('json-btn-validate');
    const btnCopy = document.getElementById('json-btn-copy');
    const validationMessageArea = document.getElementById('json-validation-message');

    if (!inputArea || !outputArea || !btnBeautify || !btnMinify || !btnValidate || !btnCopy || !validationMessageArea) {
        console.error('JSON Formatter: One or more DOM elements not found.');
        return; 
    }

    function displayMessage(message, type) {
        validationMessageArea.textContent = message;
        validationMessageArea.className = `validation-message ${type}`; 
        validationMessageArea.style.display = message ? 'block' : 'none';
    }

    btnBeautify.addEventListener('click', () => {
        try {
            const jsonObj = JSON.parse(inputArea.value);
            outputArea.value = JSON.stringify(jsonObj, null, 2); 
            displayMessage('JSON successfully beautified.', 'success');
        } catch (e) {
            outputArea.value = ''; 
            displayMessage(`Invalid JSON: ${e.message}`, 'error');
        }
    });

    btnMinify.addEventListener('click', () => {
        try {
            const jsonObj = JSON.parse(inputArea.value);
            outputArea.value = JSON.stringify(jsonObj); 
            displayMessage('JSON successfully minified.', 'success');
        } catch (e) {
            outputArea.value = '';
            displayMessage(`Invalid JSON: ${e.message}`, 'error');
        }
    });

    btnValidate.addEventListener('click', () => {
        try {
            JSON.parse(inputArea.value);
            displayMessage('JSON is valid!', 'success');
        } catch (e) {
            displayMessage(`Invalid JSON: ${e.message}`, 'error');
        }
    });

    btnCopy.addEventListener('click', () => {
        if (outputArea.value) {
            navigator.clipboard.writeText(outputArea.value)
                .then(() => {
                    const originalText = btnCopy.textContent;
                    btnCopy.textContent = 'Copied!';
                    setTimeout(() => {
                        btnCopy.textContent = originalText;
                    }, 1500);
                    displayMessage('Output copied to clipboard.', 'success');
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    displayMessage('Failed to copy text. See console.', 'error');
                });
        } else {
            displayMessage('Nothing to copy from output.', 'error');
        }
    });
    inputArea.addEventListener('input', () => displayMessage('', ''));
    console.log('JSON Formatter initialized.');
};


// --- Base64 Encoder/Decoder ---
window.toolInitializers['base64-encoder-decoder'] = function() {
    // ... (previous code for Base64 Encoder/Decoder) ...
    console.log('Initializing Base64 Encoder/Decoder...');

    const inputArea = document.getElementById('base64-input');
    const outputArea = document.getElementById('base64-output');
    const btnEncode = document.getElementById('base64-btn-encode');
    const btnDecode = document.getElementById('base64-btn-decode');
    const btnCopy = document.getElementById('base64-btn-copy');
    const errorMessageArea = document.getElementById('base64-error-message');

    if (!inputArea || !outputArea || !btnEncode || !btnDecode || !btnCopy || !errorMessageArea) {
        console.error('Base64 Encoder/Decoder: One or more DOM elements not found.');
        return; 
    }

    function displayError(message, type = 'error') { 
        errorMessageArea.textContent = message;
        errorMessageArea.className = `message ${type}`; 
        errorMessageArea.style.display = message ? 'block' : 'none';
        if (type === 'error') {
            errorMessageArea.style.color = 'red'; 
        } else {
            errorMessageArea.style.color = 'green'; 
        }
    }

    function utf8ToBase64(str) {
        try {
            const utf8Bytes = new TextEncoder().encode(str);
            let binaryString = '';
            utf8Bytes.forEach(byte => {
                binaryString += String.fromCharCode(byte);
            });
            return btoa(binaryString);
        } catch (e) {
            console.error("Error during UTF-8 to Base64 encoding:", e);
            throw new Error("Encoding failed. Ensure input is valid text.");
        }
    }

    function base64ToUtf8(b64) {
        try {
            const binaryString = atob(b64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return new TextDecoder().decode(bytes);
        } catch (e) {
            console.error("Error during Base64 to UTF-8 decoding:", e);
            if (e instanceof DOMException && e.name === 'InvalidCharacterError') {
                throw new Error("Decoding failed. Input contains characters that are not valid Base64.");
            }
            throw new Error("Decoding failed. Ensure input is a valid Base64 string representing UTF-8 text.");
        }
    }


    btnEncode.addEventListener('click', () => {
        try {
            if (inputArea.value === '') {
                outputArea.value = '';
                displayError(''); 
                return;
            }
            outputArea.value = utf8ToBase64(inputArea.value);
            displayError(''); 
        } catch (e) {
            outputArea.value = '';
            displayError(`Error encoding: ${e.message}`);
            console.error('Base64 Encoding Error:', e);
        }
    });

    btnDecode.addEventListener('click', () => {
        try {
            if (inputArea.value === '') {
                outputArea.value = '';
                displayError('');
                return;
            }
            outputArea.value = base64ToUtf8(inputArea.value);
            displayError(''); 
        } catch (e) {
            outputArea.value = '';
            displayError(`${e.message}`); 
            console.error('Base64 Decoding Error:', e);
        }
    });

    btnCopy.addEventListener('click', () => {
        if (outputArea.value) {
            navigator.clipboard.writeText(outputArea.value)
                .then(() => {
                    const originalText = btnCopy.textContent;
                    btnCopy.textContent = 'Copied!';
                    setTimeout(() => {
                        btnCopy.textContent = originalText;
                    }, 1500);
                    displayError('Output copied to clipboard.', 'success'); 
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    displayError('Failed to copy text. See console.');
                });
        } else {
            displayError('Nothing to copy from output.');
        }
    });
    
    inputArea.addEventListener('input', () => displayError(''));

    console.log('Base64 Encoder/Decoder initialized.');
};

// --- Timestamp Converter ---
window.toolInitializers['timestamp-converter'] = function() {
    // ... (previous code for Timestamp Converter) ...
    console.log('Initializing Timestamp Converter...');

    const tsInput = document.getElementById('timestamp-input-ts');
    const btnToDate = document.getElementById('timestamp-btn-to-date');
    const btnCurrentToDate = document.getElementById('timestamp-btn-current-to-date');
    const outputDateLocal = document.getElementById('timestamp-output-date-local');
    const btnCopyDateLocal = document.getElementById('timestamp-btn-copy-date-local');
    const outputDateUtc = document.getElementById('timestamp-output-date-utc');
    const btnCopyDateUtc = document.getElementById('timestamp-btn-copy-date-utc');
    const yearInput = document.getElementById('timestamp-input-year');
    const monthInput = document.getElementById('timestamp-input-month');
    const dayInput = document.getElementById('timestamp-input-day');
    const hourInput = document.getElementById('timestamp-input-hour');
    const minuteInput = document.getElementById('timestamp-input-minute');
    const secondInput = document.getElementById('timestamp-input-second');
    const btnToTs = document.getElementById('timestamp-btn-to-ts');
    const btnCurrentToTsFields = document.getElementById('timestamp-btn-current-to-ts-fields');
    const outputTs = document.getElementById('timestamp-output-ts');
    const btnCopyTs = document.getElementById('timestamp-btn-copy-ts');
    const errorMessageArea = document.getElementById('timestamp-error-message');

    if (!tsInput || !btnToDate || !btnCurrentToDate || !outputDateLocal || !btnCopyDateLocal || !outputDateUtc || !btnCopyDateUtc ||
        !yearInput || !monthInput || !dayInput || !hourInput || !minuteInput || !secondInput || !btnToTs || !btnCurrentToTsFields ||
        !outputTs || !btnCopyTs || !errorMessageArea) {
        console.error('Timestamp Converter: One or more DOM elements not found.');
        return;
    }

    function displayError(message, type = 'error') {
        errorMessageArea.textContent = message;
        errorMessageArea.className = `message ${type}`;
        errorMessageArea.style.display = message ? 'block' : 'none';
        if (type === 'error') {
            errorMessageArea.style.color = 'red'; 
        } else {
            errorMessageArea.style.color = 'green'; 
        }
    }

    function copyToClipboard(text, buttonElement) {
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    const originalText = buttonElement.textContent;
                    buttonElement.textContent = 'Copied!';
                    setTimeout(() => {
                        buttonElement.textContent = originalText;
                    }, 1500);
                    displayError('Copied to clipboard.', 'success');
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    displayError('Failed to copy. See console.');
                });
        } else {
            displayError('Nothing to copy.');
        }
    }

    btnToDate.addEventListener('click', () => {
        const timestampStr = tsInput.value.trim();
        if (timestampStr === '') {
            displayError('Timestamp input cannot be empty.');
            outputDateLocal.value = '';
            outputDateUtc.value = '';
            return;
        }
        const timestamp = parseInt(timestampStr, 10);

        if (isNaN(timestamp)) {
            displayError('Invalid timestamp. Please enter a number.');
            outputDateLocal.value = '';
            outputDateUtc.value = '';
            return;
        }
        try {
            const date = new Date(timestamp * 1000); 
            if (isNaN(date.getTime())) { 
                 displayError('Invalid date produced from timestamp.');
                 outputDateLocal.value = '';
                 outputDateUtc.value = '';
                 return;
            }
            outputDateLocal.value = date.toLocaleString(); 
            outputDateUtc.value = date.toUTCString();
            displayError('');
        } catch (e) {
             displayError('Error converting timestamp to date: ' + e.message);
             outputDateLocal.value = '';
             outputDateUtc.value = '';
        }
    });

    btnCurrentToDate.addEventListener('click', () => {
        tsInput.value = Math.floor(Date.now() / 1000);
        btnToDate.click(); 
    });

    btnCopyDateLocal.addEventListener('click', () => copyToClipboard(outputDateLocal.value, btnCopyDateLocal));
    btnCopyDateUtc.addEventListener('click', () => copyToClipboard(outputDateUtc.value, btnCopyDateUtc));

    btnToTs.addEventListener('click', () => {
        const year = parseInt(yearInput.value, 10);
        const month = parseInt(monthInput.value, 10); 
        const day = parseInt(dayInput.value, 10);
        const hour = parseInt(hourInput.value || 0, 10);
        const minute = parseInt(minuteInput.value || 0, 10);
        const second = parseInt(secondInput.value || 0, 10);

        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
            displayError('Invalid date/time components. Please enter valid numbers for all fields.');
            outputTs.value = '';
            return;
        }
        if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
            displayError('Date/time values are out of range.');
            outputTs.value = '';
            return;
        }
        
        try {
            const date = new Date(year, month - 1, day, hour, minute, second);
             if (isNaN(date.getTime())) { 
                 displayError('Invalid date. Please check your input values (e.g., Feb 30).');
                 outputTs.value = '';
                 return;
            }
            if (date.getFullYear() !== year || (date.getMonth() + 1) !== month || date.getDate() !== day) {
                 displayError('Invalid date. One or more date components (day, month) are out of range for the given month/year.');
                 outputTs.value = '';
                 return;
            }

            outputTs.value = Math.floor(date.getTime() / 1000);
            displayError('');
        } catch (e) {
            displayError('Error converting date to timestamp: ' + e.message);
            outputTs.value = '';
        }
    });

    btnCurrentToTsFields.addEventListener('click', () => {
        const now = new Date();
        yearInput.value = now.getFullYear();
        monthInput.value = now.getMonth() + 1; 
        dayInput.value = now.getDate();
        hourInput.value = now.getHours();
        minuteInput.value = now.getMinutes();
        secondInput.value = now.getSeconds();
        btnToTs.click(); 
    });

    btnCopyTs.addEventListener('click', () => copyToClipboard(outputTs.value, btnCopyTs));
    
    const allInputs = [tsInput, yearInput, monthInput, dayInput, hourInput, minuteInput, secondInput];
    allInputs.forEach(input => {
        if(input) input.addEventListener('input', () => displayError(''));
    });

    console.log('Timestamp Converter initialized.');
};

// --- Lorem Ipsum Generator ---
window.toolInitializers['lorem-ipsum-generator'] = function() {
    // ... (previous code for Lorem Ipsum Generator) ...
    console.log('Initializing Lorem Ipsum Generator...');

    const numParagraphsInput = document.getElementById('lorem-paragraphs');
    const numSentencesInput = document.getElementById('lorem-sentences');
    const numWordsInput = document.getElementById('lorem-words');
    const startStandardCheckbox = document.getElementById('lorem-start-standard');
    const generateButton = document.getElementById('lorem-btn-generate');
    const outputArea = document.getElementById('lorem-output');
    const copyButton = document.getElementById('lorem-btn-copy');
    const wordCountSpan = document.getElementById('lorem-word-count');
    const charCountSpan = document.getElementById('lorem-char-count');
    const errorMessageArea = document.getElementById('lorem-error-message');

    if (!numParagraphsInput || !numSentencesInput || !numWordsInput || !startStandardCheckbox ||
        !generateButton || !outputArea || !copyButton || !wordCountSpan || !charCountSpan || !errorMessageArea) {
        console.error('Lorem Ipsum Generator: One or more DOM elements not found.');
        return;
    }

    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod',
        'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim',
        'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea',
        'commodo', 'consequat', 'duis', 'aute', 'irure', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse',
        'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
        'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
        'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio', 'cumque', 'nihil',
        'impedit', 'quo', 'minus', 'quod', 'maxime', 'placeat', 'facere', 'possimus', 'omnis', 'voluptas',
        'assumenda', 'repellendus', 'temporibus', 'autem', 'quibusdam', 'aut', 'officiis', 'debitis',
        'rerum', 'necessitatibus', 'saepe', 'eveniet', 'voluptates', 'repudiandae', 'recusandae',
        'itaque', 'earum', 'hic', 'tenetur', 'a', 'sapiente', 'delectus', 'reiciendis', 'voluptatibus',
        'maiores', 'alias', 'consequatur', 'perferendis', 'doloribus', 'asperiores', 'corporis', 'perspiciatis',
        'unde', 'iste', 'natus', 'error', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem', 'aperiam',
        'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis', 'quasi', 'architecto', 'beatae',
        'vitae', 'dicta', 'explicabo', 'nemo', 'enim', 'ipsam', 'quia', 'voluptas', 'sit', 'aspernatur',
        'odit', 'aut', 'fugit', 'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'eos', 'qui', 'ratione',
        'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'est', 'qui', 'dolorem', 'ipsum', 'quia', 'dolor',
        'sit', 'amet', 'consectetur', 'adipisci', 'velit', 'sed', 'quia', 'non', 'numquam', 'eius', 'modi',
        'tempora', 'incidunt', 'ut', 'labore', 'et', 'dolore', 'magnam', 'aliquam', 'quaerat', 'voluptatem'
    ];

    function displayError(message) {
        errorMessageArea.textContent = message;
        errorMessageArea.style.display = message ? 'block' : 'none';
    }

    function getRandomWord() {
        return loremWords[Math.floor(Math.random() * loremWords.length)];
    }

    function generateSentence(avgWords) {
        const variation = Math.floor(avgWords * 0.3);
        const numWords = Math.max(1, avgWords + Math.floor(Math.random() * (variation * 2 + 1)) - variation);
        let sentence = '';
        for (let i = 0; i < numWords; i++) {
            sentence += (i === 0 ? '' : ' ') + getRandomWord();
        }
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    }

    function generateParagraph(avgSentences, avgWords) {
        const variation = Math.floor(avgSentences * 0.3);
        const numSentences = Math.max(1, avgSentences + Math.floor(Math.random() * (variation * 2 + 1)) - variation);
        let paragraph = '';
        for (let i = 0; i < numSentences; i++) {
            paragraph += (i === 0 ? '' : ' ') + generateSentence(avgWords);
        }
        return paragraph;
    }

    generateButton.addEventListener('click', () => {
        displayError(''); 
        const paragraphs = parseInt(numParagraphsInput.value, 10);
        const sentencesPerPara = parseInt(numSentencesInput.value, 10);
        const wordsPerSentence = parseInt(numWordsInput.value, 10);
        const startStandard = startStandardCheckbox.checked;

        if (isNaN(paragraphs) || paragraphs < 1 ||
            isNaN(sentencesPerPara) || sentencesPerPara < 1 ||
            isNaN(wordsPerSentence) || wordsPerSentence < 1) {
            displayError('Please enter valid positive numbers for paragraphs, sentences, and words.');
            outputArea.value = '';
            wordCountSpan.textContent = '0';
            charCountSpan.textContent = '0';
            return;
        }

        let resultText = '';
        for (let i = 0; i < paragraphs; i++) {
            if (i === 0 && startStandard) {
                resultText += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + generateParagraph(sentencesPerPara -1, wordsPerSentence);
            } else {
                resultText += generateParagraph(sentencesPerPara, wordsPerSentence);
            }
            if (i < paragraphs - 1) {
                resultText += '\n\n'; 
            }
        }
        outputArea.value = resultText;
        
        const words = resultText.trim().split(/\s+/).filter(Boolean); 
        wordCountSpan.textContent = words.length;
        charCountSpan.textContent = resultText.length;
    });

    copyButton.addEventListener('click', () => {
        if (outputArea.value) {
            navigator.clipboard.writeText(outputArea.value)
                .then(() => {
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy Lorem Ipsum: ', err);
                    displayError('Failed to copy text. See console.');
                });
        } else {
            displayError('Nothing to copy.');
        }
    });
    
    [numParagraphsInput, numSentencesInput, numWordsInput].forEach(input => {
        if(input) input.addEventListener('input', () => displayError(''));
    });


    console.log('Lorem Ipsum Generator initialized.');
};

// --- Color Picker / Converter ---
window.toolInitializers['color-picker-converter'] = function() {
    // ... (previous code for Color Picker) ...
    console.log('Initializing Color Picker / Converter...');

    const colorPicker = document.getElementById('color-picker-input');
    const colorPreview = document.getElementById('color-preview');
    const hexInput = document.getElementById('color-input-hex');
    const rgbInput = document.getElementById('color-input-rgb');
    const hslInput = document.getElementById('color-input-hsl');
    const copyHexButton = document.getElementById('color-btn-copy-hex');
    const copyRgbButton = document.getElementById('color-btn-copy-rgb');
    const copyHslButton = document.getElementById('color-btn-copy-hsl');
    const errorMessageArea = document.getElementById('color-error-message');

    if (!colorPicker || !colorPreview || !hexInput || !rgbInput || !hslInput ||
        !copyHexButton || !copyRgbButton || !copyHslButton || !errorMessageArea) {
        console.error('Color Picker: One or more DOM elements not found.');
        return;
    }

    let isUpdating = false;

    function displayError(message) {
        errorMessageArea.textContent = message;
        errorMessageArea.style.display = message ? 'block' : 'none';
    }

    function copyToClipboard(text, buttonElement) {
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    const originalText = buttonElement.textContent;
                    buttonElement.textContent = 'Copied!';
                    setTimeout(() => {
                        buttonElement.textContent = originalText;
                    }, 1500);
                    displayError('');
                })
                .catch(err => {
                    console.error('Failed to copy color: ', err);
                    displayError('Failed to copy. See console.');
                });
        } else {
            displayError('Nothing to copy.');
        }
    }

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) return null;
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        const bigint = parseInt(hex, 16);
        return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    }

    function rgbToHex(r, g, b) {
        if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null;
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; 
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return { r, g, b };
    }

    function updateAllDisplays(source, hex, rgb, hsl) {
        if (isUpdating) return;
        isUpdating = true;

        if (source !== 'picker') colorPicker.value = hex;
        if (source !== 'hex') hexInput.value = hex;
        if (source !== 'rgb') rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        if (source !== 'hsl') hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        
        colorPreview.style.backgroundColor = hex;
        displayError('');
        isUpdating = false;
    }

    colorPicker.addEventListener('input', () => {
        if (isUpdating) return;
        const hex = colorPicker.value.toUpperCase();
        const rgb = hexToRgb(hex);
        if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            updateAllDisplays('picker', hex, rgb, hsl);
        } else {
            displayError('Invalid color from picker.');
        }
    });

    hexInput.addEventListener('input', () => {
        if (isUpdating) return;
        let hex = hexInput.value.trim();
        const rgb = hexToRgb(hex);
        if (rgb) {
            const validHex = rgbToHex(rgb.r, rgb.g, rgb.b); 
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            updateAllDisplays('hex', validHex, rgb, hsl);
        } else {
            displayError('Invalid HEX color code.');
        }
    });

    rgbInput.addEventListener('input', () => {
        if (isUpdating) return;
        const rgbStr = rgbInput.value.toLowerCase().replace(/[^0-9,]/g, '');
        const parts = rgbStr.split(',');
        if (parts.length === 3) {
            const r = parseInt(parts[0], 10);
            const g = parseInt(parts[1], 10);
            const b = parseInt(parts[2], 10);
            const hex = rgbToHex(r, g, b);
            if (hex) {
                const hsl = rgbToHsl(r, g, b);
                updateAllDisplays('rgb', hex, { r, g, b }, hsl);
            } else {
                displayError('Invalid RGB color code. Values must be 0-255.');
            }
        } else {
            displayError('Invalid RGB format. Use "r, g, b".');
        }
    });

    hslInput.addEventListener('input', () => {
        if (isUpdating) return;
        const hslStr = hslInput.value.toLowerCase().replace(/[^0-9,%.]/g, ''); 
        const parts = hslStr.split(',');
        if (parts.length === 3) {
            const h = parseInt(parts[0], 10);
            const s = parseInt(parts[1].replace('%',''), 10);
            const l = parseInt(parts[2].replace('%',''), 10);

            if (isNaN(h) || isNaN(s) || isNaN(l) || h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
                displayError('Invalid HSL values. H: 0-360, S: 0-100%, L: 0-100%.');
                return;
            }
            const rgb = hslToRgb(h, s, l);
            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            if (hex) { 
                updateAllDisplays('hsl', hex, rgb, { h, s, l });
            } else {
                 displayError('Error converting HSL to RGB/HEX.'); 
            }
        } else {
            displayError('Invalid HSL format. Use "h, s%, l%".');
        }
    });

    copyHexButton.addEventListener('click', () => copyToClipboard(hexInput.value, copyHexButton));
    copyRgbButton.addEventListener('click', () => copyToClipboard(rgbInput.value, copyRgbButton));
    copyHslButton.addEventListener('click', () => copyToClipboard(hslInput.value, copyHslButton));

    const initialHex = colorPicker.value.toUpperCase();
    const initialRgb = hexToRgb(initialHex);
    if (initialRgb) {
        const initialHsl = rgbToHsl(initialRgb.r, initialRgb.g, initialRgb.b);
        updateAllDisplays('initial', initialHex, initialRgb, initialHsl);
    }
    
    [hexInput, rgbInput, hslInput].forEach(input => {
        if(input) input.addEventListener('input', () => { if(!isUpdating) displayError(''); });
    });


    console.log('Color Picker / Converter initialized.');
};

// --- Regex Tester ---
window.toolInitializers['regex-tester'] = function() {
    console.log('Initializing Regex Tester...');

    const patternInput = document.getElementById('regex-pattern');
    const flagsInput = document.getElementById('regex-flags');
    const testStringInput = document.getElementById('regex-test-string');
    const highlightedOutput = document.getElementById('regex-highlighted-output');
    const matchListOutput = document.getElementById('regex-match-list');
    const matchCountOutput = document.getElementById('regex-match-count');
    const regexErrorMessage = document.getElementById('regex-error-message');

    if (!patternInput || !flagsInput || !testStringInput || !highlightedOutput || !matchListOutput || !matchCountOutput || !regexErrorMessage) {
        console.error('Regex Tester: One or more DOM elements not found.');
        return;
    }

    function displayRegexError(message) {
        regexErrorMessage.textContent = message;
        regexErrorMessage.style.display = message ? 'block' : 'none';
    }

    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    function testRegex() {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const testString = testStringInput.value;

        // Clear previous results and errors
        displayRegexError('');
        highlightedOutput.innerHTML = escapeHtml(testString); // Show plain text if regex is invalid or no matches
        matchListOutput.innerHTML = '<p>Enter a pattern and test string.</p>';
        matchCountOutput.textContent = '0';

        if (!pattern) {
            matchListOutput.innerHTML = '<p>Please enter a regex pattern.</p>';
            return;
        }

        let regex;
        try {
            regex = new RegExp(pattern, flags);
        } catch (e) {
            displayRegexError(`Invalid Regex: ${e.message}`);
            return;
        }

        let matches = [];
        let match;

        if (regex.global) {
            // Use matchAll for global regex to get all matches and their groups correctly
            matches = Array.from(testString.matchAll(regex));
        } else {
            // For non-global, exec will find the first match. 
            // If we wanted to find all matches with a non-global regex by repeatedly calling exec, 
            // we'd need to ensure the regex has the 'g' flag or manage lastIndex, which is complex.
            // For simplicity, non-global regex will just show the first match.
            match = regex.exec(testString);
            if (match) {
                matches.push(match);
            }
        }
        
        matchCountOutput.textContent = matches.length;

        if (matches.length === 0) {
            matchListOutput.innerHTML = '<p>No matches found.</p>';
            // highlightedOutput shows plain text already set
            return;
        }

        // Build highlighted output
        let highlightedHTML = '';
        let lastIndex = 0;
        matches.forEach(m => {
            // For matchAll, m is an array where m[0] is the full match, m.index is its start
            // For exec, m is also an array where m[0] is the full match, m.index is its start
            const matchText = m[0];
            const startIndex = m.index;
            const endIndex = startIndex + matchText.length;

            highlightedHTML += escapeHtml(testString.substring(lastIndex, startIndex));
            highlightedHTML += `<span class="regex-match">${escapeHtml(matchText)}</span>`;
            lastIndex = endIndex;
        });
        highlightedHTML += escapeHtml(testString.substring(lastIndex));
        highlightedOutput.innerHTML = highlightedHTML;

        // Build match list
        let listHTML = '<ul>';
        matches.forEach((m, index) => {
            listHTML += `<li><strong>Match ${index + 1}:</strong> <code>${escapeHtml(m[0])}</code> (Index: ${m.index})`;
            if (m.groups) { // Named capture groups
                listHTML += '<ul>';
                for (const groupName in m.groups) {
                    if (m.groups[groupName] !== undefined) {
                         listHTML += `<li>Group "<code>${escapeHtml(groupName)}</code>": <code>${escapeHtml(m.groups[groupName])}</code></li>`;
                    }
                }
                listHTML += '</ul>';
            } else if (m.length > 1) { // Numbered capture groups
                listHTML += '<ul>';
                for (let i = 1; i < m.length; i++) {
                     if (m[i] !== undefined) {
                        listHTML += `<li>Group ${i}: <code>${escapeHtml(m[i])}</code></li>`;
                     } else {
                        listHTML += `<li>Group ${i}: <code>undefined</code></li>`;
                     }
                }
                listHTML += '</ul>';
            }
            listHTML += '</li>';
        });
        listHTML += '</ul>';
        matchListOutput.innerHTML = listHTML;
    }

    // Event listeners for real-time testing
    patternInput.addEventListener('input', testRegex);
    flagsInput.addEventListener('input', testRegex);
    testStringInput.addEventListener('input', testRegex);

    // Initial test run in case there's pre-filled data (e.g. browser cache)
    testRegex(); 

    console.log('Regex Tester initialized.');
};


// Add more tool initializers as they are developed.
