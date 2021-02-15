import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSetSound } from '../../reducers/settings/actions';
import { SettingsState } from '../../reducers/settings/settings';
import './ActionPanel.scss';

type ActionPanelProps = {
  roundNumber: number,
  onClickReset: () => void,
  onClickNext: () => void,
}

const ActionPanel = (props: ActionPanelProps) => {
  const isSoundOff = useSelector((state: { settings: SettingsState }) => state.settings.isSoundOff);
  const roundCount = useSelector((state: { settings: SettingsState }) => state.settings.roundCount);
  const dispatch = useDispatch();
  const {
    roundNumber,
    onClickReset,
    onClickNext,
  } = props;

  const onClickSoundOff = () => {
    dispatch(onSetSound(true))
  }
  const onClickSoundOn = () => {
    dispatch(onSetSound(false))
  }

  console.log('render panel');

  return (
    <div className="action-panel">
      <div className="action-panel__footer">
        <div className="action-panel__count">
          <div className="action-panel__count-value">{roundNumber} / {roundCount}</div>
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
