console.log("Login functionality coming");

document.getElementById("login-btn").addEventListener("click", function(){
    // get the mobile input
    const nameInput = document.getElementById("input-name");
    const userName = nameInput.value;
    console.log(userName);

    // get the pin input
    const inputPin = document.getElementById("input-pin");
    const pin = inputPin.value;
    console.log(pin);

    // match pin & mobile number
    if (userName== "admin" && pin== "admin123"){
        // 3-1 true:::>> alert > homepage
        alert("login successful");
        window.location.href = "home.html";
    } else{
        // 3-2 false::: >>alert > return
        alert("login Failed");
        return;
    }

})