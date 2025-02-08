async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const re_password = document.getElementById("re-password").value;
    const messageEl = document.getElementById("message");


    if (password !== re_password) {
        messageEl.style.color = "red";
        messageEl.textContent = "Mật khẩu nhập lại không khớp!";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Đăng ký thất bại!");
        }


        messageEl.style.color = "green";
        alert("Đăng ký thành công")

        setTimeout(() => {
            window.location.href = "../login/index.html";
        }, 500);

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        messageEl.style.color = "red";
        messageEl.textContent = error.message || "Lỗi server!";
    }
}
