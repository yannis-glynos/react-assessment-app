import Logo from "../logo.svg"

function Header() {
  return (
    <div className="container-inner row">
      <a href="/">
        <img src={Logo} className="site-logo" alt="Logo"/>
      </a>
      <div className="container-inner row header-menu">
      <a href="/" className="header-button">Home</a>
      <a href="/quiz" className="header-button">Quiz</a>
      <a href="/movies" className="header-button">Movies</a>
      <a href="/random-string-to-test-errors" className="header-button">Error</a>
      </div>
    </div>
  );
}

export default Header;