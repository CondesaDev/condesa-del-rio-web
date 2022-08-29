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
    constructor(lang) {
        console.log('RGA lang', lang);
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
        //window.open('mailto:gonzalezrau690@gmail.com?subject=subject&body=body');
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
var userLang = navigator.language || navigator.userLanguage; 
var model = AppViewModel(new Labels(userLang));

ko.components.register('nav-menu', {
    viewModel: model,
    template: ''+
            '<div class="navbar-nav ml-auto p-4" id="navElements">'+
                '<a href="index.html"   class="nav-item nav-link active"><span data-bind="text: labels.home"></span></a>'+
                '<a href="about.html"   class="nav-item nav-link"       ><span data-bind="text: labels.about"></span></a>'+
                '<a href="menu.html"    class="nav-item nav-link"       ><span data-bind="text: labels.menu"></span></a>'+
                '<!-- <a href="service.html" class="nav-item nav-link"       ><span data-bind="text: labels.service"></span></a>'+
                '<div class="nav-item dropdown">'+
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

ko.components.register('about', {
    viewModel: model,
    template: ''+
    '<div class="container">'+
        '<div class="section-title">'+
            '<h4 class="text-primary text-uppercase" style="letter-spacing: 5px;"><span data-bind="text: labels.about"></span></h4>'+
            '<h1 class="display-4">Sirviendo desde 2022</h1>'+
        '</div>'+
        '<div class="row">'+
            '<div class="col-lg-4 py-0 py-lg-5">'+
                '<h1 class="mb-3">Nuestra Historia</h1>'+
                '<h5 class="mb-3"></h5>'+
                '<p>Condesa del Río es un tequila blanco 100% de agave hecho en tequila Jalisco México representante de las bebidas mexicanas en el mundo, símbolo de la tradición ya sea blanco o reposado. Condesa del Río, un sabor suave donde se destaca la selección exclusiva de los agaves maduros en los campos de su jima, es un proceso especial dando resultados de sabor inigualable en su fabricación, un sabor tradicional donde representa la riqueza del suelo mexicano ¨Por eso le llamamos el néctar de los dioses¨.</p>'+
                '<a href="menu.html" class="btn btn-secondary font-weight-bold py-2 px-4 mt-2">Mas informacion</a>'+
            '</div>'+
            '<div class="col-lg-4 py-5 py-lg-0" style="min-height: 700px;">'+
                '<div class="position-relative h-100">'+
                    '<img class="position-absolute w-100 h-100" src="img/about.png" style="object-fit: cover;">'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-4 py-0 py-lg-5">'+
                '<h1 class="mb-3">Nuestra Mision</h1>'+
               ' <p>Ser la marca numero uno del pais y del continente americano, proporcionando el mejor tequila el mejor sabor al mejor precio.</p>'+
                '<h5 class="mb-3"><i class="fa fa-check text-primary mr-3"></i>Sabor</h5>'+
                '<h5 class="mb-3"><i class="fa fa-check text-primary mr-3"></i>Precio</h5>'+
                '<h5 class="mb-3"><i class="fa fa-check text-primary mr-3"></i>Cultura</h5>'+
                '<a href="contact.html" class="btn btn-primary font-weight-bold py-2 px-4 mt-2">Mas informacion</a>'+
            '</div>'+
        '</div>'+
   ' </div>'
});

ko.components.register('menu', {
    viewModel: model,
    template: ''+
    '<div class="container">'+
        '<div class="section-title">'+
            '<h4 class="text-primary text-uppercase" style="letter-spacing: 5px;">Productos & Precio</h4>'+
            '<h1 class="display-4">Precios competitivos</h1>'+
        '</div>'+
        '<div class="row">'+
            '<div class="col-lg-6">'+
                '<h1 class="mb-5">Botellas </h1>'+
                '<div class="row align-items-center mb-5">'+
                   ' <div class="col-4 col-sm-3">'+
                        '<img class="w-100 rounded-circle mb-3 mb-sm-0" src="img/menu-1.jpg" alt="" style="width: 110px !important; height: 110px;">'+
                        '<h5 class="menu-price">$680</h5>'+
                    '</div>'+
                    '<div class="col-8 col-sm-9">'+
                        '<h4>Condesa del rio 1L</h4>'+
                        '<p class="m-0">Tequila de la marca original</p>'+
                    '</div>'+
                '</div>'+
                '<div class="row align-items-center mb-5">'+
                    '<div class="col-4 col-sm-3">'+
                        '<img class="w-100 rounded-circle mb-3 mb-sm-0" src="img/menu-2.jpg" alt="" style="width: 110px !important; height: 110px;">'+
                        '<h5 class="menu-price">$850</h5>'+
                    '</div>'+
                    '<div class="col-8 col-sm-9">'+
                        '<h4>Pispireto</h4>'+
                        '<p class="m-0">Tequila pispireto</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-6">'+
                '<h1 class="mb-5">Por Mayoreo</h1>'+
                '<div class="row align-items-center mb-5">'+
                    '<div class="col-4 col-sm-3">'+
                        '<img class="w-100 rounded-circle mb-3 mb-sm-0" src="img/menu-1.jpg" alt="" style="width: 110px !important; height: 110px;">'+
                        '<h5 class="menu-price">$?</h5>'+
                    '</div>'+
                    '<div class="col-8 col-sm-9">'+
                        '<h4>Condesa del rio 1L (x botellas)</h4>'+
                        '<p class="m-0">Contacta me para saber precios al mayoreo <a href="tel:333-417-5555"><span data-bind="text: labels.phone"></span></a></p>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'
});

ko.applyBindings();