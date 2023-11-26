// gallery.js

// Function to load p5.js script dynamically
function loadScript(scriptPath, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptPath;
    script.onload = callback;
    document.head.appendChild(script);
}

// Function to initialize the gallery
function initializeGallery() {
    // List of your artwork scripts
    const artworks = [
        'artworks/sketch_1.js',
        'artworks/sketch_2.js',
        'artworks/sketch_3.js',
        // Add more script filenames as needed
    ];

    const galleryContainer = document.body;

    // Loop through each artwork and load the script
    artworks.forEach((artworkScript) => {
        loadScript(artworkScript, () => {
            // Create an iframe for each artwork
            const iframeContainer = document.createElement('div');
            iframeContainer.classList.add('iframe-container');
            galleryContainer.appendChild(iframeContainer);

            const iframe = document.createElement('iframe');
            iframe.width = '520'; // Set the width as needed
            iframe.height = '520'; // Set the height as needed
            iframe.style.border = 'none'; // Remove the border
            iframeContainer.appendChild(iframe);

            // Get the script content using XHR to avoid scope issues
            const xhr = new XMLHttpRequest();
            xhr.open('GET', artworkScript, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Adjust the content of the iframe
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(`
                        <html>
                        <head>
                            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                        </head>
                        <body>
                            <script>
                                ${xhr.responseText};
                            </script>
                        </body>
                        </html>
                    `);
                    iframe.contentDocument.close();
                }
            };
            xhr.send();
        });
    });
}

// Initialize the gallery when the page is loaded
window.onload = initializeGallery;