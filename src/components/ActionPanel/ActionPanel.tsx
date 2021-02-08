import React from 'react';
import './ActionPanel.scss';

type ActionPanelProps = {
  isPlay: boolean,
  roundNumber: number,
  roundCount: number,
  soundOff: boolean,
  onClickPlay: () => void,
  onClickPause: () => void,
  onClickReset: () => void,
  onClickNext: () => void,
  onClickSoundOff: () => void,
  onClickSoundOn: () => void
}

const ActionPanel = (props: ActionPanelProps) => {
  const {
    isPlay,
    roundNumber,
    roundCount,
    soundOff,
    onClickPlay,
    onClickPause,
    onClickReset,
    onClickNext,
    onClickSoundOff,
    onClickSoundOn
  } = props;
  return (
    <div className="action-panel">
      <div className="action-panel__center">
        {
          !isPlay &&
          <button type="button" onClick={onClickPlay}>
            <i className="las la-play" />
          </button>
        }
        {
          isPlay &&
          <button type="button" onClick={onClickPause}>
            <i className="las la-pause" />
          </button>
        }
      </div>

      <div className="action-panel__footer">
        <div className="action-panel__count">
          <div>{roundNumber} / {roundCount}</div>
          <button type="button" onClick={onClickReset}>
            <i className="las la-redo-alt" />
          </button>
        </div>
        <div className="action-panel__count">
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

export default ActionPanel;
