
class member {
	constructor(name, email, major, role, biography) {
		this.name = name;
        this.email = email;
        this.major = major;
        this.role = role;
        this.biography = biography;
	}
}

let teamMembers = [];

function updateNumberOfItems(){
    document.getElementById("number-of-items").innerHTML = teamMembers.length + 1;
}

function showAllMembers() {
    let i;
    for (i = 0; i < teamMembers.length; i++) {
        let currentMember = `<li class="list-element">
                                <div class="btn">
                                    <div class="delete-btn">
                                        <div class="inner-symbol">
                                        </div>
                                    </div>
                                </div>
                                <div class="member-information"  id="myBtn">
                                    <h3>${teamMembers[i].name}</h3>
                                    <span>
                                        ${teamMembers[i].email} / ${teamMembers[i].major} / ${teamMembers[i].role}
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
let modal = document.getElementById("myModal");// Get the modal
let btn = document.getElementById("myBtn");// Get the button that opens the modal
let span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

