(function($) {

	window.displayMessage = function(type, message) {
		var message = $('<span class="message ' + type + '">' + message + '</span>');
		$('#messages').append(message);
		setTimeout(function() {
			message.fadeOut(message.remove);
		}, 5000);
	}

	$(function() {

		/*
		 * Center all hoverable context menus within their container
		 */
		$('.hover-context').each(function() {
			var $this = $(this)
				, $menu = $this.find('.nav-context')
				, containerWidth = $this.outerWidth()
				, menuWidth = $menu.outerWidth();

			$menu.css('left', (containerWidth - menuWidth) / 2);
		});

		/*
		 * Header Navigation
		 */
		var $mainNav = $('.main-nav');

		$mainNav.find('.nav-item a').on('click', function(e) {
			e.preventDefault();

			var $this = $(this)
				, $target = $('#content')
				, href = $this.attr('href');

			$.get(href, function(data, status) {
				if (data) {
					$target.html(data);
					$mainNav.find('.nav-item').removeClass('active');
					$this.parent().addClass('active');
				}
			});
		});

		/*
		 * Sidebar Add Hook Form
		 */
		$('.sidebar-add-hook').on('click', function() {
			$(this).hide();
			$('form.add-hook').show().find('input').focus();
		});

		/**
		 * AJAX Forms */
		$(document).on('submit', 'form.ajax', function(e) {
			e.preventDefault();

			var $this = $(this)
				, url = $this.attr('action');

			$.ajax(url, {
				type: $this.attr('method'),
				data: $this.serializeArray()
			})
			.done(function(data) {
				console.log(data);
				displayMessage('success', data.message);
			})
			.fail(function(data) {
				console.log(data.responseJSON);
				displayMessage('error', data.responseJSON.message);
			});
		});

		/**
		 * Delete Hook */
		$(document).on('click', '[data-action="delete-hook"]', function(e) {
			e.preventDefault();

			var id = $(this).attr('data-rel');

			$.ajax({
				url: '/hook/' + id,
				type: 'DELETE'
			})
			.done(function() {
				window.location.href = '/';
			})
			.fail(function(data) {
				displayMessage('error', data.responseJSON.message);
			});
		});

		/**
		 * AJAX Modals */
		$(document).on('click', '.modal-trigger.ajax', function(e) {
			e.preventDefault();

			var $this = $(this)
				, url = $this.attr('href')
				, $target = $('.modal-window');

			if ($('[data-id=' + $this.attr('data-rel') + ']').length > 0) {
				$('[data-id=' + $this.attr('data-rel') + ']').show();
				return;
			}

			$.get(url, { userId: $this.attr('data-rel') }, function(data) {
				$target.append(data);
			});
		});

		/**
		 * Modals */
		$(document).on('click', '.modal', function(e) {
			var $this = $(this);

			if ($(e.target).is($this)) {
				$this.hide();
			}
		});

		/**
		 * Logs */
		$(document).on('click', '.log .title-bar', function() {
			var $this = $(this)
				, $log = $this.parents('.log');

			if ($this.next('.log-message').is(':visible')) {
				$this.next('.log-message').hide();
			} else {
				$this.next('.log-message').show();
			}
		});

		/**
		 * Module Lookup */
		 $(document).on('keypress', '[name="module-search"]', function(e) {
		 	if (e.which != 13) return;

		 	var $this = $(this)
		 		, name = $this.val()
		 		, $infoEl = $('.module-info');

		 	$.get('/modules/search/' + name)
		 		.done(function(data) {
		 			console.log(data);
		 			var module = data.module;

		 			$infoEl.show();

		 			$infoEl.find('[data-rel]').each(function() {
		 				var $this = $(this)
		 					, property = $(this).attr('data-rel')
		 					, value;

		 				value = expandDot(property, module);

		 				if (!value) return;

		 				if (this.nodeName.toLowerCase() == 'a') {
		 					$this.attr('href', value)
		 				} else if (this.nodeName.toLowerCase() == 'input') {
		 					$this.val(value);
		 				} else {
		 					$this.text(value);
		 				}
		 			});
		 		})

		 		.fail(function(data) {
		 			console.log(data);
		 			$infoEl.hide();
		 		});
		 });

		 function expandDot(prop, obj) {
		 	var levels = prop.split('.')
		 		, tmp = obj;

		 	for (var i = 0; i < levels.length; i += 1) {
		 		tmp = tmp[levels[i]];
		 	}

		 	return tmp;
		 }
	});

})(jQuery)
