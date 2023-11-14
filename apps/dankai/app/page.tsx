import { Button, Centered, FullPage } from '@021software/pattern-library/core';
import Gradient from './Gradient';
import style from './page.module.scss';

export default async function Page() {
  return (
    <Gradient>
      <FullPage>
        <Centered>
          <div className={style.glowingCard}>
            <h1>Potato</h1>
            <Button>hello</Button>
          </div>
        </Centered>
      </FullPage>
    </Gradient>
  );
}
