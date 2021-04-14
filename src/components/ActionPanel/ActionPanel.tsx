import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSetSound } from '../../reducers/settings/actions';
import { SettingsState } from '../../reducers/settings/settings';
import { MainState } from '../../reducers/main/main';
import './ActionPanel.scss';

type ActionPanelProps = {
  onClickReset: () => void,
  onClickNext: () => void,
}

const ActionPanel = (props: ActionPanelProps) => {
  const { currentRound } = useSelector((state: { main: MainState }) => state.main);
  const { isSoundOff, roundCount } = useSelector((state: { settings: SettingsState }) => state.settings);
  const dispatch = useDispatch();
  const {
    onClickReset,
    onClickNext,
  } = props;

  const onClickSoundOff = () => {
    dispatch(onSetSound(true))
  }
  const onClickSoundOn = () => {
    dispatch(onSetSound(false))
  }

  return (
    <div className="action-panel">
      <div className="action-panel__footer">
        <div className="action-panel__count">
          <div className="action-panel__count-value">{currentRound} / {roundCount}</div>
          <button type="button" onClick={onClickReset}>
            <i className="las la-redo-alt" />
          </button>
        </div>
        <div className="action-panel__options">
          <button type="button" onClick={onClickNext}>
            <i className="las la-step-forward" />
          </button>
          {
            isSoundOff &&
            <button type="button" onClick={onClickSoundOn}>
              <i className="las la-volume-mute" />
            </button>
          }
          {
            !isSoundOff &&
            <button type="button" onClick={onClickSoundOff}>
              <i className="las la-volume-up" />
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(ActionPanel);
