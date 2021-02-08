import React from 'react';
import './Settings.scss';

export default function Settings(props: {isShow: boolean}) {
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
