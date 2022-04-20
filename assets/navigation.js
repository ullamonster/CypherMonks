function kiyonoToggleAriaExpanded(el, withListeners) {
  if ("true" !== el.getAttribute("aria-expanded")) {
    el.setAttribute("aria-expanded", "true")
    kiyonoSubmenuPosition(el.parentElement)
    if (withListeners) {
      document.addEventListener("click", kiyonoCollapseMenuOnClickOutside)
    }
  } else {
    el.setAttribute("aria-expanded", "false")
    if (withListeners) {
      document.removeEventListener("click", kiyonoCollapseMenuOnClickOutside)
    }
  }
}

function kiyonoCollapseMenuOnClickOutside(event) {
  if (!document.getElementById("site-navigation").contains(event.target)) {
    document
      .getElementById("site-navigation")
      .querySelectorAll(".sub-menu-toggle")
      .forEach(function (button) {
        button.setAttribute("aria-expanded", "false")
      })
  }
}

/**
 * Changes the position of submenus so they always fit the screen horizontally.
 *
 * @param {Element} li - The li element.
 */
function kiyonoSubmenuPosition(li) {
  var subMenu = li.querySelector("ul.sub-menu"),
    rect,
    right,
    left,
    windowWidth

  if (!subMenu) {
    return
  }

  rect = subMenu.getBoundingClientRect()
  right = Math.round(rect.right)
  left = Math.round(rect.left)
  windowWidth = Math.round(window.innerWidth)

  if (right > windowWidth) {
    subMenu.classList.add("submenu-reposition-right")
  } else if (document.body.classList.contains("rtl") && left < 0) {
    subMenu.classList.add("submenu-reposition-left")
  }
}

/**
 * Handle clicks on submenu toggles.
 *
 * @param {Element} el - The element.
 */
function kiyonoExpandSubMenu(el) {
  // jshint ignore:line
  // Close other expanded items.
  el.closest("nav")
    .querySelectorAll(".sub-menu-toggle")
    .forEach(function (button) {
      if (button !== el) {
        button.setAttribute("aria-expanded", "false")
      }
    })

  // Toggle aria-expanded on the button.
  kiyonoToggleAriaExpanded(el, true)

  // On tab-away collapse the menu.
  el.parentNode.querySelectorAll("ul > li:last-child > a").forEach(function (linkEl) {
    linkEl.addEventListener("blur", function (event) {
      if (!el.parentNode.contains(event.relatedTarget)) {
        el.setAttribute("aria-expanded", "false")
      }
    })
  })
}

;(function () {
  /**
   * Menu Toggle Behaviors
   *
   * @param {string} id - The ID.
   */
  var navMenu = function (id) {
    var wrapper = document.body, // this is the element to which a CSS class is added when a mobile nav menu is open
      mobileButton = document.getElementById(id + "-mobile-menu")

    if (mobileButton) {
      mobileButton.onclick = function () {
        wrapper.classList.toggle(id + "-navigation-open")
        wrapper.classList.toggle("lock-scrolling")
        kiyonoToggleAriaExpanded(mobileButton)
        mobileButton.focus()
      }
    }
    /**
     * Trap keyboard navigation in the menu modal.
     * Adapted from TwentyTwenty Wordpress Theme
     */
    document.addEventListener("keydown", function (event) {
      var modal, elements, selectors, lastEl, firstEl, activeEl, tabKey, shiftKey, escKey
      if (!wrapper.classList.contains(id + "-navigation-open")) {
        return
      }

      modal = document.querySelector("." + id + "-navigation")
      selectors = "input, a, button"
      elements = modal.querySelectorAll(selectors)
      elements = Array.prototype.slice.call(elements)
      tabKey = event.keyCode === 9
      shiftKey = event.shiftKey
      escKey = event.keyCode === 27
      activeEl = document.activeElement // eslint-disable-line @wordpress/no-global-active-element
      lastEl = elements[elements.length - 1]
      firstEl = elements[0]

      if (escKey) {
        event.preventDefault()
        wrapper.classList.remove(id + "-navigation-open", "lock-scrolling")
        kiyonoToggleAriaExpanded(mobileButton)
        mobileButton.focus()
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

    /**
     * Close menu and scroll to anchor when an anchor link is clicked.
     * Adapted from TwentyTwenty WordPress Theme.
     */
    document.addEventListener("click", function (event) {
      // If target onclick is <a> with # within the href attribute
      if (event.target.hash && event.target.hash.includes("#")) {
        wrapper.classList.remove(id + "-navigation-open", "lock-scrolling")
        kiyonoToggleAriaExpanded(mobileButton)

        // Fixed aria-expanded attribute when anchor link is clicked.
        var stayclose = document.querySelector("#primary-mobile-menu")
        stayclose.setAttribute("aria-expanded", "false")

      }
    })

    /***
     ** Close menu when clicking anywhere outside of menu
     ***/

    var modal = document.getElementById("primary-menu-list")
    window.onclick = function (event) {
      if (event.target == modal) {
        wrapper.classList.remove(id + "-navigation-open", "lock-scrolling")
        kiyonoToggleAriaExpanded(mobileButton)
        mobileButton.focus()
      }
    }

    document
      .getElementById("site-navigation")
      .querySelectorAll(".menu-wrapper > .menu-item-has-children")
      .forEach(function (li) {
        li.addEventListener("mouseenter", function () {
          this.querySelector(".sub-menu-toggle").setAttribute("aria-expanded", "true")
          kiyonoSubmenuPosition(li)
        })
        li.addEventListener("mouseleave", function () {
          this.querySelector(".sub-menu-toggle").setAttribute("aria-expanded", "false")
        })
      })
  }

  window.addEventListener("load", function () {
    new navMenu("primary")
  })
})()


// Remove .primary-navigation-open when window resized. 

window.addEventListener("resize", function(){

const kiyonoRemoveNavBodyClass = document.querySelector('body');
const kiyonoRemoveLock = document.querySelector('body')

   if( window.innerWidth > 992 ){
      kiyonoRemoveNavBodyClass.classList.remove('primary-navigation-open');
      kiyonoRemoveLock.classList.remove('lock-scrolling');
   }
});