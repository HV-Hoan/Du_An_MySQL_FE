async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Đăng nhập thất bại!");
        }

        const data = await response.json();
        await localStorage.setItem("token", data.token);

        messageEl.style.color = "green";
        messageEl.textContent = "Đăng nhập thành công!";

        checkUserRole();

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        messageEl.style.color = "red";
        messageEl.textContent = error.message || "Lỗi server!";
    }
}
function checkUserRole() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("Không tìm thấy token, ở lại trang login.");
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Payload giải mã:", payload);

        if (payload.role === "admin") {
            window.location.href = "../admin/admin.html";
        } else if (payload.role === "user") {
            window.location.href = "../user/user.html";
        } else {
            throw new Error("Vai trò không hợp lệ!");
        }
    } catch (error) {
        alert("Lỗi xác thực token!");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
}
