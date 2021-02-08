/**
 * Таймер
 *
 * @export
 * @class Timer
 */
export default class Timer {

  private speed: number;

  private timerId: ReturnType<typeof setInterval> | null;

  /**
   * Creates an instance of Timer.
   * @param {number} speed=10000 - Интервал
   * @memberof Timer
   */
  constructor(speed = 10000) {
    this.speed = speed;
    this.timerId = null;
  }

  /**
   * Старт таймера
   * @param {function} func - callback Ф-ция
   * @memberof Timer
   */
  start(func: () => void) {
    clearInterval(this.timerId);
    this.timerId = setInterval(func, this.speed);
  }

  /**
   * Стоп таймера
   * @memberof Timer
   */
  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  /**
   * Рестарт таймера
   * @param {boolean} isStart запускать по новой?
   * @param {function} func - callback Ф-ция
   * @memberof Timer
   */
  restart(isStart: boolean, func: () => void) {
    if (isStart) this.start(func);
  }
}
