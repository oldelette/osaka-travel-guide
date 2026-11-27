import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import postcss from 'postcss';

const css = postcss.parse(readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8'));

function mediaApplies(params, width) {
  const max = params.match(/max-width\s*:\s*(\d+)px/);
  const min = params.match(/min-width\s*:\s*(\d+)px/);
  return (!max || width <= Number(max[1])) && (!min || width >= Number(min[1]));
}

function declarations(selector, width) {
  const result = new Map();
  css.walkRules((rule) => {
    if (!rule.selectors?.includes(selector)) return;
    let parent = rule.parent;
    while (parent && parent.type !== 'root') {
      if (parent.type === 'atrule' && parent.name === 'media' && !mediaApplies(parent.params, width)) return;
      parent = parent.parent;
    }
    rule.walkDecls((decl) => result.set(decl.prop, decl.value));
  });
  return result;
}

test('desktop keeps the itinerary and map in separate, non-overlapping columns', () => {
  const layout = declarations('.daily-map-experience', 1440);
  const panel = declarations('.daily-map-experience>.daily-map-section', 1440);
  const frame = declarations('.daily-map-experience .daily-map-frame', 1440);
  const map = declarations('.daily-map-experience .daily-map-canvas', 1440);

  assert.equal(layout.get('display'), 'grid');
  assert.match(layout.get('grid-template-columns'), /minmax/);
  assert.equal(panel.get('position'), 'sticky');
  assert.equal(frame.get('overflow'), 'hidden');
  assert.match(map.get('height'), /clamp\(/);
});

test('mobile places the map above the itinerary and removes sticky positioning', () => {
  const layout = declarations('.daily-map-experience', 390);
  const panel = declarations('.daily-map-experience>.daily-map-section', 390);
  const map = declarations('.daily-map-experience .daily-map-canvas', 390);

  assert.equal(layout.get('display'), 'flex');
  assert.equal(layout.get('flex-direction'), 'column');
  assert.equal(panel.get('order'), '-1');
  assert.equal(panel.get('position'), 'static');
  assert.match(map.get('height'), /36vh/);
  assert.equal(declarations('.daily-map-canvas', 390).get('position'), 'relative');
});

test('tablet retains side-by-side layout without using the desktop map height', () => {
  const layout = declarations('.daily-map-experience', 1024);
  const map = declarations('.daily-map-experience .daily-map-canvas', 1024);

  assert.equal(layout.get('display'), 'grid');
  assert.match(layout.get('grid-template-columns'), /310px/);
  assert.equal(map.get('height'), '280px');
});

test('map controls and markers keep usable touch targets at both breakpoints', () => {
  const zoomDesktop = declarations('.map-zoom-controls button', 1440);
  const zoomMobile = declarations('.map-zoom-controls button', 390);
  const markerDesktop = declarations('.itinerary-marker', 1440);
  const markerMobile = declarations('.itinerary-marker', 390);

  assert.equal(zoomDesktop.get('min-height'), '40px');
  assert.equal(zoomMobile.get('min-height'), '44px');
  assert.equal(markerDesktop.get('min-height'), '36px');
  assert.equal(markerMobile.get('min-height'), '44px');
});

test('search input avoids iOS focus zoom on mobile and keeps desktop sizing', () => {
  assert.equal(declarations('.inline-search input', 390).get('font-size'), '16px');
  assert.equal(declarations('.inline-search input', 1440).get('font'), "12px 'Noto Sans TC',sans-serif");
});
