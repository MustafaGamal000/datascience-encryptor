/**
 * DataScience Encryptor Demo Logic
 * This JS mimics the functionality of the Java Jasypt application by simulating 
 * AES-256 encryption using CryptoJS (in-browser encryption).
 * *Only for demo/visual purposes to be hosted on GitHub Pages.*
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const plaintextInput = document.getElementById('plaintext');
    const secretKeyInput = document.getElementById('secret-key');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const togglePasswordIcon = togglePasswordBtn.querySelector('svg');
    const encryptBtn = document.getElementById('encrypt-btn');
    const algorithmSelect = document.getElementById('algorithm');
    const consoleBody = document.getElementById('console');
    const copyBtn = document.getElementById('copy-btn');
    
    // Store last generated encryption payload for quick copying
    let lastEncryptedPayload = "";

    // Toggle Password Visibility
    let isPasswordVisible = false;
    togglePasswordBtn.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        secretKeyInput.type = isPasswordVisible ? 'text' : 'password';
        
        if (isPasswordVisible) {
            // Eye-off icon
            togglePasswordIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
        } else {
            // Eye icon
            togglePasswordIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
        }
    });

    // Helper: Delay for simulating processing time
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Helper: Print a line to the terminal
    const printToConsole = (text, className = '') => {
        const line = document.createElement('div');
        line.className = `console-line ${className}`;
        
        // Handle raw HTML for banner
        if (text.includes('<pre>')) {
            line.innerHTML = text;
        } else {
            // Format timestamps for authenticity
            const now = new Date();
            const timePrefix = `<span class="text-muted">[${now.toISOString().split('T')[1].substring(0,8)}]</span> `;
            line.innerHTML = `${className !== 'cli-banner' ? timePrefix : ''}${text}`;
        }
        
        consoleBody.appendChild(line);
        consoleBody.scrollTop = consoleBody.scrollHeight;
    };

    // Print the Java CLI Banner
    const printBanner = () => {
        const banner = `
   ____     _____        _         _____      _                         ____   
  / / /    |  __ \\      | |       / ____|    (_)                        \\ \\ \\  
 / / /_____| |  | | __ _| |_ __ _| (___   ___ _  ___ _ __   ___ ___ _____\\ \\ \\ 
&lt; &lt; &lt;______| |  | |/ _\` | __/ _\` |\\___ \\ / __| |/ _ \\ '_ \\ / __/ _ \\______&gt; &gt; &gt;
 \\ \\ \\     | |__| | (_| | || (_| |____) | (__| |  __/ | | | (_|  __/     / / / 
  \\_\\_\\    |_____/ \\__,_|\\__\\__,_|_____/ \\___|_|\\___|_| |_|\\___\\___|    /_/_/  

<span class="text-success">DataScience Encryption Tool v1.0.0</span>
`;
        printToConsole(banner, 'cli-banner');
    };

    // Encryption Logic Simulator (Generates actual AES ciphertext in browser to mimic backend)
    const performEncryption = async () => {
        const textToEncrypt = plaintextInput.value.trim();
        const secretKey = secretKeyInput.value.trim();
        const algorithm = algorithmSelect.value;
        const fullAlgorithmName = algorithmSelect.options[algorithmSelect.selectedIndex].text;

        // Clear console and prep UX
        consoleBody.innerHTML = '';
        encryptBtn.disabled = true;
        encryptBtn.innerHTML = `
            <svg class="zap-icon" style="animation: pulse 1s infinite" xmlns="http://www.w3.org/2001/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            Processing...
        `;

        if (!textToEncrypt || !secretKey) {
            printToConsole('Error: Missing input arguments. Plaintxt and Secret Key are required.', 'text-error');
            resetButton();
            return;
        }

        printToConsole(`Executing JVM instance...`);
        await sleep(300);
        
        printBanner();
        await sleep(400);

        printToConsole(`Initializing Security Provider context...`);
        await sleep(200);

        printToConsole(`Configuring Encryptor with algorithm: <span class="text-accent">${fullAlgorithmName}</span>`);
        await sleep(300);

        printToConsole(`Injecting RandomSaltGenerator class reference...`);
        printToConsole(`Injecting RandomIvGenerator class reference...`);
        await sleep(400);

        // Simulation: For non-AES legacy we just create a fake payload or base64. 
        // For AES-256 (default), we dynamically generate real ciphertext using CryptoJS.
        try {
            printToConsole(`Calculating digest and generating secure payload...`);
            await sleep(600);
            
            let encryptedPayload = "";

            if (algorithm === "AES-256") {
                // Generate genuine AES simulation using CryptoJS for visual authenticity
                encryptedPayload = CryptoJS.AES.encrypt(textToEncrypt, secretKey).toString();
            } else {
                // Simulate legacy algorithm output (base64 encoded string with prepended salt mimicry)
                const mockObj = `${algorithm}_${Date.now()}_${textToEncrypt}_${secretKey}`;
                encryptedPayload = btoa(mockObj);
            }

            lastEncryptedPayload = encryptedPayload;

            printToConsole(`\nEncrypted output:`);
            printToConsole(encryptedPayload, 'text-success');

        } catch (e) {
            printToConsole(`Processing Exception: ${e.message}`, 'text-error');
        } finally {
            resetButton();
        }
    };

    const resetButton = () => {
        encryptBtn.disabled = false;
        encryptBtn.innerHTML = `
            <svg class="zap-icon" xmlns="http://www.w3.org/2001/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            Execute Encryption
        `;
    };

    // Event Listeners
    encryptBtn.addEventListener('click', performEncryption);

    // Copy to clipboard logic
    copyBtn.addEventListener('click', () => {
        if (!lastEncryptedPayload) return;
        
        navigator.clipboard.writeText(lastEncryptedPayload).then(() => {
            // Show custom tooltip via DOM injection
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-copied show';
            tooltip.innerText = 'Copied!';
            
            // remove existing if button clicked multiple times rapidly
            const existingTooltip = copyBtn.querySelector('.tooltip-copied');
            if(existingTooltip) existingTooltip.remove();
            
            copyBtn.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 200);
            }, 2000);
        });
    });

    // Optional: submit on Enter inside key box
    secretKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performEncryption();
        }
    });
});
