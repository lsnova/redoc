import * as React from 'react';

import { StyledPre } from '../../common-elements/samples';
import { ExampleModel, OperationModel } from '../../services/models';
import { ExampleValue } from './ExampleValue';
import { useExternalExample } from './exernalExampleHook';
import { useStore } from '../StoreBuilder';
import styled from '../../styled-components';

export interface ExampleProps {
  example: ExampleModel;
  mimeType: string;
}

export interface ScrollToExampleProps {
  operationRef: string;
}

export function Example({ example, mimeType }: Readonly<ExampleProps>) {
  if (example.value === undefined && example.externalValueUrl) {
    return <ExternalExample example={example} mimeType={mimeType} />;
  } else if (example.operationRef) {
    return <ScrollToExample operationRef={example.operationRef}></ScrollToExample>;
  } else {
    return <ExampleValue value={example.value} mimeType={mimeType} />;
  }
}

export function ScrollToExample({ operationRef }: Readonly<ScrollToExampleProps>) {
  const store = useStore();
  const operation = store?.menu?.flatItems
    .filter(e => e instanceof OperationModel)
    .find(e => (e as any).operationId === operationRef);
  if (operation === null) {
    return null;
  }
  const onClick = () => {
    store?.menu?.activateAndScroll(operation);
  };

  return <ScrollButton onClick={onClick}>check examples here</ScrollButton>;
}

export const ScrollButton = styled.button`
  border: 0;
  padding: 5px 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: 2px;
  cursor: pointer;
`;

export function ExternalExample({ example, mimeType }: Readonly<ExampleProps>) {
  const value = useExternalExample(example, mimeType);

  if (value === undefined) {
    return <span>Loading...</span>;
  }

  if (value instanceof Error) {
    return (
      <StyledPre>
        Error loading external example: <br />
        <a
          className={'token string'}
          href={example.externalValueUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {example.externalValueUrl}
        </a>
      </StyledPre>
    );
  }

  return <ExampleValue value={value} mimeType={mimeType} />;
}
