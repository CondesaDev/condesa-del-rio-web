(function ($) {
    'use strict';

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown')
                .on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                })
                .on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }

            if ($(window).width() <= 768) {
                //$("#whatsAppImg").removeClass("hover-image");
                //$("#whatsAppImg").css("opacity", "1");
                //$("#whatsAppImg").addClass("hover-image");
                //$("a.hover-button").bind('click', eventhandler);
                //$("a.hover-button").prop('disabled', true);
            } else {
                //$("#whatsAppImg").addClass("hover-image");
                //$("#whatsAppImg").css("opacity", "0");
                //$("a.hover-button").prop('disabled', false);
               //$("a.hover-button").unbind('click',eventhandler);
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
    $('.testimonial-carousel').owlCarousel({
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

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'en,es', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL}, 'google_translate_element');

    $('body').on('change', '#google_translate_element select', function (e) {
        var val = $(this).find(':selected').val();

        if (val) {
            localStorage.setItem('leng', val);
        }
    });
    
    function changeLangToSV(){
        const leng = localStorage.getItem('leng');

        let ele = document.querySelector('#google_translate_element select');
        let options = document.querySelectorAll('#google_translate_element select option');

        options.forEach((option) => {

            if (option.value === leng) {
                ele.selectedIndex = option.index;
                ele.dispatchEvent(new Event('change'));
            }
        });
    }

    setTimeout(function(){ changeLangToSV(); }, 3000);
}

class Labels {
    constructor(lang) {
        this.pageName = 'Condesa Del Rio';
        this.contactUs = 'Contactanos';
        this.feelFreeToContact = 'Sientete libre de contactarnos';
        this.addressHeader = 'Direccion';
        this.address = 'Tequila, Jalisco, Mexico';
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
        this.comments = 'Comentarios';
    }
}

function AppViewModel(labels) {
    this.labels = labels;
    this.setAvtiveMenu = setAvtiveMenu;
    this.onLoadViewModel = onLoadViewModel;
    this.readDocuments = readDocuments;
    this.insertComment = insertComment;
    this.hideError = hideError;
    this.photoChanged = photoChanged;
    this.token;
    this.LOGIN_URL = LOGIN_URL;//'https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-agbvuip/auth/providers/local-userpass/login';
    this.BASE_URL = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action';
    this.DATABASE = 'development';
    this.COLLECTION = 'reviews';
    this.DATASOURSE = 'condesa-dev';
    this.USER = 'rulorules99';
    this.PASS = 'cloud192';

    this.onLoadViewModel();

    function onLoadViewModel () {
        this.setAvtiveMenu();
        showLoader();
        this.readDocuments();
    }

    function insertComment () {
        const username = document.getElementById('username').value;
        const rating = document.querySelector('input[name="rating"]:checked');
        const comment = document.getElementById('comment').value;
        const date = new Date().toISOString();
        const photoInput = document.getElementById('photo');
        const photoFile = photoInput.files[0];

        if (!username) {
            showError('usernameError');
            return;
        }
    
        if (!comment) {
            showError('commentError');
            return;
        }
    
        if (!rating) {
            showError('ratingError');
            return;
        }
    
        if (photoFile) {       
            if (photoFile) {
                resizeImage(photoFile, 0.5, function(resizedImageBase64) {
                    submitReview({ rating: parseInt(rating.value), comment, date, username, photoBase64: resizedImageBase64 });
                });
            }
        } else {
            submitReview({ rating: parseInt(rating.value), comment, date, username });
        }
    }

    function resizeImage(file, scale, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                callback(canvas.toDataURL('image/jpeg').split(',')[1]);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function showError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 10000); // Desaparece después de 10 segundos
    }
    
    function hideError(elementId) {
        document.getElementById(elementId).style.display = 'none';
    }

    function submitReview (review) {
        showLoader(); // Mostrar loader
        $.ajax({
            type: "POST",
            url: `${this.BASE_URL}/insertOne`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            },
            data: JSON.stringify(
            {
                "collection": this.COLLECTION,
                "database": this.DATABASE,
                "dataSource": this.DATASOURSE,
                "document": {
                    average: review.rating,
                    reviewComment: review.comment,
                    photo: review.photoBase64,
                    username: review.username,
                    createdAt: { "$date": review.date }
                }
            }),
            success: (data) => {    
                console.log('Documentos insertados:', data);
                this.readDocuments();
            },
            error: function (data) {
                closeLoader();// Ocultar loader
                alert('Errores encontrados: ' + data);
            }
        });
    }

    function setAvtiveMenu () {
        $(document).ready(function () {
            var location = window.location.toString().split('/').at(-1);
            if (!location) {
                location = 'index.html';
            }

            var navElemet = $('#navElements' );
            var aElemets = navElemet.children();
            
            aElemets.removeClass('active');

            var currentTab = navElemet.find($(`a[href="${location}"]`));

            currentTab.addClass('active');
        });
        return true;
    }

    function photoChanged (data, e) {
        const photoPreview = document.getElementById('photoPreview');
        const photoFile = e.target.files[0];
        
        if (photoFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                photoPreview.src = reader.result;
                photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(photoFile);
        } else {
            photoPreview.src = '';
            photoPreview.style.display = 'none';
        }
    }

    function readDocuments() {
        $.ajax({
            type: "POST",
            url: this.LOGIN_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": this.USER,
                "password": this.PASS
            }),
            success: (data) => {

                console.log('access_token:', data);
                this.token = data.access_token;
                $.ajax({
                    type: "POST",
                    url: `${this.BASE_URL}/find`,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${this.token}`
                    },
                    data: JSON.stringify({
                        "collection": this.COLLECTION,
                        "database": this.DATABASE,
                        "dataSource": this.DATASOURSE
                    }),
                    success: function (data) {
                        console.log('Documentos encontrados:', data);
                        const reviews = data.documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        const resultsDiv = document.getElementById('results');
                        resultsDiv.innerHTML = ''; // Limpiar resultados previos
                        
                        reviews.forEach(review => {
                            const reviewDiv = document.createElement('div');
                            reviewDiv.classList.add('review');
                            
                            const infoDiv = document.createElement('div');
                            infoDiv.classList.add('info');
                            
                            const dateDiv = document.createElement('div');
                            dateDiv.classList.add('date');
                            dateDiv.innerText = new Date(review.createdAt).toLocaleString();
                            
                            const ratingDiv = document.createElement('div');
                            ratingDiv.classList.add('rating');
                            ratingDiv.innerHTML = '★'.repeat(review.average) + '☆'.repeat(5 - review.average);
                            
                            infoDiv.appendChild(dateDiv);
                            infoDiv.appendChild(ratingDiv);
                            
                            const commentDiv = document.createElement('div');
                            commentDiv.classList.add('comment');
                            commentDiv.innerText = review.reviewComment;
                            
                            const usernameDiv = document.createElement('div');
                            usernameDiv.classList.add('username');
                            usernameDiv.innerText = `Por: ${review.username}`;
                            
                            reviewDiv.appendChild(infoDiv);
                            reviewDiv.appendChild(usernameDiv);
                            reviewDiv.appendChild(commentDiv);

                            if (review.photo) {
                                const photoDiv = document.createElement('div');
                                photoDiv.classList.add('photo');
                                const img = document.createElement('img');
                                img.src = `data:image/jpeg;base64,${review.photo}`;
                                img.addEventListener('dblclick', () => openModal(img.src));
                                photoDiv.appendChild(img);
                                reviewDiv.appendChild(photoDiv);
                            }

                            const trashIcon = document.createElement('span');
                            trashIcon.classList.add('trash-icon');
                            trashIcon.innerHTML = '🗑️';
                            trashIcon.addEventListener('click', () => deleteReview(review._id));
                            reviewDiv.appendChild(trashIcon);
        
                            resultsDiv.appendChild(reviewDiv);

                        });
                        closeLoader();// Ocultar loader
                    },
                    error: function (data) {
                        closeLoader();// Ocultar loader
                        alert('Errores encontrados: ' + data);
                    }
                });
            },
            error: function (data) {
                closeLoader();// Ocultar loader
                alert('Errores encontrados: ' + data);
            }
        });
    }


    function deleteReview(reviewId) {
        showLoader(); // Mostrar loader
        console.log('Eliminando: ', { filter: { _id: { $oid: reviewId } } });
        closeLoader(); // Ocultar loader
        /* fetch(`${BASE_URL}/databases/${DATABASE}/collections/${COLLECTION}/deleteOne?apiKey=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filter: { _id: { $oid: reviewId } } })
        })*/
    }

    function openModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc;
        modal.style.display = 'flex';
    }
    
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('imageModal').style.display = 'none';
    });

    document.getElementById('imageModal')?.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            document.getElementById('imageModal').style.display = 'none';
        }
    });

    function closeLoader () {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    function showLoader () {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'flex';
        }
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
                '<a href="conmments.html" class="nav-item nav-link"><span data-bind="text: labels.comments"></span></a>'+
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
                '<h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">Síguenos</h4>'+
                '<p>Ahora nos puedes seguir en las sigueinetes redes sociales</p>'+
                '<div class="d-flex justify-content-start">'+
                    '<a class="btn btn-lg btn-outline-light btn-lg-square mr-2" target="_blank" href="https://www.facebook.com/Condesa-del-rio-110107168450655"><i class="fab fa-facebook-f"></i></a>'+
                    '<a class="btn btn-lg btn-outline-light btn-lg-square mr-2" target="_blank" href="#"><i class="fab fa-instagram"></i></a>'+
                    '<a class="btn btn-lg btn-outline-light btn-lg-square" target="_blank" href="https://www.tiktok.com/@elizabethrio855?_t=8VabXtVznYU&_r=1"><i class="fab fa-tiktok"></i></a>'+
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
            '<h1 class="display-4">Conquistando paladares</h1>'+
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
               ' <p>No somos como todos , pero somos un tequila con personalidad con carácter con unas notas elegantes que te lleva al paladar a disfrutár todas las tonalidades que se pueden descubrir que se convierta en arte en el paladar creamos el arte en tequila.</p>'+
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
            '<h1 class="display-4">Con excelentes precios</h1>'+
        '</div>'+
        '<div class="row">'+
            '<div class="col-lg-6 overflow-hidden">'+
                '<h1 class="mb-5">Botellas </h1>'+
                '<div class="row align-items-center mb-5 data-card">'+
                   ' <div class="col-4 col-sm-3 index9">'+
                        '<img class="w-100 rounded-circle mb-3 mb-sm-0" src="img/menu-1.jpg" alt="" style="width: 110px !important; height: 110px;">'+
                        '<h5 class="menu-price">$680</h5>'+
                    '</div>'+
                    '<div class="col-8 col-sm-9">'+
                        '<div class="info-card">'+
                            '<h4>Condesa del rio 1L</h4>'+
                            '<p class="m-0">Tequila de la marca original</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row align-items-center mb-5 data-card">'+
                    '<div class="col-4 col-sm-3 index9">'+
                        '<img class="w-100 rounded-circle mb-3 mb-sm-0" src="img/menu-2.jpg" alt="" style="width: 110px !important; height: 110px;">'+
                        '<h5 class="menu-price">$850</h5>'+
                    '</div>'+
                    '<div class="col-8 col-sm-9">'+
                        '<div class="info-card">'+
                            '<h4>Pispireto</h4>'+
                            '<p class="m-0">Tequila pispireto</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-6 overflow-hidden">'+
                '<h1 class="mb-5">Por Mayoreo</h1>'+
                '<div class="row align-items-center mb-5 data-card">'+
                    '<div class="col-4 col-sm-3 index9">'+
                        '<img class="w-100 rounded-circle mb-3 mb-sm-0" src="img/menu-1.jpg" alt="" style="width: 110px !important; height: 110px;">'+
                        '<h5 class="menu-price">$?</h5>'+
                    '</div>'+
                    '<div class="col-8 col-sm-9">'+
                        '<div class="info-card" style="top: -3rem">'+
                            '<h4>Condesa del rio 1L (x botellas)</h4>'+
                            '<p class="m-0">Contacta me para saber precios al mayoreo <a href="tel:333-417-5555"><span data-bind="text: labels.phone"></span></a></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'
});

ko.applyBindings();