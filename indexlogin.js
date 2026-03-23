const BtnToPage = document.getElementById("btn-to-page").addEventListener("click",
    function () {
        const InputUserName = document.getElementById("UserNameValue").value;
        const InputPassword = document.getElementById("InputPasswordValue").value;

        if (InputUserName === "admin" && InputPassword === "admin123") {
            alert ("Log In Successful");
            window.location.href = "indexmainpage.html";
        }else {
            alert ("Error")
            
        }
    }
);