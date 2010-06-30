/** @license
Copyright 2010 WebDriver committers
Copyright 2010 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

goog.provide('bot.locators.strategies.id');

goog.require('bot.dom');
goog.require('goog.array');
goog.require('goog.dom');

/**
 * Find an element by using the value of the ID attribute.
 * @param {!Window} win The DOM window to search in.
 * @param {string} target The id to search for.
 * @return {Element} The first matching element found in the DOM, or null if no
 *     such element could be found.
 */
bot.locators.strategies.id.single = function(win, target) {
  var dom = goog.dom.getDomHelper(win);

  var e = dom.getElement(target);
  if (!e) {
    return null;
  }

  // On IE getting by ID returns the first match by id _or_ name.
  if (bot.dom.getAttribute(e, 'id') == target) {
    return e;
  }

  var elements = dom.getElementsByTagNameAndClass('*');

  return goog.array.find(elements, function(element) {
    return bot.dom.getAttribute(element, 'id') == target;
  });
};

/**
 * Find many elements by using the value of the ID attribute.
 * @param {!Window} win The DOM window to search in.
 * @param {string} target The id to search for.
 * @return {!goog.array.ArrayLike} All matching elements, or an empty list.
 */
bot.locators.strategies.id.many = function(win, target) {
  var dom = goog.dom.getDomHelper(win);

  var elements = dom.getElementsByTagNameAndClass('*');

  return goog.array.filter(elements, function(e) {
    return bot.dom.getAttribute(e, 'id') == target;
  });
};