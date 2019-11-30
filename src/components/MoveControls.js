import React from 'react'
import '../styles/moveControls.css'

export const MoveControls = ({handlePreviousBoard, selectedMove, totalMoveCount}) => {
  return (
    <div className="container moveControls">
      <button type="button" id="button_fbw" className="btn" disabled={selectedMove < 2} onClick={() => handlePreviousBoard(0)}>
        <i className="moveControlIcon glyphicon glyphicon-fast-backward"></i>
      </button>

      <button type="button" id="button_bw" className="btn" disabled={selectedMove < 2} onClick={() => handlePreviousBoard(selectedMove - 2)}>
        <i className="moveControlIcon glyphicon glyphicon-backward"></i>
      </button>

      <button type="button" id="button_play" className="btn" disabled={true} onClick={() => console.log('play')}>
        <i className="moveControlIcon glyphicon glyphicon-play"></i>
      </button>

      <button type="button" id="button_fw" className="btn" disabled={selectedMove === totalMoveCount} onClick={() => handlePreviousBoard(selectedMove)}>
        <i className="moveControlIcon glyphicon glyphicon-forward"></i>
      </button>

      <button type="button" id="button_ffw" className="btn" disabled={selectedMove === totalMoveCount} onClick={() => handlePreviousBoard(totalMoveCount - 1)}>
        <i className="moveControlIcon glyphicon glyphicon-fast-forward"></i>
      </button>
    </div>
  );
}
