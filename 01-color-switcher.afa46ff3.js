!function(){var t,n={btnStartStopEL:document.querySelectorAll('button[type="button"]'),btnStartEL:document.querySelector("[data-start]"),btnStopEL:document.querySelector("[data-stop]")};function o(o){n.btnStartEL!==o.target||t?n.btnStopEL===o.target&&t&&(clearInterval(t),t=null):t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style.backgroundColor=t}),1e3)}n.btnStartStopEL.forEach((function(t){t.addEventListener("click",o)}))}();
//# sourceMappingURL=01-color-switcher.afa46ff3.js.map
