const clickArray = [];

(function () {
  const button = document.querySelector("#clickButton");
  button.addEventListener("click", handleButtonClick);
})();

function handleButtonClick() {
  clickArray.push(getNewTimeStamp());
  render();
}

function render() {
  const ul = document.querySelector("#data");
  ul.innerHTML = "";

  let li = "";

  clickArray.map((item) => {
    li += `<li>${item}</li>`;
  });
  ul.innerHTML = li;

  document.title = clickArray.length;
}
