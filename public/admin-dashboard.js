document.addEventListener("DOMContentLoaded", function () {
  const ordersTableBody = document.getElementById("ordersTableBody");

  // Fetch all orders from the server
  axios
    .get("/api/orders")
    .then(function (response) {
      const orders = response.data;
      // Loop through orders and populate the table
      orders.forEach(function (order, index) {
        const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${order.name}</td>
                        <td>${order.address}</td>
                        <td>${order.phone}</td>
                        <td>${order.type}, ${order.type2}, ${
          order.mechanism
        }</td>
                        <td>${order.width} x ${order.height}</td>
                        <td>${order.date}</td>
                        <td>${order.sum}</td>
                        <td>${order.comment}</td>
                    </tr>
                `;
        ordersTableBody.innerHTML += row;
      });
    })
    .catch(function (error) {
      console.error("Error fetching orders:", error);
    });
});
