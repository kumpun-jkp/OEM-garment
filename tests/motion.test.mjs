import test from "node:test";
import assert from "node:assert/strict";
import {
  animateCounter,
  easeSilkScroll,
  silkHeroDepth,
  silkPhotoDepth,
} from "../src/lib/motion.ts";

function withFrames(run) {
  const originalRequest = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;
  const frames = new Map();
  let nextId = 0;
  globalThis.requestAnimationFrame = (callback) => {
    frames.set(++nextId, callback);
    return nextId;
  };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  try {
    run(frames);
  } finally {
    if (originalRequest) globalThis.requestAnimationFrame = originalRequest;
    else delete globalThis.requestAnimationFrame;
    if (originalCancel) globalThis.cancelAnimationFrame = originalCancel;
    else delete globalThis.cancelAnimationFrame;
  }
}

test("cancelling a running counter removes its next frame and restores the exact final metric", () => {
  withFrames((frames) => {
    const element = { textContent: "50,000+" };
    const cancel = animateCounter(element);
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(performance.now() + 300);
    assert.notEqual(element.textContent, "50,000+");
    assert.equal(frames.size, 1);
    cancel();
    assert.equal(frames.size, 0);
    assert.equal(element.textContent, "50,000+");
    callback(performance.now() + 500);
    assert.equal(element.textContent, "50,000+");
    assert.equal(frames.size, 0);
  });
});

test("a completed counter preserves the source formatting and leaves no pending frame", () => {
  withFrames((frames) => {
    const element = { textContent: "20,000,000" };
    animateCounter(element);
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(performance.now() + 2000);
    assert.equal(element.textContent, "20,000,000");
    assert.equal(frames.size, 0);
  });
});

test("scroll image travel stays inside the scaled crop at mobile and desktop sizes", () => {
  for (const compact of [false, true]) {
    for (const height of [0, 60, 180, 393, 800, 1200]) {
      for (const progress of [-2, 0, 0.25, 0.5, 0.75, 1, 3]) {
        for (const depth of [
          silkPhotoDepth(progress, height, compact),
          silkHeroDepth(progress, height, compact),
        ]) {
          const overscan = (height * (depth.scale - 1)) / 2;
          assert.ok(
            Math.abs(depth.y) <= overscan + 1e-8,
            `${JSON.stringify({ compact, height, progress, depth, overscan })}`,
          );
        }
      }
    }
  }
  assert.equal(silkHeroDepth(3, 1200, false).y, 72);
  assert.equal(silkHeroDepth(3, 1200, true).y, 36);
  assert.equal(silkPhotoDepth(3, 1200, false).y, 36);
  assert.equal(silkPhotoDepth(-2, 1200, true).y, -18);
});

test("scroll easing is time-based, monotonic, and converges without overshoot", () => {
  const single = easeSilkScroll(0, 300, 32, 800);
  const double = easeSilkScroll(easeSilkScroll(0, 300, 16, 800), 300, 16, 800);
  assert.ok(Math.abs(single - double) < 1e-8);
  for (const target of [-300, 300]) {
    let position = 0;
    for (let frame = 0; frame < 75; frame++) {
      const next = easeSilkScroll(position, target, 16, 800);
      assert.ok(Math.abs(target - next) <= Math.abs(target - position));
      assert.ok(next >= Math.min(0, target) && next <= Math.max(0, target));
      position = next;
    }
    assert.equal(position, target);
  }
});

test("large page jumps and near-settled positions skip the decorative trailing state", () => {
  assert.equal(easeSilkScroll(0, 8000, 16, 800), 8000);
  assert.equal(easeSilkScroll(8000, 0, 16, 800), 0);
  assert.equal(easeSilkScroll(299.95, 300, 16, 800), 300);
  assert.equal(easeSilkScroll(0, 300, 0, 800), 0);
});
