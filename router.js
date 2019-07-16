import Vue from "vue";
import Router from "vue-router";

import LicenseRegistry from "~/pages/LicenseRegistry/LicenseRegistry";
import Statement from "~/pages/LicenseRegistry/Statement/Statement";
import StatementMain from "~/pages/LicenseRegistry/Statement/Main";
import StatementDocs from "~/pages/LicenseRegistry/Statement/Docs";
import StatementMV from "~/pages/LicenseRegistry/Statement/MV";
import StatementSuspension from "~/pages/LicenseRegistry/Statement/Suspension";
import StatementReviews from "~/pages/LicenseRegistry/Statement/Reviews";
import StatementDecisions from "~/pages/LicenseRegistry/Statement/Decisions";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: LicenseRegistry
      },
      {
        path: "/statement",
        component: Statement,
        children: [
          {
            path: "",
            component: StatementMain
          },
          {
            path: "docs",
            component: StatementDocs
          },
          {
            path: "mv",
            component: StatementMV
          },
          {
            path: "suspension",
            component: StatementSuspension
          },
          {
            path: "reviews",
            component: StatementReviews
          },
          {
            path: "decisions",
            component: StatementDecisions
          }
        ]
      }
    ]
  });
}
