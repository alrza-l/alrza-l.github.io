$(function () {
	$('.spM').hide();
	$("input:text:visible:enabled:first, textarea:visible:enabled:first").focus().css({ 'background-color': '#d4edda' }).parent("td").children(".spM").show();

	var $inp = $('input, select, textarea');
	$inp.focus(function () {
		$(this).css({ 'background-color': '#d4edda' }).parent("td").children(".spM").show();
	});
	$inp.blur(function () {
		$(this).css({ 'background-color': '' });
		$(this).closest('td').find('.spM').hide();
	});
	$inp.keydown(function (e) {
		var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		var nodeName = this.nodeName.toLowerCase();
		var inputType = '';
		if (nodeName == 'input') {
			inputType = $(this).attr('type');
			if (inputType == 'undefined' || inputType == '') {
				inputType = 'text';
			}
		}
		if (key == 13) {
			if ($(this).attr('id') == 'SearchPattern') {
				$('#frmMain').trigger('submit');			
			}
			if (nodeName == 'select' || (nodeName == 'input' && inputType != 'submit' && inputType != 'button')) {
				$('input, select, textarea');
				var nxtIdx = $inp.index(this) + 1;
				$(this).css({ 'background-color': '' });
				$('input, select, textarea').eq(nxtIdx).focus();
			}
		}
	});
	$inp.keypress(function (event) {
		var arabicYa = 1610;
		var farsiYa = 1740;
		var arabicKaf = 1603;
		var farsiKaf = 1705;

		var e = event ? event : window.event;
		var charCode = e.which || e.keyCode;
		var newChar;

		if (charCode == farsiKaf) {
			newChar = arabicKaf;
		}
		else if (charCode == farsiYa) {
			newChar = arabicYa;
		}
		else {
			return;
		}

		try {
			e.charCode = newChar;
			e.which = newChar;
			e.keyCode = newChar;
		}
		catch (e) {
		}
		
		// Stop the key from going through
		var tgt = e.target;
		e.preventDefault(true);
		e.stopPropagation(true);
		// Append or insert replacement character
		if ('selectionStart' in tgt) {
			if (tgt.selectionStart == tgt.textLength) {
				tgt.value += String.fromCharCode(newChar);
			}
			else {
				var lastpos = tgt.selectionStart;
				tgt.value = tgt.value.substr(0, lastpos) + String.fromCharCode(newChar) + tgt.value.substr(lastpos);
				tgt.selectionStart = lastpos + 1;
				tgt.selectionEnd = lastpos + 1;
			}
		}
	});
	$('#SearchType').on('change', function () {
		$('#SearchPattern').focus();
	});
	$(document).off("keypress", '.form-control-number');
	$(document).on("keypress", '.form-control-number', function (e) {
		var key = (!e.keyCode) ? (!e.which ? e.charCode : e.which) : (e.keyCode);
		if (key > 31 && key != 46 && key != 37 && (key < 48 || key > 57) && key != 38 && key != 40) {
			e.preventDefault();
			return false;
		}
	});	
	$('button').addClass("btn");
	$('select').addClass("btn");
});
function isEmpty(str) {
	return (!str || 0 === str.length);
}
function isNumber(o) {
	return (!isNaN(o-0) && o != null);
}
function checkValueNULL(element, title) {
	if ($(element).val() == '') {
		$(element).focus();
		alert(title + ' را وارد نمائيد');
		return false;
	}
	return true;
}
function checkValueDate(element, title) {
	if (!checkValueNULL(element, title)) return false;

	var date = /^([1][3-4]\d\d)\/([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])$/;
	if (!$(element).val().match(date)) {
		$(element).focus();
		alert(title + ' را بصورت شمسي و با دقت وارد نمائيد');
		return false;
	}
	return true;
}
function checkValueNumber(element, title) {
	if (!checkValueNULL(element, title)) return false;

	var filter = /^\d{1,15}(\.\d{1,2})?$/;
	if (!$(element).val().match(filter)) {
		$(element).focus();
		alert(title + ' را بصورت عددي و با دقت وارد نمائيد');
		return false;
	}
	return true;
}
function fnMainList() {
	$('select>option:eq(0)').prop('selected', true);
	$('input:text:visible:enabled').prop('value', null);
	$('#intAction').val(0);
	$('#frmMain').submit();
}
function NullValueCheking(msg) {
	var obj;
	var success = true;
	var spm;
	for (var i = 0; i <= document.all.length - 1; i++) {
		obj = document.all.item(i);
		spm = $(obj).closest('td').find('.spM');
		success = obj.value != '';
		if ((obj.disabled) || ((obj.type != 'text') && (obj.type != 'textarea') && (obj.type != 'radio') && (obj.type != 'password') && (obj.type != 'select-one') && (obj.type != 'select-multiple'))) continue;
		if (((obj.type == 'select-one') || (obj.type == 'select-multiple')) && (obj.value == 0)) {
			success = false;
		}
		if (obj.type == 'radio') {
			success = $('input[name="' + obj.name + '"]:checked').length != 0;
		}
		if ((obj.type == 'text') || (obj.type == 'textarea')) {
			success = ($.trim(obj.value).length);
		}
		if (obj.style.visibility == '') {
			if (success && ((obj.name == 'BirthDate'))) {
				success = obj.value.match(/^([1][3-4]\d\d)\/([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])$/);
			}
			if (success && (obj.className == 'form-control-number')) {
				success = obj.value.match(/^\d+$/);
			}
			if (success && ((obj.name == 'NationalCode'))) {
				success = checkValueNationalCode(obj.value);
			}
			if (success && ((obj.name == 'MobileNo'))) {
				success = obj.value.match(/^([0][9])\d{9}$/);
			}
			if (success && ((obj.name == 'EMail'))) {
				success = obj.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
			}
		}
		if (!success) {
			if (spm.length == 0) {
				success = true;
				continue;
			} else {
				alert(spm.html());
				obj.focus();
				return false;
			}
		}
	}
	return confirm(msg, 'Yes', 'No');
}
function NullValueFormCheking(strForm, msg) {
	var obj;
	var success = true;
	var spm;
	for (var i = 0; i <=  document.getElementById(strForm).elements.length - 1; i++) {
		obj = document.getElementById(strForm).elements[i];
		spm = $(obj).closest('td').find('.spM');
		success = obj.value != '';
		if ((obj.disabled) || ((obj.type != 'text') && (obj.type != 'textarea') && (obj.type != 'radio') && (obj.type != 'password') && (obj.type != 'select-one') && (obj.type != 'select-multiple'))) continue;
		if (((obj.type == 'select-one') || (obj.type == 'select-multiple')) && (obj.value == 0)) {
			success = false;
		}
		if (obj.type == 'radio') {
			success = $('input[name="' + obj.name + '"]:checked').length != 0;
		}
		if (obj.style.visibility == '') {
			if (success && ((obj.name == 'BirthDate'))) {
				success = obj.value.match(/^([1][3-4]\d\d)\/([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])$/);
			}
			if (success && (obj.className == 'form-control-number')) {
				success = obj.value.match(/^\d+$/);
			}
			if (success && ((obj.name == 'NationalCode'))) {
				success = checkValueNationalCode(obj.value);
			}
			if (success && ((obj.name == 'MobileNo'))) {
				success = obj.value.match(/^([0][9])\d{9}$/);
			}
			if (success && ((obj.name == 'EMail'))) {
				success = obj.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
			}
		}
		if (!success) {
			if (spm.length == 0) {
				success = true;
				continue;
			} else {
				alert(spm.html());
				obj.focus();
				return false;
			}
		}
	}
	return confirm(msg, 'Yes', 'No');
}
function checkValueNationalCode(nationalCode) {
	if (!nationalCode || nationalCode.length != 10 || /(\d)\1{9}/.test(nationalCode)) {
		return false;
	}
	return true;
}
function fnList() {
	$('select>option').prop('selected', false);
	$('.input').prop('value', null);
	$('#SearchPattern').val(null);
	$('#intAction').val(0);
	$('#frmMain').submit();
}
function fnInsert() {
	$('#intAction').val(1);
	$('#frmMain').submit();
}
function fnSave() {
	if (NullValueCheking('از ثبت مطمئن هستيد؟')) {
		$('#intAction').val(-1);
		$('#frmMain').submit();
	}
}
function fnUpdate() {
	if (NullValueCheking('از ويرايش مطمئن هستيد؟')) {
		$('#intAction').val(-2);
		$('#frmMain').submit();
	}
}
function alert(text, type, layout) {
	if (type === undefined) {
		type = 'error';
	}	
	if (layout === undefined) {
		layout = 'top';
	}
	var n = noty({
		text        : text,
		type        : type,
		dismissQueue: true,
		timeout     : 5000,
		layout      : layout,
		theme       : 'relax',
		maxVisible  : 10
	});
	console.log('html: ' + n.options.id);
}
