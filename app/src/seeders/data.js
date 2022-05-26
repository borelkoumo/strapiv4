const { faker } = require("@faker-js/faker");
const { CONSTANTS } = require("./constants");

module.exports.roles = [
  {
    id: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ID,
    name: "March 1st Account Manager",
    type: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
    description: "This role is to allow API access to March1st Account Manager",
  },
  {
    id: CONSTANTS.ROLES.HACKER.ID,
    name: "Hacker",
    type: CONSTANTS.ROLES.HACKER.ROLE_TYPE,
    description:
      "This role is to allow API access to users for hackers accounts",
  },
  {
    id: CONSTANTS.ROLES.PROGRAM_MANAGER.ID,
    name: "Company Program Manager",
    type: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
    description:
      "This role is to allow API access to users having a Program Manager role",
  },
  {
    id: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ID,
    name: "Company Super Admin",
    type: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
    description:
      "This role is to allow API access to users having a Super Admin role",
  },
];

module.exports.users = [
  {
    id: CONSTANTS.MARCH1ST.USERS.M1_ACCOUNT_MANAGER.ID,
    username: "m1_account_manager",
    email: "m1_account_manager@march1st.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_1.ID,
    username: "fb_program_manager1",
    email: "fb_program_manager1@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.PROGRAM_MANAGER.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_2.ID,
    username: "fb_program_manager2",
    email: "fb_program_manager2@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.PROGRAM_MANAGER.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.USERS.PROGRAM_SUPER_ADMIN.ID,
    username: "fb_program_super_admin",
    email: "fb_program_super_admin@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ID,
  },
  {
    id: CONSTANTS.TWITTER.USERS.PROGRAM_MANAGER_1.ID,
    username: "tw_program_manager1",
    email: "tw_program_manager1@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.PROGRAM_MANAGER.ID,
  },
  {
    id: CONSTANTS.TWITTER.USERS.PROGRAM_SUPER_ADMIN.ID,
    username: "tw_program_super_admin",
    email: "tw_program_super_admin@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_1.ID,
    username: "hacker1",
    email: "hacker1@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.HACKER.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_2.ID,
    username: "hacker2",
    email: "hacker2@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.HACKER.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_3.ID,
    username: "hacker3",
    email: "hacker3@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.HACKER.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_4.ID,
    username: "hacker4",
    email: "hacker4@gmail.com",
    password: "March1st@2022",
    provider: "local",
    confirmed: true,
    blocked: false,
    role: CONSTANTS.ROLES.HACKER.ID,
  },
];

module.exports.march1stUsers = [
  {
    id: CONSTANTS.MARCH1ST.USERS.M1_ACCOUNT_MANAGER.ID,
    name: "William Divine",
    title: "March 1st Root User",
    phone: "+237.96.69.90.69",
    user: CONSTANTS.MARCH1ST.USERS.M1_ACCOUNT_MANAGER.ID,
  },
];

module.exports.companies = [
  {
    id: CONSTANTS.FACEBOOK.COMPANY.ID,
    company_name: "Facebook France",
    address: "Facebook France – 28 rue de l'amiral Hamelin – 75 116 PARIS",
    company_size: 50000,
    company_logo: faker.image.business(1024, 768, true),
    company_created_by: CONSTANTS.MARCH1ST.USERS.M1_ACCOUNT_MANAGER.ID,
  },
  {
    id: CONSTANTS.TWITTER.COMPANY.ID,
    company_name: "Twitter",
    address: faker.address.streetAddress(true),
    company_size: faker.datatype.number({ min: 10, max: 100 }),
    company_logo: faker.image.business(1024, 768, true),
    company_created_by: CONSTANTS.MARCH1ST.USERS.M1_ACCOUNT_MANAGER.ID,
  },
];

module.exports.companyUsers = [
  {
    id: 1,
    first_name: "FB-PM-1",
    last_name: "LastName",
    title: "Facebook Program Manager 1",
    profile_picture_url: faker.image.avatar(),
    user: CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_1.ID,
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
  },
  {
    id: 2,
    first_name: "FB-PM-2",
    last_name: "LastName",
    title: "Facebook Program Manager 2",
    profile_picture_url: faker.image.avatar(),
    user: CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_2.ID,
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
  },
  {
    id: 3,
    first_name: "FB-SUPER-ADMIN",
    last_name: "LastName",
    title: "Facebook Super Admin",
    profile_picture_url: faker.image.avatar(),
    user: CONSTANTS.FACEBOOK.USERS.PROGRAM_SUPER_ADMIN.ID,
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
  },
  {
    id: 3,
    first_name: "TW-PM-1",
    last_name: "LastName",
    title: "Twitter Program Manager 1",
    profile_picture_url: faker.image.avatar(),
    user: CONSTANTS.TWITTER.USERS.PROGRAM_MANAGER_1.ID,
    company: CONSTANTS.TWITTER.COMPANY.ID,
  },
  {
    id: 4,
    first_name: "TW-SUPER-ADMIN",
    last_name: "LastName",
    title: "Twitter Super Admin",
    profile_picture_url: faker.image.avatar(),
    user: CONSTANTS.TWITTER.USERS.PROGRAM_SUPER_ADMIN.ID,
    company: CONSTANTS.TWITTER.COMPANY.ID,
  },
];

module.exports.hackers = [
  {
    id: CONSTANTS.HACKERS.HACKER_1.ID,
    first_name: "Hacker-1",
    last_name: "LastName",
    phone: faker.phone.phoneNumber(),
    date_of_birth: "1981-01-02", // Date
    adress: faker.address.streetName(),
    country: faker.address.countryCode(),
    city: faker.address.city(),
    nationality: "",
    identity_front: "",
    identity_back: "",
    profile_picture_url: faker.image.avatar(),
    linkedin_url: "",
    website_url: "",
    submissions: null,
    user: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_2.ID,
    first_name: "Hacker-2",
    last_name: "LastName",
    phone: faker.phone.phoneNumber(),
    date_of_birth: "1982-02-01", // Date
    adress: faker.address.streetName(),
    country: faker.address.countryCode(),
    city: faker.address.city(),
    nationality: "",
    identity_front: "",
    identity_back: "",
    profile_picture_url: faker.image.avatar(),
    linkedin_url: "",
    website_url: "",
    submissions: null,
    user: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_3.ID,
    first_name: "Hacker-3",
    last_name: "LastName",
    phone: faker.phone.phoneNumber(),
    date_of_birth: "1983-02-12", // Date
    adress: faker.address.streetName(),
    country: faker.address.countryCode(),
    city: faker.address.city(),
    nationality: "",
    identity_front: "",
    identity_back: "",
    profile_picture_url: faker.image.avatar(),
    linkedin_url: "",
    website_url: "",
    submissions: null,
    user: CONSTANTS.HACKERS.HACKER_3.ID,
  },
  {
    id: CONSTANTS.HACKERS.HACKER_4.ID,
    first_name: "Hacker-4",
    last_name: "LastName",
    phone: faker.phone.phoneNumber(),
    date_of_birth: "1984-05-20", // Date
    adress: faker.address.streetName(),
    country: faker.address.countryCode(),
    city: faker.address.city(),
    nationality: "",
    identity_front: "",
    identity_back: "",
    profile_picture_url: faker.image.avatar(),
    linkedin_url: "",
    website_url: "",
    submissions: null,
    user: CONSTANTS.HACKERS.HACKER_4.ID,
  },
];

module.exports.programs = [
  {
    id: CONSTANTS.FACEBOOK.PROGRAMS.P1.ID,
    program_title: "Facebook Program #1",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "public", // enum: ["private", "public"],
    safe_harbour_type: "full", // enum: ["full", "partial"]
    reward_type: "cash", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 8000, max: 10000 },
      severe: { min: 5000, max: 8000 },
      medium: { min: 1501, max: 5000 },
      low: { min: 100, max: 1000 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [
      CONSTANTS.HACKERS.HACKER_1.ID,
      CONSTANTS.HACKERS.HACKER_2.ID,
      CONSTANTS.HACKERS.HACKER_3.ID,
    ],
    company_users: [
      CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_1,
      CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_2,
      CONSTANTS.FACEBOOK.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
  {
    id: CONSTANTS.FACEBOOK.PROGRAMS.P2.ID,
    program_title: "Facebook Program #2",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "public", // enum: ["private", "public"],
    safe_harbour_type: "full", // enum: ["full", "partial"]
    reward_type: "cash", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 3500, max: 5000 },
      severe: { min: 1500, max: 3000 },
      medium: { min: 110, max: 1000 },
      low: { min: 10, max: 100 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [CONSTANTS.HACKERS.HACKER_1.ID, CONSTANTS.HACKERS.HACKER_2.ID],
    company_users: [
      CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_1,
      CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_2,
      CONSTANTS.FACEBOOK.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
  {
    id: CONSTANTS.FACEBOOK.PROGRAMS.P3.ID,
    program_title: "Facebook Program #3",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "public", // enum: ["private", "public"],
    safe_harbour_type: "partial", // enum: ["full", "partial"]
    reward_type: "points", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 301, max: 400 },
      severe: { min: 201, max: 300 },
      medium: { min: 101, max: 200 },
      low: { min: 10, max: 100 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [CONSTANTS.HACKERS.HACKER_1.ID],
    company_users: [
      CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_1,
      CONSTANTS.FACEBOOK.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
  {
    id: CONSTANTS.FACEBOOK.PROGRAMS.P4.ID,
    program_title: "Facebook Program #4",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "private", // enum: ["private", "public"],
    safe_harbour_type: "full", // enum: ["full", "partial"]
    reward_type: "cash", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 8000, max: 10000 },
      severe: { min: 5000, max: 8000 },
      medium: { min: 1501, max: 5000 },
      low: { min: 100, max: 1000 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [CONSTANTS.HACKERS.HACKER_1.ID, CONSTANTS.HACKERS.HACKER_3.ID],
    company_users: [
      CONSTANTS.FACEBOOK.USERS.PROGRAM_MANAGER_2,
      CONSTANTS.FACEBOOK.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
  {
    id: CONSTANTS.TWITTER.PROGRAMS.P1.ID,
    program_title: "Twitter Program #1",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "public", // enum: ["private", "public"],
    safe_harbour_type: "full", // enum: ["full", "partial"]
    reward_type: "cash", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 8000, max: 10000 },
      severe: { min: 5000, max: 8000 },
      medium: { min: 1501, max: 5000 },
      low: { min: 100, max: 1000 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [CONSTANTS.HACKERS.HACKER_2.ID, CONSTANTS.HACKERS.HACKER_3.ID],
    company_users: [
      CONSTANTS.TWITTER.USERS.PROGRAM_MANAGER_1,
      CONSTANTS.TWITTER.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
  {
    id: CONSTANTS.TWITTER.PROGRAMS.P2.ID,
    program_title: "Twitter Program #2",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "public", // enum: ["private", "public"],
    safe_harbour_type: "partial", // enum: ["full", "partial"]
    reward_type: "points", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 101, max: 200 },
      severe: { min: 21, max: 100 },
      medium: { min: 11, max: 20 },
      low: { min: 5, max: 10 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [CONSTANTS.HACKERS.HACKER_1.ID, CONSTANTS.HACKERS.HACKER_2.ID],
    company_users: [
      CONSTANTS.TWITTER.USERS.PROGRAM_MANAGER_1,
      CONSTANTS.TWITTER.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
  {
    id: CONSTANTS.TWITTER.PROGRAMS.P3.ID,
    program_title: "Twitter Program #3",
    program_description: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_type: "private", // enum: ["private", "public"],
    safe_harbour_type: "full", // enum: ["full", "partial"]
    reward_type: "cash", // enum: ["cash", "points"],
    reward_range: {
      critical: { min: 8000, max: 10000 },
      severe: { min: 5000, max: 8000 },
      medium: { min: 1501, max: 5000 },
      low: { min: 100, max: 1000 },
    },
    program_guidelines_1: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 8 })
    ),
    program_guidelines_2: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    program_scope: faker.datatype.number({ min: 1, max: 5 }),
    legal_terms: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 40 })
    ),
    program_picture_url: faker.image.business(1024, 768, true),
    is_closed: false,
    reward_guidelines: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 10 })
    ),
    submissions: [], // oneToMany
    company: CONSTANTS.FACEBOOK.COMPANY.ID,
    hackers: [CONSTANTS.HACKERS.HACKER_2.ID],
    company_users: [
      CONSTANTS.TWITTER.USERS.PROGRAM_SUPER_ADMIN,
    ]
  },
];

module.exports.submissions = [
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S1.ID,
    submission_title: "Submission #1",
    severity_level: "low", // enum: ["low", "medium", "severe", "critical"],
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    attachment_1: faker.image.animals(640, 480, true),
    attachment_2: faker.image.food(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P1.ID,
    hacker: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S2.ID,
    submission_title: "Submission #2",
    severity_level: "medium", // enum: ["low", "medium", "severe", "critical"],
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: faker.image.food(640, 480, true),
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P1.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S3.ID,
    submission_title: "Submission #3",
    severity_level: "medium", // enum: ["low", "medium", "severe", "critical"],
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 3, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: faker.image.food(640, 480, true),
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P1.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S4.ID,
    submission_title: "Submission #4",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]), // enum: ["low", "medium", "severe", "critical"],
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: faker.image.food(640, 480, true),
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P2.ID,
    hacker: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S5.ID,
    submission_title: "Submission #5",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]), // enum: ["low", "medium", "severe", "critical"],
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: faker.image.food(640, 480, true),
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P2.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S6.ID,
    submission_title: "Submission #6",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]), // enum: ["low", "medium", "severe", "critical"],
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: "",
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P2.ID,
    hacker: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S7.ID,
    submission_title: "Submission #7",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: faker.image.food(640, 480, true),
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P2.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S8.ID,
    submission_title: "Submission #8",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: faker.image.fashion(640, 480, true),
    attachment_4: faker.image.food(640, 480, true),
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P3.ID,
    hacker: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S9.ID,
    submission_title: "Submission #9",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P3.ID,
    hacker: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S10.ID,
    submission_title: "Submission #10",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P4.ID,
    hacker: CONSTANTS.HACKERS.HACKER_3.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S11.ID,
    submission_title: "Submission #11",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P4.ID,
    hacker: CONSTANTS.HACKERS.HACKER_3.ID,
  },
  {
    id: CONSTANTS.FACEBOOK.SUBMISSIONS.S12.ID,
    submission_title: "Submission #12",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.FACEBOOK.PROGRAMS.P4.ID,
    hacker: CONSTANTS.HACKERS.HACKER_3.ID,
  },
  {
    id: CONSTANTS.TWITTER.SUBMISSIONS.S1.ID,
    submission_title: "Twitter submission #1",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.TWITTER.PROGRAMS.P1.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.TWITTER.SUBMISSIONS.S2.ID,
    submission_title: "Twitter submission #2",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.TWITTER.PROGRAMS.P1.ID,
    hacker: CONSTANTS.HACKERS.HACKER_3.ID,
  },
  {
    id: CONSTANTS.TWITTER.SUBMISSIONS.S3.ID,
    submission_title: "Twitter submission #3",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.TWITTER.PROGRAMS.P1.ID,
    hacker: CONSTANTS.HACKERS.HACKER_3.ID,
  },
  {
    id: CONSTANTS.TWITTER.SUBMISSIONS.S4.ID,
    submission_title: "Twitter submission #4",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.TWITTER.PROGRAMS.P2.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
  },
  {
    id: CONSTANTS.TWITTER.SUBMISSIONS.S5.ID,
    submission_title: "Twitter submission #5",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.TWITTER.PROGRAMS.P2.ID,
    hacker: CONSTANTS.HACKERS.HACKER_1.ID,
  },
  {
    id: CONSTANTS.TWITTER.SUBMISSIONS.S6.ID,
    submission_title: "Twitter submission #6",
    severity_level: faker.helpers.arrayElement([
      "low",
      "medium",
      "severe",
      "critical",
    ]),
    submission_target: faker.internet.url(),
    submission_text: faker.lorem.paragraphs(
      faker.datatype.number({ min: 1, max: 5 })
    ),
    attachment_1: faker.image.food(640, 480, true),
    attachment_2: faker.image.animals(640, 480, true),
    attachment_3: "",
    attachment_4: "",
    attachment_5: "",
    submission_statuses: [], // relation: "oneToMany", target: "api::submission-status.submission-status"
    program: CONSTANTS.TWITTER.PROGRAMS.P3.ID,
    hacker: CONSTANTS.HACKERS.HACKER_2.ID,
    // publishedAt: "2022-05-21T05:55:25.912Z",
    // _publicationState: 'published',
  },
];

let countSubmissionStatus = 1;
const basic = {
  status: "new", // enum: ["new", "triaged", "accepted_unresolved", "accepted_resolved", "client_returned_for_review", "m1_returned_for_review", "rejected", ],
  status_title: "New submission", // [New submission, Submission passed triage, Accepted but still unresolved, Accepted and resolved, Client returned for review, March1st returned for review, Rejected]
  comment: "",
};

module.exports.submissionStatuses = [
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S1.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S2.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S3.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S4.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S5.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S6.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S7.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S8.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S9.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S10.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S11.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.FACEBOOK.SUBMISSIONS.S12.ID,
  },

  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.TWITTER.SUBMISSIONS.S1.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.TWITTER.SUBMISSIONS.S2.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic, comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.TWITTER.SUBMISSIONS.S3.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.TWITTER.SUBMISSIONS.S4.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.TWITTER.SUBMISSIONS.S5.ID,
  },
  {
    id: countSubmissionStatus++,
    ...basic,
    comment: faker.lorem.sentence(faker.datatype.number({ min: 5, max: 10 })),
    submission: CONSTANTS.TWITTER.SUBMISSIONS.S6.ID,
  },
];
