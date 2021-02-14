import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { apiGet } from "services/apis";
import URLS from "services/urls";
import { getAgentLog, reformatResolution } from "../helper/aggregation";
import DataFrame from "./DataFrame";
import PlaneLoader from "./PlaneLoader";

const Agent = (props) => {
  // State Hooks & vars
  const [logs, setLogs] = useState([]);
  const [resolution, setResolution] = useState([]);
  const agentId = props.agentId;

  useEffect(() => {
    // API call
    apiGet(URLS.LOGS).then(setLogs);
    apiGet(URLS.RESOLUTION).then((resolution) =>
      setResolution(reformatResolution(resolution))
    );
  }, []);

  var agentLog;
  if (!_.isEmpty(logs) && !_.isEmpty(resolution) && agentId) {
    agentLog = getAgentLog(agentId, logs, resolution);
  }

  // Check data availability
  if (!_.isEmpty(agentLog)) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <DataFrame
              head1="Phone number"
              head2="Call date and time	"
              head3="Resolution"
              data={_.map(agentLog, (item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.number}</td>
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

export default Agent;
