import React from 'react';

/**
 * Official LeoVantage Web Studio Logo Component
 * Variants:
 * - 'horizontal' (default): Symbol + "LeoVantage" wordmark + "WEB STUDIO"
 * - 'icon': Brand symbol only
 * - 'squircle': App-icon style with dark navy rounded background
 */
export default function Logo({
  variant = 'horizontal',
  theme = 'dark', // 'dark' (on dark navy) | 'light' (on light surface)
  height = 36,
  className = ''
}) {
  const isDark = theme === 'dark';
  const frameColor = `var(--logo-frame, ${isDark ? '#FFFFFF' : '#121A2E'})`;
  const dot1Color = `var(--logo-dot1, ${isDark ? '#121A2E' : '#FFFFFF'})`;
  const dot2Color = '#C7F36B';
  const shieldColor = '#C7F36B';
  const arrowColor = `var(--logo-arrow, ${isDark ? '#FFFFFF' : '#121A2E'})`;
  const textColor = `var(--logo-text, ${isDark ? '#F5F7F2' : '#121A2E'})`;
  const subTextColor = `var(--logo-subtext, ${isDark ? '#CBD5E1' : '#526079'})`;

  const renderMark = () => (
    <g id="leovantage-mark">
      {/* Top-Left Framing Element (Browser/Window Ribbon) */}
      <path
        d="M80 405 V175 C80 120 120 80 175 80 H395 C417 80 435 98 435 120 C435 142 417 160 395 160 H185 C171 160 160 171 160 185 V405 C160 411 155 416 149 416 H91 C85 416 80 411 80 405 Z"
        fill={frameColor}
      />
      {/* Dot 1 on horizontal bar */}
      <circle cx="330" cy="120" r="17" fill={dot1Color} />
      {/* Dot 2 on horizontal bar (Electric Lime) */}
      <circle cx="384" cy="120" r="17" fill={dot2Color} />
      {/* Center Arrow / Cursor (Pointing Up-Right) */}
      <path
        d="M208 285 L318 358 L262 368 L286 428 L256 440 L232 380 L208 424 Z"
        fill={arrowColor}
      />
      {/* Lower-Right Growth Shield / Polygon (Electric Lime) */}
      <path
        d="M232 200 C221 200 220 209 220 220 V252 L342 333 C348 337 356 333 356 325 V385 L412 352 C417 349 420 344 420 338 V220 C420 209 411 200 400 200 Z"
        fill={shieldColor}
      />
    </g>
  );

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 512 512"
        height={height}
        width={height}
        className={className}
        style={{ display: 'block', flexShrink: 0 }}
        aria-label="LeoVantage Web Studio Emblem"
      >
        {renderMark()}
      </svg>
    );
  }

  if (variant === 'squircle') {
    return (
      <svg
        viewBox="0 0 512 512"
        height={height}
        width={height}
        className={className}
        style={{ display: 'block', flexShrink: 0 }}
        aria-label="LeoVantage Web Studio Icon"
      >
        <rect width="512" height="512" rx="115" fill="#121A2E" />
        <rect width="512" height="512" rx="115" fill="none" stroke="rgba(199, 243, 107, 0.2)" strokeWidth="6" />
        <g transform="translate(51.2, 51.2) scale(0.8)">{renderMark()}</g>
      </svg>
    );
  }

  // Default: Horizontal Logo with Wordmark (tightened viewBox without dead vertical padding)
  const aspectRatio = 390 / 88;
  const computedWidth = height * aspectRatio;

  return (
    <svg
      viewBox="0 0 390 88"
      height={height}
      width={computedWidth}
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="LeoVantage Web Studio"
    >
      <g transform="translate(-13, -11) scale(0.21)">{renderMark()}</g>
      <text
        x="92"
        y="50"
        fontFamily="'Sora', 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
        fontWeight="800"
        fontSize="46"
        letterSpacing="-0.025em"
        fill={textColor}
      >
        Leo<tspan fill={textColor}>Vantage</tspan>
      </text>
      <text
        x="94"
        y="75"
        fontFamily="'Sora', 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
        fontWeight="700"
        fontSize="17"
        letterSpacing="0.26em"
        fill={subTextColor}
      >
        WEB STUDIO
      </text>
    </svg>
  );
}
