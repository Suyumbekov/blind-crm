// Get a reference to the modal element
const modalElement = document.getElementById("exampleModal");

// Create a Bootstrap Modal instance
const modal = new bootstrap.Modal(modalElement);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting via the browser

    // Collect form data
    const formData = new FormData(form);
    const formDataJSON = Object.fromEntries(formData.entries()); // Convert FormData to JSON
    console.log(formDataJSON);

    const len = document.querySelectorAll("tr").length;

    // Send data to the server
    axios
      .post("http://localhost:3000/api/orders", formDataJSON)
      .then(function (response) {
        console.log(response.data);

        // Create a new table row
        const newRow = document.createElement("tr");

        // Set inner HTML for the row
        newRow.innerHTML = `
          <td>${len + 1}</td>
          <td>${response.data.order.name}</td>
          <td>${response.data.order.type}, ${response.data.order.mechanism}</td>
          <td>${response.data.order.width} x ${response.data.order.height}</td>
          <td>${response.data.order.date}</td>
          <td>${response.data.order.comment}</td>
          <td>
            <button type="button" class="btn btn-primary">Принять</button>
          </td>
        `;

        // Append the new row to the table
        orderTable.appendChild(newRow);

        // Close the modal
        modal.hide();
        // Show Toastr notification
        toastr.success("Data sent successfully");
      })
      .catch(function (error) {
        console.error(error);
        // Handle error, if needed
      });
  });

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const formDataJSON = Object.fromEntries(formData.entries());
    axios
      .post("http://localhost:3000/login", formDataJSON)
      .then(function (response) {
        if (response.data.success) {
          window.location.href = "http://localhost:3000/admin"; // Redirect to admin dashboard on successful login
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch(function (error) {
        toastr.error(error);
        console.error("Error logging in:", error.message);
      });
  });
});

// Modal Order details

// Function to update order details in the modal
function updateOrderDetails(order) {
  // Select elements within the modal to update
  let nameElement = document.querySelector("#orderName");
  let addressElement = document.querySelector("#orderAddress");
  let phoneElement = document.querySelector("#orderPhone");
  let dateElement = document.querySelector("#orderDate");
  let commentElement = document.querySelector("#orderComment");
  let blindTypeElement = document.querySelector("#blindType");
  let mechanismElement = document.querySelector("#mechanism");
  let sizeElement = document.querySelector("#blindSize");

  // Update content with order details
  nameElement.textContent = order.name;
  addressElement.textContent = order.address;
  phoneElement.textContent = order.phone;
  dateElement.textContent = order.date;
  commentElement.textContent = order.comment;
  blindTypeElement.textContent = `${order.type}, ${order.type2}`;
  mechanismElement.textContent = order.mechanism;
  sizeElement.textContent = order.size_id.dimensions; // Update with actual size data
}

// Add click event listener to each table row
let rows = document.querySelectorAll("tbody tr");
rows.forEach(function (row, index) {
  row.addEventListener("click", function (event) {
    if (!event.target.closest("button")) {
      // Retrieve the order ID from the clicked row
      let orderId = this.dataset.orderId;
      console.log(orderId);

      // Make an AJAX request to fetch full details about the order
      fetch("/orders/" + orderId) // Replace with your server endpoint
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming the server returns JSON data for the order details
        })
        .then(function (data) {
          // Update order details in the modal with the retrieved data
          updateOrderDetails(data);

          // Show the modal
          let orderModal = new bootstrap.Modal(
            document.getElementById("orderModal")
          );
          orderModal.show();
        })
        .catch(function (error) {
          // Handle error
          console.error("Error fetching order details:", error);
          // Optionally, display an error message to the user
          toastr.error("Error fetching order details");
        });
    }
  });
});
