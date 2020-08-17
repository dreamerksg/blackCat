function Autocomplete(input, wordList) {

	let _input = input;
	let arrWord = wordList;
	let itemsClass = "autocomplete-items";
	let itemsId = input.id + "_" + itemsClass;

	let _currentFocus;

	removeListener();	// 기존 리스너해제
	_input.addEventListener("input", inputEvent);
	_input.addEventListener("keydown", keydownEvent);


	function removeListener() {
		if (null != _input) {
			_input.removeEventListener("input", inputEvent, false);
			_input.removeEventListener("keydown", keydownEvent, false);
		}
	}


	function inputEvent(e) {

		closeWordList();		// 이전에 생성된 autocomplete-items div 제거

		if (!this.value) {
			return false;
		}

		_currentFocus = -1;		// 현재의 포커스의 위치는 없음.

		let val = this.value;
		let _parentDiv = document.createElement("DIV");	// autocomplet에서 항목을 보여줄 div 생성
		_parentDiv.setAttribute("id", itemsId);
		_parentDiv.setAttribute("class", itemsClass);

		// input 아래의 div 붙이기.
		this.parentNode.appendChild(_parentDiv);



		// autocomplet할 요소 찾기 
		for (let i = 0; i < arrWord.length; i++) {

			// 배열의 요소를 현재 input의 value의 값만큼 자른 후, 같으면 추가한다.
			if (arrWord[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				let _childDiv = document.createElement("DIV");

				// value의 값 만큼 굵게 표시
				_childDiv.innerHTML = "<strong>" + arrWord[i].substr(0, val.length) + "</strong>";
				_childDiv.innerHTML += arrWord[i].substr(val.length);
				_childDiv.innerHTML += "<input type='hidden' value='" + arrWord[i] + "'>";

				_childDiv.addEventListener("click", function (e) {
					_input.value = this.getElementsByTagName("input")[0].value;
					closeWordList();	// 이전에 생성된 autocomplete-items div 제거
				});

				_parentDiv.appendChild(_childDiv);	// autocomplete 리스트를 붙이기.
			}
		}
	}


	function keydownEvent(e) {
		var x = document.getElementById(itemsId);
		// 선택할 요소 없으면 null
		if (x) {
			// 태그 네임을 가지는 엘리먼트의 유요한 html 컬렉션을 반환.
			// div의 값을 htmlCollection의 값으로 받아옴.
			x = x.getElementsByTagName("div");
		}

		if (13 == e.keyCode) {			// enter
			e.preventDefault();

			// 현재위치가 아이템 선택창내에 있는 경우
			if (_currentFocus > -1) {
				if (x) x[_currentFocus].click();	// 현재 위치의 값 클릭
			}
		}
		else if (38 == e.keyCode) {		// up
			_currentFocus--;			// 현재위치 감소
			activeAddClass(x);				// 현재위치의 포커스 나타내기
		}
		else if (40 == e.keyCode) {		// down
			_currentFocus++;			// 현재위치 증가
			activeAddClass(x);				// 현재위치의 포커스 나타내기
		}
	}

	function activeAddClass(x) {

		if (!x) return false;	// null이면
		activeRemoveClass(x);

		if (_currentFocus >= x.length) _currentFocus = 0;
		if (_currentFocus < 0) _currentFocus = (x.length - 1);
		x[_currentFocus].classList.add("is_active");
	}

	function activeRemoveClass(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("is_active");
		}
	}

	// 이전에 생성된 autocomplete-items div 제거
	function closeWordList() {
		var x = document.getElementsByClassName(itemsClass);

		for (var i = 0; null != x && i < x.length; i++) {
			x[i].parentNode.removeChild(x[i]);
		}
	}
}