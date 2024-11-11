function generateTable(students) {
  const table = document.querySelector("#dataTable");
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${student.profile}" alt="Profile picture"></td>
      <td>${student.first_name}</td>
      <td>${student.last_name}</td>
      <td>${student.role}</td>
      <td>${student.birth_day}</td>
      <td>${student.username}</td>
      <td>${student.email}</td>
      <td>${student.grade}</td>
    `;
    table.appendChild(row);
  });
}

// i found this function online : "stackacademic"
function findMedian(grades) {
  grades.sort((a, b) => a - b);
  const middleIndex = Math.floor(grades.length / 2);

  if (grades.length % 2 === 0) {
    return (grades[middleIndex - 1] + grades[middleIndex]) / 2;
  } else {
    return grades[middleIndex];
  }
}

function bottomRange(grades) {
  grades.sort((a, b) => a - b);
  const first = grades[0];
  return first;
}

function topRange(grades) {
  grades.sort((a, b) => a - b);
  const last = grades[grades.length - 1];
  return last;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("student.json")
    .then((response) => response.json())
    .then((studentsData) => {
      generateTable(studentsData.students);
      const grades = studentsData.students.map((student) => student.grade);
      const medianGrade = findMedian(grades);
      const firstRange = bottomRange(grades);
      const lastRange = topRange(grades);
      const totalStudents = studentsData.students.length;
      console.log(`The range is: ${firstRange} to ${lastRange}`);
      console.log(`The median grade is: ${medianGrade}`);
      console.log(grades);
      console.log(totalStudents);
      calculation(totalStudents, medianGrade, firstRange, lastRange);
    })
    .catch((error) => {
      console.error("Error fetching the JSON data:", error);
    });
});

function calculation(totalStudents, medianGrade, firstRange, lastRange) {
  const para = document.querySelector("#calculation");
  para.textContent = `There are ${totalStudents} students in the class. The median grade point average is ${medianGrade}. The range of grades is ${firstRange} to ${lastRange}.`;
}
