<template>
  <div class="check-bug">
    <button class="bug-button">CHECK BUG</button>
  </div>
</template>
<style lang="less" scoped>
  .check-bug {
    margin-top: 80px;
    text-align: center;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Bebas Neue';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('../assets/fonts/Bebas+Neue.woff2') format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Bebas Neue';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('../assets/fonts/Bebas+Neue.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  .bug-button,
  .bug-button::after {
    width: 215px;
    height: 45px;
    cursor: pointer;
    font-size: 22px;
    font-weight: 900;
    font-family: 'Bebas Neue', cursive;
    font-style: italic;
    background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
    border: 0;
    outline: transparent;
    color: #fff;
    letter-spacing: 3px;
    box-shadow: 6px 0 0 #00e6f6;
    position: relative;
  }
  @slice-0: inset(50% 50% 50% 50%);
  @slice-1: inset(80% -6px 0 0);
  @slice-2: inset(50% -6px 30% 0);
  @slice-3: inset(10% -6px 85% 0);
  @slice-4: inset(40% -6px 43% 0);
  @slice-5: inset(80% -6px 5% 0);
  .bug-button::after {
    content: 'CHECK BUG';
    line-height: 50px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #ff013c 5%);
    text-shadow: -2px -2px 0 #f8f005, 2px 2px 0 #00e6f6;
    clip-path: inset(100% -6px 0 0);
  }
  @keyframes glitch {
    0% {
      clip-path: @slice-1;
      transform: translate(-10px, -5px);
    }
    10% {
      clip-path: @slice-3;
      transform: translate(5px, 5px);
    }
    20% {
      clip-path: @slice-1;
      transform: translate(-5px, -5px);
    }
    30% {
      clip-path: @slice-3;
      transform: translate(0px, 3px);
    }
    40% {
      clip-path: @slice-2;
      transform: translate(-3px, 0px);
    }
    50% {
      clip-path: @slice-3;
      transform: translate(25px, 0px);
    }
    60% {
      clip-path: @slice-4;
      transform: translate(3px, 5px);
    }
    70% {
      clip-path: @slice-2;
      transform: translate(-5px, 5px);
    }
    80% {
      clip-path: @slice-5;
      transform: translate(10px, -5px);
    }
    90% {
      clip-path: @slice-1;
      transform: translate(-5px, 0px);
    }
    100% {
      clip-path: @slice-1;
      transform: translate(-10px, -5px);
    }
  }
  .bug-button:hover::after {
    animation: glitch 1.5s;
    animation-timing-function: steps(2, end)
  }
</style>