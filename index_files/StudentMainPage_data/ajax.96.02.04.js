function isNumber(o) {
	return !isNaN(o - 0) && o != null;
}
function GetCity(provinceId) {
	document.body.style.cursor = 'wait';
	$.ajax({
		type: "post",
		contentType: "application/json; charset=utf-8",
		url: "GetCity.asp?provinceId=" + provinceId,
		data: "",
		dataType: "json",
		success: function (data) {
			$("#cmbCity").empty().append($("<option></option>").val(0).html("--- انتخاب کنيد ---"));
			$.each(data, function (key, value) {
				$("#cmbCity").append($("<option></option>").val(value.Code).html(unescape(value.Title)));
			});
		},
		error: function (result) {
			alert("خطا در فراخواني اطلاعات");
		}
	});
	document.body.style.cursor = 'auto';
}
function GetCityBirth(provinceId) {
	document.body.style.cursor = 'wait';
	$.ajax({
		type: "post",
		contentType: "application/json; charset=utf-8",
		url: "GetCity.asp?provinceId=" + provinceId,
		data: "",
		dataType: "json",
		success: function (data) {
			$("#cmbCityBirth").empty().append($("<option></option>").val(0).html("--- انتخاب کنيد ---"));
			$.each(data, function (key, value) {
				$("#cmbCityBirth").append($("<option></option>").val(value.Code).html(unescape(value.Title)));
			});
		},
		error: function (result) {
			alert("خطا در فراخواني اطلاعات");
		}
	});
	document.body.style.cursor = 'auto';
}
function GetBranch(cityId) {
	document.body.style.cursor = 'wait';
	$.ajax({
		type: "post",
		contentType: "application/json; charset=utf-8",
		url: "GetBranch.asp?provinceId=" + $("#cmbProvince").val() + "&cityId=" + cityId,
		data: "",
		dataType: "json",
		success: function (data) {
			$("#cmbBranch").empty().append($("<option></option>").val(0).html("--- انتخاب کنيد ---"));
			$.each(data, function (key, value) {
				$("#cmbBranch").append($("<option></option>").val(value.Code).html(unescape(value.Title)));
			});
		},
		error: function (result) {
			alert("خطا در فراخواني اطلاعات");
		}
	});
	document.body.style.cursor = 'auto';
}
function GetInboxCount(applicationId) {
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "GetInboxCount.asp?applicationId=" + applicationId,
        data: "",
        dataType: "json",
        success: function (data) {
            $("#lkbInbox").html("صندوق پیام (" + data.intInboxCount + ")");
        },
        error: function (result) {
            alert("خطا در فراخواني اطلاعات");
        }
    });
    document.body.style.cursor = 'auto';
}
