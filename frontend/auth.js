

const Userid= {
  UserPoolId: "us-east-1_ddmmyyyy",
  ClientId: "client id"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(Userid);


function registerUser() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const firstName = document.getElementById("reg-firstname").value;
  const lastName = document.getElementById("reg-lastname").value;

  const attributeList = [];

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: firstName + " " + lastName
    })
  );

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "family_name",
      Value: lastName
    })
  );

  userPool.signUp(firstName, password, attributeList, null, function (err, result) {
    if (err) {
      alert("Enter Credentials");
      return;
    }
    alert("Registration successful! Please verify your email.");
  });
}


function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  });

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: function (result) {
        storeUserSession(cognitoUser, result);
        window.location.href = "chat.html";
    },

    
    onFailure: function (err) {
      alert("Eneter Credentials");
    }
  });
}

function Show_pass(){
    var x = document.getElementById('login-password');
     if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function Show_pass1(){
    var x = document.getElementById('reg-password');
     if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function storeUserSession(cognitoUser, result) {
  const token = result.getIdToken().getJwtToken();
  const username = cognitoUser.getUsername();

  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
}



