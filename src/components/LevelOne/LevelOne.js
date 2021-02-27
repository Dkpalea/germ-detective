import classroomRegular from '../../assets/images/classroomRegular.png';

const LevelOne = ({state, setState}) => {

  return (
    <div className="level-one-page">
      <div className="content-container">
        <div className="toolbar">
          <img className="scanner" />
          <div className="other">
            <img className="handsoap" />
            <img className="spray" />
            <img className="mask" />
          </div>
        </div>
        <img className="background" src={classroomRegular} />
      </div>
    </div>
  );
}

export default LevelOne;
