import styled from "styled-components";

function FooterComponent() {
  return (
    <Container>
      <Text>
        Kaldi Company Ltd. "Kaldi Company" is a registered trademark. © Kaldi Company 2023. All rights reserved. Kaldicoin is issued by Kaldi Company Ltd, a regulated and authorised issuer of digital
        currency under the Financial Conduct Authority (FCA) in the Isle of Man. Registered number 020415V.
        <br />
        <br />
        Kaldi Foundation is registered in Switzerland and supervised by the Federal Supervisory Authority of Foundations (FSAF). © Kaldi Foundation 2023
        <br />
      </Text>
    </Container>
  );
}
const Container = styled.div`
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #1e1f28 !important;
  padding: 48px 60px;
  font: 500 16px/24px Neue Haas Grotesk Display Pro, -apple-system, Roboto, Helvetica, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Text = styled.div`
  padding: 10px;
  color: #808191;
  background-color: #1e1f28 !important;
`;

export default FooterComponent;
