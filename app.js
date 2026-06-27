import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
RecaptchaVerifier,
signInWithPhoneNumber
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier =
new RecaptchaVerifier(auth,
"recaptcha-container",
{ size: "normal" });

window.sendOTP = () => {

    const phone =
    document.getElementById("phone").value;

    signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
    )
    .then((confirmationResult)=>{
        window.confirmationResult =
        confirmationResult;
        alert("OTP Sent");
    })
    .catch((error)=>{
        alert(error.message);
    });
};

window.verifyOTP = () => {

    const code =
    document.getElementById("otp").value;

    window.confirmationResult.confirm(code)
    .then((result)=>{
        alert(
            "Login Successful: " +
            result.user.phoneNumber
        );
    })
    .catch(()=>{
        alert("Invalid OTP");
    });
};
