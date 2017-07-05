'use strict';

/**
 * Main class for our Tabs.
 *
 * @constructor
 * @param {jQuery} $tabs - The main element that houses our tabs.
 */
function Tabs($tabs) {
    this.$tabs = $tabs;
    this.activeAnchorClass = "tabs-active-anchor";
    this.activeTabClass = "tabs-active-tab";

    if (this.$tabs.length) {
        this.init();
    } else {
      console.warn("Can't find root element for Tabs, please check if the DOM structure follows the spec!");
    }
}

/**
 * Collect all the elements
*/
Tabs.prototype.getElements = function () {
  this.$anchors = this.$tabs.find(".js-anchor");
  this.$tabItems = this.$tabs.find(".js-tab");
  this.$document = $(document);
};

/**
 * Helper method to set a tab anchor to active, show it's tab and do the
 * oposite for all the siblings
 *
 * @constructor
 * @param {String} id - The id of the tab to switch (must NOT contain a '#')
 */
Tabs.prototype.changeTab = function (id) {
  var $currentTabItem = this.$tabItems.filter("#" + id);

  // need to check if there is an item in the DOM with this id
  // if a hash URL is entered which is not a tab's ID it can break the functionality
  if ($currentTabItem.length) {
    // deactivate all anchors and hide all tabs
    this.$anchors.removeClass(this.activeAnchorClass);
    this.$tabItems.removeClass(this.activeTabClass);

    // Now we find the anchor that point to the ID and the tab that has the ID
    // and set them to active state

    // use ends-with attribute selector so that it can work with absolute URLs too
    this.$anchors.filter('[href$="#' + id + '"]').addClass(this.activeAnchorClass);
    $currentTabItem.addClass(this.activeTabClass);
  }

};

/**
 * Add event handlers to the DOM elements
*/
Tabs.prototype.addEvents = function () {
  var self = this; // save the referance to the constructore object, so we can use it inside the anonymus functions

  // Click handler for the tab-anchors
  this.$anchors.on({
    click: function() {
      // only run the changeTab method if the clicked anchor (ie.: this) is NOT active
      if (!$(this).hasClass(self.activeAnchorClass)) {
        console.log(self.activeAnchorClass);
        self.changeTab(self.getHash(this.getAttribute("href")));
      }
    }
  });
};

/**
 * Helper for returning the string after a #
 *
 * @constructor
 * @param {String} str - The string, from which the part after the firts '#' will be choped of and returned
 */
Tabs.prototype.getHash = function (str) {
  return str.substring(str.indexOf("#") + 1);
};

/**
 * Check for hash URL on load, if a hash is found, call the changeTab method for it
*/
Tabs.prototype.checkHashURL = function () {
  if (window.location.hash) {
    this.changeTab(this.getHash(window.location.hash));
  }
};

/**
 * Start everything
*/
Tabs.prototype.init = function () {
  this.getElements();
  this.checkHashURL();
  this.addEvents();
};
