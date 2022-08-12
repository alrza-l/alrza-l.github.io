Object.merge = function (obj, values) {
	if (values) {
		for (var item in values) {
			obj[item] = values[item];
		}
	}
	return obj;
};
Object.serializeJSObject = function (obj) {
	var key;
	var result = {};
	if (typeof (obj) === 'object') {
		for (var name in obj) {
			if (obj[name] !== null) {
				if (obj[name].toString() === [true, false].toString()) {
					result[name] = true;
				}
				else if (obj[name] instanceof Array) {
					for (key in obj[name]) {
						if ($.isNumeric(key)) {
							result[name + '[' + key + ']'] = obj[name][key];
						}
					}
				}
				else if (typeof (obj[name]) === 'object') {
					var i = 0;
					for (key in obj[name]) {
						result[name + '[' + i + '].Key'] = key;
						result[name + '[' + i + '].Value'] = obj[name][key];
						i++;
					}
				}
				else {
					result[name] = obj[name];
				}
			}
		}
	}
	else {
		result = obj;
	}
	return result;
};
$.fn.serializeObject = function()
{
	var result = { };
	$.each($('form').serializeArray(), function() {
		var obj = document.getElementsByName(this.name)[0];
		
		if (obj.type == 'select-multiple') {
			var value = "";
			$("#" + this.name + " :selected").each(function (item, selected) {
				value = value + $(selected).val() + ',';
			});
			result[this.name] = value;
		}
		else {
			result[this.name] = this.value;
		}
	});
	return result;
};
(function ($) {

    $.fn.submitByAnotherFormData = function () {
        var args = arguments;
        return this.each(function () {
            var data;
            var $form;
            var result = {};
            for (var i = 0; i < args.length; i++) {
                $form = $(args[i]);
                data = Object.serializeJSObject($form.serializeObject());
                result = Object.merge(result, data);
            }
            $(this).submitByObjectData(result, false, false);
        });
    };

    $.fn.submitByObjectData = function (obj, clearFormComplete, clearOnlyInputData) {
        var $this = $(this);
        if (clearFormComplete) {
            $this.html("");
        }
        else if (clearOnlyInputData) {
            for (var name in Object.serializeJSObject(obj)) {
                var $input = $("input[name='" + name + "']", $this)
                $input.remove();
            }
        }
        for (var name in Object.serializeJSObject(obj)) {
            if (obj[name]) {
                var $input = $("input[name='" + name + "']", $this)
                $input.remove();
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = obj[name];
                $this.append(input);
            }
        }
        $this.submit();
    };

})(jQuery);
