let teamMembers = [];
let allEmails = new Set(); 

class member {
	constructor(name, email, major, role, biography) {
		this.name = name;
        this.email = email;
        this.major = major;
        this.role = role;
        this.biography = biography;
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
    //clear the member list befor 
    document.getElementById('list-of-members').innerHTML = null;
    for (let i = 0; i < teamMembers.length; i++) {
        let currentMember = `<li class="list-element">
                                <div class="btn" onClick="deleteMember('${teamMembers[i].email}');">
                                    <div class="delete-btn">
                                        <div class="inner-symbol">
                                        </div>
                                    </div>
                                </div>
                                <div class="member-information"  id="myBtn" onClick="showPopUp(this);">
                                    <h3>${teamMembers[i].name}</h3>
                                    <span>
                                        <span>${teamMembers[i].email}</span> / <span>${teamMembers[i].major}</span> / <span>${teamMembers[i].role}</span>
                                    </span>
                                    <p>
                                        ${teamMembers[i].biography}
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
    let newMember = new member(name, email, major, role, biography);
    let checkBox = document.getElementById("check-box");
    let indexToAddAt = 0;
    if(checkBox.checked) {
        let indexToAddAt = document.getElementById("index").value;teamMembers.splice(indexToAddAt, 0, newMember);
    } 
    
    

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
/*
function deleteMember(elementToBeDeleted) {

    console.log(elementToBeDeleted);// email

    let emailToBeDeleted = elementToBeDeleted.parentNode.children[1].children[1].children[0].innerHTML;
    allEmails.delete(emailToBeDeleted);
    for(let i=0; i<teamMembers.length;i++){
        console.log(teamMembers[i].email);
        console.log(emailToBeDeleted);
        if(teamMembers[i].email == emailToBeDeleted){
            teamMembers.splice(i, 1);
            return;
        }
    }
    //remove from array 
    console.log(teamMembers);
    // set the updated array to localstorage 
    const jsonString = JSON.stringify(teamMembers);
    console.log(teamMembers);
    localStorage.setItem('allMembers', jsonString);

    elementToBeDeleted.parentNode.parentNode.removeChild(elementToBeDeleted.parentNode);
    updateNumberOfItems();
    showAllMembers();
    
}*/



// Filter 






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

