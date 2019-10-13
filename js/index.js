
class member {
	constructor(name, email, major, role, biography) {
		this.name = name;
        this.email = email;
        this.major = major;
        this.role = role;
        this.biography = biography;
	}
}

var teamMembers = [];

function updateNumberOfItems(){
    document.getElementById("number-of-items").innerHTML = teamMembers.length + 1;
}

function showAllMembers() {
    let allMembers = localStorage.getItem('allMembers');
    console.log(allMembers);
    console.log(teamMembers);
    //teamMembers = allMembers ? JSON.parse(localStorage.getItem('allMembers')) : [];
    console.log(teamMembers);
    let i;
    for (i = 0; i < teamMembers.length; i++) {
        let currentMember = `<li class="list-element">
                                <div class="btn" onClick="this.parentNode.parentNode.removeChild(this.parentNode);">
                                    <div class="delete-btn">
                                        <div class="inner-symbol">
                                        </div>
                                    </div>
                                </div>
                                <div class="member-information"  id="myBtn" onClick="showPopUp(this);">
                                    <h3>${teamMembers[i].name}</h3>
                                    <span>
                                        <span> ${teamMembers[i].email} </span> / <span> ${teamMembers[i].major} </span> / <span> ${teamMembers[i].role} </span>
                                    </span>
                                    <p>
                                        ${teamMembers[i].biography}
                                    </p>
                                </div>
                            </li>`;
        document.getElementById('list-of-members').innerHTML += currentMember;
    }
}

function saveButton(){

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let allMajors = document.getElementById('all-majors');
    let major = allMajors.options[allMajors.selectedIndex].text;
    let allRoles = document.getElementById('all-roles');
    let role = allRoles.options[allRoles.selectedIndex].text;
    let biography = document.getElementById('biography');

    let newMember = new member(name, email, major, role, biography);
    teamMembers.push(newMember);
    console.log(newMember);
    console.log(teamMembers);
    // add to localstorage 
    const jsonString = JSON.stringify(teamMembers);
    localStorage.setItem('allMembers', teamMembers);
    showAllMembers();
    updateNumberOfItems();

}







// POP-UP

// When the user clicks any member, members's own information will apper in a pop up modal 
function showPopUp (currentMember) {
    console.log(currentMember.children[2].innerHTML);
    
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
                                                                            <button type="button" class="delete-btn">DELETE</button>
                                                                            <button type="button" class="save-btn">SAVE</button>
                                                                            <button type="button" class="cancel-btn" onClick="hidePopUp()">CANCEL</button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>`;
                                                                
    
}


function hidePopUp () {
    let modal = document.getElementById("myModal");// Get the modal
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById("myModal");// Get the modal
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

