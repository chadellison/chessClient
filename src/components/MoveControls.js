import React from 'react'
import '../styles/moveControls.css'

export const MoveControls = ({handlePreviousBoard, selectedMove, totalMoveCount}) => {
  return (
    <div className="container moveControls">
      <div type="button" id="button_fbw" className="btn" onClick={() => handlePreviousBoard(0)}>
        <i className="moveControlIcon glyphicon glyphicon-fast-backward"></i>
      </div>

      <div type="button" id="button_bw" className="btn" onClick={() => handlePreviousBoard(selectedMove - 1)}>
        <i className="moveControlIcon glyphicon glyphicon-backward"></i>
      </div>

      <div type="button" id="button_play" className="btn" onClick={() => console.log('play')}>
        <i className="moveControlIcon glyphicon glyphicon-play"></i>
      </div>

      <div type="button" id="button_fw" className="btn" onClick={() => handlePreviousBoard(selectedMove + 1)}>
        <i className="moveControlIcon glyphicon glyphicon-forward"></i>
      </div>

      <div type="button" id="button_ffw" className="btn" onClick={() => handlePreviousBoard(totalMoveCount - 1)}>
        <i className="moveControlIcon glyphicon glyphicon-fast-forward"></i>
      </div>
    </div>
  );
}
