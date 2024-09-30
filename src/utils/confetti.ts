import confetti, { Options } from 'canvas-confetti';
import { wait } from './utils.ts';

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const playConfetti = () => {
  void confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });
};

export const playConfettiStars = () => {
  const defaults: Options = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    // cspell:disable-next-line
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  };

  const shoot = () => {
    void confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    });
    void confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
    });
  };

  void (async () => {
    shoot();
    await wait(100);
    shoot();
    await wait(100);
    shoot();
  })();
};

export const playConfettiSnow = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  let skew = 1;

  const frame = () => {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    void confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(() => frame());
    }
  };

  frame();
};

export const playConfettiSchoolPride = () => {
  var end = Date.now() + 15 * 1000;

  // go buckeyes!
  var colors = ['#bb0000', '#ffffff'];

  const frame = () => {
    void confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    void confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
