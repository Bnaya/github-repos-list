System.config({
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "utils/*": "src/utils/*.js",
    "ReposList/*": "src/ReposList/*.js",
    "material-start/*": "src/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.0",
    "angular-animate": "github:angular/bower-angular-animate@1.5.0",
    "angular-aria": "github:angular/bower-angular-aria@1.5.0",
    "angular-material": "github:angular/bower-material@master",
    "angular-messages": "github:angular/bower-angular-messages@1.5.0",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.0",
    "css": "github:systemjs/plugin-css@0.1.20",
    "json": "github:systemjs/plugin-json@0.1.0",
    "ng-template": "npm:plugin-ng-template@0.1.1",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "github:angular/bower-angular-animate@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.0"
    },
    "github:angular/bower-angular-aria@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.0"
    },
    "github:angular/bower-angular-messages@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.0"
    },
    "github:angular/bower-angular-mocks@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.0"
    },
    "github:angular/bower-material@master": {
      "angular": "github:angular/bower-angular@1.5.0",
      "angular-animate": "github:angular/bower-angular-animate@1.5.0",
      "angular-aria": "github:angular/bower-angular-aria@1.5.0",
      "angular-messages": "github:angular/bower-angular-messages@1.5.0",
      "css": "github:systemjs/plugin-css@0.1.20"
    }
  }
});
