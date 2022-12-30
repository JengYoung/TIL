// AOP 라이브러리(2장)
import Aop from './Aop.js';
import { attendee } from './attendee.js';
import { ConferenceContractRegistry } from './conferenceContractRegistry.js';
import { observerContracts } from './observerContracts.js';
import { recentRegistrationsService } from './recentRegistrationsService.js';
import { recentRegistrationsServiceContracts } from './recentRegistrationsServiceContracts.js';
import { totalAttendeeCount } from './totalAttendeeCount.js';

export const Conference = {};

Conference.observerContracts = observerContracts;

// 레지스트리 없는 attendee.js 원본
Conference.attendee = attendee;

Conference.recentRegistrationsService = recentRegistrationsService;

Conference.recentRegistrationsServiceContracts = recentRegistrationsServiceContracts;

//싱글톤으로 구현한 컨퍼런스 애플리케이션의 ContractRegistry
// const conferenceContractRegistry = ConferenceContractRegistry;

Conference.ConferenceContractRegistry = ConferenceContractRegistry();


Conference.totalAttendeeCount = totalAttendeeCount