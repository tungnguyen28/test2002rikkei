let btnCreate = document.getElementById("btnCreate");

function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
btnCreate.addEventListener("click", function () {
    let studentName = document.getElementById("studentName").value;
    let listStudent = JSON.parse(localStorage.getItem("listStudent"));
    let exist = false;
    if (listStudent != null) {
        for (const student of listStudent) {
            if (student.studentName == studentName) {
                exist = true;
                break;
            }
        }
    }
    if (exist) {
        editStudent();
    } else {
        createStudent();
    }
});
function createStudent() {
    let listStudent = JSON.parse(localStorage.getItem("listStudent"));
    if (listStudent == null) {
        listStudent = [];
    }
    let studentName = document.getElementById("studentName").value;
    let studentMail = document.getElementById("studentMail").value;
    let studentTel = document.getElementById("studentTel").value;
    let studentAddress = document.getElementById("studentAddress").value;
    let studentSex = document.getElementById("studentSex").value;

    let studentNew = {  "studentName": studentName,"studentMail": studentMail, "studentTel": studentTel,"studentAddress": studentAddress,"studentSex": studentSex };
    listStudent.push(studentNew);
    localStorage.setItem("listStudent", JSON.stringify(listStudent));
    readListStudent();
}
function readListStudent() {
    let listStudent = JSON.parse(localStorage.getItem("listStudent"));
    if (listStudent == null) {
        listStudent = [];
    }
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
    listStudent.forEach((student, index) => {
        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.studentName}</td>
            <td>${student.studentMail}</td>
            <td>${student.studentTel}</td>
            <td>${student.studentAddress}</td>
            <td>
                <button onclick="updateStudent('${student.studentName}')">Edit</button>
                <button onclick="deleteStudent('${student.studentName}')">Delete</button>
            </td>
        </tr>`
    });
}
readListStudent();
function updateStudent(studentName) {
    let listStudent = JSON.parse(localStorage.getItem("listStudent"));
    let studentUpdate = listStudent.filter(student => {
        if (student.studentName == studentName) {
            return student;
        }
    })
    document.getElementById("studentName").value = studentUpdate[0].studentName;
    document.getElementById("studentMail").value = studentUpdate[0].studentMail;
    document.getElementById("studentTel").value = studentUpdate[0].studentTel;
    document.getElementById("studentAddress").value = studentUpdate[0].studentAddress;

}
function editStudent() {
    let listStudent = JSON.parse(localStorage.getItem("listStudent"));
    let studentName = document.getElementById("studentName").value;
    let studentMail = document.getElementById("studentMail").value;
    let studentTel = document.getElementById("studentTel").value;
    let studentAddress = document.getElementById("studentAddress").value;

    let listStudentUpdate = listStudent.map(student => {
        if (student.studentName == studentName) {
            student.studentMail = studentMail;
            student.studentTel = studentTel;
            student.studentAddress = studentAddress;
        }
        return student;
    });
    localStorage.setItem("listStudent", JSON.stringify(listStudentUpdate));
    readListStudent();
}

function deleteStudent(studentName) {
    let listStudent = JSON.parse(localStorage.getItem("listStudent"));
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].studentName == studentName) {
            listStudent.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("listStudent", JSON.stringify(listStudent));
    readListStudent();
}