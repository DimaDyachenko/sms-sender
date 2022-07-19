const phoneForm = document.getElementById('phone-form');
const verifyForm = document.getElementById('verify-form');
const responseText = document.getElementById('response-text');

phoneForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let phoneNumber = document.getElementById('phone-number-input').value;

  const response = await fetch('http://127.0.0.1:3000/verify/send', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },

    body: new URLSearchParams({
      phoneNumber: phoneNumber,
    }),
  });

  const check = await response.json();

  console.log(check);

  // if (response.ok) {
  //   phoneForm.style.display = 'none';
  //   verifyForm.style.display = 'block';
  // }
  responseChecker(check);
});

verifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const otp = document.getElementById('otp-input').value;
  const phoneNumber = document.getElementById('phone-number-input').value;

  const data = {
    phoneNumber: phoneNumber,
    otp: otp,
  };

  const response = await fetch('http://127.0.0.1:3000/verify/check', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      phoneNumber: data.phoneNumber,
      verifyCode: data.otp,
    }),
  });
  const check = await response.json();

  console.log(check);

  if (check.valid) {
    verifyForm.style.display = 'none';
    responseText.style.display = 'block';
    const text = check.message;
    responseText.innerHTML = text;
  } else {
    // verifyForm.style.display = 'none';
    responseText.style.display = 'block';
    const text = check.message;
    responseText.innerHTML = text;
  }
});

function responseChecker(response) {
  const statusCode = response?.statusCode;

  switch (statusCode) {
    case 429:
      // verifyForm.style.display = 'none';
      responseText.style.display = 'block';
      const text = response.message;
      responseText.innerHTML = text;
      return;
    default:
      phoneForm.style.display = 'none';
      verifyForm.style.display = 'block';
      return;
  }
}
