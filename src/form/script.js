const phoneForm = document.getElementById('phone-form');
const verifyForm = document.getElementById('verify-form');
const responseText = document.getElementById('response-text');
// console.log(2, formData);

phoneForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let phoneNumber = document.getElementById('phone-number-input').value;

  const response = await fetch('http://127.0.0.1:3000/verify/send', {
    credentials: 'same-origin',
    // redirect: 'follow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },

    body: new URLSearchParams({
      phoneNumber: phoneNumber,
    }),
  });

  console.log(response);
  if (response.ok) {
    phoneForm.style.display = 'none';
    verifyForm.style.display = 'block';
  }
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

  // verifyForm.style.display = 'none';
  // responseText.style.display = 'block';
});

// const text = response.ok ? check.status : response.statusText;
// responseText.innerHTML = text;
