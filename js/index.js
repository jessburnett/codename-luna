function onLoad() {
    gigya.socialize.addEventHandlers({
        onLogin: onLoginHandler
    });

    const params = {
        containerID: "loginDiv", 
        cid: '',
        redirectURL: "/logged.html",
        showTermsLink: false,
        buttonsStyle: 'fullLogoColored',
        version: 2,
        height: '250px',
        width: '100%'
    };

    gigya.socialize.showLoginUI(params);
}

function onLoginHandler(eventObj) {
    completeEmailInfo(eventObj);
    loginCounter();
}

function loginCounter() {
    let loginCounterCookie = getCookie("loginCounter");
    let loginCounter = 0;

    if (loginCounterCookie) {
        loginCounter = parseInt(loginCounterCookie);
    }

    ++loginCounter;
    setCookie("loginCounter", loginCounter, 30);
}

function completeEmailInfo(eventObj) {
    if (!eventObj.user.email) {
        const emailInfo = prompt("Please enter your email");
        // TODO: store the email in gigya's component or server side.
    }
}

onLoad();
