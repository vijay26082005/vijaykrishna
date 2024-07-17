document.addEventListener('DOMContentLoaded', function() {
    const recordForm = document.getElementById('task-form');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const placeInput = document.getElementById('place');
    const recordList = document.getElementById('record-list');

    let records = [];

    // Function to render records
    function renderRecords() {
        recordList.innerHTML = '';
        records.forEach(function(record, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>Name: ${record.name}, Age: ${record.age}, Place: ${record.place}</span>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            recordList.appendChild(li);
        });
    }

    // Function to add a new record
    function addRecord(name, age, place) {
        const record = {
            name: name,
            age: age,
            place: place
        };
        records.push(record);
        renderRecords();
    }

    // Function to edit a record
    function editRecord(index, newName, newAge, newPlace) {
        records[index].name = newName;
        records[index].age = newAge;
        records[index].place = newPlace;
        renderRecords();
    }

    // Function to delete a record
    function deleteRecord(index) {
        records.splice(index, 1);
        renderRecords();
    }

    // Event listener for form submission
    recordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameValue = nameInput.value.trim();
        const ageValue = parseInt(ageInput.value);
        const placeValue = placeInput.value.trim();
        if (nameValue !== '' && !isNaN(ageValue) && placeValue !== '') {
            addRecord(nameValue, ageValue, placeValue);
            nameInput.value = '';
            ageInput.value = '';
            placeInput.value = '';
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    // Event delegation for edit and delete buttons
    recordList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            const index = event.target.getAttribute('data-index');
            const newName = prompt('Enter new name:');
            const newAge = prompt('Enter new age:');
            const newPlace = prompt('Enter new place:');
            if (newName !== null && newAge !== null && newPlace !== null) {
                editRecord(index, newName.trim(), parseInt(newAge), newPlace.trim());
            }
        }

        if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            deleteRecord(index);
        }
    });
});
