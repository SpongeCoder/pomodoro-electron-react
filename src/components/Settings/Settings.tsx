import React from 'react';
import { useSelector } from 'react-redux';
import { MainState } from '../../reducers/main/main';
import './Settings.scss';

function Settings() {
  const isShow = useSelector((state: { main: MainState }) => state.main.isShowSettings);

  console.log('render settings')

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
