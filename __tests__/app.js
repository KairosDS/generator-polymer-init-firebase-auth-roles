'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-polymer-init-firebase-auth-roles:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appName: 'My App',
        appDescription: 'App short description',
        firebaseApiKey: '~~firebaseApiKey~~',
        firebaseProjectId: '~~firebaseProjectId~~',
        firebaseMessagingSenderId: '~~firebaseMessagingSenderId~~'
      });
  });

  it('creates files', () => {
    assert.file([
      '.gitignore',
      '.firebase',
      'bower.json',
      'database.rules.json',
      'firebase.json',
      'index.html',
      'manifest.json',
      'package.json',
      'polymer.json',
      'README.md',
      'service-worker.js',
      'sw-precache-config.js',
      'functions/index.js',
      'functions/package.json',
      'images/favicon.ico',
      'images/manifest/icon-48x48.png',
      'images/manifest/icon-72x72.png',
      'images/manifest/icon-96x96.png',
      'images/manifest/icon-144x144.png',
      'images/manifest/icon-192x192.png',
      'images/manifest/icon-512x512.png',
      'src/my-app.html',
      'src/my-icons.html',
      'src/shared-styles.html',
      'src/view-404.html',
      'src/view-admin.html',
      'src/view-home.html',
      'src/view-user.html'
    ]);
  });

  it('.firebase', () => {
    assert.fileContent([
      ['.firebase', /"default": "~~firebaseProjectId~~"/]
    ]);
  });

  it('bower.json', () => {
    assert.fileContent([
      ['bower.json', /"name": "my-app"/]
    ]);
  });

  it('index.html', () => {
    assert.fileContent([
      ['index.html', /<title>My App<\/title>/],
      ['index.html', /<meta name="description" content="App short description">/],
      ['index.html', /<meta name="application-name" content="My App">/],
      ['index.html', /<meta name="apple-mobile-web-app-title" content="My App">/]
    ]);
  });

  it('manifest.json', () => {
    assert.fileContent([
      ['manifest.json', /"name": "My App"/],
      ['manifest.json', /"short_name": "App short description"/]
    ]);
  });

  it('package.json', () => {
    assert.fileContent([
      ['package.json', /"name": "my-app"/]
    ]);
  });

  it('polymer.json', () => {
    assert.fileContent([
      ['polymer.json', /"shell": "src\/my-app\.html"/]
    ]);
  });

  it('README.md', () => {
    assert.fileContent([
      ['README.md', /# My App/],
      ['README.md', /App short description/]
    ]);
  });
});
