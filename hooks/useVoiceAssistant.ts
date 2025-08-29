import { useState } from "react";

export function useVoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  let recognition: any;

  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  }

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
  };

  return { listening, transcript, startListening, stopListening };
}
