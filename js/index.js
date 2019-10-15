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
    document.getElementById("number-of-items").innerHTML = teamMembersAfterFiltering.length + " ITEMS";
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
    for(let i=0;i<teamMembers.length;i++){
        allEmails.add(teamMembers[i].email);      
    }

    doFiltering();
    updateNumberOfItems();
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
    let alertMessage = document.getElementById('alert-msg');
    if(name == "" || email == "" || major == "Major" || role == "Role" || biography.trim().length < 500){
        
        alertMessage.style.display = "block";
        alertMessage.innerHTML = "Some field was empty";
        return;
    }
    
    if (allEmails.has(email) == 1) {

        alertMessage.style.display = "block";
        alertMessage.innerHTML = "Email was already exist";
        return;
    }
    
    alertMessage.style.display = "none";
    allEmails.add(email);
    let currentMoment = new Date();
    let newMember = new member(name, email, major, role, biography, currentMoment.getTime());
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
        if(teamMembers[i].email == emailToBeDeleted) {
            teamMembers.splice(i, 1);
        }
    }
    allEmails.delete(emailToBeDeleted);
    hidePopUp();
    // set the updated array to localstorage 
    storeAtLocalStorage();
    //elementToBeDeleted.parentNode.parentNode.removeChild(elementToBeDeleted.parentNode);
    showAllMembers();
    updateNumberOfItems();
    
}


// Filter 

function doFiltering() {

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
    teamMembersAfterFiltering = teamMembersAfterFiltering.filter( ( item => item.name.includes(filterByName) ) );
}




// POP-UP

// When the user clicks any member, members's own information will apper in a pop up modal 
function showPopUp (currentMember) {

    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    let name = currentMember.children[0].innerHTML;
    let email = currentMember.children[1].children[0].innerHTML;
    let major = currentMember.children[1].children[0].innerHTML;
    let role = currentMember.children[1].children[0].innerHTML;
    let biography = currentMember.children[2].innerHTML;

    document.getElementById('myModal').innerHTML = `<div class="close-container">
                                                        <span class="close" onClick="hidePopUp()">&times;</span>
                                                    </div>
                                                    <div class="modal-content">
                                                        <div class="member-information">
                                                            <h2 >${name}</h2>
                                                            <span>
                                                                ${email} /
                                                                <select class="custom-select" id="all-majors-in-pop-up" onChange="updateMemberInformation(${email})">
                                                                    <option value="Computer Science">Computer Science</option>
                                                                    <option value="0">Computer Engineering</option>
                                                                    <option value="Information Technology">Information Technology</option>
                                                                    <option value="Information System">Information System </option>
                                                                </select>  
                                                                / 
                                                                <select class="custom-select" id="all-roles-in-pop-up" onChange="updateMemberInformation(${email})">
                                                                    <option value="Front-End Developer">Front-End Developer</option>
                                                                    <option value="Back-End Developer">Back-End Developer</option>
                                                                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                                                                    <option value="UI/UX Designer">UI/UX Designer</option>
                                                                </select>
                                                            </span>
                                                            <p id="biography-in-pop-up" contenteditable="true" onChange="updateMemberInformation(${email})">
                                                                ${biography}
                                                            </p>
                                                            <span>
                                                                <button type="button" class="delete-btn" onClick="deleteMember('${email}')">DELETE</button>
                                                                <button type="button" class="save-btn" onClick="updateMemberInformation('${email}')">SAVE</button>
                                                                <button type="button" class="cancel-btn" onClick="hidePopUp()">CANCEL</button>
                                                            </span>
                                                        </div>
                                                    </div>`;

    setSelectedMajorInPopUp(major);
    setSelectedRoleInPopUp(role);                     
                                                            
}

function setSelectedMajorInPopUp(major) {

    let majorsPopUp = document.getElementById("all-majors-in-pop-up");
    for (let i = 0; i < majorsPopUp.options.length; ++i) {
        if (majorsPopUp.options[i].text === major)
            majorsPopUp.options[i].selected = true;
    }

}

function setSelectedRoleInPopUp(role) {

    let rolesPopUp = document.getElementById("all-roles-in-pop-up");
    for (let i = 0; i < rolesPopUp.options.length; ++i) {
        if (rolesPopUp.options[i].text === role)
            rolesPopUp.options[i].selected = true;
    }  

}

function updateMemberInformation (emailForUpdatedMember) {

    for (let i=0; i<teamMembers.length; i++) {
        if(teamMembers[i].email == emailForUpdatedMember) {
            let allMajors = document.getElementById('all-majors-in-pop-up');
            let newMajor = allMajors.options[allMajors.selectedIndex].text;
            
            let allRoles = document.getElementById('all-roles-in-pop-up');
            let newRole = allRoles.options[allRoles.selectedIndex].text;
            
            let newBiography = document.getElementById('biography-in-pop-up').innerHTML;
        
            newMemberInformation = new member(teamMembers[i].name, teamMembers[i].email, newMajor, newRole, newBiography, teamMembers[i].timestamp);
            teamMembers[i] = newMemberInformation;
        }
    }

    storeAtLocalStorage();
    showAllMembers();
    hidePopUp();
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

