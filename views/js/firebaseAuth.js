const setUserProfileInfo = user => {
    document.getElementById('google-displayName').innerHTML = user.firebase_displayName;
    document.getElementById('google-pic').setAttribute('src', user.firebase_profilePic);
    document.getElementById('google-email').innerHTML = user.firebase_email;
}

const homeSetLoggedInLayout = () => {
    document.getElementById('google-displayName').style.visibility = "visible";
    document.getElementById('google-pic').style.visibility = "visible";
    document.getElementById('google-email').style.visibility = "visible";
}

const homeSetLoginLayout = () => {
    document.getElementById('google-displayName').style.visibility = "hidden";
    document.getElementById('google-pic').style.visibility = "hidden";
    document.getElementById('google-email').style.visibility = "hidden";
}

const isUserLoggedIn = () => {
    const userInfo = JSON.parse( localStorage.getItem('firebase-user') );
    if (userInfo) {
        homeSetLoggedInLayout();
        setUserProfileInfo(userInfo);
    } else {
        homeSetLoginLayout();
    }
} 

const signInWithGoogle = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(data => {

        let userInfo = {
            firebase_idtoken: data.credential.idToken,
            firebase_email: data.user.email,
            firebase_profilePic: data.additionalUserInfo.profile.picture,
            firebase_displayName: data.user.displayName
        }

        localStorage.setItem('firebase-user', JSON.stringify(userInfo));
        localStorage.setItem('firebase-token', data.credential.idToken);

        setUserProfileInfo(userInfo);

    }).catch(data => {
        console.log(data);
    })
}

isUserLoggedIn();