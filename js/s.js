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
 * Send mail through the contact form
 */
(function(w, $, undefined){
  $(".contact-form").on("submit", function(event){
    event.preventDefault();

    var $this     = $(this),
        $formElem = $this.find(":input"),
        $bt       = $this.find("button"),
        w         = $bt.width(),
        h         = $bt.height(),
        $btText   = $bt.find("span"),
        btText    = $btText.text(),
        $spinner  = $bt.find(".spinner"),
        name      = $("[name=name]").val(),
        from      = $("[name=email]").val(),
        time      = "<em>" + $("[name=timeline]").val() + "</em>",
        text      = "<p>" + $("[name=description]").val() + "</p>";

    // Disabled form elements
    $formElem.attr("disabled", "disabled");

    // Add px dimensions to button
    $bt.width(w).height(h);

    // Save current text and hide it
    $btText.attr("data-text", btText).fadeOut();

    // Show spinner
    $spinner.fadeIn();

    // Ajax request to Mandrill API
    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        "key": "fHmc2ltGpObYQ8AlYtlvsw",
        "message": {
          "from_email": from,
          "from_name": name,
          "to": [
            {
              "email": "adrian@kendostudio.com",
              "name": "Kendo Studio",
              "type": "to"
            }
          ],
          "autotext": "true",
          "subject": "Contact from kendo.com",
          "html": time + text
        }
      }
     })
    .done(function(response) {
      // On success, hide the spinner and show a message
      $spinner.fadeOut();
      $btText
        .text("Message sent")
        .fadeIn()
        .delay(2000)
        .fadeOut(function(){
          $(this).text(btText).fadeIn();

          // Clean and enable form elements
          $formElem.removeAttr("disabled").not("select").val("");
        });
    });
  });
})(window, jQuery);
