import React, { useState } from 'react';
import './ActionPanel.scss';

type ActionPanelProps = {
  roundNumber: number,
  roundCount: number,
  soundOff: boolean,
  onClickReset: () => void,
  onClickNext: () => void,
  onClickSoundOff: () => void,
  onClickSoundOn: () => void
}

const ActionPanel = (props: ActionPanelProps) => {
  console.log('render panel');

  const {
    roundNumber,
    roundCount,
    soundOff,
    onClickReset,
    onClickNext,
    onClickSoundOff,
    onClickSoundOn
  } = props;

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
            soundOff &&
            <button type="button" onClick={onClickSoundOn}>
              <i className="las la-volume-mute" />
            </button>
          }
          {
            !soundOff &&
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
