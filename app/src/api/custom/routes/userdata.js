module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/userdata",
      handler: "userdata.getUserdata",
      config: {
        auth: true,
      },
    },
  ],
};