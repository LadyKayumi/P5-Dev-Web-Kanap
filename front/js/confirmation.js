const params = new URLSearchParams(location.search);
const id = params.get("id");
document.querySelector("#orderId").textContent = id;
localStorage.clear();