import React from "react";
import styled from "styled-components/native";

const Text = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 10px;
`;

interface VotesProps {
  votes: number;
  isDark: boolean;
}

const Votes: React.FC<VotesProps> = ({ votes, isDark }) => (
  <Text isDark={isDark}>
    {votes > 0 ? `⭐️ ${votes.toFixed(1)}/10` : `Coming soon`}
  </Text>
);
export default Votes;
