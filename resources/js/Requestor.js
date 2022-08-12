import axios from 'axios';
import { hexToHsl, verifyHex } from './colours';
import { Helpers } from './helpers';

export class OoxiosRequestControl {
  constructor(configData = {}) {
    const baseColor = verifyHex(configData?.progressBar?.color) ?? '#cc24cc';
    // Create config from supplied keys or defaults
    const config = {
      name: configData?.name ?? 'ooxios',
      timeout: {
        get: configData?.timeout?.get > 0 ? configData.timeout.get : 3000,
        put: configData?.timeout?.put > 0 ? configData.timeout.put : 6000,
        post: configData?.timeout?.post > 0 ? configData.timeout.post : 6000,
        delete: configData?.timeout?.delete > 0 ? configData.timeout.delete : 6000
      },
      progressBar: {
        enabled: configData?.progressBar?.enabled ?? true,
        selector: configData?.progressBar?.selector ?? '#progress-bar',
        useStyles: configData?.progressBar?.useStyles ?? true,
        color: hexToHsl(baseColor),
        width: configData?.progressBar?.width ?? '0.5vh'
      }
    };
    // Set up static classes
    ProgressBar.init(config.progressBar);
    Requestor.progressBar = ProgressBar.progressBar;
    Requestor.timeouts = config.timeout;
    // Set up wrapper fields and methods
    this.name = config.name;
    this.getRequest = async (requestData) => Requestor.getRequest(requestData);
    this.postRequest = async (requestData) => Requestor.postRequest(requestData);
    this.putRequest = async (requestData) => Requestor.putRequest(requestData);
    this.deleteRequest = async (requestData) => Requestor.deleteRequest(requestData);
  }

}

class ProgressBar {
  constructor() { throw new Error(`${this.constructor.name} cannot be instatiated.` )}

  static #progressBar = null;
  static get progressBar() { return this.#progressBar }
  static set progressBar(element) { this.#progressBar = element }
  
  static init({ selector, useStyles, color, width }) {
    // console.log(`Initialising progress bar`, selector, color, width);
    // Set up the progress bar element
    this.#progressBar = document.querySelector(selector);
    if (!this.#progressBar) {
      const el = document.createElement('div');
      const selectors = Helpers.splitSelector(selector);
      el.id = selectors?.id ?? 'progress-bar';
      el.classList.add(...selectors.classes);
      document.body.prepend(el);
      this.#progressBar = el;
    }
    // Set up styles
    if (useStyles) this.#setupStyles(color, width);
    // Set up event listeners
    if (this.#progressBar) {
      this.#progressBar.addEventListener('startProgressBar', this.#startBar);
      this.#progressBar.addEventListener('stopProgressBar', this.#stopBar);
      this.#progressBar.addEventListener('updateProgressBar', this.#updateBar);
    }
  }
  static #startBar() {
    this.style.width = `0vw`;
    this.style.opacity = '1';
  }
  static #stopBar() {
    this.style.width = `100vw`;
    setTimeout(() => this.style.opacity = 0, 250);
    setTimeout(() => this.style.width = `0vw`, 500);
  }
  static #updateBar({ detail }) {
    this.style.width = `${detail}vw`;
  }

  static #setupStyles(color, width) {
    const mainColor = `hsla(${color[0]}, ${color[1]}%, ${color[2]}%, 100%)`,
      fadedColor = `hsla(${color[0]}, ${color[1]}%, ${color[2]}%, 40%)`,
      background = `linear-gradient(to bottom,
      ${fadedColor},
      ${mainColor} 40% 60%,
      ${fadedColor}
      )`,
      s = this.#progressBar.style;
    s.position = 'absolute';
    s.top = '0%';
    s.left = '0%';
    s['z-index'] = 1000;
    s.backgroundImage = background;
    s.height = width ?? '0.5vh';
    s.transition = `width 0.5s, opacity 0.3s 0.2s`;
    s.width = '0vw';
  } 
}

class Requestor {
  constructor() { throw new Error(`${this.constructor.name} cannot be instantiated.`) }

  static #progressBar = null;

  static #timeouts = {
    get: 5000,
    put: 8000,
    post: 8000,
    delete: 8000
  };

  static get timeouts() { return this.#timeouts }
  static set timeouts(timeoutConfig) {
    for (const key in this.#timeouts) {
      if (timeoutConfig[key] > 0) this.#timeouts[key] = timeoutConfig[key];
    }
  }

  static get progressBar() { return this.#progressBar }
  static set progressBar(element) { this.#progressBar = element }

  static #buildRequest(requestData, reqMethod) {
    if (typeof(requestData) === 'object') {
      const data = { ...requestData, method: reqMethod, timeout: this.#timeouts[reqMethod] ?? 0 }
      return new Request(data);
    }
    else return null;
  }

  static #attachProgressTracker(request, progressPercentage) {
    const progressType = /get/i.test(request.method) ? 'onDownloadProgress' : 'onUploadProgress';
    request[progressType] = async (ProgressEvent) => {
      // console.info(ProgressEvent.loaded, ProgressEvent.total);
      let percentageProgress = ((ProgressEvent.loaded/ProgressEvent.total||1)*100).toFixed(1);
      // console.log(percentageProgress);
      progressPercentage.value = percentageProgress;
      // console.log(`GET progress => ${progress}`);
    }
  }

  static async #sendRequest(request) {
    // Progress bar calculations and events
    const percentage = { timer: { value: 0 }, progress: { value: 0 } };
    if (request.useProgress && this.#progressBar) {
      this.#attachProgressTracker(request, percentage.progress);
      this.#startTimer(percentage.timer, request.timeout);
      this.#transmitProgress(percentage);
    }
    else console.warn(`${this.constructor.name}: unable to use Progress Bar, bad receiver?`, this.#progressBar);
    const response = await axios(request)
      .catch(e => e);
      this.#progressBar?.dispatchEvent(new CustomEvent('stopProgressBar'));
    return { ...response, page: request.page };
  }

  // Pass in an object with a { value: 0 } key to receive reactive timer from method
  static async #startTimer(timerPercentage = { value: 0 }, timeout=5000) {
    const start = Date.now();
    const timerInterval = setInterval(() => {
      if (timerPercentage.value >= 100) clearInterval(timerInterval);
      else timerPercentage.value = (((Date.now()-start)/timeout)*100).toFixed(1);
    }, 50);
  }

  // Transmit updates to #progress-bar element on page
  static async #transmitProgress(percentage) {
    this.#progressBar.dispatchEvent(new CustomEvent('startProgressBar'));
    const transmitProgress = setInterval(() => {
      // console.log()
      const currentProgress = Math.max(percentage.timer.value, percentage.progress.value);
      if (currentProgress >= 100) clearInterval(transmitProgress);
      else this.#progressBar.dispatchEvent(new CustomEvent('updateProgressBar', { detail: currentProgress }));
    }, 50);
  }

  static async getRequest(requestData = {}) {
    const request = this.#buildRequest(requestData, 'get');
    if (request?.url) return await this.#sendRequest(request);
    else return new Error(`${this.constructor.name}: Bad data supplied to Request builder`, requestData);
  }

  static async postRequest(requestData = {}) {
    const request = this.#buildRequest(requestData, 'post');
    if (request?.url) return await this.#sendRequest(request);
    else return new Error(`${this.constructor.name}: Bad data supplied to Request builder`, requestData);
  }

  static async putRequest(requestData = {}) {
    const request = this.#buildRequest(requestData, 'put');
    if (request?.url) return await this.#sendRequest(request);
    else return new Error(`${this.constructor.name}: Bad data supplied to Request builder`, requestData);
  }

  static async deleteRequest(requestData = {}) {
    const request = this.#buildRequest(requestData, 'delete');
    if (request?.url) return await this.#sendRequest(request);
    else return new Error(`${this.constructor.name}: Bad data supplied to Request builder`, requestData);
  }

}

class Request {
  constructor(requestData) {
    const validData = Request.validateRequestData(requestData);
    if (validData.url && validData.method) {
      Object.assign(this, validData);
    }
  }

  static validateRequestData(requestData={}) {
    if (!requestData || typeof(requestData) !== 'object') return null;
    const output = {
      url: requestData.url || null,
      page: requestData.page || '',
      method: requestData.method ? /^(get|put|post|delete)$/i.test(requestData.method) ? requestData.method : null : 'get',
      timeout: parseInt(requestData.timeout) > 0 ? requestData.timeout : null,
      useProgress: requestData.progress == null ? true : !!requestData.progress
    };
    if (!output.url || !output.method) return null;
    else return output;
  }
}