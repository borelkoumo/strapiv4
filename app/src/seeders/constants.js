let countUsers = 1;
let countRoles = 3;
let countPrograms = 1;
let countSubmissions = 1;

const CONSTANTS = {
  MARCH1ST: {
    USERS: {
      M1_ACCOUNT_MANAGER: {
        ID: countUsers++,
      },
    },
  },
  FACEBOOK: {
    COMPANY: {
      ID: 1,
    },
    USERS: {
      PROGRAM_MANAGER_1: {
        ID: countUsers++,
      },
      PROGRAM_MANAGER_2: {
        ID: countUsers++,
      },
      PROGRAM_SUPER_ADMIN: {
        ID: countUsers++,
      },
    },
    PROGRAMS: {
      P1: {
        ID: countPrograms++,
      },
      P2: {
        ID: countPrograms++,
      },
      P3: {
        ID: countPrograms++,
      },
      P4: {
        ID: countPrograms++,
      },
    },
    SUBMISSIONS: {
      S1: {
        ID: countSubmissions++,
      },
      S2: {
        ID: countSubmissions++,
      },
      S3: {
        ID: countSubmissions++,
      },
      S4: {
        ID: countSubmissions++,
      },
      S5: {
        ID: countSubmissions++,
      },
      S6: {
        ID: countSubmissions++,
      },
      S7: {
        ID: countSubmissions++,
      },
      S8: {
        ID: countSubmissions++,
      },
      S9: {
        ID: countSubmissions++,
      },
      S10: {
        ID: countSubmissions++,
      },
      S11: {
        ID: countSubmissions++,
      },
      S12: {
        ID: countSubmissions++,
      },
    },
  },
  TWITTER: {
    COMPANY: {
      ID: 2,
    },
    USERS: {
      PROGRAM_MANAGER_1: {
        ID: countUsers++,
      },
      PROGRAM_SUPER_ADMIN: {
        ID: countUsers++,
      },
    },
    PROGRAMS: {
      P1: {
        ID: countPrograms++,
      },
      P2: {
        ID: countPrograms++,
      },
      P3: {
        ID: countPrograms++,
      },
    },
    SUBMISSIONS: {
      S1: {
        ID: countSubmissions++,
      },
      S2: {
        ID: countSubmissions++,
      },
      S3: {
        ID: countSubmissions++,
      },
      S4: {
        ID: countSubmissions++,
      },
      S5: {
        ID: countSubmissions++,
      },
      S6: {
        ID: countSubmissions++,
      },
      S7: {
        ID: countSubmissions++,
      },
    },
  },
  ROLES: {
    M1_ACCOUNT_MANAGER: {
      ID: countRoles++,
      ROLE_TYPE: "m1_account_manager",
    },
    HACKER: {
      ID: countRoles++,
      ROLE_TYPE: "hacker",
    },
    PROGRAM_MANAGER: {
      ID: countRoles++,
      ROLE_TYPE: "program_manager",
    },
    PROGRAM_SUPER_ADMIN: {
      ID: countRoles++,
      ROLE_TYPE: "program_super_admin",
    },
  },
  HACKERS: {
    HACKER_1: {
      ID: countUsers++,
    },
    HACKER_2: {
      ID: countUsers++,
    },
    HACKER_3: {
      ID: countUsers++,
    },
    HACKER_4: {
      ID: countUsers++,
    },
  },
};

// Lock the attributes of CONSTANTS.
Object.freeze(CONSTANTS);
module.exports.CONSTANTS = CONSTANTS;
