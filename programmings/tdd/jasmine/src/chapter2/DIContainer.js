export default function DIContainer () {
  this.registrations = [];
}

DIContainer.prototype.get = function (name) {
  const self = this;
  const registration = this.registrations[name];
  const dependencies = [];
  
  if (registration === undefined) {
    return undefined
  }

  registration.dependencies.forEach((dependencyName) => {
    const dependency = self.get(dependencyName);
    dependencies.push(dependency)
  })

  return registration.func.apply(undefined, dependencies);
}

DIContainer.prototype.messages = {
  registerRequiresArgs: "이 생성자 함수는 인자가 3개 있어야 합니다: " + '문자열, 문자열 배열, 함수'
}

DIContainer.prototype.register = function (name, dependencies, func) {
  if (typeof name !== 'string' || !Array.isArray(dependencies) || typeof func !== 'function') {
    throw new Error(this.messages.registerRequiresArgs);
  }

  for (let ix = 0; ix < dependencies.length; ix += 1) {
    if (typeof dependencies[ix] !== 'string') {
      throw new Error(this.messages.registerRequiresArgs);
    }
  }

  this.registrations[name] = { dependencies, func };
}

