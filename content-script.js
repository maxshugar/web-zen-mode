console.log('Zen Mode Activated');

// Function to hide elements by selector
function hideElement(selector) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		element.style.display = 'none';
	});
}

// Setup a MutationObserver to detect changes in the DOM
const observer = new MutationObserver((mutations, obs) => {
	if (window.location.pathname === '/') {
		// desktop
		hideElement('#contents');

		// mobile
		hideElement('.page-container');
		hideElement('ytm-pivot-bar-renderer');

		// ads
		hideElement('#masthead-ad');

		hideElement('#guide');
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
