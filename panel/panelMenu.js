/*
URLs Purifier
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
*
* Based on:
*   ERASER
*   <https://github.com/Psychosynthesis/Eraser/blob/main/src/chrome/panel/panelMenu.js>
*   Copyright (c) 2022 Nick
MIT License:
*   You should have received a copy of the MIT License
*  If not <https://github.com/subham8907/Purify-urls/blob/main/LICENSE>
*/
import { readPurifyUrlsSettings, setDefaultSettings } from '../common/utils.js';
import { defaultSettings, SETTINGS_KEY, CANT_FIND_SETTINGS_MSG } from '../common/constants.js';

function storageChangeHandler(changes, area) {
    if (Object.hasOwn(changes, SETTINGS_KEY)) {
        const { oldValue, newValue } = changes[SETTINGS_KEY];
        if (oldValue && (newValue.status !== oldValue.status)) {
            updateToggleButton(newValue.status);
        }
    }
}

function togglePurifyUrlsSettings() {
    readPurifyUrlsSettings((readedSettings) => {
        if (!Object.hasOwn(readedSettings, SETTINGS_KEY)) {
            console.log(CANT_FIND_SETTINGS_MSG);
            setDefaultSettings();
        } else {
            const newStatus = !readedSettings[SETTINGS_KEY].status;
            chrome.storage.local.set({  // Changed sync to local
                [SETTINGS_KEY]: {
                    ...readedSettings[SETTINGS_KEY],
                    status: newStatus,
                }
            });
            chrome.runtime.sendMessage({action: 'updateRuleSet', enabled: newStatus});
            updateToggleButton(newStatus);
        }
    });
}

function updateToggleButton(status) {
    const toggleSwitch = document.querySelector('.toggle-switch');
    const toggleLabel = document.querySelector('.toggle-label');
    
    if (status) {
        toggleSwitch.classList.add('active');
        toggleLabel.textContent = 'On';
    } else {
        toggleSwitch.classList.remove('active');
        toggleLabel.textContent = 'Off';
    }
}

function onLoad(readedSettings) {
    if (!Object.hasOwn(readedSettings, SETTINGS_KEY)) {
        console.log(CANT_FIND_SETTINGS_MSG);
        setDefaultSettings();
    } else {
        updateToggleButton(readedSettings[SETTINGS_KEY].status);
    }
}

function switchTab(tabId) {
    const mainContent = document.getElementById('mainContent');
    const licenseContent = document.getElementById('licenseContent');
    const mainTab = document.getElementById('mainTab');
    const licenseTab = document.getElementById('licenseTab');

    if (tabId === 'mainTab') {
        mainContent.style.display = 'flex';
        licenseContent.style.display = 'none';
        mainTab.classList.add('active');
        licenseTab.classList.remove('active');
    } else {
        mainContent.style.display = 'none';
        licenseContent.style.display = 'block';
        mainTab.classList.remove('active');
        licenseTab.classList.add('active');
    }
}

document.getElementById("toggleButton").addEventListener("click", togglePurifyUrlsSettings);

document.getElementById('mainTab').addEventListener('click', () => switchTab('mainTab'));
document.getElementById('licenseTab').addEventListener('click', () => switchTab('licenseTab'));

readPurifyUrlsSettings(onLoad);
chrome.storage.onChanged.addListener(storageChangeHandler);
