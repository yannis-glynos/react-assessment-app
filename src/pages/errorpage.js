function ErrorPage() {
  return (
    <div className='quiz-end'>
      <h1>
        Oops, it looks like we can't find the page you're looking for
      </h1>
      <button className="submit-button" onClick={() => window.location.href = '/'}>Back Home</button>
    </div>
  );
}

export default ErrorPage;