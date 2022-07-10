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
      path: "/custom/login",
      handler: "userdata.doLogin",
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
    {
      method: "POST",
      path: "/custom/signup-hacker",
      handler: "userdata.doSignUpHacker",
      config: {
        auth: false,
      },
    },
  ],
};