import { observer } from 'mobx-react';
import * as React from 'react';
import {
  GrantHeader,
  GrantHeaderColumn,
  SecuritiesColumn,
  Wrap,
} from '../SecurityRequirement/styled.elements';
import { l } from '../../services/Labels';
import { Markdown } from '../Markdown/Markdown';

export interface OceanAuthorizationDescriptionProps {
  description: string;
}

@observer
export class OceanAuthorizationDescription extends React.Component<OceanAuthorizationDescriptionProps> {
  render() {
    const { description } = this.props;
    return (
      (description && (
        <Wrap $expanded={false}>
          <GrantHeaderColumn>
            <GrantHeader>{l('authorizationDescription')}</GrantHeader>
          </GrantHeaderColumn>
          <SecuritiesColumn>
            <Markdown source={description}></Markdown>
          </SecuritiesColumn>
        </Wrap>
      )) ||
      null
    );
  }
}
