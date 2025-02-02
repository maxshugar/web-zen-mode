// When the popup loads, retrieve the stored toggle state.
document.addEventListener('DOMContentLoaded', () => {
	const toggleElement = document.getElementById('toggle');
	chrome.storage.sync.get('toggleState', async (data) => {
		// If the toggle state was never set, default to false (unchecked)
		toggleElement.checked = data.toggleState || false;

		// Get the active tab.
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		// Send a message to the content script on the active tab.
		chrome.tabs.sendMessage(
			tab.id,
			{ action: 'toggleCSS', enabled: toggleElement.checked },
			(response) => {
				logMessage(tab.id, 'toggleCSS');
			}
		);
	});
});

document.getElementById('toggle').addEventListener('change', async (e) => {
	// Get the active tab.
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	// Capture the state from the event in the popup context.
	const isChecked = e.target.checked;

	// Save the new state.
	chrome.storage.sync.set({ toggleState: isChecked });

	// Verify that the tab is on youtube.com
	if (!tab || !tab.url || !tab.url.includes('youtube.com')) {
		return;
	}

	// Send a message to the content script on the active tab.
	chrome.tabs.sendMessage(
		tab.id,
		{ action: 'toggleCSS', enabled: isChecked },
		(response) => {
			logMessage(tab.id, 'toggleCSS');
		}
	);
});

function logMessage(tabId, message) {
	chrome.scripting.executeScript(
		{
			target: { tabId },
			func: (msg) => {
				console.log(msg);
			},
			args: [message],
		},
		() => {
			if (chrome.runtime.lastError) {
				console.error('Error injecting script:', chrome.runtime.lastError);
			}
		}
	);
}
