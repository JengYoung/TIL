import { Conference } from "./Conference.js";
import { ReliableJavaScript } from "./ReliableJavaScript.js";
import "./attendeeContracts.js"

Conference.ConferenceContractRegistry = (function() {
  const registry = new ReliableJavaScript.ContractRegistry();

  const contractModules = [
    Conference.attendeeContracts(),
  ]

  registry.defineMultiple(ReliableJavaScript.StandardContracts);

  contractModules.forEach(m => {
    registry.defineMultiple(m.getContracts());
  })

  contractModules.forEach(m => {
    m.attachValidators(registry);
  })
})();