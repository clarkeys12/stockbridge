import { useState } from 'react';
import './ContentPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up to your backend or form service
    alert("Message sent — we'll be in touch.");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="content-page">
      <h1 className="content-page__title">Contact</h1>

      <section className="content-page__section">
        <p className="content-page__text">
          For inquiries, wholesale, press, or just to say hello.
        </p>
      </section>

      <form className="content-page__form" onSubmit={handleSubmit}>
        <div className="content-page__field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-page__field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-page__field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="content-page__submit">
          Send Message
        </button>
      </form>

      <section className="content-page__section">
        <p className="content-page__text">
          117 Grattan St<br />
          Brooklyn, NY 11237
        </p>
      </section>
    </div>
  );
}
