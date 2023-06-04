import QRCodeReact from 'qrcode.react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import React from 'react';

export const QRCodeWrapper = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 2px;
  border: 5px solid;
  border-color: #40787a;
  border-radius: 10px;
  width: 300px;

  & > svg {
    display: block;
    height: auto; /* reset height */
    width: 100%; /* reset width */
  }
`;

type Props = {
  value: string;
}
export const QRCode = ({ value }: Props) => {
  return (
    <QRCodeWrapper>
      <QRCodeReact renderAs='svg' value={value} includeMargin />
    </QRCodeWrapper>
  );
};
