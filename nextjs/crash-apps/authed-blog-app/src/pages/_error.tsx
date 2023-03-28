

function Error({ statusCode }:{statusCode:any}) {
    return (
      <div className="info-page danger">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </div>
    )
  }
  
  Error.getInitialProps = ({ res, err }: {res:any, err:any}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error