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
    const galleryContainer = document.body;

    // Fetch the list of artwork scripts dynamically and sort them by date
    fetchAndSortArtworkScripts().then((artworks) => {
        // Loop through each artwork and load the script
        artworks.forEach((artworkScript) => {
            // Create a container for each artwork
            const container = document.createElement('div');
            container.classList.add('artwork-container');
            galleryContainer.appendChild(container);

            // Create an iframe for each artwork
            const iframe = document.createElement('iframe');
            iframe.width = '420'; // Set the width as needed
            iframe.height = '420'; // Set the height as needed
            iframe.style.border = 'none'; // Remove the border

            // Set the title attribute with the script name
            iframe.title = artworkScript.fileName;

            container.appendChild(iframe);

            // Get the script content using fetch
            fetch(artworkScript.scriptPath)
                .then((response) => response.text())
                .then((scriptContent) => {
                    // Adjust the content of the iframe
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(`
                        <html>
                        <head>
                            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                        </head>
                        <body>
                            <script>
                                ${scriptContent};
                            </script>
                        </body>
                        </html>
                    `);
                    iframe.contentDocument.close();
                });

            // Create a paragraph for the file name
            const fileNameParagraph = document.createElement('p');
            fileNameParagraph.textContent = artworkScript.fileName;
            container.appendChild(fileNameParagraph);
        });
    });
}

// Fetch the list of artwork scripts dynamically and sort them by date
async function fetchAndSortArtworkScripts() {
    const response = await fetch('artworks/'); // Adjust the path to your artworks folder
    const body = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(body, 'text/html');
    const links = doc.querySelectorAll('a');

    // Filter out non-JavaScript files
    const jsFiles = Array.from(links).filter(link => link.href.endsWith('.js'));
    jsFiles.sort().reverse()

    // Convert NodeLists to an array of file paths and filenames
    const artworks = jsFiles.map(link => {
        const fileNameWithExtension = link.innerText.trim();
        const fileName = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));
        return {
            scriptPath: link.href,
            fileName: fileName,
        };
    });

    // Sort the artworks array based on modification date (from newest to oldest)
    artworks.sort(async (a, b) => {
        const aDate = await getFileModificationDate(a.scriptPath);
        const bDate = await getFileModificationDate(b.scriptPath);
        return bDate - aDate;
    });

    return artworks;
}

// Function to get the modification date of a file
async function getFileModificationDate(file) {
    const response = await fetch(file);
    const lastModified = new Date(response.headers.get('Last-Modified'));
    return lastModified;
}

// Initialize the gallery when the page is loaded
window.onload = initializeGallery;
