import { Conference } from "./Conference.js";

Conference.VendorPresentation = function(title, presenter, vendor, product) {
  'use strict';
  if(!(this instanceof Conference.VendorPresentation)) {
    throw new Error(Conference.VendorPresentation.messages.mustUseNew);
  }

  if (!vendor) {
    throw new Error(Conference.VendorPresentation.messages.vendorRequired);
  }

  Conference.Presentation.call(this, title, presenter);
  this.vendor = vendor;
  this.product = product;

  Conference.VendorPresentation.prototype = Object.create(Conference.Presentation.prototype);

  Conference.VendorPresentation.messages = {
    mustUseNew: 'Presentation은 반드시 "new"로 생성해야 한다.',
    vendorRequired: 'vendor은 필수 입력 항목이다.'
  }
}