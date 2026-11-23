import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createBengaliShehnaiUrl } from '../utils/bengaliShehnaiAudio';

export const WEDDING_YOUTUBE_MUSIC = {
  videoId: '5Lgx8N-1oAY',
  startSeconds: 8,
} as const;

export interface BackgroundMusicHandle {
  start: () => void;
  toggle: () => void;
}

interface YouTubeBackgroundMusicProps {
  videoId?: string;
  startSeconds?: number;
  onPlayingChange: (playing: boolean) => void;
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  unMute: () => void;
  mute: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  getIframe: () => HTMLIFrameElement;
  cueVideoById: (options: { videoId: string; startSeconds?: number }) => void;
  loadVideoById: (options: { videoId: string; startSeconds?: number }) => void;
  destroy: () => void;
}

interface YTGlobal {
  Player: new (
    element: HTMLElement | string,
    config: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void;
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
        onError?: (event: { data: number }) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<YTGlobal> | null = null;

function loadYouTubeIframeAPI(): Promise<YTGlobal> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window unavailable'));
  }
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytApiPromise) {
    return ytApiPromise;
  }

  ytApiPromise = new Promise<YTGlobal>((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        reject(new Error('YouTube IFrame API failed to initialize'));
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => reject(new Error('Failed to load YouTube IFrame API script'));
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

export const YouTubeBackgroundMusic = forwardRef<
  BackgroundMusicHandle,
  YouTubeBackgroundMusicProps
>(function YouTubeBackgroundMusic(
  {
    videoId = WEDDING_YOUTUBE_MUSIC.videoId,
    startSeconds = WEDDING_YOUTUBE_MUSIC.startSeconds,
    onPlayingChange,
  },
  ref
) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const isReadyRef = useRef(false);
  const isPlayingRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const hasStartedOnceRef = useRef(false);
  const useFallbackRef = useRef(false);

  // Silent fallback Bengali Shehnai audio ONLY if YouTube embed fails or is blocked offline
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string>('');

  const onPlayingChangeRef = useRef(onPlayingChange);
  onPlayingChangeRef.current = onPlayingChange;

  const setPlayingState = (playing: boolean) => {
    isPlayingRef.current = playing;
    onPlayingChangeRef.current(playing);
  };

  const playFallbackAudio = () => {
    const audio = fallbackAudioRef.current;
    if (!audio) return;
    if (!fallbackUrl) {
      const generated = createBengaliShehnaiUrl();
      setFallbackUrl(generated);
      audio.src = generated;
    }
    audio.volume = 0.42;
    audio.muted = false;
    const p = audio.play();
    if (p) {
      p.then(() => setPlayingState(true)).catch(() => setPlayingState(false));
    }
  };

  const startYouTubeFromCutPoint = (player: YTPlayerInstance, forceSeekToStart: boolean) => {
    try {
      player.unMute();
      player.setVolume(80);
      const currentTime = typeof player.getCurrentTime === 'function' ? player.getCurrentTime() : 0;
      if (forceSeekToStart || !hasStartedOnceRef.current || currentTime < startSeconds - 0.5) {
        player.seekTo(startSeconds, true);
      }
      player.playVideo();
      hasStartedOnceRef.current = true;
      setPlayingState(true);
    } catch {
      useFallbackRef.current = true;
      playFallbackAudio();
    }
  };

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeAPI()
      .then((YT) => {
        if (cancelled || !mountRef.current) return;

        const player = new YT.Player(mountRef.current, {
          videoId,
          width: 200,
          height: 200,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: startSeconds,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;
              isReadyRef.current = true;
              const target = event.target;

              try {
                const iframe = target.getIframe();
                if (iframe) {
                  iframe.setAttribute('allow', 'autoplay; encrypted-media');
                  iframe.setAttribute('title', 'Wedding background music player');
                }
                target.setVolume(80);
              } catch {
                // Ignore attribute restriction
              }

              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                startYouTubeFromCutPoint(target, true);
              } else {
                try {
                  target.cueVideoById({ videoId, startSeconds });
                } catch {
                  // Ignore cue failure
                }
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const state = event.data;

              if (state === YT.PlayerState.PLAYING) {
                try {
                  const t = event.target.getCurrentTime();
                  if (t < startSeconds - 0.6) {
                    event.target.seekTo(startSeconds, true);
                  }
                } catch {
                  // Ignore seek check
                }
                setPlayingState(true);
              } else if (state === YT.PlayerState.PAUSED) {
                setPlayingState(false);
              } else if (state === YT.PlayerState.ENDED) {
                // Always loop cleanly starting AFTER the first 8 seconds
                try {
                  event.target.seekTo(startSeconds, true);
                  event.target.playVideo();
                } catch {
                  setPlayingState(false);
                }
              }
            },
            onError: () => {
              if (cancelled) return;
              useFallbackRef.current = true;
              if (pendingPlayRef.current || isPlayingRef.current || hasStartedOnceRef.current) {
                pendingPlayRef.current = false;
                playFallbackAudio();
              }
            },
          },
        });

        playerRef.current = player;
      })
      .catch(() => {
        if (!cancelled) {
          useFallbackRef.current = true;
        }
      });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore cleanup errors
      }
      playerRef.current = null;
      isReadyRef.current = false;
    };
  }, [videoId, startSeconds]);

  useEffect(() => {
    return () => {
      if (fallbackUrl) {
        URL.revokeObjectURL(fallbackUrl);
      }
    };
  }, [fallbackUrl]);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        if (useFallbackRef.current) {
          playFallbackAudio();
          return;
        }
        if (isReadyRef.current && playerRef.current) {
          startYouTubeFromCutPoint(playerRef.current, !hasStartedOnceRef.current);
        } else {
          pendingPlayRef.current = true;
        }
      },
      toggle: () => {
        if (useFallbackRef.current) {
          const audio = fallbackAudioRef.current;
          if (!audio) return;
          if (isPlayingRef.current && !audio.paused) {
            audio.pause();
            setPlayingState(false);
          } else {
            playFallbackAudio();
          }
          return;
        }

        if (isReadyRef.current && playerRef.current) {
          try {
            const state = playerRef.current.getPlayerState?.();
            const isActive = isPlayingRef.current || state === 1 || state === 3;
            if (isActive) {
              playerRef.current.pauseVideo();
              setPlayingState(false);
            } else {
              startYouTubeFromCutPoint(playerRef.current, !hasStartedOnceRef.current);
            }
          } catch {
            useFallbackRef.current = true;
            playFallbackAudio();
          }
        } else {
          pendingPlayRef.current = !pendingPlayRef.current;
        }
      },
    }),
    [startSeconds]
  );

  return (
    <>
      {/* Hidden 1px offscreen YouTube IFrame host (not display:none so browsers allow audio playback) */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 w-px h-px opacity-[0.001] pointer-events-none overflow-hidden -z-10"
      >
        <div ref={mountRef} />
      </div>

      {/* Standby local Shehnai fallback audio only triggered if YouTube embed errors */}
      <audio
        ref={fallbackAudioRef}
        src={fallbackUrl || undefined}
        loop
        playsInline
        preload="none"
        className="hidden"
        aria-hidden="true"
      />
    </>
  );
});
