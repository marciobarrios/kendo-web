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
(function(w, $, undefined){
  $(".contact-form").on("submit", function(event){
    event.preventDefault();

    var name = $("[name=name]").val(),
        from = $("[name=email]").val(),
        time = "<em>" + $("[name=timeline]").val() + "</em>",
        text = "<p>" + $("[name=description]").val() + "</p>";

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
     }).done(function(response) {
       console.log(response);
     });
  });
})(window, jQuery);
