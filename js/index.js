import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

// initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHZpy8FJM8lUmUSv_gXqKoPvzpVVeHu5g",
    authDomain: "content-management-syste-52d17.firebaseapp.com",
    projectId: "content-management-syste-52d17",
    storageBucket: "content-management-syste-52d17.appspot.com",
    messagingSenderId: "34275485596",
    appId: "1:34275485596:web:3f5151a2d8d75cea330a59",
    measurementId: "G-JLWDPQBSPK"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.onload = () =>{

  document.getElementById("add-employee-button").addEventListener("click", addNewEmployee, false);

  document.getElementById("modalButton").addEventListener("click", openModal, true);

  document.querySelectorAll(".close-myModal").forEach(e =>{
    e.addEventListener("click", closeModal, false);
});

}

function openModal() {
  document.getElementById('myModal').style = "display:block";
  document.getElementById('myModal').classList.add("show");
}

function closeModal() {
  document.getElementById('myModal').style = "display:none";
  document.getElementById('myModal').classList.remove("show");
}

window.onclick = function(event) {
  if (event.target == document.getElementById('myModal')) {
    closeModal();
  }
}

function clearModal() {
  document.getElementById("first-name").value = '';
  document.getElementById("last-name").value = '';
  document.getElementById("email-input").value = '';
  document.getElementById("sex-input").value = '';
  document.getElementById("birthdate-input").value = '';
  document.getElementById("picture").value = '';
}

function appendTable(employee) {
  var tableContent = `<tr employee-id=${employee.employeeId}>
  <td><img src="${employee.picture}" class="picture"  height=80></td>
  <td>${employee.firstName}</td>
  <td>${employee.lastName}</td>
  <td>${employee.email}</td>
  <td>${employee.sex}</td>
  <td>${employee.birthdate}</td>
  <td class="stergere">X</td>
  </tr>`
  console.log(employee);
  document.getElementById("employeesTable").innerHTML += tableContent;
}

var firstName, lastName, email, sex, birthdate, picture, validateForm, pictureName;
function addNewEmployee() {
  firstName = document.getElementById("first-name").value;
  lastName = document.getElementById("last-name").value;
  email = document.getElementById("email-input").value;
  sex = document.getElementById("sex-input").value;
  birthdate = document.getElementById("birthdate-input").value;
  pictureName = document.getElementById("picture").value.split("\\")[2];
  console.log(pictureName);
  if(pictureName==null) {
    picture = document.getElementById("defaultImg").src;
  } else {
    picture="/images/"+pictureName;
  }

  validateForm = validate(firstName, lastName, email, sex, birthdate);

  if(validateForm) {
      // employeeId = JSON.parse(localStorage.getItem('employeeNextId'));
      // allEmployees =  JSON.parse(localStorage.getItem('employees'));
  
     var newEmployee = new Employee(1, firstName, lastName, email, sex, birthdate, picture);
      // allEmployees.push(newEmployee);
  
      // localStorage.setItem('employeeNextId', JSON.stringify(employeeId));
      // localStorage.setItem('employees', JSON.stringify(allEmployees));
  
      appendTable(newEmployee);
      //setDelete();
      closeModal();
      clearModal();
  }
}

function Employee(employeeId, firstName, lastName, email, sex, birthdate, picture) {
  this.employeeId = employeeId;
  this.lastName = lastName;
  this.firstName = firstName;
  this.email = email;
  this.birthdate = moment(birthdate).format('D MMMM YYYY');
  this.sex = sex;
  this.picture= picture;
}


function validate(firstName, lastName, email, sex, birthdate) {

  if (firstName == null || firstName == "") {
    alert('First name is required!');
    return false;
  }

  if (lastName == null || lastName == "") {
      alert('Last name is required!');
      return false;
  }

  if (email == null || email == "") {
      alert('Email is required!');
      return false;
  } else {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;
      if (!regex.test(email)) {
          alert('Email is invalid!');
          return false;
      }
  }

  if (sex == null || sex == "") {
      alert('Sex is required!');
      return false;
  }

  if (birthdate == null || birthdate == "") {
      alert('Birthdate is required!');
      return false;
  } 

  return true;
}
