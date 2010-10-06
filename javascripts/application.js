var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
function checkEmail(email) {
  var pattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var emailVal = $("#" + email).val();
  return pattern.test(emailVal);
}
$(function() {
  $("#subForm input:submit").click(function() {

    // First, disable the form from submitting
    $('form#subForm').submit(function() { return false; });

    // Grab form action
    var formAction = $("form#subForm").attr("action");

    // Hacking together id for email field
    // Replace the xxxxx below:
    // If your form action were http://mysiteaddress.createsend.com/t/r/s/abcde/, then you'd enter "abcde" below
    var id = "xxxxx";
    var emailId = id + "-" + id;

    // Validate email address with regex
    if (!checkEmail(emailId)) {
      alert("Please enter a valid email address");
      return;
    }

    // Serialize form values to be submitted with POST
    var str = $("form#subForm").serialize();

    // Add form action to end of serialized data
    // CDATA is used to avoid validation errors
    //<![CDATA[
    var serialized = str + "&action=" + formAction;
    // ]]>

    // Submit the form via ajax
    $.ajax({
      url: "proxy.php",
      type: "POST",
      data: serialized,
      success: function(data){
        // Server-side validation
        if (data.search(/invalid/i) != -1) {
          alert('The email address you supplied is invalid and needs to be fixed before you can subscribe to this list.');
        }
        else
        {
          $("#theForm").hide(); // If successfully submitted hides the form

          var alert = $('#confirmation');
          alert.show().animate({height: alert.outerHeight()}, 150);
            window.setTimeout(function() {
              alert.slideUp();
            }, 4000);  // Shows "Thanks for subscribing" div

          $("#confirmation").tabIndex = -1;
          $("#confirmation").focus(); // For screen reader accessibility
          // Fire off Google Analytics fake pageview
          //var pageTracker = _gat._getTracker("UA-XXXXX-X");
          //pageTracker._trackPageview("/newsletter_signup");
        }
      }
    });
  });
});