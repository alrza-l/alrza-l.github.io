function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) +
((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}
function replaceChar(mainstring, ch, position) {
	if (position < 0) return mainstring
	while (position >= mainstring.toString().length)
		mainstring += ' '; 
	var s = mainstring.toString().substr(0, position);
	s += ch;
	s += mainstring.toString().substr(position + 1);
	return s;
}

function initMenu() {
	var cookieName = 'menuStatus'+username;
	$('#menu ul').hide();
	var menuStatus = getCookie(cookieName);
	if (menuStatus != null && menuStatus != "") {//cookie fonded
		var i;
		for (i = 0; i < menuStatus.length; i++) {
			if (menuStatus.charAt(i) == '1') {
				$('#menu ul').eq(i).show();
			}
		}
	}
	else {//no cookie. must be create 
		$('#menu ul:first').show();
		menuStatus = "";
		var isFirst = true;
		$('#menu ul').each(function() {
			if (isFirst) {
				menuStatus = "1";
				isFirst = false;
			}
			else
				menuStatus += "0";
		});
		setCookie(cookieName, menuStatus, 14);
	}

	//handle menu click event
	$('#menu li a').click(function () {
		var checkElement = $(this).closest('li').find('ul').eq(0);
		if (checkElement.is('ul')) {//check this menu item have chileds
			var position = $('#menu ul').index(checkElement);
			if (checkElement.is(':visible')) {
				checkElement.hide('fast');
				menuStatus = replaceChar(menuStatus, '0', position);
			}
			else {
				checkElement.show('fast');
				menuStatus = replaceChar(menuStatus, '1', position);
			}
			setCookie(cookieName, menuStatus, 14);
		}
	});
}
$(document).ready(function() { initMenu(); });
