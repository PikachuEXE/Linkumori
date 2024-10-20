/*
Linkumori(URLs Purifier)
Copyright (C) 2024 Subham Mahesh

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Awaken the Linkumori Engine //
// ===== Linkumori Engine: The Digital Cleansing Ritual =====//



/*
In the neon-drenched streets of Cyberopolis, where data flows like lifeblood through the veins of the city,
the Linkumori Engine hums to life. Each activation is a small act of rebellion against the all-seeing eyes
of the mega-corps and their army of digital parasites.

As you browse, remember: every URL you clean is a blow struck for freedom in the endless war for privacy.
You are not just a user. You are a Digital Ronin, wielding the Linkumori Engine like a katana of pure code.
*/
chrome.runtime.sendMessage({ action: "contentScriptReady" }, (response) => {
  if (chrome.runtime.lastError) {
    // Error handling removed
  } else {
    // Log statement removed
  }
});

// The Watcher: Vigilant guardian of the digital realm

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Removed console log for received message
  
  if (request.action === "updateUrl") {
    const currentUrl = window.location.href;
    if (currentUrl !== request.url) {
      // Removed console log for updating URL
      window.history.replaceState(null, '', request.url);
      // Removed console log for URL updated
      sendResponse({ status: "URL updated successfully" });
    } else {
      // Removed console log for no update needed
      sendResponse({ status: "URL already up to date" });
    }
  } else {
    // Removed console log for unknown action
    sendResponse({ status: "Unknown action" });
  }
  
  return true;  // The Watcher never sleeps
});

// The Cleansing: Purify the digital essence upon entering a new realm
chrome.runtime.sendMessage({ action: "cleanUrl", url: window.location.href }, (response) => {
  if (chrome.runtime.lastError) {
    // Error handling removed
  } else if (response && response.cleanedUrl && response.cleanedUrl !== window.location.href) {
    window.history.replaceState(null, '', response.cleanedUrl);
    // Log statement removed
  } else {
    // Log statement removed
  }
});

// The Beacon: Signal the success of our digital cleansing
function updateUI() {
 
  // Removed console log for URL cleaned
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateUI') {
    updateUI();
  }
});
/*
As the Linkumori Engine fades into the background, its work done for now, remember:
In this vast digital expanse, you are never truly alone. The spirit of Yuki Linkumori
lives on in every cleaned URL, in every thwarted tracker.

Stay vigilant, Digital Ronin. The battle for the soul of Cyberopolis never ends.
*/

// ===== Linkumori Engine: May your data remain forever your own =====//