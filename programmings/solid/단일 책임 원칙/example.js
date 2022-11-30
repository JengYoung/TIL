class Cafe {
  constructor({ orderNumber = 0, operationTime, menus, isOpen, orders = [] }) {
    this.state = {
      orderNumber,
      operationTime,
      isOpen,
      orders,
      menus,
    }
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    }
  };

  open() {
    this.setState({ isOpen: true })
  }

  close() {
    this.setState({ isOpen: true })
  }

  orderMenu(menu) {
    if (this.state.menus[menu] === undefined) return;
    this.setState({
      orders: [
        ...this.state.orders,
        { 
          id: this.state.orderNumber, 
          menu,
          price: this.state.menus[menu]
        }
      ],
      orderNumber: this.state.orderNumber + 1
    })
  }

  get totalSales() {
    return this.state.orders.reduce((acc, obj) => acc + obj.price, 0);
  }
}

class StudyCafe extends Cafe {
  constructor({ orderNumber = 0, operationTime, menus, isOpen, orders = [], rooms, reservationList }) {
    super({ orderNumber, operationTime, menus, isOpen, orders });
    this.state = {
      ...this.state,
      rooms, // [{ id: 0, cnt: 4 }]
      reservationList, // [{ id: 0, phoneNumber: '000-xxxx-xxxx', cnt: 4 }]
    }
  }
  
  isPossibleStay(cnt) {
    return this.state.rooms.some(v => v.cnt >= cnt);
  }

  isValidReservation({id, phoneNumber, cnt}) {
    return this.state.reservationList.some(v => v.id === id && v.phoneNumber === phoneNumber, v.cnt === cnt)
  }
}
