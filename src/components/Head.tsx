import { Config } from '@/config';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export type HeadProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const Head = ({ title, description = Config.appDescription, children }: HeadProps) => {
  return (
    <Helmet title={title} defaultTitle={Config.appName} titleTemplate={`%s - ${Config.appName}`}>
      <meta name="description" content={description} />
      {children}
    </Helmet>
  );
};

export default Head;
