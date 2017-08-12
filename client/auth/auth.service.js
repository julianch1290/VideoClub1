'use strict';

function AuthService($auth,$state){
    var Auth = {
        login:login,
        isAuthenticated:isAuthenticated,
        logout:logout,
        isAdmin:isAdmin,
    };

    function login(usuario){
        $auth.login(usuario)
        .then(response => {
            console.log("Login ok",response);

            $state.go('main');
        })
        .catch(err => {
            console.log("Error de login");
            $state.go('login');
        });
    }

    function logout(){
      if(Auth.isAuthenticated()){
        $auth.logout()
        .then(response => {
          $state.go("main");
          console.log("Salida ok");
        })
      }

    }
    function isAuthenticated(){
      if($auth.isAuthenticated()){
        return true;
      }else{
        return false;
      }
    }

/*Roles De Admin*/

function isAdmin(){
  if(Auth.isAuthenticated()){
    if($auth.getPayload().roles.indexOf("ADMIN") !== -1){
      return true;
    }else{
      return false;
    }
  }else{
    return false;

  }
}

    return Auth;
}
angular.module('videoClubApp')
  .factory('AuthService',AuthService);
