window.onload = () =>{

  // document.getElementById("add-employee-button").addEventListener("click", AddEmployee, false);

  document.getElementById("modalButton").addEventListener("click", openModal, true);

}

function openModal() {
  document.getElementById('myModal').style = "display:block";
  document.getElementById('myModal').classList.add("show");
}