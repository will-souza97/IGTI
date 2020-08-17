const clickArray = [];

(function () {
  const button = document.querySelector("#clickButton");
  button.addEventListener("click", handleButtonClick);
})();

function handleButtonClick() {
  const item = getNewTimeStamp();
  clickArray.push(item);

  render(item);
}

function render(item) {
  const ul = document.querySelector("#data");

  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);

  // ul.innerHTML = "";

  // let li = "";

  // clickArray.map((item) => {
  //   li += `<li>${item}</li>`;
  // });
  // ul.innerHTML = li;

  document.title = clickArray.length;
}
