'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the prime ' + chalk.red('generator-polymer-init-firebase-auth-roles') + ' generator!'
    ));

    const prompts = [
      {
        name: 'appName',
        type: 'input',
        message: 'Name of the application',
        default: this.appname
      },
      {
        name: 'appDescription',
        type: 'input',
        message: 'Brief description of the application',
        default: 'Brief description of the application'
      },
      {
        name: 'firebaseApiKey',
        type: 'input',
        message: 'Firebase Api Key',
        default: '~~firebaseApiKey~'
      },
      {
        name: 'firebaseProjectId',
        type: 'input',
        message: 'Firebase Project Id',
        default: '~~firebaseProjectId~'
      },
      {
        name: 'firebaseMessagingSenderId',
        type: 'input',
        message: 'Firebase Messaging Sender Id',
        default: '~~firebaseMessagingSenderId~'
      }
    ];

    return this.prompt(prompts).then(props => {
      props.appNameDash = changeCase.paramCase(props.appName);
      props.appNameCamel = changeCase.pascalCase(props.appName);
      // To access props later use this.props.appName;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('functions/*'),
      this.destinationPath('functions/')
    );

    this.fs.copy(
      this.templatePath('images/**/*'),
      this.destinationPath('images/')
    );

    this.fs.copyTpl(
      this.templatePath('src/_appShell.html'),
      this.destinationPath(`src/${this.props.appNameDash}.html`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src') + '/!(_)*',
      this.destinationPath('src/'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('test/*'),
      this.destinationPath('test/'),
      this.props
    );

    this.fs.copy(
      this.templatePath('test/.eslintrc.json'),
      this.destinationPath('test/.eslintrc.json')
    );

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_firebase'),
      this.destinationPath('.firebase'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath() + '/!(_)*',
      this.destinationPath(),
      this.props
    );
  }

  install() {
    this.installDependencies();
    this.spawnCommand('npm', ['install'], {cwd: 'functions'});
  }
};
