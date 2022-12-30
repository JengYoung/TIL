import { ReliableJavaScript } from "./ReliableJavaScript.js";
import { Conference } from "./index.js";

export function ConferenceContractRegistry() {
  'use strict';

  var registry = new ReliableJavaScript.ContractRegistry();

  var contractModules = [
      Conference.observerContracts(),
      Conference.recentRegistrationsServiceContracts(),
        // 여기에 모듈을 추가한다.
    ];

  registry.defineMultiple(ReliableJavaScript.StandardContracts);

  contractModules.forEach(function(m) {
    registry.defineMultiple(m.getContracts());
  });

  contractModules.forEach(function(m) {
    m.attachValidators(registry);
  });

  return registry;
}