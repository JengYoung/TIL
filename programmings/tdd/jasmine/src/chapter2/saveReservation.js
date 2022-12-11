export default function ReservationSaver() {
  this.saveReservation = function(info) {
    try {
      const result = new Promise((resolve, reject) => {
        const randomNum = Math.random();
        const isServerError = randomNum < 0.9; // 약 90% 남짓한 확률로 서버 에러가 발생한다고 가정하자.
        if (isServerError) throw Error('Server Error!');

        resolve(`${info}이(가) 예약 완료되었어요!`);
      })

      return result;
    } catch(e) {
      console.error(e);
    }
  }
}