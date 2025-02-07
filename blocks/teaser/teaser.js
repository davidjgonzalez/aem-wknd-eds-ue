/* /blocks/teaser/teaser.js */

/**
 * Bock options are applied as classes to the block's DOM
 * element along side the `block` and `<block-name>` classes.
 *
 * @param {HTMLElement} block represents the block's' DOM element/tree
 * */
function getOptions(block) {
  // Get the block's classes, excluding 'block' and 'teaser'.
  return [...block.classList].filter((c) => !['block', 'teaser'].includes(c));
}

/**
* Adds a zoom effect to image using event listeners.
*
* When the CTA button is hovered over, the image zooms in.
*
* @param {HTMLElement} block represents the block's' DOM tree
*/
function addEventListeners(block) {
  block.querySelector('.button').addEventListener('mouseover', () => {
    block.querySelector('.image').classList.add('zoom');
  });

  block.querySelector('.button').addEventListener('mouseout', () => {
    block.querySelector('.image').classList.remove('zoom');
  });
}

/**
 * Entry point to block's JavaScript.
 * Must be exported as default and accept a block's DOM element.
 * This function is called by the project's style.js, and passed the block's element.
 *
 * @param {HTMLElement} block represents the block's' DOM element/tree
 */
export default function decorate(block) {
/* This JavaScript makes minor adjustments to the block's DOM */

  /* Common treatments for all options */
  block.querySelector(':scope > div:last-child').classList.add('content');
  block.querySelector('h1,h2,h3,h4,h5,h6').classList.add('title');

  // Process each paragraph and mark it as text or terms-and-conditions
  block.querySelectorAll('p').forEach((p) => {
    const innerHTML = p.innerHTML?.trim();
    if (innerHTML?.startsWith('Terms and conditions:')) {
      p.classList.add('terms-and-conditions');
    }
  });

  /* Treatments for specific options */
  if (getOptions(block).includes('side-by-side')) {
    // Skip adding event listeners for the side-by-side variant.
    block.querySelector(':scope > div:first-child').classList.add('image-wrapper');
  } else if (!getOptions(block)) {
    // If getOptions returns an empty array, no options are applied.
    // In this case, well add event listeners
    block.querySelector('picture').classList.add('image-wrapper');
  }

  block.querySelector('.image-wrapper img').classList.add('image');

  addEventListeners(block);
}
