import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Precise SVG of the official LeoVantage brand icon (512x512 coordinate space)
// Based directly on the user's reference images
export const getLogoIconSvg = (variant = 'dark') => {
  // variant: 'dark' (for dark navy background: white frame + white arrow + lime shield)
  //          'light' (for light background: navy frame + navy arrow + lime shield)
  const isDark = variant === 'dark';
  const frameColor = isDark ? '#FFFFFF' : '#121A2E';
  const dot1Color = isDark ? '#121A2E' : '#FFFFFF';
  const dot2Color = '#C7F36B';
  const shieldColor = '#C7F36B';
  const arrowColor = isDark ? '#FFFFFF' : '#121A2E';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <g id="leovantage-mark">
    <!-- Top-Left L-Frame (Browser/Interface Ribbon) -->
    <path 
      d="M80 405 V175 C80 120 120 80 175 80 H395 C417 80 435 98 435 120 C435 142 417 160 395 160 H185 C171 160 160 171 160 185 V405 C160 411 155 416 149 416 H91 C85 416 80 411 80 405 Z" 
      fill="${frameColor}"
    />

    <!-- Dot 1 on horizontal bar -->
    <circle cx="330" cy="120" r="17" fill="${dot1Color}" />

    <!-- Dot 2 on horizontal bar (Electric Lime) -->
    <circle cx="384" cy="120" r="17" fill="${dot2Color}" />

    <!-- Center Arrow / Cursor (Pointing Up-Right) -->
    <path 
      d="M208 285 L318 358 L262 368 L286 428 L256 440 L232 380 L208 424 Z" 
      fill="${arrowColor}"
    />

    <!-- Lower-Right Growth Shield / Polygon (Electric Lime) -->
    <path 
      d="M232 200 C221 200 220 209 220 220 V252 L342 333 C348 337 356 333 356 325 V385 L412 352 C417 349 420 344 420 338 V220 C420 209 411 200 400 200 Z" 
      fill="${shieldColor}"
    />
  </g>
</svg>`;
};

// Full horizontal logo with wordmark (viewBox: 0 0 460 110)
export const getLogoFullSvg = (variant = 'dark') => {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#F5F7F2' : '#121A2E';
  const subTextColor = '#94A0B8';
  const iconSvg = getLogoIconSvg(variant).replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">', '').replace('</svg>', '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 110" width="100%" height="100%">
  <!-- Icon Mark Scaled into 90x90 box -->
  <g transform="translate(5, 10) scale(0.175)">
    ${iconSvg}
  </g>

  <!-- Wordmark "LeoVantage" in bold geometric sans-serif -->
  <text 
    x="112" 
    y="60" 
    font-family="'Sora', 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" 
    font-weight="800" 
    font-size="44" 
    letter-spacing="-0.03em" 
    fill="${textColor}"
  >Leo<tspan fill="${textColor}">Vantage</tspan></text>

  <!-- Sub-wordmark "WEB STUDIO" in tracked uppercase -->
  <text 
    x="114" 
    y="86" 
    font-family="'Sora', 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" 
    font-weight="700" 
    font-size="14.5" 
    letter-spacing="0.32em" 
    fill="${subTextColor}"
  >WEB STUDIO</text>
</svg>`;
};

// Squircle App Icon (Dark Navy background + brand symbol with internal padding)
export const getAppIconSvg = () => {
  const iconContent = getLogoIconSvg('dark').replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">', '').replace('</svg>', '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- Dark Navy Squircle Background -->
  <rect width="512" height="512" rx="115" fill="#121A2E" />
  <rect width="512" height="512" rx="115" fill="none" stroke="rgba(199, 243, 107, 0.15)" stroke-width="6" />

  <!-- Centered Brand Symbol with 10% breathing room padding -->
  <g transform="translate(51.2, 51.2) scale(0.8)">
    ${iconContent}
  </g>
</svg>`;
};

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Save SVG files
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), getAppIconSvg());
  fs.writeFileSync(path.join(publicDir, 'logo-icon-dark.svg'), getLogoIconSvg('dark'));
  fs.writeFileSync(path.join(publicDir, 'logo-icon-light.svg'), getLogoIconSvg('light'));
  fs.writeFileSync(path.join(publicDir, 'logo-full-dark.svg'), getLogoFullSvg('dark'));
  fs.writeFileSync(path.join(publicDir, 'logo-full-light.svg'), getLogoFullSvg('light'));

  const appIconBuffer = Buffer.from(getAppIconSvg());

  // 2. Generate PNGs using Sharp
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const item of sizes) {
    await sharp(appIconBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(path.join(publicDir, item.name));
    console.log(`Generated: ${item.name} (${item.size}x${item.size})`);
  }

  // Generate favicon.ico (using 32x32 PNG buffer)
  await sharp(appIconBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated: favicon.ico');

  // 3. Generate site.webmanifest
  const manifest = {
    name: 'LeoVantage Web Studio',
    short_name: 'LeoVantage',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#121A2E',
    background_color: '#121A2E',
    display: 'standalone'
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated: site.webmanifest');
  console.log('All brand assets and favicons successfully created!');
}

generate().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
