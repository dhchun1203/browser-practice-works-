"use strict";
// 1. 사용자가 input box에 text를 입력할 수 있다.
// 2. 입력한 텍스트를 enter키를 누르거나 버튼을 클릭해서 전달받는다.
// 3. 전달받은 item을 리스트로 표시하고 동시에 delete버튼과 기능을 부여한다.

const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

function onAdd() {
	// 1. 사용자가 입력한 텍스트를 받아온다.
	const text = input.value;
	if (text === "") {
		input.focus();
		return;
	}
	// 2. 새로운 아이템을 만듬(텍스트 + 삭제 버튼)
	const item = createItem(text);
	// 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
	items.appendChild(item);
	// 4. 새로 추가된 아이템으로 자동 스크롤링
	item.scrollIntoView({ block: "center" });
	// 5. 인풋을 초기화 한다.
	input.value = "";
	input.focus();
}

function createItem(text) {
	const itemRow = document.createElement("li");
	itemRow.setAttribute("class", "item__row");

	const item = document.createElement("div");
	item.setAttribute("class", "item");

	const name = document.createElement("span");
	name.setAttribute("class", "item__name");
	name.innerText = text;

	const deleteBtn = document.createElement("button");
	deleteBtn.setAttribute("class", "item__delete");
	deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
	deleteBtn.addEventListener("click", () => {
		items.removeChild(itemRow);
	});

	const itemDivider = document.createElement("div");
	itemDivider.setAttribute("class", "item__divider");

	item.appendChild(name);
	item.appendChild(deleteBtn);

	itemRow.appendChild(item);
	itemRow.appendChild(itemDivider);
	return itemRow;
}

addBtn.addEventListener("click", () => {
	onAdd();
});

input.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		onAdd();
	} else {
		return;
	}
});
