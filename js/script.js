$(document).ready(function() {

    $('.preloader').fadeOut(300);

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    $(window).on('orientationchange resize', function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    $("body").on('mouseover', 'a', function(e) {
        var $link = $(this),
            href = $link.attr('href') || $link.data("href");
        $link.off('click.chrome');
        $link.on('click.chrome', function() {
                window.location.href = href;
            })
            .attr('data-href', href)
            .css({
                cursor: 'pointer'
            })
            .removeAttr('href');
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        fade: true,
        adaptiveHeight: true,
    });

});