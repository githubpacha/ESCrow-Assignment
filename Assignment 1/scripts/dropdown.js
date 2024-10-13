var company = document.querySelector('.company');
company.value = company.options[0].value;

var account = document.querySelector('.account');
account.value = account.options[0].value;

const dropdown = document.querySelector('.dropdowns select');

dropdown.addEventListener('click', () => {
  dropdown.classList.toggle('open');

  if (dropdown.classList.contains('open')) {
    dropdown.style.backgroundImage = 'url("../images/uparrow.svg")';
  } else {
    dropdown.style.backgroundImage = 'url("../images/downaarrow.svg")';
  }
});