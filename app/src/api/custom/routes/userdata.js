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
  ],
};