(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
})(jQuery);

class Labels {
    constructor() {
        this.pageName = 'Condesa Del Rio';
        this.contactUs = "Contactanos";
        this.feelFreeToContact = "Sientete libre de contactarnos";
        this.addressHeader = "Direccion";
        this.address = "Tequila, Jalisco, Mexico";
        this.phoneHeader= 'Telefono';
        this.phone = '+52 333 417 5555';
        this.emailHeader = 'Email';
        this.email = 'delriocondeza@gmail.com';

        this.namePh = 'Tu Nombre';
        this.emailPh = 'Tu Email';
        this.subjectPh = 'Asunto';
        this.messagePh = 'Mensaje';
        
        this.nameValidation ='Porfavor introduce tu nombre';
        this.emailValidation = 'Porfavor introduce tu email';
        this.subjectValidation = 'Porfavor introduce tu asunto';
        this.messageValidation = 'Porfavor introduce tu mensaje';

        this.sendMessageBtn = 'Enviar Mensaje';

        this.home = 'Paguina Principal';
        this.about = 'Acerca de nosotros';
        this.service = 'Servicio';
        this.menu = 'Productos';
        this.contact = 'Contacto';
    }
}

function AppViewModel(labels) {
    console.log(labels);
    this.labels = labels;
    this.setAvtiveMenu = setAvtiveMenu;
    this.onLoadViewModel = onLoadViewModel;

    this.onLoadViewModel();

    function onLoadViewModel () {
        this.setAvtiveMenu();
    }

    function setAvtiveMenu () {
        $(document).ready(function () {
            var location = window.location.toString().split('/').at(-1);
            var navElemet = $("#navElements" );
            var aElemets = navElemet.children();
            
            aElemets.removeClass("active");

            var currentTab = navElemet.find($("a[href='"+location+"']"));

            currentTab.addClass("active");

        });
        return true;
    }
}    

// ko.components.register('nav-menu', {
//     viewModel: AppViewModel(new Labels()),
//     template: require('fs').readFileSync(__dirname + '/templates/nav-menu.html', 'utf8')
// });

var model = AppViewModel(new Labels());

ko.components.register('nav-menu', {
    viewModel: model,
    template: ''+
            '<div class="navbar-nav ml-auto p-4" id="navElements">'+
                '<a href="index.html"   class="nav-item nav-link active"><span data-bind="text: labels.home"></span></a>'+
                '<a href="about.html"   class="nav-item nav-link"       ><span data-bind="text: labels.about"></span></a>'+
                '<a href="service.html" class="nav-item nav-link"       ><span data-bind="text: labels.service"></span></a>'+
                '<a href="menu.html"    class="nav-item nav-link"       ><span data-bind="text: labels.menu"></span></a>'+
                ' <!-- <div class="nav-item dropdown">'+
                    '<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>'+
                    '<div class="dropdown-menu text-capitalize">'+
                        '<a href="reservation.html" class="dropdown-item">Reservation</a>'+
                        '<a href="testimonial.html" class="dropdown-item">Testimonial</a>'+
                    '</div>'+
                '</div> -->'+
                '<a href="contact.html" class="nav-item nav-link"><span data-bind="text: labels.contact"></span></a>'+
            '</div>'
});

ko.components.register('footer', {
    viewModel: model,
    template: ''+
        '<div class="row mx-0 pt-5 px-sm-3 px-lg-5 mt-4">'+
            '<div class="col-lg-4 col-md-6 mb-5">'+
                '<h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">Contacto</h4>'+
                '<p><i class="fa fa-map-marker-alt mr-2"></i><span data-bind="text: labels.address"></span></p>'+
                '<p><i class="fa fa-phone-alt mr-2"></i><a href="tel:333-417-5555"><span data-bind="text: labels.phone"></span></a></p>'+
                '<p class="m-0"><i class="fa fa-envelope mr-2"></i><span data-bind="text: labels.email"></span></p>'+
            '</div>'+
            '<div class="col-lg-4 col-md-6 mb-5">'+
                '<h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">Siguenos</h4>'+
                '<p>Ahora nos puedes seguir en las sigueinetes redes sociales</p>'+
                '<div class="d-flex justify-content-start">'+
                    '<a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="https://www.facebook.com/Condesa-del-rio-110107168450655"><i class="fab fa-facebook-f"></i></a>'+
                    '<a class="btn btn-lg btn-outline-light btn-lg-square" href="#"><i class="fab fa-instagram"></i></a>'+
                    '<!-- <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-twitter"></i></a>'+
                    '<a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-linkedin-in"></i></a> -->'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-4 col-md-6 mb-5">'+
                '<h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">Horarios de apertura</h4>'+
                '<div>'+
                    '<h6 class="text-white text-uppercase">Lunes - Sabado</h6>'+
                    '<p>9:00 AM - 6:00 PM</p>'+
                    '<h6 class="text-white text-uppercase">Domingo</h6>'+
                    '<p>Cerrado</p>'+
                '</div>'+
            '</div>'+
            '<!-- <div class="col-lg-3 col-md-6 mb-5">'+
                '<h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">Newsletter</h4>'+
                '<p>Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>'+
                '<div class="w-100">'+
                    '<div class="input-group">'+
                        '<input type="text" class="form-control border-light" style="padding: 25px;" placeholder="Your Email">'+
                        '<div class="input-group-append">'+
                            '<button class="btn btn-primary font-weight-bold px-3">Sign Up</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div> -->'+
        '</div>'+
        '<div class="container-fluid text-center text-white border-top mt-4 py-4 px-sm-3 px-md-5" style="border-color: rgba(256, 256, 256, .1) !important;">'+
            '<p class="mb-2 text-white">Copyright &copy; <a class="font-weight-bold" href="#">Domain</a>. All Rights Reserved.</a></p>'+
            '<!-- <p class="m-0 text-white">Designed by <a class="font-weight-bold" href="https://htmlcodex.com">HTML Codex</a></p> -->'+
    '</div>'
});

ko.applyBindings();