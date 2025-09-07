import { observer } from 'mobx-react';
import * as React from 'react';
import { LabelsConfig } from '../../services';
import {
  AuthHeader,
  AuthHeaderColumn,
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
import { ShelfIcon } from '../../common-elements';

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
    const expandable = grants.length > 5;

    return (
      (grants.length > 0 && (
        <>
          <Wrap $expanded={expanded}>
            {expandable ? (
              <AuthHeaderColumn onClick={this.trigger(!expanded)}>
                <AuthHeader>{l(label)}</AuthHeader>
                <ShelfIcon size={'1.3em'} direction={expanded ? 'down' : 'right'} />
              </AuthHeaderColumn>
            ) : (
              <GrantHeaderColumn>
                <GrantHeader>{l(label)}</GrantHeader>
              </GrantHeaderColumn>
            )}

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
                    <ButtonWrapper>...and {grants.length - 5} more</ButtonWrapper>
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
