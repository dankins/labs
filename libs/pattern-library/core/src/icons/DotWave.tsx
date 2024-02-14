/*
html, body {
  margin: 0;
  padding: 0;
}

body {
  background: #EDE4E8;
}




*/
import dotwave from "./DotWave.module.css";
export function DotWave() {
  return (
    <div className={dotwave.wave}>
      <div className={dotwave.dot} />
      <div className={dotwave.dot} />
      <div className={dotwave.dot} />
    </div>
  );
}
