import chatIcon from '../../assets/icons/online chat.svg';

const MAX_OPEN_ATTEMPTS = 20;
const OPEN_RETRY_DELAY = 300;

function openBotpressWidget(attempt = 0) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.botpress?.open === 'function') {
    window.botpress.open();
    return;
  }

  if (attempt >= MAX_OPEN_ATTEMPTS) {
    console.warn('Botpress webchat is not ready yet. Check your embed script and publish settings.');
    return;
  }

  window.setTimeout(() => {
    openBotpressWidget(attempt + 1);
  }, OPEN_RETRY_DELAY);
}

function ChatButton({ className = '' }) {
  return (
    <button
      type="button"
      id="tech-heim-chat-button"
      className={className}
      onClick={() => openBotpressWidget()}
      aria-label="Open chat support"
      title="Chat with Tech Heim support"
    >
      <img src={chatIcon} alt="Chat support" />
    </button>
  );
}

export default ChatButton;
