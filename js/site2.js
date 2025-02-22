let sattizhauap, sattitilek, tilek_kaldir;
sattizhauap = bodymovin.loadAnimation({
    container: document.getElementById('satti_zhauap'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/images/main/json/satti_zhauap.json'
});
sattitilek = bodymovin.loadAnimation({
    container: document.getElementById('satti_tilek'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/images/main/json/satti_tilek.json'
});
tilek_kaldir = bodymovin.loadAnimation({
    container: document.getElementById('tilek_kaldir'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/images/main/json/tilek_kaldir.json'
});

window.addEventListener('load', function () {
  var preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

$('#sattizhauap').on('hidden.bs.modal', function () {
    sattizhauap.stop();
});
$('#sattitilek').on('hidden.bs.modal', function () {
    sattitilek.stop();
});
var zhauap_berdi = $("input[name='zhauap_berdi']").val();

if(zhauap_berdi == 1) {
    $(".opros").hide();
    $(".otvetnaopros").show();
}

var konakid = $("input[name='konakid']").val();
$(".zayotrp").click(function() {
    if(konakid == 0) 
        $('#nameengiz').modal('show');
    else 
        otpravka($("#form-1"));
});

$(".oprosozgertu").click(function() {
    $('.otvetnaopros').hide();
    $('.opros').show();
    konakid = $("input[name='konakid']").val();
});
$(".tilek_kaldir").click(function() {
    $('#tilekengiz').modal('show');
});

$(".nameengiz-content").children("button").click(function () {
    otpravka2($("#form-1"), $(".nameengiz-content"));
});
$(".tilekengiz-content").children("button").click(function () {
    tilekotpravka($("#form-1"), $(".tilekengiz-content"));
});

function otpravka(divid) {
    $.ajax({
        method: "POST",
        url: "/zayavka2.php",
        data: {'rejim': 2, 'zhauap': $("input[name='zhauap']:checked").val(), 'shaqyruid': $.trim(divid.children("input[name='shaqyruid']").val()), 'konakid': $.trim(divid.children("input[name='konakid']").val()) }
    })
    .done(function (msg) {
        // alert(msg);
        $("#sattizhauap").modal('show');
        sattizhauap.play();
        var zhauap, name, zhauaptext;
        // name = $.trim(divid2.children("input[name='name']").val());
        zhauap = $("input[name='zhauap']:checked").val();
        switch(zhauap) {
          case '1':
            zhauaptext = 'Өкінішке орай, келе алмаймын';
            break;
          case '2':
            zhauaptext = 'Иә, жалғыз өзім барамын!';
            break;
          case '3':
            zhauaptext = 'Жұбайыммен бірге барамын';
            break;
          default:
            zhauaptext = 'Қате #2';
        } 
        $(".otvetname").html(msg);
        $(".otvetzhauap").html(zhauaptext);
        $(".opros").hide();
        $(".otvetnaopros").show();
    });
}
function namekate2($text) {
    $('.namekate2').text($text);
    $('.namekate2').show();
}
function tilekkate($text) {
    $('.tilekkate').text($text);
    $('.tilekkate').show();
}
function namekate($text) {
    $('.namekate').text($text);
    $('.namekate').show();
}
function otpravka2(divid, divid2) {
    var oshibka = 0;
    // const regex = new RegExp('^[A-Za-z0-9]+$');
    var nameval = $.trim(divid2.children("input[name='name']").val());
    if (nameval == '') {
        namekate2('Есім жазылмады');
        oshibka = 1;
    } 
    // else if(!regex.test(nameval)) {
    //     namekate2('Тек әріптерді қолданыңыз');
    //     oshibka = 1;
    // } 
    else if(nameval.length < 2) {
        namekate2('Есім 2 символдан кем болмауы қажет');
        oshibka = 1;
    } else if(nameval.length > 40) {
        namekate2('Есім 40 символдан аспауы қажет');
        oshibka = 1;
    }

    if (oshibka == 0) {
        divid2.children("input[name='name']").css('border', '1px solid #BABAB9');
        $.ajax({
            method: "POST",
            url: "/zayavka2.php",
            data: {'rejim': 1, 'zhauap': $("input[name='zhauap']:checked").val(), 'shaqyruid': $.trim(divid.children("input[name='shaqyruid']").val()), 'konakid': $.trim(divid.children("input[name='konakid']").val()), 'name': $.trim(divid2.children("input[name='name']").val()) }
        })
        .done(function (msg) {
            // alert(msg);
            $("#nameengiz").modal('hide');
            $("#sattizhauap").modal('show');
            sattizhauap.play();
            var zhauap, name, zhauaptext;
            name = $.trim(divid2.children("input[name='name']").val());
            zhauap = $("input[name='zhauap']:checked").val();
            switch(zhauap) {
              case '1':
                zhauaptext = 'Өкінішке орай, келе алмаймын';
                break;
              case '2':
                zhauaptext = 'Иә, жалғыз өзім барамын!';
                break;
              case '3':
                zhauaptext = 'Жұбайыммен бірге барамын';
                break;
              default:
                zhauaptext = 'Қате #1';
            } 
            // alert(zhauaptext);
            divid2.children("input[name='name']").val("");
            $(".otvetname").html(name);
            $(".otvetzhauap").html(zhauaptext);
            $(".opros").hide();
            $(".otvetnaopros").show();
            $("input[name='konakid']").val(msg);
        });
    } else {
        divid2.children("input[name='name']").css('border', '1px solid red');
    }
}

function tilekotpravka(divid, divid2) {
    var oshibka = 0;
    var nameval = $.trim(divid2.children("input[name='name']").val());
    var tilekval = $.trim(divid2.children("textarea[name='tilek']").val());

    function escapeHtml(text) {
        return text.replace(/[&<>"']/g, function (m) {
            return {
                '&': "&amp;",
                '<': "&lt;",
                '>': "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[m];
        });
    }

    // Применяем фильтрацию
    nameval = escapeHtml(nameval);
    tilekval = escapeHtml(tilekval);

    if (nameval == '') {
        namekate('Есім жазылмады');
        divid2.children("input[name='name']").css('border', '1px solid red');
        oshibka = 1;
    } else if(nameval.length < 2) {
        namekate('Есім 2 символдан кем болмауы қажет');
        divid2.children("input[name='name']").css('border', '1px solid red');
        oshibka = 1;
    } else if(nameval.length > 40) {
        namekate('Есім 40 символдан аспауы қажет');
        divid2.children("input[name='name']").css('border', '1px solid red');
        oshibka = 1;
    } else {
        divid2.children("input[name='name']").css('border', '1px solid #BABAB9');
        $('.namekate').hide();
    }

    if (tilekval == '') {
        tilekkate('Тілек жазылмады');
        divid2.children("textarea[name='tilek']").css('border', '1px solid red');
        oshibka = 1;
    } else if(tilekval.length < 10) {
        tilekkate('Тілек 10 символдан кем болмауы қажет');
        divid2.children("textarea[name='tilek']").css('border', '1px solid red');
        oshibka = 1;
    } else if(tilekval.length > 700) {
        tilekkate('Тілек 700 символдан аспауы қажет');
        divid2.children("textarea[name='tilek']").css('border', '1px solid red');
        oshibka = 1;
    } else {
        divid2.children("textarea[name='tilek']").css('border', '1px solid #BABAB9');
        $('.tilekkate').hide();
    }

    if (oshibka == 0) {
        $.ajax({
            method: "POST",
            url: "/zayavka2.php",
            data: {'rejim': 3, 'tilek': $.trim(divid2.children("textarea[name='tilek']").val()), 'shaqyruid': $.trim(divid.children("input[name='shaqyruid']").val()), 'konakid': $.trim(divid.children("input[name='konakid']").val()), 'name': $.trim(divid2.children("input[name='name']").val()) }
        })
        .done(function (msg) {
            // alert(msg);
            $("#tilekengiz").modal('hide');
            $("#sattitilek").modal('show');
            divid2.children("input[name='name']").val("");
            divid2.children("textarea[name='tilek']").val("");
            sattitilek.play();
        });
    }
}
/* ------- AUDIO START ------------ */

var audio = new Audio();

function soundonClick(audio_src) {
    $('.sound-on').hide();
    $('.sound-off').show();
    audio.src = audio_src;
    audio.volume = 1.0;
    audio.play();
}

function soundoffClick() {
    $('.sound-off').hide();
    $('.sound-on').show();
    audio.pause();
}

audio.addEventListener("ended", function() {
    $('.sound-off').hide();
    $('.sound-on').show();
    audio.pause();
});

/* ------- AUDIO END ------------ */