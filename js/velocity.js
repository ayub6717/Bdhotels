var total = 100, px = true, fn = 'velocity',
d = document, w = window, s, ww, wh, a = {}, b, dots = [], dot, d, m = Math, mr = function(n){return m.random()*(n||1)};

function init() {
var i = 0;
$('#dots').empty();
dots.length = 0;
for (i;i<total;i++) dots.push($('<c/>').css({top:px?wh/2:'50%',left:px?ww/2:'50%'}));
$('#dots').append(dots);
for (i in dots) update(i);
}

function update(n) {
if (dot = dots[n]) {
    s = mr(60)+4;
    a = {
        left:px?mr(ww-s):(mr(99)+'%'),
        top:px?mr(wh-s):(mr(99)+'%'),
        width:s,
        height:s,
        opacity:mr(.8)+.1
    };
    d = mr(1000)+900;
    (fn=='animate')?dot.animate(a,d,function(){update(n)}):dot.velocity(a,d,function(){update(n)});
}
}

function winsize() {
ww = $(w).width();
wh = $(w).height();
}

$(function(){

$('#animate,#velocity').on('click',function(){
    $('button').removeClass('active');
    fn = $(this).addClass('active').attr('rel');
    document.title = $(this).attr('rel');
    //for (i in dots) dots[i].stop(true,true);
    return false;
});
$('#total').on('change',function(){
    total = $(this).val();
    init();
    update();
});
$('#units').on('change',function(){
    px = ($(this).val()=='px');
});
$('#hw').on('change',function(){
    $('#dots').toggleClass('fx');
});

b = $('body');

$(w).on('load',function(){
    winsize();
    init();
});
$(w).on('resize',function(){
    winsize();
});

});