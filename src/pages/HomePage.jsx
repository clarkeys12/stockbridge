import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <video
          className="home-page__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/hero.mov"
        />
        <span className="home-page__credit">Film by Matthew Lejune</span>
      </div>
    </div>
  );
}
