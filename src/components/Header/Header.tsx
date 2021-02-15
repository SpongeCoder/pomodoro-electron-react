import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remote } from 'electron';
import { MainState } from '../../reducers/main/main';
import { onSetShowSettings } from '../../reducers/main/actions';
import './Header.scss';

const closeApp = () => {
  const WIN = remote.getCurrentWindow();
  WIN.close();
};

const minimizeApp = () => {
  const WIN = remote.getCurrentWindow();
  WIN.minimize();
};

const Header = () => {
  const dispatch = useDispatch();
  const isShowSettings = useSelector((state: { main: MainState }) => state.main.isShowSettings);

  const onToggleSettings = () => {
    dispatch(onSetShowSettings(!isShowSettings))
  }

  console.log('render header')
  return (
    <div className="header">
      <div className="header__left">
        <button type="button" title={isShowSettings ? 'Назад' : 'Настройки'} onClick={onToggleSettings}>
          {
            !isShowSettings &&
            <i className="las la-sliders-h" />
          }
          {
            isShowSettings &&
            <i className="las la-angle-left" />
          }
        </button>
      </div>

      <div className="header__right">
        <button type="button" title="Свернуть" onClick={minimizeApp}>
          <i className="lar la-window-minimize" />
        </button>
        <button type="button" title="Закрыть" onClick={closeApp}>
          <i className="las la-times" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Header);
