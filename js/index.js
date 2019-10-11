
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

