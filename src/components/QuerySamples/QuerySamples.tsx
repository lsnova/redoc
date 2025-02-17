import { observer } from 'mobx-react';
import * as React from 'react';
import { OperationModel } from '../../services';

import { RightPanelHeader, Tab, TabList, Tabs } from '../../common-elements';
import { l } from '../../services/Labels';
import { TabPanel } from 'react-tabs';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

export interface RequestSamplesProps {
  operation: OperationModel;
}

@observer
export class QuerySamples extends React.Component<RequestSamplesProps> {
  render() {
    const { operation } = this.props;
    const examples = operation.queryExamples;

    return (
      (examples.length > 0 && (
        <div>
          <RightPanelHeader> {l('querySamples')} </RightPanelHeader>
          <Tabs defaultIndex={0}>
            <TabList hidden={examples.length === 1}>
              {examples.map((_, idx) => (
                <Tab key={operation.operationId + '_tab_header_' + idx}>
                  {l('example') + ' ' + (idx + 1)}
                </Tab>
              ))}
            </TabList>
            {examples.map((example, idx) => (
              <TabPanel key={operation.operationId + '_tab_content_' + idx}>
                <SourceCodeWithCopy source={example.value} lang={'uri'} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
