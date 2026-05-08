import './ContentPage.css';

export default function AboutPage() {
  return (
    <div className="content-page">
      <h1 className="content-page__title">About</h1>

      <section className="content-page__section">
        <p className="content-page__text" style={{ fontWeight: 700, marginBottom: '32px' }}>
          Stockbridge sits where natural materials meet structured form, where the quiet of the outdoors finds its place in the city.
        </p>
        <p className="content-page__text">
          Everything is designed, cut, and sewn in New York, using fabrics sourced with intention and often dyed by hand in small batches. These are clothes that reflect real life, where variation, wear, and imperfection are part of it.
        </p>
        <p className="content-page__text">
          We're not here to chase trends or over-design things. Just to make pieces that feel grounded, useful, and a little personal. Clothing that moves easily between the natural and the built world.
        </p>
        <p className="content-page__text" style={{ fontWeight: 700, marginTop: '32px' }}>
          Finding nature in the city.
        </p>
      </section>

      <section className="content-page__section">
        <img
          className="content-page__image"
          src="/images/studio-chuck.jpg"
          alt="Stockbridge studio — Brooklyn, NY"
        />
      </section>
    </div>
  );
}
