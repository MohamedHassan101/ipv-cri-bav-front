const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const cannotProceed = require("./controllers/cannotProceed");
const confirmDetails = require("./controllers/confirmDetails");
const abort = require("./controllers/abort");
const { APP } = require("../../lib/config");

module.exports = {
  [`${APP.PATHS.BAV}`]: {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: APP.PATHS.LANDING_PAGE,
  },
  [`${APP.PATHS.LANDING_PAGE}`]: {
    controller: landingPage,
    next: APP.PATHS.ACCOUNT_DETAILS,
  },
  [`${APP.PATHS.ACCOUNT_DETAILS}`]: {
    fields: ["sortCode", "accountNumber"],
    editable: true,
    editBackStep: APP.PATHS.CONFIRM_DETAILS,
    next: APP.PATHS.CONFIRM_DETAILS,
  },
  [`${APP.PATHS.CONFIRM_DETAILS}`]: {
    controller: confirmDetails,
    next: APP.PATHS.DONE,
  },
  [`${APP.PATHS.CANNOT_PROCEED}`]: {
    controller: escapeJourney,
    fields: ["escapeChoice"],
    checkJourney: false,
    next: [
      {
        field: "escapeChoice",
        value: "proveAnotherWay",
        next: APP.PATHS.ABORT
      },
      {
        field: "escapeChoice",
        value: "goBack",
        next: {fn: (req.sessionModel.get("isLanding")), next: APP.PATHS.LANDING_PAGE }
      },
      {
        field: "escapeChoice",
        value: "goBack",
        next: {fn: (req.sessionModel.get("isLanding")), next: APP.PATHS.CANNOT_PROCEED }
      }
    ]
  },
  [`${APP.PATHS.CONFIRM_DETAILS}`]: {
    controller: confirmDetails,
    next: APP.PATHS.DONE,
  },
  [`${APP.PATHS.CANNOT_PROCEED}`]: {
    controller: cannotProceed,
    fields: ["cannotProceedChoice"],
    checkJourney: false,
    next: [
      {
        field: "cannotProceedChoice",
        value: "proveAnotherWay",
        next: APP.PATHS.ABORT,
      },
      {
        field: "cannotProceedChoice",
        value: "goBack",
        next: [
          {
            field: "isLanding",
            value: true,
            next: APP.PATHS.LANDING_PAGE,
          },
          {
            field: "isLanding",
            value: false,
            next: APP.PATHS.CONFIRM_DETAILS,
          },
        ],
      },
    ],
  },
  [`${APP.PATHS.ABORT}`]: {
    entryPoint: true,
    skip: true,
    controller: abort,
  },
};
