import { Link } from "@reach/router";
import React from "react";
import { Table } from "reactstrap";

const DataFrame = ({ head1, head2, head3, data }) => {
  return (
    <Table hover dark>
      <thead>
        <tr>
          <th>{head1}</th>
          <th>{head2}</th>
          <th>{head3}</th>
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </Table>
  );
};

export default DataFrame;
