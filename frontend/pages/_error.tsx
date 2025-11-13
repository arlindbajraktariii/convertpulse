import React from 'react';

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FBFBFB' }}>
      <h1 style={{ fontSize: 64, fontWeight: 700, color: '#84994F', marginBottom: 16 }}>
        {statusCode ? statusCode : 'Error'}
      </h1>
      <p style={{ fontSize: 20, color: '#333', marginBottom: 32 }}>
        {statusCode
          ? `An error ${statusCode} occurred on server.`
          : 'An error occurred on client.'}
      </p>
      <a href="/" style={{ color: '#84994F', fontWeight: 600, fontSize: 18, textDecoration: 'underline' }}>Go Home</a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
