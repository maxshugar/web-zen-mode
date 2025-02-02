// Listen for messages from the extension (popup or background)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('Content script received message:', request);
	if (request.action === 'toggleCSS') {
		if (request.enabled) {
			enableZenModeCSS();
		} else {
			disableZenModeCSS();
		}
	}
	// Send a response to confirm the action was performed.
	sendResponse({ status: 'ok' });
});

console.log('Content script loaded');

chrome.storage.sync.get('toggleState', async (data) => {
	console.log('toggleState', { data });
	if (data.toggleState) {
		enableZenModeCSS();
	} else {
		disableZenModeCSS();
	}
});

function enableZenModeCSS() {
	console.log('enableZenModeCSS');
	if (window.location.pathname === '/') {
		// desktop
		toggleElementDisplay('#contents', false);
		toggleElementDisplay('#dismissable', false);

		// mobile
		toggleElementDisplay('.page-container', false);
		toggleElementDisplay('ytm-pivot-bar-renderer', false);

		// ads
		toggleElementDisplay('#masthead-ad', false);

		toggleElementDisplay('#guide', false);
	} else if (window.location.pathname.startsWith('/watch')) {
		// desktop
		toggleElementDisplay('#secondary', false);
		toggleElementDisplay('#comments', false);

		// mobile
		toggleElementDisplay('.related-items-container', false);
	}
}

function disableZenModeCSS() {
	if (window.location.pathname === '/') {
		// desktop
		toggleElementDisplay('#contents', true);
		toggleElementDisplay('#dismissable', true);

		// mobile
		toggleElementDisplay('.page-container', true);
		toggleElementDisplay('ytm-pivot-bar-renderer', true);

		// ads
		toggleElementDisplay('#masthead-ad', true);

		toggleElementDisplay('#guide', false);
	} else if (window.location.pathname.startsWith('/watch')) {
		// desktop
		toggleElementDisplay('#secondary', true);
		toggleElementDisplay('#comments', true);

		// mobile
		toggleElementDisplay('.related-items-container', true);
	}
}

// Function to hide elements by selector
function toggleElementDisplay(selector, display) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		element.style.display = display ? 'block' : 'none';
	});
}
