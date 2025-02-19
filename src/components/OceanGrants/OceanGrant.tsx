import { observer } from 'mobx-react';
import * as React from 'react';
import { LabelsConfig } from '../../services';
import {
  GrantHeader,
  GrantHeaderColumn,
  SecuritiesColumn,
  SecurityDetailsStyle,
  Wrap,
} from '../SecurityRequirement/styled.elements';
import { l } from '../../services/Labels';
import { StyledMarkdownBlock } from '../Markdown/styled.elements';
import { ExampleValue } from '../../common-elements/fields';
import styled from '../../styled-components';

export interface OceanGrantsProps {
  label: keyof LabelsConfig;
  grants: string[];
}

export interface OceanGrantsState {
  expanded: boolean;
}

@observer
export class OceanGrant extends React.Component<OceanGrantsProps, OceanGrantsState> {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  render() {
    const { label, grants } = this.props;
    const { expanded } = this.state;

    return (
      (grants.length > 0 && (
        <>
          <Wrap $expanded={expanded}>
            <GrantHeaderColumn>
              <GrantHeader>{l(label)}</GrantHeader>
            </GrantHeaderColumn>
            {!expanded && (
              <SecuritiesColumn>
                <div style={{ wordWrap: 'break-word' }}>
                  {grants
                    .filter((_, index) => expanded || index < 5)
                    .map((grant, index) => (
                      <StyledMarkdownBlock key={grant + '_' + index}>
                        <ExampleValue>{grant}</ExampleValue>
                      </StyledMarkdownBlock>
                    ))}
                  {grants.length > 5 && !expanded && (
                    <ButtonWrapper>
                      <button onClick={this.trigger(true)}>...and {grants.length - 5} more</button>
                    </ButtonWrapper>
                  )}
                </div>
              </SecuritiesColumn>
            )}
          </Wrap>
          {expanded && (
            <SecurityDetailsStyle>
              <div style={{ wordWrap: 'break-word' }}>
                {grants.map((grant, index) => (
                  <StyledMarkdownBlock key={grant + '_' + index}>
                    <ExampleValue>{grant}</ExampleValue>
                  </StyledMarkdownBlock>
                ))}
              </div>
            </SecurityDetailsStyle>
          )}
        </>
      )) ||
      null
    );
  }

  private trigger(expanded: boolean) {
    return () => this.setState({ expanded });
  }
}

const ButtonWrapper = styled.div`
  padding: 5px 0 0 0;
`;
