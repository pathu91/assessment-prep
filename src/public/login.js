// Selecting elements
const signinBtn = document.querySelector('.signin');
const signupBtn = document.querySelector('.signup');
const signinUser = document.querySelector('#signin-username');
const signinPW = document.querySelector('#signin-password');
const signupUser = document.querySelector('#signup-username');
const signupPW = document.querySelector('#signup-password');

// Event Listeners
signinBtn.addEventListener('click', e => {
  e.preventDefault();
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signinUser.value,
      password: signinPW.value,
    }),
  }).then(res => {
    window.location.replace('/homepage');
    signinUser.value = '';
    signinPW.value = '';
  });
});

signupBtn.addEventListener('click', e => {
  e.preventDefault();
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signupUser.value,
      password: signupPW.value,
    }),
  }).then(res => {
    signupUser.value = '';
    signupPW.value = '';
  });
});
