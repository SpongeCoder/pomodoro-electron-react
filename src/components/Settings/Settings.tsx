import React from 'react';
import './Settings.scss';

function Settings(props: {isShow: boolean}) {
  console.log('render settings')

  const { isShow } = props;
  let cn = 'settings';

  if (isShow) {
    cn += ' is-show';
  }

  return (
    <div className={cn}>
      Настройки
    </div>
  )
}

export default React.memo(Settings);
