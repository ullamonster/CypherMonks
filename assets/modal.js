/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

 const KEYCODE = {
    ESC: 27
  };
  
  const dialog        = document.querySelector('.dialog');
  const dialogMask    = document.querySelector('.dialog__mask');
  const dialogWindow  = document.querySelector('.dialog__window');
  let previousActiveElement;

  const openSearchBtn = document.getElementById('btn');
  const openSearch    = document.getElementsByClassName('searchDialogBtn');

  // Open dialog if search toggle is enable. 
  if (openSearch.length > 0) {
    openSearchBtn.addEventListener('click', openDialog);
  }

  
  function openDialog() {
    // Restore the previous activeElement upon closing the dialog.
    previousActiveElement = document.activeElement;

    if ("true" !== openSearchBtn.getAttribute("aria-expanded")) {
      openSearchBtn.setAttribute("aria-expanded", "true");
    }
  
    // Show dialog
    dialog.classList.add('opened');
  
    // Listen for any events that should close the dialog.
    dialogMask.addEventListener( 'click', closeDialog );
    dialogWindow.querySelectorAll( 'button' ).forEach( btn => {
      btn.addEventListener( 'click', closeDialog);
    });
    document.addEventListener( 'keydown', checkCloseDialog);
  
    // Place focus into the dialog.
    dialog.querySelector('input').focus();
  }

  function checkCloseDialog(e) {
    if (e.keyCode === KEYCODE.ESC)
        closeDialog();
  }
  
  function closeDialog() {
    // Clean up any event listeners.

    if ("true" == openSearchBtn.getAttribute("aria-expanded")) {
      openSearchBtn.setAttribute("aria-expanded", "false");
    }

    dialogMask.removeEventListener('click', closeDialog);
    dialogWindow.querySelectorAll('button').forEach(btn => {
      btn.removeEventListener('click', closeDialog);
    });
    document.removeEventListener('keydown', checkCloseDialog);
  
    // Hide the dialog.
    dialog.classList.remove('opened');
  
    // Restore focus to the previous active element.
    previousActiveElement.focus();
  }
  


if (openSearch.length > 0) {
  // Tab key trap reference to Twentytwenty-one navigation.js
  document.addEventListener("keydown", function (event) {
    var modal, elements, selectors, lastEl, firstEl, activeEl, tabKey, shiftKey, escKey
  
    modal = document.querySelector(".dialog")
    selectors = "input, a, button"
    elements = modal.querySelectorAll(selectors)
    elements = Array.prototype.slice.call(elements)
    tabKey = event.keyCode === 9
    shiftKey = event.shiftKey
    escKey = event.keyCode === 27
    activeEl = document.activeElement 
    lastEl = elements[elements.length - 1]
    firstEl = elements[0]

    if (escKey) {
      event.preventDefault()
    }
  
    if (!shiftKey && tabKey && lastEl === activeEl) {
      event.preventDefault()
      firstEl.focus()
    }
  
    if (shiftKey && tabKey && firstEl === activeEl) {
      event.preventDefault()
      lastEl.focus()
    }
  
    // If there are no elements in the menu, don't move the focus
    if (tabKey && firstEl === lastEl) {
      event.preventDefault()
    }
  })
}