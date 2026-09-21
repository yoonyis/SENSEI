import { useNavigate } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      {/* NAVBAR */}
      <nav className="welcome-nav">

        <div className="brand">
          <div className="brand-mark">
            S
          </div>

          <div>
            <div className="brand-name">SENSEI</div>
            <div className="brand-subtitle">Academic Intelligence</div>
          </div>
        </div>

        <div className="nav-actions">
          <button
            className="nav-login"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>

          <button
            className="nav-start"
            onClick={() => navigate("/login")}
          >
            Get started
          </button>
        </div>

      </nav>


      {/* HERO */}
      <main className="welcome-main">

        <section className="hero-section">

          <div className="hero-copy">

            <div className="hero-label">
              <span className="status-dot"></span>
              AI-powered learning
            </div>

            <h1>
              Study smarter.
              <br />
              <span>Understand deeper.</span>
            </h1>

            <p>
              SENSEI is your intelligent academic companion.
              Ask questions, analyze study material, practice
              with adaptive questions, and prepare for exams
              with an AI-generated study plan.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-cta"
                onClick={() => navigate("/login")}
              >
                Start learning
                <span>→</span>
              </button>

              <button
                className="secondary-cta"
                onClick={() => navigate("/login")}
              >
                Explore SENSEI
              </button>

            </div>

            <div className="hero-note">
              <span>✓</span>
              Built for students who want to learn, not just memorize.
            </div>

          </div>


          {/* PRODUCT PREVIEW */}

          <div className="hero-preview">

            <div className="preview-window">

              <div className="preview-topbar">

                <div className="window-controls">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="preview-title">
                  SENSEI
                </div>

                <div className="preview-profile">
                  IS
                </div>

              </div>


              <div className="preview-body">

                <aside className="preview-sidebar">

                  <div className="mini-logo">
                    S
                  </div>

                  <div className="mini-nav active">
                    <span>⌂</span>
                  </div>

                  <div className="mini-nav">
                    <span>✦</span>
                  </div>

                  <div className="mini-nav">
                    <span>▣</span>
                  </div>

                  <div className="mini-nav">
                    <span>◫</span>
                  </div>

                  <div className="mini-nav">
                    <span>◌</span>
                  </div>

                </aside>


                <div className="preview-content">

                  <div className="preview-heading">
                    <div>
                      <small>MONDAY, SEPTEMBER 21</small>
                      <h3>Good evening.</h3>
                    </div>

                    <div className="preview-avatar">
                      IS
                    </div>
                  </div>


                  <div className="preview-progress">

                    <div>
                      <span>Overall progress</span>
                      <strong>68%</strong>
                    </div>

                    <div className="progress-track">
                      <div></div>
                    </div>

                    <small>
                      You're making steady progress across your subjects.
                    </small>

                  </div>


                  <div className="preview-grid">

                    <div className="mini-card large">

                      <div className="mini-card-header">
                        <span>Continue learning</span>
                        <span className="arrow">→</span>
                      </div>

                      <h4>Data Structures</h4>

                      <p>
                        Trees & Graph Algorithms
                      </p>

                      <div className="mini-progress">
                        <div></div>
                      </div>

                      <small>72% complete</small>

                    </div>


                    <div className="mini-card">

                      <span className="mini-label">
                        AI INSIGHT
                      </span>

                      <h4>
                        Focus on DBMS today
                      </h4>

                      <p>
                        Your recent practice shows
                        room for improvement.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section className="feature-section">

          <div className="section-heading">

            <span>ONE PLATFORM</span>

            <h2>
              Everything you need to learn better.
            </h2>

          </div>


          <div className="feature-grid">

            <Feature
              number="01"
              title="Ask SENSEI"
              text="Get clear, step-by-step explanations for concepts, problems and doubts."
            />

            <Feature
              number="02"
              title="Study material"
              text="Upload notes and documents and let SENSEI understand what you're studying."
            />

            <Feature
              number="03"
              title="Adaptive practice"
              text="Practice questions adjust to your performance and target your weak areas."
            />

            <Feature
              number="04"
              title="Exam preparation"
              text="Build a personalized roadmap around your syllabus, current level and exam date."
            />

          </div>

        </section>


        {/* FINAL CTA */}

        <section className="final-cta">

          <div>

            <span>READY WHEN YOU ARE</span>

            <h2>
              Your next study session
              <br />
              starts with SENSEI.
            </h2>

          </div>

          <button
            onClick={() => navigate("/login")}
          >
            Get started →
          </button>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="welcome-footer">

        <div className="footer-brand">
          SENSEI
        </div>

        <span>
          AI-powered academic companion
        </span>

        <span>
          © 2026 SENSEI
        </span>

      </footer>

    </div>
  );
}


function Feature({ number, title, text }) {
  return (
    <div className="feature-card">

      <span className="feature-number">
        {number}
      </span>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <div className="feature-line"></div>

    </div>
  );
}