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

    document.getElementById('nickname').innerHTML = urlParamsArr["nickname"];
    document.getElementById('loginProvider').innerHTML = urlParamsArr["loginProvider"];

    let loginCounter = getCookie("loginCounter");
    document.getElementById('loginCounter').innerHTML = loginCounter ? loginCounter : 0;
}

function logoutFromGS() {
    gigya.socialize.logout();
}

function onLogoutHandler(eventObj) {
    window.location = 'index.html';
    return false;
}

function publishAction() {
    var act = new gigya.socialize.UserAction();

    act.setTitle("Post title");
    act.setSubtitle("Post subtitle");
    act.setLinkBack("http://bit.ly/5MFb2V");
    act.setDescription("This is my post Description.");
    act.addActionLink("Read More", "http://bit.ly/5MFb2V");
    act.setUserMessage("This is my sample message.");

    var params =
        {
            userAction: act,
            callback: publishAction_callback
        };

    gigya.socialize.publishUserAction(params);
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
