$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();
            var sendObj = {
                Host : "smtp.elasticemail.com",
                Username : "delriocondeza@gmail.com",
                Password : "4AA5615E11008FA3E98B97341C857BF09C86",
                From: 'gonzalezraul690@gmail.com',
                To : 'delriocondeza@gmail.com',
                Subject : subject,
                Body : 'Nuevo mensaje de ' + name + ' <a href="mailto:' + email + '">' + email + '</a> ' + 'Mensaje: ' + message,
            };
            var ajaxObj = {
                url: "contact.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Tu mensaje ha sido mandado. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            };
            var success = (message) => {
                console.log(message);
                ajaxObj.success();
                ajaxObj.complete();
            };
            var contact = {
                from_email: email,
                from_name: name,
                message: message
            };

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            Email.send(sendObj).then(success);

            //emailjs.init("uw1pl-ZU1a_9Q_xWl");
            //emailjs.send("service_gdcojii", "template_a1sd0cn", contact).then(success);
            //$.ajax(ajaxObj);
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
