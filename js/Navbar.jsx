const projects = [
  { name: 'Core Portfolio', url: 'https://jbulda.github.io/' },
  { name: 'Data Dashboard', url: 'https://jbulda.github.io/market-intelligence/' },
  { name: 'Sprint Optimizer', url: 'https://jbulda.github.io/sprint-optimizer/' },
  { name: 'Asset Store', url: 'https://jbulda.github.io/asset-procurement/' }
];

export const Navbar = () => {
  return (
    <nav className="system-nav">
      <div className="nav-logo">SYSTEM_DIAGNOSTICS v1.0</div>
      <ul className="nav-links">
        {projects.map((p) => (
          <li key={p.name}>
            <a href={p.url} className={window.location.href.includes(p.url) ? 'active' : ''}>
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};