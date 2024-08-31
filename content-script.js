console.log('Zen Mode Activated');

function injectZenModeText() {
	// Create a new div element to hold the text
	if (document.getElementById('zen-mode-text')) return;
	const zenModeDiv = document.createElement('div');
	zenModeDiv.setAttribute('id', 'zen-mode-text');
	zenModeDiv.textContent = 'Zen Mode'; // Set the text to "Zen Mode"
	zenModeDiv.style.position = 'fixed'; // Make the div fixed to position it in the center
	zenModeDiv.style.top = '50%'; // Center vertically
	zenModeDiv.style.left = '50%'; // Center horizontally
	zenModeDiv.style.transform = 'translate(-50%, -50%)'; // Adjust the position to truly center
	zenModeDiv.style.zIndex = '1000'; // Ensure it is on top of other content
	zenModeDiv.style.fontSize = '2rem'; // Set font size
	zenModeDiv.style.color = 'white'; // Set text color
	zenModeDiv.style.fontWeight = 'bold'; // Make text bold
	zenModeDiv.style.backgroundColor = 'rgba(0,0,0,0.7)'; // Optional: add a semi-transparent background
	zenModeDiv.style.padding = '20px'; // Add some padding around the text
	zenModeDiv.style.borderRadius = '10px'; // Round the corners

	document.body.appendChild(zenModeDiv); // Add the div to the body of the page
}

// Function to hide elements by selector
function hideElement(selector) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		element.style.display = 'none';
	});
}

// Setup a MutationObserver to detect changes in the DOM
const observer = new MutationObserver((mutations, obs) => {
	// const zenText = document.getElementById('zen-mode-text');
	// if (zenText) {
	// 	zenText.remove();
	// }

	if (window.location.pathname === '/') {
		// desktop
		hideElement('#contents');

		// mobile
		hideElement('.page-container');
		hideElement('ytm-pivot-bar-renderer');

		// ads
		hideElement('#masthead-ad');

		hideElement('#guide');

		// Call the function to inject the text when the script loads
		// injectZenModeText();
	} else if (window.location.pathname.startsWith('/watch')) {
		// desktop
		hideElement('#secondary');
		hideElement('#comments');

		// mobile
		hideElement('.related-items-container');
	}
});

// Determine a more specific target if possible, or use document.body as a fallback
const targetNode = document.querySelector('#page-manager') || document.body;

// Start observing the target for added nodes and subtree modifications
observer.observe(targetNode, {
	childList: true,
	subtree: true,
});
