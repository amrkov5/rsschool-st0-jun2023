export function loginPreparation(userIndex) {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const firstName = usersDb[userIndex].firstName;
    const lastName = usersDb[userIndex].lastName;
    const userInitials = firstName.charAt(0) + lastName.charAt(0);
    const profileInitials = document.querySelector('.profile_initials');
    const profileIcon = document.querySelector('.icon-profile');
    profileIcon.classList.add('icon_profile_hidden');
    profileInitials.classList.remove('icon_profile_hidden');
    profileInitials.textContent = `${userInitials}`;
    document.querySelector('.profile-wrapper').title = `${firstName} ${lastName}`;
    usersDb[userIndex].visitAmount += 1;
}