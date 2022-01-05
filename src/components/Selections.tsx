import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Course, SearchWord } from "../data/DataDefinition/SearchWordDD";

export interface Props {
  loc: Course[];
  set_loc: Function;
}

/**
 * Displays courses that a user has input so far
 * Note: Each key for <li> is randomized
 */

const Selections = ({ loc, set_loc }: Props) => {
  /**
   * removes "/" from sw for better presentation
   * @param {SearchWord} sw
   * @returns {string}
   */
  const formatSW = (sw: SearchWord): string => {
    return sw.replace(/\//g, "");
  };

  /**
   * removes search word from loc
   * @param sw
   */
  const removeSW = (sw: SearchWord) => {
    set_loc(loc.filter((c) => c.sw !== sw));
  };

  return (
    <div className="my-2">
      {loc.map((c: Course) => (
        <div
          className="d-flex border rounded p-4 my-2"
          key={Math.random().toString(36)}
        >
          <h6>{formatSW(c.sw)}</h6>
          <div className="ml-auto">
            <OverlayTrigger
              placement="right"
              delay={{ show: 150, hide: 200 }}
              overlay={
                <Tooltip id="info-tip">
                  {c.desc}
                  <span className="text-primary"> Credit: {c.cred}</span>
                </Tooltip>
              }
            >
              <i className="far fa-comment-alt btn btn-sm"></i>
            </OverlayTrigger>

            <i
              className="fas fa-times btn btn-sm"
              onClick={() => removeSW(c.sw)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Selections;
