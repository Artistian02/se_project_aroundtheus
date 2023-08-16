export default class UserInfo {
  constructor(nameElementSelector, jobElementSelector, avatarElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }

  getUserInfo() {
    const userObject = {};
    userObject["profileName"] = this._nameElement.textContent;
    userObject["description"] = this._jobElement.textContent;
    return userObject;
  }

  setUserInfo(nameInfo, jobInfo) {
    this._nameElement.textContent = nameInfo;
    this._jobElement.textContent = jobInfo;
  }

  setUserImage(imageUrl) {
    this._avatarElement = imageUrl;
  }
}
