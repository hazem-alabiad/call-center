import { Link } from "@reach/router";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import {
  groupByNumber,
  mergeLogWithAgents,
  reduceAgents,
  renderLogs
} from "../helper/aggregation";
import { apiGet } from "../services/apis";
import URLS from "../services/urls";
import DataFrame from "./DataFrame";
import PlaneLoader from "./PlaneLoader";

const Home = () => {
  // State Hooks
  const [logs, setLogs] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // API call
    apiGet(URLS.LOGS).then((logs) => setLogs(groupByNumber(logs)));
    apiGet(URLS.AGENTS).then((agents) => setAgents(reduceAgents(agents)));
  }, []);

  var logsToBeRendered;
  if (!_.isEmpty(agents) && !_.isEmpty(logs))
    logsToBeRendered = renderLogs(mergeLogWithAgents(logs, agents), agents);

  // Check data availability
  if (!_.isEmpty(logsToBeRendered)) {
    console.log(mergeLogWithAgents(logs, agents));
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <DataFrame
              head1="Phone number"
              head2="Number of calls"
              head3="Last call details"
              data={logsToBeRendered.map((log, index) => {
                let { lastCall } = log;
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/call/${log.number}`}>{log.number}</Link>
                    </td>
                    <td>{log.numOfCalls}</td>
                    <td>
                      <Link to={`/agent/${lastCall.agentId}`}>
                        {lastCall.agentName}
                      </Link>
                      {` / ${lastCall.time}`}
                    </td>
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

export default Home;
