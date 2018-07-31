var urlParamsArr = {};

function onLoad() {
    gigya.socialize.showAddConnectionsUI({
        height: 65
        , width: 175
        , containerID: "connectionsDiv"
        , showTermsLink: false
    });

    gigya.socialize.addEventHandlers({
        onLogout: onLogoutHandler
    });

    initializeData();
}

function initializeData() {
    var urlParams = document.location.search.substr(1).split("&");
    

    for (var i = 0; i < urlParams.length; i++) {
        var ret = urlParams[i].toString().split("=");
        urlParamsArr[ret[0]] = decodeURIComponent(ret[1]);
    }

    // Inject the user's nickname
    document.getElementById('nickname').innerHTML = urlParamsArr["nickname"];

    // Inject the login provider
    document.getElementById('loginProvider').innerHTML = urlParamsArr["loginProvider"];

    // checkUserEmail
    var userEmail = urlParamsArr.email;
    var dialog = document.querySelector('dialog');
    
    // register dialogPolyfill for browers that do not support the <dialog> tag. 
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    // add eventHandler for dialog buttons
    dialog.querySelector('dialog button').addEventListener('click', function() {
      dialog.close();
    });

    //mdl only allows one close button force to dump email and cont. user flow -- +1 UX
    document.getElementById('cancel').addEventListener('click', function() {
      dialog.close();
    });

    // hitting enter on input will close dialog and mimic submit -- +1 UX
    document.getElementById('emailInput').addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            dialog.close();
        }
    });

    if(userEmail === 'undefined' || !userEmail){
        dialog.showModal();
    }
    
    var avatarURL = urlParamsArr.photoURL;
    var avatar = document.getElementById('avatar');
    // Inject the user's avatar top right nav
     if (avatarURL === ' ') {
        avatar.setAttribute("class", 'hide');
        document.getElementById('noAvatar').setAttribute("class", "show");     
    }else{
        avatar.setAttribute("src", avatarURL);
    }

    // Inject loginCounter
    var loginCounter = getCookie("loginCounter");
    document.getElementById('badgeCounter').setAttribute("data-badge", loginCounter ? loginCounter : 0);

}


function logoutFromGS() {
    gigya.socialize.logout();
}

function onLogoutHandler(eventObj) {
    window.location = 'index.html';
    return false;
}

function publishAction() {
    // Constructing a UserAction Object
    var act = new gigya.socialize.UserAction();
     
    // Setting the Title & Subtitle
    act.setTitle("This is my title");
    act.setSubtitle("This is my subtitle");
     
    // Setting the Link Back
    act.setLinkBack("http://www.gigya.com");
     
    // Setting the Description
    act.setDescription("This is my Description");
     
    // Adding a Media Item (video)
    var video = {
                    src: 'http://www.youtube.com/v/fzzjgBAaWZw&hl=en&fs=1',
                    previewImageURL: 'http://graphics8.nytimes.com/images/2006/01/02/science/03cute.large2.jpg',
                    type: 'flash'
                };
    act.addMediaItem(video);
     
    // Adding an Action Link
    act.addActionLink("Read More", "http://www.gigya.com");
     
     
    // Publishing the User Action
    gigya.socialize.showShareUI({  userAction:act });
}

function publishAction_callback(response) {
    switch (response.errorCode) {
        case 0:
            document.getElementById('status').style.color = "green";
            document.getElementById('status').innerHTML = "Newsfeed item sent.";
            break;
        default:
            document.getElementById('status').style.color = "red";
            document.getElementById('status').innerHTML =
                "Unable to send newsfeed item. Error Code:"
                + response.errorCode + "; " + response.errorMessage;
    }
}

onLoad();