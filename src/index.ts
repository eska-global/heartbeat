import * as schedule from 'node-schedule';
import NodeService from './service/NodeService';

const rule = new schedule.RecurrenceRule();
rule.second = 1;

schedule.scheduleJob(rule, () => {
    NodeService.update();
});
