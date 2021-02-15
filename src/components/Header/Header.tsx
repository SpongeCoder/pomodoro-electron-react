import React from 'react';
import { remote } from 'electron';
import './Header.scss';

const closeApp = () => {
  const WIN = remote.getCurrentWindow();
  WIN.close();
};

const minimizeApp = () => {
  const WIN = remote.getCurrentWindow();
  WIN.minimize();
};

const Header = (props: {
  isShowSettings: boolean,
  onToggleSettings: () => void,
}) => {
  const {isShowSettings, onToggleSettings} = props;
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
