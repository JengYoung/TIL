
class Printer {
  cosntructor(msg) {
    this.msg = msg;
  }

  print() {
    console.log(this.msg)
  }

  alertMessage() {
    alert(this.msg);
  }
}

class MultipleMessagePrinter extends Printer {
  constructor(msg) {
    super(msg);
  }

  print() {
    if (this.msg?.constructor?.name === 'Array') {
      alert(this.msg.forEach(m => alert(m)));
      return;
    }

    super.print()
  }

  alertMessage() {
    if (this.msg?.constructor?.name === 'Array') {
      alert(this.msg.join('\n'));
      return;
    }

    super.alertMessage()
  }
}