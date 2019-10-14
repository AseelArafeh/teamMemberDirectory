let teamMembers = [];
let teamMembersAfterFiltering = [];
let allEmails = new Set(); 

class member {
	constructor(name, email, major, role, biography, timestamp) {
		this.name = name;
        this.email = email;
        this.major = major;
        this.role = role;
        this.biography = biography;
        this.timestamp = timestamp;
	}
}

showAllMembers();
updateNumberOfItems();

function updateNumberOfItems() {
    document.getElementById("number-of-items").innerHTML = teamMembers.length + " ITEMS";
}

function storeAtLocalStorage() {
    const jsonString = JSON.stringify(teamMembers);    
    localStorage.setItem('allMembers', jsonString);
}

function getFromLocalStorage() {
    const allMembers = localStorage.getItem('allMembers');
    teamMembers = JSON.parse(allMembers) || [];
}

function showAllMembers() {

    getFromLocalStorage();
    teamMembersAfterFiltering = teamMembers;
    doFiltering();
    //clear the member list befor 
    document.getElementById('list-of-members').innerHTML = null;
    for (let i = 0; i < teamMembersAfterFiltering.length; i++) {
        let currentMember = `<li class="list-element">
                                <div class="btn" onClick="deleteMember('${teamMembersAfterFiltering[i].email}');">
                                    <div class="delete-btn">
                                        <div class="inner-symbol">
                                        </div>
                                    </div>
                                </div>
                                <div class="member-information"  id="myBtn" onClick="showPopUp(this);">
                                    <h3>${teamMembersAfterFiltering[i].name}</h3>
                                    <span>
                                        <span>${teamMembersAfterFiltering[i].email}</span> / <span>${teamMembersAfterFiltering[i].major}</span> / <span>${teamMembersAfterFiltering[i].role}</span>
                                    </span>
                                    <p>
                                        ${teamMembersAfterFiltering[i].biography}
                                    </p>
                                </div>
                            </li>`;
        document.getElementById('list-of-members').innerHTML += currentMember;
    }
}

function addNewMember() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let allMajors = document.getElementById('all-majors');
    let major = allMajors.options[allMajors.selectedIndex].text;
    let allRoles = document.getElementById('all-roles');
    let role = allRoles.options[allRoles.selectedIndex].text;
    let biography = document.getElementById('biography').value;
    if(name=="" || email=="" || major=="Major" || role=="Role" || biography.length<500){
        alert("some field was empty");
        return;
    }
    
    if (allEmails.has(email) == 1) {
        alert("email was already exist");
        return;
    }

    allEmails.add(email);
    let currentMoment = new Date();
    let newMember = new member(name, email, major, role, biography, currentMoment.getTime());
    console.log(newMember.timestamp);
    let checkBox = document.getElementById("check-box");
    let indexToAddAt = 0;
    if(checkBox.checked) {
        indexToAddAt = document.getElementById("index").value;    
        indexToAddAt--;
        // if(indexToAddAt not integer number  or less than 0)
            // alert("index should be positive number");
    } 

    teamMembers.splice(indexToAddAt, 0, newMember);

    storeAtLocalStorage();
    showAllMembers();
    updateNumberOfItems();
}

function deleteMember(emailToBeDeleted) {
    showAllMembers();
    updateNumberOfItems();
    for (let i=0; i<teamMembers.length;i++) {
        console.log(teamMembers[i].email);
        console.log(emailToBeDeleted);
        if(teamMembers[i].email == emailToBeDeleted) {
            teamMembers.splice(i, 1);
        }
    }
    hidePopUp();
    // set the updated array to localstorage 
    storeAtLocalStorage();
    //elementToBeDeleted.parentNode.parentNode.removeChild(elementToBeDeleted.parentNode);
    showAllMembers();
    updateNumberOfItems();
    
}


// Filter 

function doFiltering() {
    //teamMembersAfterFiltering

    let allSortBy = document.getElementById('sort-by');
    let sortBy = allSortBy.options[allSortBy.selectedIndex].text;

    let allFilterByMajor = document.getElementById('filter-by-major');
    let filterByMajor = allFilterByMajor.options[allFilterByMajor.selectedIndex].text; 

    let allFilterByRole = document.getElementById('filter-by-role');
    let filterByRole = allFilterByRole.options[allFilterByRole.selectedIndex].text;
    
    let filterByName = document.getElementById('filter-by-name').value;

    if(sortBy != "SORT BY")
        doSortBy(sortBy);
    if(filterByMajor != "Major")
        doFilterByMajor(filterByMajor);
    if(filterByRole != "Role")
        doFilterByRole(filterByRole);
    if(filterByName != "") 
        doFilterByName(filterByName);

}

function doSortBy(typeOfSort) {
    if(typeOfSort == "A-Z") {
        teamMembersAfterFiltering.sort( (a , b) => (a.name > b.name) ? 1 : -1 );
    }
    else if(typeOfSort == "Z-A") {
        teamMembersAfterFiltering.sort( (a , b) => (a.name < b.name) ? 1 : -1 );
    }
    else if(typeOfSort == "Newest") {
        teamMembersAfterFiltering.sort( (a , b) => (a.timestamp < b.timestamp) ? 1 : -1 );
    }
    else if(typeOfSort == "Oldest") {
        teamMembersAfterFiltering.sort( (a , b) => (a.timestamp > b.timestamp) ? 1 : -1 );
    }
}

function doFilterByMajor(typeOfMajor) {
    teamMembersAfterFiltering = teamMembersAfterFiltering.filter( item => item.major == typeOfMajor);
}

function doFilterByRole(typeOfRole) {
    teamMembersAfterFiltering = teamMembersAfterFiltering.filter( item => item.role == typeOfRole);
}

function doFilterByName(filterByName) {
    teamMembersAfterFiltering = teamMembersAfterFiltering.filter( item => item.name == filterByName);
}




// POP-UP

// When the user clicks any member, members's own information will apper in a pop up modal 
function showPopUp (currentMember) {

    console.log(currentMember);
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    //let elementToBeDeleted = new member(currentMember.children[0].innerHTML, currentMember.children[1].children[0].innerHTML, currentMember.children[1].children[1].innerHTML, currentMember.children[1].children[2].innerHTML, currentMember.children[2].innerHTML);
    //console.log(elementToBeDeleted);
    document.getElementById('myModal').innerHTML = `<div class="close-container">
                                                        <span class="close" onClick="hidePopUp()">&times;</span>
                                                    </div>
                                                    <div class="modal-content">
                                                        <div class="member-information">
                                                            <h2 >${currentMember.children[0].innerHTML}</h2>
                                                            <span>
                                                                ${currentMember.children[1].children[0].innerHTML} / 
                                                                ${currentMember.children[1].children[1].innerHTML} / 
                                                                ${currentMember.children[1].children[2].innerHTML}
                                                            </span>
                                                            <p>
                                                                ${currentMember.children[2].innerHTML}
                                                            </p>
                                                            <span>
                                                                <button type="button" class="delete-btn" onClick="deleteMember('${currentMember.children[1].children[0].innerHTML}')">DELETE</button>
                                                                <button type="button" class="save-btn">SAVE</button>
                                                                <button type="button" class="cancel-btn" onClick="hidePopUp()">CANCEL</button>
                                                            </span>
                                                        </div>
                                                    </div>`;

                                                        
                                                            
}


function hidePopUp () {

    if ( document.getElementById("myModal") != null){// Get the modal
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
    let modal = document.getElementById("myModal");// Get the modal
    if (event.target == modal) {
        modal.style.display = "none";
    }

}

