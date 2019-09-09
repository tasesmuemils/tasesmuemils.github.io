$(function () {
    /*VARIABLES LIST*/
    var $navbar = $('#navbar').height();
    var firstSecH1 = $('#firstSec h1');
    var secondSecH1 = $('#secondSec h1');
    var thirdSecH1 = $('#thirdSec h1');
    var firstSecCard = $('#firstSec .swl-card');
    var secondSecCard = $('#secondSec .swr-card');
    var thirdSecCard = $('#thirdSec .swl-card');
    var firstSecScroll = $('#firstSec').offset().top;
    var secondSecScroll = $('#secondSec').offset().top;
    var thirdSecScroll = $('#thirdSec').offset().top;
    var arraySectionsH1 = [firstSecH1, secondSecH1, thirdSecH1];
    var arraySectionsCard = [firstSecCard, secondSecCard, thirdSecCard];
    var arrayTop = [firstSecScroll, secondSecScroll, thirdSecScroll];


    //FADE IN BANNER
    var bannerBackImg = $('.banner').css('background-image', 'url(../img/banner.jpg)');
    bannerBackImg.hide().fadeIn(500);
    $('.banner *, #navbar *').hide().fadeIn(2000);


    //NAVBAR CLICK ON/OFF
    $('#nav-wrapper').hide();
    $('#nav-button').on('click', function () {
        $('#nav-wrapper').show(500);
        $('#closeNavbar span').on('click', function () {
            $('#nav-wrapper').hide(500);
        })
    })


    //NAVBAR CHANGE STYLE AFTER SCROLL FIRST ELEMENT
    $(window).on('scroll', function () {
        if (($(window).scrollTop() + $navbar) >= (firstSecScroll)) {
            $('#navbar').css({
                'transition': '0.3s',
                'background-color': '#fff',
            })
            $('#navbar p, #nav-button-wrapper i').css({
                'transition': '0.3s',
                'color': '#555'
            });
            $('#nav-button-wrapper:hover').css({
                'color': '#51CCA8'
            })
        } else {
            $('#navbar, #navbar p, #nav-button-wrapper i').css({
                'background-color': '',
                'color': ''
            });
        }
    });


    //ANIMATIONS ON SECTIONS CONTENTS
    $('.swl-title-card-container h1, .swl-card, .swr-title-card-container h1, .swr-card').hide();
    $('.swl-title-card-container h1, .swr-title-card-container h1').css({
        marginTop: '-=100'
    });
    $('.swl-card, .swr-card').css({
        marginBottom: '-=100'
    });

    $(window).on('scroll', function () {
        var limiter = 990;
        for (let i = 0; i < arrayTop.length; i++) {
            if (($(window).scrollTop() + $navbar) >= (arrayTop[i] - ($(window).scrollTop() / 3.5))) {
                $(arraySectionsH1[i]).animate({
                    'opacity': 'show',
                    'marginTop': '0'
                }, 700);
                $(arraySectionsCard[i]).animate({
                    'opacity': 'show',
                    'marginBottom': '0'
                }, 700);
            } else if (($(window).width()) <= limiter) {
                $(arraySectionsH1[i]).stop(false, true);
                $(arraySectionsCard[i]).stop(false, true);
            }
        }
    })
})
