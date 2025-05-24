// Define the list of available tools
const tools = [
    { id: 'text-case-converter', name: 'Text Case Converter', component: 'text-case-converter.html' },
    { id: 'json-formatter', name: 'JSON Formatter', component: 'json-formatter.html' },
    { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', component: 'base64-encoder-decoder.html' },
    { id: 'timestamp-converter', name: 'Timestamp Converter', component: 'timestamp-converter.html' },
    { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', component: 'lorem-ipsum-generator.html' },
    { id: 'color-picker-converter', name: 'Color Picker & Converter', component: 'color-picker-converter.html' },
    { id: 'regex-tester', name: 'Regex Tester', component: 'regex-tester.html' },
    { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', component: 'url-encoder-decoder.html' },
    { id: 'html-to-markdown-converter', name: 'HTML to Markdown Converter', component: 'html-to-markdown-converter.html' },
    { id: 'text-diff-checker', name: 'Text Diff Checker', component: 'text-diff-checker.html' },
    // Add more tools here as they are developed
];

// DOM Elements
const toolContainer = document.getElementById('tool-container');
const toolList = document.getElementById('tool-list');
const themeToggleButton = document.getElementById('theme-toggle');

// Function to load tool UI into the container
function loadTool(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) {
        toolContainer.innerHTML = `<p>Error: Tool "${toolId}" not found.</p>`;
        updateActiveNavLink(null);
        return;
    }

    const toolUrl = `components/${tool.component}`;

    fetch(toolUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load tool: ${tool.name}, status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            toolContainer.innerHTML = `<div class="tool-card"><h3>${tool.name}</h3>${html}</div>`;
            // If the loaded tool has a specific init function, call it
            if (window.toolInitializers && window.toolInitializers[tool.id]) {
                window.toolInitializers[tool.id]();
            }
            location.hash = toolId; // Update URL hash
            updateActiveNavLink(toolId);
        })
        .catch(error => {
            toolContainer.innerHTML = `<p class="tool-card">Error loading tool: ${error.message}. Please check the console for more details.</p>`;
            console.error(error);
            updateActiveNavLink(null);
        });
}

// Function to update active state in navigation
function updateActiveNavLink(activeToolId) {
    const links = toolList.querySelectorAll('a');
    links.forEach(link => {
        if (link.getAttribute('data-toolid') === activeToolId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


// Theme switching logic
function applyTheme(themeName) {
    document.body.className = themeName + '-theme';
    localStorage.setItem('theme', themeName);
    themeToggleButton.textContent = themeName === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Populate navigation dynamically
function populateNavigation() {
    if (!toolList) return;
    let navHTML = '';
    tools.forEach(tool => {
        // Using data-toolid to identify the tool for event handling
        navHTML += `<li><a href="#${tool.id}" data-toolid="${tool.id}">${tool.name}</a></li>`;
    });
    toolList.innerHTML = navHTML;

    // Add event listeners to nav links
    toolList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const toolId = link.getAttribute('data-toolid');
            loadTool(toolId);
        });
    });
}

// Handle URL hash changes and initial load
function handleRouting() {
    const currentHash = location.hash.substring(1); // Remove #
    if (currentHash) {
        loadTool(currentHash);
    } else if (tools.length > 0) {
        // Load the first tool as default if no hash
        loadTool(tools[0].id);
    } else {
        toolContainer.innerHTML = "<p class='tool-card'>No tools available. Add tools to `js/app.js` and create their HTML components.</p>";
    }
}

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    populateNavigation();

    // Setup theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Handle initial routing and hash changes
    handleRouting(); // For initial load
    window.addEventListener('hashchange', handleRouting, false); // For subsequent hash changes

    console.log("app.js loaded successfully and initialized!");
});
