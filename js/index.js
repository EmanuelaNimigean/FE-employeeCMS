import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjHqXO7ylD7g16JeOfxqS3_ngKUM6qRjA",
  authDomain: "firstprojectfirebase-nmg98.firebaseapp.com",
  projectId: "firstprojectfirebase-nmg98",
  storageBucket: "firstprojectfirebase-nmg98.appspot.com",
  messagingSenderId: "580650108239",
  appId: "1:580650108239:web:6e61aa9b6862e05cf6f13a",
  measurementId: "G-C5F6Z9LCEN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var employeesTable = document.getElementById("employeesTable");
window.onload = () => {

  document.getElementById("add-employee-button").addEventListener("click", addNewEmployee, false);

  document.getElementById("modalButton").addEventListener("click", openModal, true);

  document.querySelectorAll(".close-myModal").forEach(e => {
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

window.onclick = function (event) {
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
  <td><img src="${employee.picture}" class="picture" height=80></td>
  <td>${employee.firstName}</td>
  <td>${employee.lastName}</td>
  <td>${employee.email}</td>
  <td>${employee.sex}</td>
  <td>${employee.birthdate}</td>
  <td><img src="../images/del.png" height=30 class="del" id="${employee.employeeId}"/></td>
  </tr>`
  console.log(employee);
  document.getElementById("employeesTable").innerHTML += tableContent;
}

async function getAllFromDB() {
  const querySnapshot = await getDocs(collection(db, "employeesCMS"));
  //removeDataFromViewTable(employeesTable);
  putData(querySnapshot);
  setEventListenerDelete();
}

getAllFromDB();

function putData(querySnapshot) {
  //removeDataFromViewTable(employeesTable);
  querySnapshot.forEach((doc) => {
    var newEmployee = new Employee(doc.data()["employeeId"], doc.data()["firstName"], doc.data()["lastName"], doc.data()["email"], doc.data()["sex"], doc.data()["birthdate"], doc.data()["picture"]);
    appendTable(newEmployee);
  });
}

function removeDataFromViewTable(employeesTable) {
  for (var i = employeesTable.childNodes[1].childElementCount - 1; i > 0; i--) {
    employeesTable.deleteRow(i);
  }
}

function setEventListenerDelete() {
  var drop = document.getElementsByClassName("del");
  for (var i = 0; i < drop.length; i++) {
    drop[i].addEventListener("click", function () {
      deleteDoc(doc(db, "employeesCMS", this.id));
      console.log(this.id);
      //document.getElementById(`${this.id}`).remove();
    });
  }
}

function addNewEmployee() {
  var employeeId=Math.random().toString(36).slice(2);
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var email = document.getElementById("email-input").value;
  var sex = document.getElementById("sex-input").value;
  var birthdate = document.getElementById("birthdate-input").value;
  var pictureName = document.getElementById("picture").value.split("\\")[2];
  if (pictureName == null) {
    var picture = document.getElementById("defaultImg").src;
  } else {
    var picture = "/images/" + pictureName;
  }

  var validateForm = validate(firstName, lastName, email, sex, birthdate);

  if (validateForm) {
    setDoc(doc(db, "employeesCMS", `${employeeId}`), {
      employeeId:employeeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      sex: sex,
      birthdate: birthdate,
      picture: picture
    });
    //removeDataFromViewTable(employeesTable);
    getAllFromDB();
    // setDelete();
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
  this.picture = picture;
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

var maxBirthdate = moment().subtract(16 * 12, 'M').format('YYYY-MM-DD');
document.getElementById("birthdate-input").max = maxBirthdate;

