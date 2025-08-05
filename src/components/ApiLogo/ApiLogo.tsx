import { observer } from 'mobx-react';
import * as React from 'react';
import { OpenAPIInfo } from '../../types';
import { LinkWrap, LogoImgEl, LogoWrap } from './styled.elements';

@observer
export class ApiLogo extends React.Component<{
  info: OpenAPIInfo;
  logoUrl?: string;
  logoHref?: string;
}> {
  render() {
    const { info, logoUrl, logoHref } = this.props;
    if (logoUrl) {
      return <LogoWrap>{LinkWrap(logoHref)(<LogoImgEl src={logoUrl} />)}</LogoWrap>;
    }

    const logoInfo = info['x-logo'];
    if (!logoInfo || !logoInfo.url) {
      return null;
    }

    const href = logoInfo.href || (info.contact && info.contact.url);

    // Use the english word logo if no alt text is provided
    const altText = logoInfo.altText ? logoInfo.altText : 'logo';

    const logo = <LogoImgEl src={logoInfo.url} alt={altText} />;
    return (
      <LogoWrap style={{ backgroundColor: logoInfo.backgroundColor }}>
        {logoHref ? LinkWrap(href)(logo) : logo}
      </LogoWrap>
    );
  }
}
