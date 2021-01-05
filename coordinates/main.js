"use strict";
const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

window.addEventListener("load", () => {
	const targetHalfWidth = target.getBoundingClientRect().width * 0.5;
	const targetHalfHeight = target.getBoundingClientRect().height * 0.5;

	document.addEventListener("mousemove", () => {
		const x = event.clientX;
		const y = event.clientY;

		vertical.style.transform = `translateX(${x}px)`;
		horizontal.style.transform = `translateY(${y}px)`;
		target.style.transform = `translate(${x - targetHalfWidth}px ,${
			y - targetHalfHeight
		}px)`;
		tag.style.transform = `translate(${x}px,${y}px)`;
		tag.innerHTML = `${x}px, ${y}px`;
	});
});
