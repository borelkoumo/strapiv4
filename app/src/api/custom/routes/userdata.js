module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/userdata",
      handler: "userdata.getUserdata",
      // config: {
      //   auth: true,
      // },
    },
    {
      method: "POST",
      path: "/custom/login-client",
      handler: "userdata.doLoginClient",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/custom/signup-client",
      handler: "userdata.doSignUpClient",
      config: {
        auth: false,
      },
    },
  ],
};