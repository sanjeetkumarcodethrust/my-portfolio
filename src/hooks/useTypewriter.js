import { useEffect, useState } from 'react';

export default function useTypewriter(words, typeSpeed = 90, pause = 1600) {
  const [text, setText] = useState(words[0] ?? '');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) {
      return undefined;
    }

    const currentWord = words[wordIndex];
    const nextText = isDeleting
      ? currentWord.slice(0, Math.max(text.length - 1, 0))
      : currentWord.slice(0, text.length + 1);

    const timeout = window.setTimeout(
      () => {
        setText(nextText);

        if (!isDeleting && nextText === currentWord) {
          window.setTimeout(() => setIsDeleting(true), pause);
        }

        if (isDeleting && nextText === '') {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        }
      },
      isDeleting ? typeSpeed / 2 : typeSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, pause, text, typeSpeed, wordIndex, words]);

  return text;
}
