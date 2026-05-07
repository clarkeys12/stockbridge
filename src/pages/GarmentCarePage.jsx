import './ContentPage.css';

export default function GarmentCarePage() {
  return (
    <div className="content-page">
      <h1 className="content-page__title">Garment Care</h1>

      <section className="content-page__section">
        <h2 className="content-page__heading">General Care</h2>
        <p className="content-page__text">
          Each Stockbridge garment is built to last. With proper care, your pieces
          will develop character over time — fading, softening, and becoming
          uniquely yours.
        </p>
        <ul className="content-page__list">
          <li>Machine wash cold, gentle cycle</li>
          <li>Wash inside out with like colors</li>
          <li>Hang dry or tumble dry low</li>
          <li>Iron on medium heat if needed</li>
          <li>Do not bleach</li>
        </ul>
      </section>

      <section className="content-page__section">
        <h2 className="content-page__heading">Denim</h2>
        <p className="content-page__text">
          Raw and washed denim should be washed as infrequently as possible.
          Spot clean when you can. When a full wash is needed, hand wash cold
          and hang dry to preserve the integrity of the fabric.
        </p>
      </section>

      <section className="content-page__section">
        <h2 className="content-page__heading">Cotton & Linen</h2>
        <p className="content-page__text">
          Natural fibers benefit from air drying. Expect some shrinkage on the
          first wash — we've accounted for this in our sizing. Steam or iron
          while slightly damp for the cleanest finish.
        </p>
      </section>

      <section className="content-page__section">
        <h2 className="content-page__heading">Repairs</h2>
        <p className="content-page__text">
          We believe in repairing, not replacing. If your garment needs mending,
          reach out to us. We offer repair services for all Stockbridge pieces.
        </p>
      </section>
    </div>
  );
}
