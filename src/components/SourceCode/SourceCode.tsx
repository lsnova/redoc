import * as React from 'react';
import { highlight } from '../../utils';

import { SampleControls, SampleControlsWrap, StyledNotPre, StyledPre } from '../../common-elements';
import { CopyButtonWrapper } from '../../common-elements/CopyButtonWrapper';

export interface SourceCodeProps {
  source: string;
  lang: string;
  pre?: boolean;
}

export const SourceCode = (props: SourceCodeProps) => {
  const { source, lang, pre } = props;
  return pre ? (
    <StyledPre dangerouslySetInnerHTML={{ __html: highlight(source, lang) }} />
  ) : (
    <StyledNotPre dangerouslySetInnerHTML={{ __html: highlight(source, lang) }} />
  );
};

export const SourceCodeWithCopy = (props: SourceCodeProps) => {
  const { source, lang, pre } = { ...{ pre: false }, ...props };
  return (
    <CopyButtonWrapper data={lang === 'uri' ? source.replace(/\n/g, '') : source}>
      {({ renderCopyButton }) => (
        <SampleControlsWrap>
          <SampleControls>{renderCopyButton()}</SampleControls>
          <SourceCode lang={lang} source={source} pre={pre} />
        </SampleControlsWrap>
      )}
    </CopyButtonWrapper>
  );
};
