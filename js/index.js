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

function updateNumberOfItems(){
    document.getElementById("number-of-items").innerHTML = teamMembers.length;
}

function showAllMembers() {
    const allMembers = localStorage.getItem('allMembers');
    console.log(allMembers);
    console.log(teamMembers);
    //from  local storage to my array then output members 
    teamMembers = JSON.parse(allMembers) || [];
    console.log(teamMembers);
    let i;
    //clear the member list befor 
    document.getElementById('list-of-members').innerHTML = null;
    for (i = 0; i < teamMembers.length; i++) {
        let currentMember = `<li class="list-element">
                                <div class="btn" onClick="deleteMember(this);">
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

function saveButton() {

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
    teamMembers.push(newMember);
    console.log(newMember);
    console.log(teamMembers);
    // add to localstorage 
    const jsonString = JSON.stringify(teamMembers);
    console.log(teamMembers);
    
    localStorage.setItem('allMembers', jsonString);
    showAllMembers();
    updateNumberOfItems();

}
console.log(teamMembers);

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
    
}




// POP-UP

// When the user clicks any member, members's own information will apper in a pop up modal 
function showPopUp (currentMember) {
    console.log(currentMember);
 //let elementToBeDeleted = new member(currentMember.children[0].innerHTML, currentMember.children[1].children[0].innerHTML, currentMember.children[1].children[1].innerHTML, currentMember.children[1].children[2].innerHTML, currentMember.children[2].innerHTML);
    //console.log(elementToBeDeleted);
    document.getElementById('list-of-members').innerHTML = `<div id="myModal" class="modal">
                                                                <div class="close-container">
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
                                                                            <button type="button" class="delete-btn" >DELETE</button>
                                                                            <button type="button" class="save-btn">SAVE</button>
                                                                            <button type="button" class="cancel-btn" onClick="hidePopUp()">CANCEL</button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>`;
   
  |                                                              
                                                            
}


function hidePopUp () {
    let modal = document.getElementById("myModal");// Get the modal
    modal.style.display = "none";
    showAllMembers();
    updateNumberOfItems();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById("myModal");// Get the modal
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

