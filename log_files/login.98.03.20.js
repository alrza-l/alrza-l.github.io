$(function () {
    $('#token-serial-div').hide();
    $('#UserType').change(function () {
        if (frmMain.UserType.value != 'Don') {
            $('#error-div').hide();
        }
        $('#UserCode').focus();
        if (!Submitting) setTimeout('Check_Lock()', 2000);
    });
    checkVersion();
    $('#UserCode').focus();
    $('.form-control-number').on('keypress', function (e) {
        var key = (!e.keyCode) ? (!e.which ? e.charCode : e.which) : (e.keyCode);
        if (key > 31 && key != 46 && key != 37 && (key < 48 || key > 57) && key != 38 && key != 40) {
            e.preventDefault();
            return false;
        }
    });
});


$(document).ready(function () {
    $("#browser-bar").tabs();
});
function checkVersion() {
    var ua = navigator.userAgent,
		tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

    if ((M[0] == 'MSIE') && (M[1] < 11)) {
        alert('براي اينکه نرم افزار تحت وب سما بدون اشکالات سيستمي مربوط به مرورگر کارائي بهتري داشته باشد از نسخه' + '\n' + 'Internet Explorer 11.0' + '\n' + 'به بعد استفاده کنيد');
        return false;
    }
    if ((M[0] == 'Firefox') && (M[1] < 11)) {
        alert('براي اينکه نرم افزار تحت وب سما بدون اشکالات سيستمي مربوط به مرورگر کارائي بهتري داشته باشد از نسخه' + '\n' + 'Mozila Firefox 3.0' + '\n' + 'به بعد استفاده کنيد');
        return false;
    }
    return true;
}
function RefreshImage(valImageId) {
    var objImage = document.images[valImageId];
    if (objImage == undefined) {
        return;
    }
    var now = new Date();
    objImage.src = objImage.src.split('?')[0] + '?x=' + now.toUTCString();
}
var Submitting = false;
function pluginNL() {
    return document.getElementById('plugin0');
}
function pluginLoaded() {
    pluginNL().Init();
    setTimeout('Check_Lock()', 1000);
}
function Check_Lock() {
    if (frmMain.UserType.value != 'Don') {
        $('#token-serial-div').hide();
        if (!Submitting) setTimeout('Check_Lock()', 2000);
        return;
    }
    try {
        pluginNL().GetFirstDevice();
        var cnt = pluginNL().GetDeviceCount();
        if (cnt == 0) {
            $('#token-serial-div').hide();
        }
        else if (cnt == 1) {
            $('#token-serial-div').show();
            pluginNL().SelectDevice(pluginNL().DeviceSerial);
            var obj = document.getElementById('TokenSerial');
            obj.value = pluginNL().GetSerial();
            obj = document.getElementById('frmSubmit');
            obj.style.disable = false;
        }
        else {
            $('#token-serial-div').hide();
            alert('فقط با يک شناسه ميتوانيد از اين سامانه استفاده کنيد. شناسه سخت افزاري سما را کنترل کنيد')
        }
    }
    catch (onerror) {
    }
    if (!Submitting) setTimeout('Check_Lock()', 2000);
}
function LoginValidate() {
    //ذخیره کردن تارخ کامپیوتر کاربر جهت چک کردن در سرور و زمان ورود 
    var timezone_cookie = "timezoneoffset";
    $.cookie(timezone_cookie, new Date().toUTCString())

    if ($('#UserCode').val() == '') {
        // alert('كد کاربري را وارد كنيد');
        $('#UserCode').focus();
        return false;
    }

    if (!$('#KeyCode').is(':visible') || $('#KeyCode') == undefined) {
        return true;
    }
    if ($('#KeyCode').val() == '') {
        //alert('كلمه عبور را وارد كنيد');
        $('#KeyCode').focus();
        return false;
    }
    var objCaptcha = $('#txtCaptcha');
    if (objCaptcha != undefined) {
        if (objCaptcha.val() == '') {
            //  alert('حروف تصوير را صحيح وارد کنيد');
            objCaptcha.focus();
            return false;
        }
    }
    $('#KeyCode').val(hex_md5($('#KeyCode').val().toUpperCase()));
    return true;
}
function ApplicantLoginValidate() {
    if (frmMain.UserCode.value == '') {
        alert('كد ملي را وارد كنيد');
        frmMain.UserCode.focus();
        return false;
    }
    if (frmMain.KeyCode.value == '') {
        alert('كلمه عبور را وارد كنيد');
        frmMain.KeyCode.focus();
        return false;
    }
    var objCaptcha = frmMain.captchacode;
    if (objCaptcha != undefined)
        if (frmMain.captchacode.value == '') {
            alert('حروف تصوير را صحيح وارد کنيد');
            frmMain.captchacode.focus();
            return false;
        }
    frmMain.KeyCode.value = hex_md5(frmMain.KeyCode.value.toUpperCase());
}
function alert(text, type, layout) {
    if (!text) return;
    if (type === undefined) {
        type = 'error';
    }
    if (layout === undefined) {
        layout = 'top';
    }
    var n = noty({
        text: text,
        type: type,
        dismissQueue: true,
        timeout: 5000,
        layout: layout,
        theme: 'relax',
        maxVisible: 10
    });
    console.log('html: ' + n.options.id);
    hiddenwaiting();
}

function showwaiting() {
    $("body").addClass("loading");
    timer = setTimeout('hiddenwaiting()', 50000);
}

function waithide() {
    timer = setTimeout('hiddenwaiting()', 50000);
}
function hiddenwaiting() {
    $("body").removeClass("loading");
    clearTimeout(timer);
}