import './ContentPage.css';

export default function AboutPage() {
  return (
    <div className="content-page">
      <h1 className="content-page__title">About</h1>

      <section className="content-page__section">
        <p className="content-page__text content-page__text--lead">
          Stockbridge is a Brooklyn-based clothing label focused on
          considered garments built for everyday wear.
        </p>
      </section>

      <section className="content-page__section">
        <p className="content-page__text">
          Every piece is designed with intention — quality materials, honest
          construction, and silhouettes that feel natural. We source fabrics
          from mills in Japan, Portugal, and the United States, working with
          small-batch manufacturers who share our commitment to craft.
        </p>
      </section>

      <section className="content-page__section">
        <p className="content-page__text">
          Our studio and showroom is located at 117 Grattan Street in
          Brooklyn, New York. Visits are welcome by appointment.
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
