var Messages = (function ($, nano) {
	
	var options = { 
		notFound: function (key) {
			return '??' + key + '??'
		}
	};

	return {
		get: function (opts) {
			$.extend(options, opts);
			
			return $.post(options.url, {keys: options.keys}).then(function (data) {
				return function (key) {
					var messageTemplate = !data[key] ? options.notFound(key) : data[key];
					if (arguments.length < 2) {
						return messageTemplate;
					}

					var args = Array.prototype.slice.call(arguments);
					args.shift();
					return nano(messageTemplate, args);
				};
			});
		}
	};
})(jQuery, nano);
