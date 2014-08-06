/**
 * Detects if the browser supports SVG,
 * and adds a class to <html> accordingly ("svg" or "no-svg")
 */

function supportsSVG() {
  return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;
}
if (!supportsSVG()) {
  document.documentElement.className += ' no-svg';
}

/**
 * Mandrill API to send mails
 *
 */
