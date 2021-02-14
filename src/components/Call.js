import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { apiGet } from "services/apis";
import URLS from "services/urls";
import {
  getCallLog,
  reduceAgents,
  reformatResolution
} from "../helper/aggregation";
import DataFrame from "./DataFrame";
import PlaneLoader from "./PlaneLoader";

const Call = (props) => {
  // State Hooks & vars
  const [logs, setLogs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [resolution, setResolution] = useState([]);
  const callId = props.callId;

  useEffect(() => {
    // API call
    apiGet(URLS.LOGS).then(setLogs);
    apiGet(URLS.AGENTS).then((agents) => setAgents(reduceAgents(agents)));
    apiGet(URLS.RESOLUTION).then((resolution) =>
      setResolution(reformatResolution(resolution))
    );
  }, []);

  var callLog;
  if (
    !_.isEmpty(logs) &&
    !_.isEmpty(resolution) &&
    !_.isEmpty(agents) &&
    callId
  ) {
    callLog = getCallLog(callId, logs, resolution, agents);
  }

  // Check data availability
  if (!_.isEmpty(callLog)) {
    console.log(callLog);
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <DataFrame
              head1="Agent Name	"
              head2="Call date and time	"
              head3="Resolution"
              data={_.map(callLog, (item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.agentName}</td>
                    <td>{item.time}</td>
                    <td>{item.resolution}</td>
                  </tr>
                );
              })}
            />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <PlaneLoader />;
  }
};

export default Call;
