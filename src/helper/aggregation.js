var _ = require("lodash");

export const groupByNumber = (logs) => {
  return logs.reduce((res, log) => {
    if (log.number in res) {
      // if phone number exists
      res[log.number] = [...res[log.number], { ...log }];
    } else {
      // if phone number does not exist
      res[log.number] = [{ ...log }];
    }
    return res;
  }, {});
};

export const reduceAgents = (agents) => {
  return agents.reduce((res, agent) => {
    let key = agent.identifier;
    res[key] = _.omit({ ...agent }, ["identifier"]);
    return res;
  }, {});
};

export const mergeLogWithAgents = (logs: Object, agents: Object) => {
  var mergedLogsAgents = {};
  _.forOwn(logs, (agentLogs, agentNum) => {
    let id = agentLogs[0].agentIdentifier;
    mergedLogsAgents[agentNum] = {};
    mergedLogsAgents[agentNum].agent = agents[id];
    mergedLogsAgents[agentNum].logs = agentLogs;
  });
  return mergedLogsAgents;
};

export const renderLogs = (mergedLogsAgents, agents) => {
  var agentsLogs = [];
  _.forOwn(mergedLogsAgents, (value, agentNum) => {
    let log = {};
    log.number = agentNum;
    let callNum = value.logs.length;
    log.numOfCalls = callNum === 1 ? `${callNum} call` : `${callNum} calls`;
    let lastCall = _.last(value.logs);
    let dt = new Date(lastCall.dateTime);
    log.lastCall = {};
    log.lastCall.time = `${dt.getUTCHours()}:${dt.getUTCMinutes()}`;
    log.lastCall.agentId = lastCall.agentIdentifier;
    let agent = agents[lastCall.agentIdentifier];
    log.lastCall.agentName = `${agent.firstName} ${agent.lastName}`;
    agentsLogs.push(log);
  });
  return agentsLogs;
};

export const reformatResolution = (resolution: Array) => {
  var resolutionObj = {};
  _.forEach(resolution, (item) => {
    resolutionObj[item.identifier] = item.resolution;
  });
  return resolutionObj;
};

export const getAgentLog = (
  agentId: String,
  logs: Array,
  resolution: Array
) => {
  var agentLog = [];
  _.forEach(logs, (log) => {
    if (log.agentIdentifier === agentId) {
      let dt = new Date(log.dateTime);
      agentLog.push({
        number: log.number,
        resolution: resolution[log.identifier],
        time: `${dt.getUTCFullYear()}/${dt.getUTCMonth()}/${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`,
      });
    }
  });
  return agentLog;
};

export const getCallLog = (
  callId: String,
  logs: Array,
  resolution: Array,
  agents: Object
) => {
  var callLog = [];
  _.forEach(logs, (log) => {
    if (log.number === callId) {
      let dt = new Date(log.dateTime);
      let { firstName, lastName } = agents[log.agentIdentifier];
      callLog.push({
        agentName: `${firstName} ${lastName}`,
        resolution: resolution[log.identifier],
        time: `${dt.getUTCFullYear()}/${dt.getUTCMonth()}/${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`,
      });
    }
  });
  return callLog;
};
