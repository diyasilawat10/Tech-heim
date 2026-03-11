import React, { useEffect, useState } from 'react';
import './BlogsSection.css';
import metaverseImg from '../../../assets/images/metaverse.jpg';
import headphoneImg from '../../../assets/images/headphone.png';
import cryptoCrashImg from '../../../assets/images/cryptocrash.jpg';
import arrowCircleRightIcon from '../../../assets/icons/arrow-circle-right.svg';
import saveIcon from '../../../assets/icons/save.svg';
import saveBoldIcon from '../../../assets/icons/savebold.svg';

const SAVED_BLOGS_STORAGE_KEY = 'saved_blogs';

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6.66667 1.66666V4.16666"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 1.66666V4.16666"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.91667 7.575H17.0833"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 7.08334V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08334C2.5 4.58334 3.75 2.91666 6.66667 2.91666H13.3333C16.25 2.91666 17.5 4.58334 17.5 7.08334Z"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0794 11.4167H13.0869"
      stroke="#717171"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0794 13.9167H13.0869"
      stroke="#717171"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99609 11.4167H10.0036"
      stroke="#717171"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99609 13.9167H10.0036"
      stroke="#717171"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.91276 11.4167H6.92025"
      stroke="#717171"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.91276 13.9167H6.92025"
      stroke="#717171"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TimerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10.0002 18.3333C14.6025 18.3333 18.3335 14.6024 18.3335 10C18.3335 5.39763 14.6025 1.66667 10.0002 1.66667C5.39779 1.66667 1.66683 5.39763 1.66683 10C1.66683 14.6024 5.39779 18.3333 10.0002 18.3333Z"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 5V10L13.3333 11.6667"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 1.66667H12.5"
      stroke="#717171"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BlogsSection = () => {
  const [savedBlogs, setSavedBlogs] = useState(() => {
    try {
      const storedValue = localStorage.getItem(SAVED_BLOGS_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SAVED_BLOGS_STORAGE_KEY, JSON.stringify(savedBlogs));
  }, [savedBlogs]);

  const toggleSave = (blogId) => {
    setSavedBlogs((prevSaved) =>
      prevSaved.includes(blogId)
        ? prevSaved.filter((savedId) => savedId !== blogId)
        : [...prevSaved, blogId]
    );
  };

  const isHeadphoneSaved = savedBlogs.includes('headphone-blog');
  const isMetaSaved = savedBlogs.includes('meta-blog');
  const isBitcoinSaved = savedBlogs.includes('bitcoin-blog');

  return (
    <section className="blogs-section main-container main-section">
      <div className="blogs-header-wrap">
        <div className="blogs-header-row">
          <h2 className="blogs-title">Our Blogs</h2>
          <button className="blogs-view-all" type="button">
            <span>View all</span>
            <img src={arrowCircleRightIcon} alt="" aria-hidden="true" className="blogs-view-arrow-icon" />
          </button>
        </div>
        <div className="blogs-divider section-divider" />
      </div>

      <div className="blogs-content">
        <article className="blog-card-large blog-card-large-hoverable">
          <img src={metaverseImg} alt="Meta article cover" className="blog-large-image" />
          <div className="blog-large-info">
            <div className="blog-meta-row">
              <div className="blog-meta-item blog-meta-date">
                <CalendarIcon />
                <span>August , 7 , 2023</span>
              </div>
              <div className="blog-meta-item blog-meta-time">
                <TimerIcon />
                <span>2 min read</span>
              </div>
            </div>
            <h3 className="blog-large-heading">Meta Platforms plans to release free software that...</h3>
            <p className="blog-large-text">
              The parent company of Facebook, Meta Platforms, is introducing software to help developers.
            </p>
            <div className="blog-large-extra">
              <button type="button" className="blog-read-more-btn">
                Read More
              </button>
              <button
                className={`blog-save-btn${isMetaSaved ? ' is-saved' : ''}`}
                type="button"
                aria-label={isMetaSaved ? 'Remove from saved posts' : 'Save post'}
                aria-pressed={isMetaSaved}
                onClick={() => toggleSave('meta-blog')}
              >
                <img
                  src={isMetaSaved ? saveBoldIcon : saveIcon}
                  alt=""
                  aria-hidden="true"
                  className="blog-save-icon"
                />
              </button>
            </div>
          </div>
        </article>

        <div className="blog-right-stack">
          <article className="blog-card-horizontal blog-card-highlight">
            <img src={headphoneImg} alt="Headphone article cover" className="blog-horizontal-image" />
            <div className="blog-horizontal-info">
              <div className="blog-horizontal-copy">
                <h4 className="blog-horizontal-title blog-horizontal-title-highlight">
                  8 Things You Probably Didn't Know About Headphones
                </h4>
                <p className="blog-horizontal-desc">
                  Owning a headphone could mean a different thing for different people. For some, it act as a
                  fashion statement. It&apos;s easy to spot these people, the headphone are almo...
                </p>
              </div>
              <div className="blog-horizontal-footer">
                <div className="blog-horizontal-meta">
                  <div className="blog-meta-item">
                    <CalendarIcon />
                    <span>March , 28 , 2023</span>
                  </div>
                  <div className="blog-meta-item blog-meta-time">
                    <TimerIcon />
                    <span>5 min read</span>
                  </div>
                </div>
                <button
                  className={`blog-save-btn${isHeadphoneSaved ? ' is-saved' : ''}`}
                  type="button"
                  aria-label={isHeadphoneSaved ? 'Remove from saved posts' : 'Save post'}
                  aria-pressed={isHeadphoneSaved}
                  onClick={() => toggleSave('headphone-blog')}
                >
                  <img
                    src={isHeadphoneSaved ? saveBoldIcon : saveIcon}
                    alt=""
                    aria-hidden="true"
                    className="blog-save-icon"
                  />
                </button>
              </div>
            </div>
          </article>

          <article className="blog-card-horizontal blog-card-bitcoin">
            <img src={cryptoCrashImg} alt="Crypto article cover" className="blog-horizontal-image" />
            <div className="blog-horizontal-info blog-horizontal-info-compact">
              <div className="blog-horizontal-copy">
                <h4 className="blog-horizontal-title">Analyzing the August 17th Bitcoin Price Drop</h4>
                <p className="blog-horizontal-desc">
                  On August 17th at 9:30PM UTC, Bitcoin&apos;s price dropped more than 8% in a 10-minute
                  window, to a two-month low of under $26k. This pulled
                </p>
              </div>
              <div className="blog-horizontal-footer">
                <div className="blog-horizontal-meta">
                  <div className="blog-meta-item">
                    <CalendarIcon />
                    <span>August , 17 , 2023</span>
                  </div>
                  <div className="blog-meta-item blog-meta-time">
                    <TimerIcon />
                    <span>4 min read</span>
                  </div>
                </div>
                <button
                  className={`blog-save-btn blog-save-on-hover${isBitcoinSaved ? ' is-saved' : ''}`}
                  type="button"
                  aria-label={isBitcoinSaved ? 'Remove from saved posts' : 'Save post'}
                  aria-pressed={isBitcoinSaved}
                  onClick={() => toggleSave('bitcoin-blog')}
                >
                  <img
                    src={isBitcoinSaved ? saveBoldIcon : saveIcon}
                    alt=""
                    aria-hidden="true"
                    className="blog-save-icon"
                  />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
