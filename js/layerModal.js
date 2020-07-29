class layerPop {
	constructor(id, mode) {
		this.hash = this.getHashData(id, mode);
	}

	getHashData(id, mode) {
		let hash = {};
		hash.popupId = id;
		hash.overlayId = id + "Overlay";
		hash.mode = mode;

		return hash;
	}


	open() {

		if (this.hash.mode) {
			this.overlayShow();
		}

		this.popupShow();
		this.addEvent();
	}


	overlayShow() {

		let _overlayDiv = null;

		if ($('#' + this.hash.overlayId).length) {
			_overlayDiv = $('#' + this.hash.overlayId);
		}
		else {
			_overlayDiv = this.createOverlay();
		}

		$('#' + this.hash.popupId).before(_overlayDiv);
		_overlayDiv.fadeIn();
	}

	popupShow() {
		let _popupDiv = $('#' + this.hash.popupId);
		_popupDiv.css('z-index', '1000');
		_popupDiv.css('position', 'absolute');
		_popupDiv.fadeIn();
	}


	createOverlay() {
		let _overlayDiv = $('<div></div>');
		_overlayDiv.attr('id', this.hash.overlayId);
		_overlayDiv.css('display', 'none');
		_overlayDiv.css('width', '100%');
		_overlayDiv.css('height', '800px');
		_overlayDiv.css('position', 'absolute');
		_overlayDiv.css('top', '0px');
		_overlayDiv.css('left', '0px');
		_overlayDiv.css('opacity', '0.5');
		_overlayDiv.css('background-color', '#000000');
		_overlayDiv.css('z-index', '99');

		return _overlayDiv;
	}

	addEvent() {
		let obj = this;

		// 닫기 버튼 클릭 이벤트 정의
		$("#" + this.hash.popupId + " .btn-close").click(function () {
			$('#' + obj.hash.popupId).fadeOut();
			$('#' + obj.hash.overlayId).fadeOut();
			//$('#' + obj.hash.overlayId).remove();
		});
	}
}