module.exports = class UserDto {
  email;
  id;
  isActivated;
  name;
  phone;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.phone = model.phone;
  }
};
