class Form {
  // forms: { key: string; value: string; validate: () => boolean, message: string; }[]
  constructor(forms) {
    this.state = {
      forms,
      errors: []
    }
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    }
  }

  sendSuccessMessage() {
    console.log('Success! 🌈')
  }

  sendErrorMessage() {
    console.error(this.state.errors.join('\n'));
    this.cleanErrorMessage();
  }

  async submitWithAPI(checkCallback, route, payload) {
    try {
      if (this.allValid) {
        const res = await checkCallback(route, payload);
        
        return res;
      }
    } catch(e) {
      this.sendErrorMessage()
    }
  }

  cleanErrorMessage() {
    this.setState({
      errors: []
    })
  }

  async submit(successMessage) {
    try {
      if (this.allValid) {
        this.sendSuccessMessage(successMessage)
      }
    } catch(e) {
      this.sendErrorMessage();
    }
  }

  get allValid() {
    return Object.keys(this.state.forms).every(({ value, validate, message }) => {
      const res = validate(value);
      if (!res) this.state.errors.push(message);

      return res;
    }) 
  }
}